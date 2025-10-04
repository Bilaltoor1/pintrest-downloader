from typing import Dict, List

import yt_dlp

from .media_downloader import download_with_audio_merge


def scrape_tiktok_metadata(url: str) -> Dict[str, List[Dict]]:
    """Scrape TikTok video metadata using yt-dlp."""
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'extract_flat': False,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)

    formats: List[Dict] = []
    for fmt in info.get('formats', []):
        if fmt.get('vcodec') != 'none':
            formats.append({
                'format_id': fmt.get('format_id', ''),
                'quality': fmt.get('format_note', 'unknown'),
                'width': fmt.get('width', 0),
                'height': fmt.get('height', 0),
                'filesize': fmt.get('filesize', 0),
                'ext': fmt.get('ext', 'mp4'),
            })

    formats.sort(key=lambda x: x['height'], reverse=True)

    media = [{
        'title': info.get('title', 'TikTok Video'),
        'thumbnail': info.get('thumbnail', ''),
        'duration': info.get('duration', 0),
        'formats': formats,
    }]

    return {
        'count': 1,
        'media': media,
    }


def download_tiktok_video(url: str, format_id: str, download_folder: str) -> Dict:
    """Download a TikTok video, merging audio when available."""
    return download_with_audio_merge(url, format_id, 'tiktok', download_folder)
