from typing import Dict

from .media_downloader import download_with_audio_merge


def download_pinterest_video(url: str, format_id: str, download_folder: str) -> Dict:
    """Download a Pinterest video, merging audio when available."""
    return download_with_audio_merge(url, format_id, 'pinterest_video', download_folder)
