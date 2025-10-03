from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pinterest_dl import PinterestDL
import os
import json
import shutil
from datetime import datetime
import zipfile
from werkzeug.utils import secure_filename
import requests
import yt_dlp

app = Flask(__name__)
# Enable CORS for all routes with explicit configuration
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "http://localhost:8080", "http://192.168.1.103:3000", "https://yttmp3.com"],
        "methods": ["GET", "POST", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True
    }
})

# Configuration
DOWNLOAD_FOLDER = 'downloads'
COOKIES_FILE = 'cookies.json'
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

def parse_min_resolution(value):
    """Parse min_resolution input into a tuple[int, int] or None."""
    if not value:
        return None

    # Handle string input such as "512x512" or "512 x 512"
    if isinstance(value, str):
        cleaned = value.lower().replace(' ', '')
        if 'x' not in cleaned:
            return None
        width_str, height_str = cleaned.split('x', 1)
        try:
            return int(width_str), int(height_str)
        except ValueError:
            return None

    # Handle iterable input
    if isinstance(value, (list, tuple)) and len(value) == 2:
        try:
            return int(value[0]), int(value[1])
        except (TypeError, ValueError):
            return None

    return None


def build_downloader():
    """Create PinterestDL client with optional cookies."""
    downloader = PinterestDL.with_api(timeout=5, verbose=False)
    if os.path.exists(COOKIES_FILE):
        try:
            with open(COOKIES_FILE, 'r') as f:
                cookies = json.load(f)
            downloader = downloader.with_cookies(cookies)
        except (json.JSONDecodeError, OSError):
            pass
    return downloader


def normalize_url(raw_url):
    """Resolve Pinterest short links (pin.it) to their final destination."""
    if not raw_url:
        return raw_url

    url = raw_url.strip()
    if not url:
        return url

    if not url.startswith(('http://', 'https://')):
        url = f'https://{url}'

    try:
        response = requests.head(url, allow_redirects=True, timeout=10)
        if response.url:
            return response.url
    except requests.RequestException:
        try:
            response = requests.get(url, allow_redirects=True, timeout=10, stream=True)
            if response.url:
                return response.url
        except requests.RequestException:
            pass

    return url


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Pinterest Downloader API is running'})

