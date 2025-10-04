import os
from datetime import datetime
from typing import Dict, Optional

import yt_dlp


def download_pinterest_video(url: str, format_id: str, download_folder: str) -> Dict:
    """Download ONLY the Pinterest video stream (no audio merge attempt).

    Behaviour:
    - If a specific format_id is provided we try it directly.
    - If it fails or is unavailable, we gracefully fall back to best available mp4 video.
    - We do NOT attempt to merge separate audio. If the selected format is video-only,
      the resulting file may have no audio (user explicitly requested video only).
    - Returns metadata similar to other services for consistency.
    """

    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    base_template = os.path.join(download_folder, f'pinterest_video_{timestamp}.%(ext)s')

    # Build primary format selector
    if format_id == 'best':
        primary_format = 'best[ext=mp4]/best'
    else:
        primary_format = format_id

    attempted_formats = [primary_format]
    fallback_selector = 'bestvideo[ext=mp4]/bestvideo/best[ext=mp4]/best'
    if primary_format != fallback_selector:
        attempted_formats.append(fallback_selector)

    last_error: Optional[str] = None
    info = None
    downloaded_file: Optional[str] = None
    used_selector: Optional[str] = None

    for selector in attempted_formats:
        ydl_opts = {
            'format': selector,
            'outtmpl': base_template,
            'quiet': False,
            'no_warnings': False,
            'noplaylist': True,
        }
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                downloaded_file = ydl.prepare_filename(info)
            used_selector = selector
            break
        except Exception as e:  # capture and try fallback
            last_error = str(e)
            continue

    if not downloaded_file or not os.path.exists(downloaded_file):
        raise FileNotFoundError(
            f"Pinterest download failed - no compatible video format. Last error: {last_error}" if last_error else "Pinterest download failed - file not found"
        )

    filename = os.path.basename(downloaded_file)

    # Determine if the chosen format likely has audio (purely heuristic)
    audio_present = False
    if info:
        # If request wasn't a merge, yt-dlp stores single format in info
        acodec = (info.get('acodec') or '').lower()
        if acodec not in {'', 'none', 'n/a'}:
            audio_present = True

    warning: Optional[str] = None
    if not audio_present:
        warning = 'Downloaded video-only stream (no audio track).'  # expected per user request
    elif used_selector and used_selector != primary_format:
        warning = 'Requested format unavailable; delivered best available video.'

    return {
        'file_path': downloaded_file,
        'filename': filename,
        'timestamp': timestamp,
        'audio_merged': False,  # No merge performed
        'warning': warning,
        'info': info,
        'format_used': used_selector,
    }
