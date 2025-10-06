import os
from datetime import datetime
from typing import Dict, Any, Optional
import yt_dlp


class VideoDownloadService:
    """Service for downloading videos from various platforms"""
    
    def __init__(self, download_folder: str):
        self.download_folder = download_folder
    
    def fetch_metadata(self, url: str, platform: str) -> Dict[str, Any]:
        """Fetch video metadata"""
        ydl_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            # Extract formats
            video_formats = []
            audio_formats = []
            
            for fmt in info.get('formats', []):
                vcodec = fmt.get('vcodec', 'none')
                acodec = fmt.get('acodec', 'none')
                
                if vcodec != 'none':
                    video_formats.append({
                        'format_id': fmt.get('format_id'),
                        'quality': fmt.get('format_note', 'unknown'),
                        'width': fmt.get('width', 0),
                        'height': fmt.get('height', 0),
                        'filesize': fmt.get('filesize', 0),
                        'ext': fmt.get('ext', 'mp4'),
                        'fps': fmt.get('fps'),
                        'has_audio': acodec != 'none'
                    })
                
                if acodec != 'none' and vcodec == 'none':
                    audio_formats.append({
                        'format_id': fmt.get('format_id'),
                        'bitrate': fmt.get('abr'),
                        'filesize': fmt.get('filesize', 0),
                        'ext': fmt.get('ext', 'mp3')
                    })
            
            # Sort by quality
            video_formats.sort(key=lambda x: x['height'], reverse=True)
            audio_formats.sort(key=lambda x: x.get('bitrate', 0), reverse=True)
            
            return {
                'title': info.get('title', 'Unknown'),
                'thumbnail': info.get('thumbnail', ''),
                'duration': info.get('duration', 0),
                'uploader': info.get('uploader', 'Unknown'),
                'upload_date': info.get('upload_date'),
                'view_count': info.get('view_count', 0),
                'like_count': info.get('like_count', 0),
                'description': info.get('description', ''),
                'video_formats': video_formats[:10],  # Top 10 qualities
                'audio_formats': audio_formats[:5],   # Top 5 audio qualities
            }
    
    def get_available_qualities(self, url: str, platform: str) -> list:
        """Get available quality options"""
        metadata = self.fetch_metadata(url, platform)
        
        qualities = []
        for fmt in metadata['video_formats']:
            if fmt['height'] > 0:
                qualities.append({
                    'label': f"{fmt['height']}p",
                    'format_id': fmt['format_id'],
                    'height': fmt['height'],
                    'has_audio': fmt['has_audio']
                })
        
        # Add preset quality options
        presets = [
            {'label': 'Best Quality', 'value': 'best'},
            {'label': 'High (720p)', 'value': '720'},
            {'label': 'Medium (480p)', 'value': '480'},
            {'label': 'Low (360p)', 'value': '360'},
        ]
        
        return {
            'presets': presets,
            'formats': qualities
        }
    
    def download(
        self,
        url: str,
        platform: str,
        quality: str = 'best',
        format_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """Download video"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        output_template = os.path.join(
            self.download_folder,
            f'{platform}_{timestamp}.%(ext)s'
        )
        
        # Determine format selector
        if format_id:
            format_selector = f'{format_id}+bestaudio/best'
        elif quality == 'best':
            format_selector = 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'
        else:
            # Map quality to height
            format_selector = f'bestvideo[height<={quality}][ext=mp4]+bestaudio[ext=m4a]/best[height<={quality}][ext=mp4]/best'
        
        ydl_opts = {
            'format': format_selector,
            'outtmpl': output_template,
            'quiet': False,
            'no_warnings': False,
            'merge_output_format': 'mp4',
            'postprocessors': [{
                'key': 'FFmpegVideoConvertor',
                'preferedformat': 'mp4',
            }],
            'prefer_ffmpeg': True,
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            filename = os.path.basename(ydl.prepare_filename(info))
            
            return {
                'filename': filename,
                'filesize': info.get('filesize') or info.get('filesize_approx', 0),
                'format': info.get('ext', 'mp4'),
                'quality': f"{info.get('height', 'unknown')}p",
                'title': info.get('title', 'Unknown')
            }