@app.route('/api/scrape', methods=['POST'])
def scrape_pinterest():
    """Scrape Pinterest URL and return media information"""
    try:
        data = request.json
        url = data.get('url')
        num = int(data.get('num', 30))
        min_resolution = parse_min_resolution(data.get('min_resolution'))
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        # Normalize short links (pin.it) and initialize PinterestDL
        url = normalize_url(url)
        downloader = build_downloader()

        scrape_kwargs = {
            'url': url,
            'num': num,
        }

        if min_resolution:
            scrape_kwargs['min_resolution'] = min_resolution

        scraped_medias = downloader.scrape(**scrape_kwargs)
        
        # Convert to dictionary
        media_data = [media.to_dict() for media in scraped_medias]
        
        return jsonify({
            'success': True,
            'count': len(media_data),
            'media': media_data
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/search', methods=['POST'])
def search_pinterest():
    """Search Pinterest by query"""
    try:
        data = request.json
        query = data.get('query')
        num = int(data.get('num', 30))
        min_resolution = parse_min_resolution(data.get('min_resolution'))
        
        if not query:
            return jsonify({'error': 'Query is required'}), 400
        
        # Parse min_resolution if provided
        # Initialize PinterestDL and search
        downloader = build_downloader()

        search_kwargs = {
            'query': query,
            'num': num,
        }

        if min_resolution:
            search_kwargs['min_resolution'] = min_resolution

        scraped_medias = downloader.search(**search_kwargs)
        
        # Convert to dictionary
        media_data = [media.to_dict() for media in scraped_medias]
        
        return jsonify({
            'success': True,
            'count': len(media_data),
            'media': media_data
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/download', methods=['POST'])
def download_media():
    """Download media from Pinterest"""
    try:
        data = request.json
        url = data.get('url')
        query = data.get('query')
        num = int(data.get('num', 30))
        min_resolution = parse_min_resolution(data.get('min_resolution'))
        download_video = data.get('download_video', False)
        caption = data.get('caption', 'none')
        
        if not url and not query:
            return jsonify({'error': 'URL or query is required'}), 400
        
        # Parse min_resolution if provided
        # Create unique output directory
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        output_dir = os.path.join(DOWNLOAD_FOLDER, f'pinterest_{timestamp}')
        os.makedirs(output_dir, exist_ok=True)
        
        # Initialize PinterestDL
        downloader = build_downloader()

        download_kwargs = {
            'output_dir': output_dir,
            'num': num,
            'download_streams': download_video,
            'caption': caption,
        }

        if min_resolution:
            download_kwargs['min_resolution'] = min_resolution
        
        # Download based on URL or query
        if url:
            url = normalize_url(url)
            images = downloader.scrape_and_download(url=url, **download_kwargs)
        else:
            images = downloader.search_and_download(query=query, **download_kwargs)

        if images is None:
            images = []
        
        # Create zip file
        zip_filename = f'pinterest_{timestamp}.zip'
        zip_path = os.path.join(DOWNLOAD_FOLDER, zip_filename)
        
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(output_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, output_dir)
                    zipf.write(file_path, arcname)
        
        # Clean up output directory
        shutil.rmtree(output_dir)
        
        return jsonify({
            'success': True,
            'count': len(images),
            'download_url': f'/api/download/{zip_filename}'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/download-single', methods=['POST'])
def download_single_pinterest():
    """Download a single Pinterest pin in original format (not ZIP)"""
    try:
        data = request.json
        url = data.get('url')
        media_url = data.get('media_url')
        download_video = data.get('download_video', False)
        caption = data.get('caption', 'none')
        
        # Handle direct media URL download
        if media_url:
            return download_media_url_direct(media_url)
        
        # Handle Pinterest URL scraping and download
        if not url:
            return jsonify({'error': 'URL or media_url is required'}), 400
        
        # Scrape Pinterest URL to get media
        url = normalize_url(url)
        downloader = build_downloader()
        
        scraped_medias = downloader.scrape(url=url, num=1)
        
        if not scraped_medias:
            return jsonify({'error': 'No media found for this Pinterest URL'}), 404

        # Convert to dict and attempt to locate a media URL
        media = scraped_medias[0]
        media_dict = media.to_dict()
        target_url = extract_media_url(media_dict, prefer_video=download_video)

        if not target_url:
            # Retry without forcing video in case image is available
            target_url = extract_media_url(media_dict, prefer_video=False)

        if not target_url:
            return jsonify({'error': 'No downloadable media found'}), 404

        # Download the media file
        return download_media_url_direct(target_url)
        
    except Exception as e:
        return jsonify({'error': f'Failed to download Pinterest media: {str(e)}'}), 500

def extract_media_url(media_dict, prefer_video=False):
    """Extract the best media URL from a scraped Pinterest media dictionary."""

    def find_url(value):
        if isinstance(value, str):
            if value.startswith('http'):  # basic validation
                return value
        elif isinstance(value, dict):
            for nested_value in value.values():
                result = find_url(nested_value)
                if result:
                    return result
        elif isinstance(value, (list, tuple)):
            for item in value:
                result = find_url(item)
                if result:
                    return result
        return None

    if not isinstance(media_dict, dict):
        return None

    # If video is preferred, prioritise typical video keys
    if prefer_video:
        for key in ('video_url', 'videoUrl', 'video'):
            url = find_url(media_dict.get(key))
            if url:
                return url
        url = find_url(media_dict.get('videos'))
        if url:
            return url

    # Common image keys
    for key in ('image_url', 'imageUrl', 'image', 'image_hd_url', 'main_image_url'):
        url = find_url(media_dict.get(key))
        if url:
            return url

    # Nested images dict typically contains original URLs
    url = find_url(media_dict.get('images'))
    if url:
        return url

    # Fall back to videos if not already tried
    if not prefer_video:
        url = find_url(media_dict.get('videos'))
        if url:
            return url

    # Final fallback: scan entire dictionary
    return find_url(media_dict)

def download_media_url_direct(media_url):
    """Helper function to download a media URL directly"""
    try:
        # Download the single media file to memory
        import requests
        response = requests.get(media_url, stream=True, timeout=30)
        response.raise_for_status()
        
        # Determine file extension from URL or Content-Type
        content_type = response.headers.get('content-type', '').lower()
        url_parts = media_url.split('/')
        original_filename = url_parts[-1] if url_parts else 'media'
        if '?' in original_filename:
            original_filename = original_filename.split('?')[0]
        
        # Map content types to extensions
        content_type_map = {
            'image/jpeg': '.jpg',
            'image/jpg': '.jpg', 
            'image/png': '.png',
            'image/gif': '.gif',
            'image/webp': '.webp',
            'video/mp4': '.mp4',
            'video/quicktime': '.mov',
            'video/x-msvideo': '.avi'
        }
        
        # Try to get extension from content type first
        extension = None
        for ct, ext in content_type_map.items():
            if ct in content_type:
                extension = ext
                break
        
        # If no extension from content type, try from URL
        if not extension:
            for ext in ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.mov', '.avi']:
                if original_filename.lower().endswith(ext):
                    extension = ext
                    break
        
        # Default to .jpg if no extension found
        if not extension:
            extension = '.jpg'
        
        # Create filename with timestamp to avoid conflicts
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"pinterest_media_{timestamp}{extension}"
        
        # Save file temporarily
        temp_path = os.path.join(DOWNLOAD_FOLDER, filename)
        with open(temp_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return jsonify({
            'success': True,
            'count': 1,
            'download_url': f'/api/download-direct/{filename}',
            'filename': filename,
            'content_type': content_type
        })
        
    except Exception as e:
        return jsonify({'error': f'Failed to download media: {str(e)}'}), 500

@app.route('/api/download-direct', methods=['POST', 'OPTIONS'])
def download_direct():
    """Download media URL directly and return as blob"""
    if request.method == 'OPTIONS':
        # Handle CORS preflight request
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response
    
    try:
        data = request.json
        media_url = data.get('media_url')
        
        if not media_url:
            return jsonify({'error': 'Media URL is required'}), 400
        
        # Download the media file
        import requests
        response = requests.get(media_url, stream=True, timeout=30)
        response.raise_for_status()
        
        # Determine MIME type and filename
        content_type = response.headers.get('content-type', 'application/octet-stream')
        
        # Generate filename
        url_parts = media_url.split('/')
        original_filename = url_parts[-1] if url_parts else 'media'
        if '?' in original_filename:
            original_filename = original_filename.split('?')[0]
        
        # Ensure proper extension
        if not any(original_filename.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.mov', '.avi']):
            # Add extension based on content type
            if 'image' in content_type.lower():
                if 'png' in content_type:
                    original_filename += '.png'
                elif 'gif' in content_type:
                    original_filename += '.gif'
                else:
                    original_filename += '.jpg'
            elif 'video' in content_type.lower():
                original_filename += '.mp4'
            else:
                original_filename += '.jpg'
        
        from flask import Response
        def generate():
            for chunk in response.iter_content(chunk_size=8192):
                yield chunk
        
        # Create response with explicit CORS headers
        flask_response = Response(
            generate(),
            mimetype=content_type,
            headers={
                'Content-Disposition': f'attachment; filename="{original_filename}"',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        )
        
        return flask_response
        
    except Exception as e:
        return jsonify({'error': f'Failed to download media: {str(e)}'}), 500

@app.route('/api/download-direct/<filename>', methods=['GET'])
def download_direct_file(filename):
    """Download file directly in original format"""
    try:
        file_path = os.path.join(DOWNLOAD_FOLDER, secure_filename(filename))
        if os.path.exists(file_path):
            # Determine MIME type based on file extension
            mime_types = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg', 
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.webp': 'image/webp',
                '.mp4': 'video/mp4',
                '.mov': 'video/quicktime',
                '.avi': 'video/x-msvideo'
            }
            
            file_ext = os.path.splitext(filename)[1].lower()
            mimetype = mime_types.get(file_ext, 'application/octet-stream')
            
            def cleanup_after_send():
                try:
                    os.remove(file_path)
                except:
                    pass
            
            # Schedule file cleanup after sending
            import threading
            threading.Timer(2.0, cleanup_after_send).start()
            
            return send_file(file_path, as_attachment=True, download_name=filename, mimetype=mimetype)
        else:
            return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/download/<filename>', methods=['GET'])
def download_file(filename):
    """Download the zip file"""
    try:
        file_path = os.path.join(DOWNLOAD_FOLDER, secure_filename(filename))
        if os.path.exists(file_path):
            response = send_file(file_path, as_attachment=True, download_name=filename)
            # Add CORS headers
            response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
            return response
        else:
            return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login_pinterest():
    """Login to Pinterest and save cookies"""
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Initialize browser and login
        cookies = PinterestDL.with_browser(
            browser_type="chrome",
            headless=True,
        ).login(email, password).get_cookies(after_sec=7)
        
        # Save cookies to file
        with open(COOKIES_FILE, 'w') as f:
            json.dump(cookies, f, indent=4)
        
        return jsonify({
            'success': True,
            'message': 'Successfully logged in and saved cookies'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/cookies/status', methods=['GET'])
def cookies_status():
    """Check if cookies file exists"""
    return jsonify({
        'has_cookies': os.path.exists(COOKIES_FILE)
    })

@app.route('/api/scrape-video', methods=['POST'])
def scrape_video():
    """Scrape Pinterest video URL and return video information using yt-dlp"""
    try:
        data = request.json
        url = data.get('url')
        num = int(data.get('num', 1))
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        # Normalize URL
        url = normalize_url(url)
        
        # Configure yt-dlp options
        ydl_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
        }
        
        videos = []
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            try:
                info = ydl.extract_info(url, download=False)
                
                if info:
                    # Extract video information
                    video_data = {
                        'id': info.get('id', ''),
                        'title': info.get('title', 'Pinterest Video'),
                        'description': info.get('description', ''),
                        'thumbnail': info.get('thumbnail', ''),
                        'duration': info.get('duration', 0),
                        'url': url,
                        'formats': []
                    }
                    
                    # Get available formats
                    formats = info.get('formats', [])
                    seen_resolutions = set()
                    
                    for fmt in formats:
                        if fmt.get('vcodec') != 'none':  # Only video formats
                            height = fmt.get('height', 0)
                            width = fmt.get('width', 0)
                            format_id = fmt.get('format_id', '')
                            ext = fmt.get('ext', 'mp4')
                            filesize = fmt.get('filesize', 0)
                            
                            if height and width:
                                resolution_key = f"{width}x{height}"
                                if resolution_key not in seen_resolutions:
                                    seen_resolutions.add(resolution_key)
                                    video_data['formats'].append({
                                        'format_id': format_id,
                                        'ext': ext,
                                        'width': width,
                                        'height': height,
                                        'filesize': filesize,
                                        'resolution': resolution_key,
                                        'quality': f"{height}p"
                                    })
                    
                    # Sort formats by height (quality) descending
                    video_data['formats'].sort(key=lambda x: x['height'], reverse=True)
                    
                    videos.append(video_data)
            
            except Exception as e:
                return jsonify({'error': f'Failed to extract video info: {str(e)}'}), 500
        
        return jsonify({
            'success': True,
            'count': len(videos),
            'media': videos
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/download-video', methods=['POST'])
def download_video():
    """Download Pinterest video using yt-dlp"""
    try:
        data = request.json
        url = data.get('url')
        format_id = data.get('format_id', 'best')
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        # Normalize URL
        url = normalize_url(url)
        
        # Create unique filename
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        output_template = os.path.join(DOWNLOAD_FOLDER, f'pinterest_video_{timestamp}.%(ext)s')
        
        # Configure yt-dlp options
        ydl_opts = {
            'format': format_id if format_id != 'best' else 'best',
            'outtmpl': output_template,
            'quiet': True,
            'no_warnings': True,
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            try:
                info = ydl.extract_info(url, download=True)
                
                # Get the actual downloaded filename
                downloaded_file = ydl.prepare_filename(info)
                
                if os.path.exists(downloaded_file):
                    filename = os.path.basename(downloaded_file)
                    
                    return jsonify({
                        'success': True,
                        'download_url': f'/api/download-video-file/{filename}',
                        'filename': filename
                    })
                else:
                    return jsonify({'error': 'Download failed'}), 500
                    
            except Exception as e:
                return jsonify({'error': f'Failed to download video: {str(e)}'}), 500
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/download-video-file/<filename>', methods=['GET'])
def download_video_file(filename):
    """Serve downloaded video file"""
    try:
        file_path = os.path.join(DOWNLOAD_FOLDER, secure_filename(filename))
        if os.path.exists(file_path):
            # Determine MIME type
            mime_types = {
                '.mp4': 'video/mp4',
                '.webm': 'video/webm',
                '.mkv': 'video/x-matroska',
                '.mov': 'video/quicktime',
                '.avi': 'video/x-msvideo'
            }
            
            file_ext = os.path.splitext(filename)[1].lower()
            mimetype = mime_types.get(file_ext, 'video/mp4')
            
            def cleanup_after_send():
                try:
                    os.remove(file_path)
                except:
                    pass
            
            # Schedule file cleanup after sending
            import threading
            threading.Timer(5.0, cleanup_after_send).start()
            
            response = send_file(file_path, as_attachment=True, download_name=filename, mimetype=mimetype)
            response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
            return response
        else:
            return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
