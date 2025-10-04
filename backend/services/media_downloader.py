import os
from datetime import datetime
from typing import Dict, Optional

import yt_dlp


def download_with_audio_merge(
    url: str,
    format_id: str,
    filename_prefix: str,
    download_folder: str,
) -> Dict[str, Optional[str]]:
    """Download a video with audio merged using yt-dlp and FFmpeg.

    Returns a dictionary with keys: file_path, filename, timestamp,
    audio_merged (bool), warning (optional string), info (dict or None).
    """

    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    output_template = os.path.join(
        download_folder,
        f'{filename_prefix}_{timestamp}.%(ext)s'
    )

    audio_merged = False
    warning_message: Optional[str] = None
    downloaded_file: Optional[str] = None
    info = None

    if format_id == 'best':
        format_selector = 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio/best'
    else:
        format_selector = f'{format_id}+bestaudio/best'

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
        'keepvideo': False,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            downloaded_file = ydl.prepare_filename(info)
            audio_merged = True
    except Exception as merge_error:
        error_message = str(merge_error)
        lower_error = error_message.lower()

        if 'ffmpeg' in lower_error or 'merge' in lower_error:
            warning_message = (
                'Audio could not be merged (FFmpeg not available). Downloaded video only.'
            )
            fallback_format = 'bestvideo[ext=mp4]/best[ext=mp4]/best'
        else:
            warning_message = (
                warning_message
                or 'Falling back to direct video download (may already include audio).'
            )
            fallback_format = format_id if format_id != 'best' else 'best[ext=mp4]/best'

        fallback_opts = {
            'format': fallback_format,
            'outtmpl': output_template,
            'quiet': False,
            'no_warnings': False,
        }

        with yt_dlp.YoutubeDL(fallback_opts) as ydl_fallback:
            info = ydl_fallback.extract_info(url, download=True)
            downloaded_file = ydl_fallback.prepare_filename(info)
            audio_merged = False

    if downloaded_file and not os.path.exists(downloaded_file):
        base = os.path.splitext(downloaded_file)[0]
        downloaded_file = base + '.mp4'

    if not downloaded_file or not os.path.exists(downloaded_file):
        base = os.path.join(download_folder, f'{filename_prefix}_{timestamp}')
        for ext in ['.mp4', '.mkv', '.webm']:
            candidate = base + ext
            if os.path.exists(candidate):
                downloaded_file = candidate
                break

    if not downloaded_file or not os.path.exists(downloaded_file):
        raise FileNotFoundError('Download failed - file not found')

    filename = os.path.basename(downloaded_file)

    return {
        'file_path': downloaded_file,
        'filename': filename,
        'timestamp': timestamp,
        'audio_merged': audio_merged,
        'warning': warning_message,
        'info': info,
    }
