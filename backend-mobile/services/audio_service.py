import os
from datetime import datetime
from typing import Dict, Any
import yt_dlp


class AudioDownloadService:
    """Service for downloading/extracting audio"""
    
    def __init__(self, download_folder: str):
        self.download_folder = download_folder
    
    def download(
        self,
        url: str,
        platform: str,
        quality: str = 'best'
    ) -> Dict[str, Any]:
        """Download or extract audio"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        output_template = os.path.join(
            self.download_folder,
            f'{platform}_audio_{timestamp}.%(ext)s'
        )
        
        # Map quality to bitrate
        bitrate_map = {
            'best': '0',
            'high': '320',
            'medium': '192',
            'low': '128'
        }
        
        bitrate = bitrate_map.get(quality, '0')
        
        # Check if FFmpeg is available
        try:
            import subprocess
            subprocess.run(['ffmpeg', '-version'], 
                         capture_output=True, check=True)
            ffmpeg_available = True
        except (subprocess.CalledProcessError, FileNotFoundError):
            ffmpeg_available = False
        
        # Configure yt-dlp options based on FFmpeg availability
        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': output_template,
            'quiet': False,
            'no_warnings': False,
        }
        
        # Only add postprocessor if FFmpeg is available
        if ffmpeg_available:
            ydl_opts['postprocessors'] = [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': bitrate,
            }]
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            
            # Get the actual downloaded filename
            base_filename = ydl.prepare_filename(info)
            
            if ffmpeg_available:
                # Change extension to mp3 for FFmpeg processed files
                filename = os.path.splitext(os.path.basename(base_filename))[0] + '.mp3'
                file_format = 'mp3'
            else:
                # Use the original format (usually webm, m4a, or opus)
                filename = os.path.basename(base_filename)
                file_format = os.path.splitext(filename)[1][1:]  # Get extension without dot
            
            filepath = os.path.join(self.download_folder, filename)
            
            return {
                'filename': filename,
                'filesize': os.path.getsize(filepath) if os.path.exists(filepath) else 0,
                'format': file_format,
                'bitrate': bitrate if bitrate != '0' else 'best',
                'title': info.get('title', 'Unknown')
            }
