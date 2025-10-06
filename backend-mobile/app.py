from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import json
from datetime import datetime
from werkzeug.utils import secure_filename

from services.video_service import VideoDownloadService
from services.audio_service import AudioDownloadService
from services.platform_detector import PlatformDetector

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Configuration
DOWNLOAD_FOLDER = 'downloads'
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

# Initialize services
video_service = VideoDownloadService(DOWNLOAD_FOLDER)
audio_service = AudioDownloadService(DOWNLOAD_FOLDER)
platform_detector = PlatformDetector()


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'message': 'Mobile Video Downloader API is running',
        'version': '1.0.0'
    })


@app.route('/api/detect-platform', methods=['POST'])
def detect_platform():
    """Detect platform from URL"""
    try:
        data = request.get_json()
        url = data.get('url', '').strip()
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        platform_info = platform_detector.detect(url)
        
        if not platform_info:
            return jsonify({'error': 'Unsupported URL or platform'}), 400
        
        return jsonify(platform_info)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/fetch-metadata', methods=['POST'])
def fetch_metadata():
    """Fetch video/audio metadata from URL"""
    try:
        data = request.get_json()
        url = data.get('url', '').strip()
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        platform_info = platform_detector.detect(url)
        
        if not platform_info:
            return jsonify({'error': 'Unsupported platform'}), 400
        
        metadata = video_service.fetch_metadata(url, platform_info['platform'])
        
        return jsonify({
            'success': True,
            'platform': platform_info['platform'],
            'metadata': metadata
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/download-video', methods=['POST'])
def download_video():
    """Download video"""
    try:
        data = request.get_json()
        url = data.get('url', '').strip()
        quality = data.get('quality', 'best')
        format_id = data.get('format_id')
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        platform_info = platform_detector.detect(url)
        
        if not platform_info:
            return jsonify({'error': 'Unsupported platform'}), 400
        
        result = video_service.download(
            url,
            platform_info['platform'],
            quality=quality,
            format_id=format_id
        )
        
        return jsonify({
            'success': True,
            'download_url': f"/api/serve-file/{result['filename']}",
            'filename': result['filename'],
            'filesize': result.get('filesize'),
            'format': result.get('format'),
            'quality': result.get('quality')
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/download-audio', methods=['POST'])
def download_audio():
    """Download audio/extract audio from video"""
    try:
        data = request.get_json()
        url = data.get('url', '').strip()
        quality = data.get('quality', 'best')
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        platform_info = platform_detector.detect(url)
        
        if not platform_info:
            return jsonify({'error': 'Unsupported platform'}), 400
        
        result = audio_service.download(
            url,
            platform_info['platform'],
            quality=quality
        )
        
        return jsonify({
            'success': True,
            'download_url': f"/api/serve-file/{result['filename']}",
            'filename': result['filename'],
            'filesize': result.get('filesize'),
            'format': result.get('format'),
            'bitrate': result.get('bitrate')
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/serve-file/<filename>', methods=['GET'])
def serve_file(filename):
    """Serve downloaded file"""
    try:
        file_path = os.path.join(DOWNLOAD_FOLDER, secure_filename(filename))
        
        if not os.path.exists(file_path):
            return jsonify({'error': 'File not found'}), 404
        
        # Determine MIME type
        mime_types = {
            '.mp4': 'video/mp4',
            '.webm': 'video/webm',
            '.mp3': 'audio/mpeg',
            '.m4a': 'audio/mp4',
            '.wav': 'audio/wav',
            '.mkv': 'video/x-matroska',
        }
        
        file_ext = os.path.splitext(filename)[1].lower()
        mimetype = mime_types.get(file_ext, 'application/octet-stream')
        
        return send_file(
            file_path,
            mimetype=mimetype,
            as_attachment=False,
            download_name=filename
        )
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/get-qualities', methods=['POST'])
def get_qualities():
    """Get available quality options for a URL"""
    try:
        data = request.get_json()
        url = data.get('url', '').strip()
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        platform_info = platform_detector.detect(url)
        
        if not platform_info:
            return jsonify({'error': 'Unsupported platform'}), 400
        
        qualities = video_service.get_available_qualities(
            url,
            platform_info['platform']
        )
        
        return jsonify({
            'success': True,
            'qualities': qualities
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/supported-platforms', methods=['GET'])
def supported_platforms():
    """Get list of supported platforms"""
    platforms = [
        {
            'name': 'YouTube',
            'id': 'youtube',
            'icon': 'youtube',
            'color': '#FF0000'
        },
        {
            'name': 'Instagram',
            'id': 'instagram',
            'icon': 'instagram',
            'color': '#E1306C'
        },
        {
            'name': 'TikTok',
            'id': 'tiktok',
            'icon': 'musical-notes',
            'color': '#000000'
        },
        {
            'name': 'Twitter/X',
            'id': 'twitter',
            'icon': 'logo-twitter',
            'color': '#1DA1F2'
        },
        {
            'name': 'Facebook',
            'id': 'facebook',
            'icon': 'logo-facebook',
            'color': '#1877F2'
        },
        {
            'name': 'Dailymotion',
            'id': 'dailymotion',
            'icon': 'play-circle',
            'color': '#0066DC'
        },
        {
            'name': 'Pinterest',
            'id': 'pinterest',
            'icon': 'logo-pinterest',
            'color': '#E60023'
        },
        {
            'name': 'Vimeo',
            'id': 'vimeo',
            'icon': 'videocam',
            'color': '#1AB7EA'
        }
    ]
    
    return jsonify({
        'success': True,
        'platforms': platforms
    })


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
