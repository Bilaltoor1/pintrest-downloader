import os
from datetime import datetime
from typing import Any, Dict, List, Optional

import yt_dlp


def _collect_formats(info: Dict[str, Any]) -> Dict[str, Any]:
    formats: Dict[str, Any] = {}
    for fmt in info.get('formats', []) or []:
        fmt_id = fmt.get('format_id')
        if fmt_id:
            formats[fmt_id] = fmt
    return formats


def _progressive_formats(formats: Dict[str, Any]) -> List[Dict[str, Any]]:
    progressive: List[Dict[str, Any]] = []
    for fmt in formats.values():
        vcodec = (fmt.get('vcodec') or '').lower()
        acodec = (fmt.get('acodec') or '').lower()
        if vcodec not in {'', 'none'} and acodec not in {'', 'none'}:
            progressive.append(fmt)
    progressive.sort(
        key=lambda f: (
            f.get('height') or 0,
            f.get('tbr') or 0,
        )
    )
    return progressive


def _has_audio(info: Optional[Dict[str, Any]]) -> bool:
    if not info:
        return False

    requested = info.get('requested_formats') or info.get('requested_downloads')
    entries = requested if requested else [info]

    for fmt in entries:
        acodec = (fmt.get('acodec') or '').lower()
        if acodec not in {'', 'none', 'n/a'}:
            return True

    return False


def _cleanup_outputs(download_folder: str, filename_prefix: str, timestamp: str) -> None:
    prefix = f'{filename_prefix}_{timestamp}'
    try:
        for name in os.listdir(download_folder):
            if name.startswith(prefix):
                try:
                    os.remove(os.path.join(download_folder, name))
                except OSError:
                    pass
    except FileNotFoundError:
        pass


def download_with_audio_merge(
    url: str,
    format_id: str,
    filename_prefix: str,
    download_folder: str,
) -> Dict[str, Any]:
    """Download a video with audio ensured using yt-dlp.

    Strategy:
    1. Try the requested format (or "best") directly. If the file already
       contains audio, return it immediately.
    2. If audio is missing or the format isn't available, fall back to merging
       best video and audio streams with FFmpeg.
    3. If FFmpeg fails, deliver the best progressive stream with audio.
    """

    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    output_template = os.path.join(
        download_folder,
        f'{filename_prefix}_{timestamp}.%(ext)s'
    )

    audio_merged = False
    warning_message: Optional[str] = None
    downloaded_file: Optional[str] = None
    download_info: Optional[Dict[str, Any]] = None

    metadata_info: Optional[Dict[str, Any]] = None
    formats: Dict[str, Any] = {}
    progressive_formats: List[Dict[str, Any]] = []

    metadata_opts = {
        'quiet': True,
        'no_warnings': True,
        'noplaylist': True,
    }

    try:
        with yt_dlp.YoutubeDL(metadata_opts) as ydl_metadata:
            metadata_info = ydl_metadata.extract_info(url, download=False)
            formats = _collect_formats(metadata_info)
            progressive_formats = _progressive_formats(formats)
    except Exception:
        metadata_info = None
        formats = {}
        progressive_formats = []

    direct_format = 'best' if format_id == 'best' else format_id
    direct_opts = {
        'format': direct_format,
        'outtmpl': output_template,
        'quiet': False,
        'no_warnings': False,
        'noplaylist': True,
    }

    direct_info: Optional[Dict[str, Any]] = None
    direct_error: Optional[Exception] = None

    try:
        with yt_dlp.YoutubeDL(direct_opts) as ydl_direct:
            direct_info = ydl_direct.extract_info(url, download=True)
            downloaded_file = ydl_direct.prepare_filename(direct_info)
        download_info = direct_info
    except Exception as exc:
        direct_error = exc
        downloaded_file = None

    if download_info and downloaded_file and _has_audio(download_info):
        audio_merged = True
    else:
        if downloaded_file and os.path.exists(downloaded_file):
            warning_message = (
                'Initial format lacked audio; attempting to merge best audio stream.'
            )
            try:
                os.remove(downloaded_file)
            except OSError:
                pass
            downloaded_file = None

        merge_selectors: List[str] = []
        if format_id != 'best' and format_id in formats:
            merge_selectors.append(f'{format_id}+bestaudio/best')
        merge_selectors.extend([
            'bestvideo[ext=mp4]+bestaudio[ext=m4a]',
            'bestvideo+bestaudio',
            'best'
        ])
        merge_selector = '/'.join(merge_selectors)

        merge_opts = {
            'format': merge_selector,
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
            'noplaylist': True,
        }

        _cleanup_outputs(download_folder, filename_prefix, timestamp)

        try:
            with yt_dlp.YoutubeDL(merge_opts) as ydl_merge:
                download_info = ydl_merge.extract_info(url, download=True)
                downloaded_file = ydl_merge.prepare_filename(download_info)
            audio_merged = _has_audio(download_info)
            if not audio_merged:
                warning_message = (
                    warning_message
                    or 'FFmpeg merge completed but audio track could not be verified.'
                )
        except Exception:
            fallback_warning = (
                'Preferred format unavailable; delivering best available progressive stream with audio.'
            )
            warning_message = warning_message or fallback_warning

            _cleanup_outputs(download_folder, filename_prefix, timestamp)

            fallback_format_id: Optional[str] = None
            if progressive_formats:
                fallback_format_id = progressive_formats[-1].get('format_id')

            fallback_format = fallback_format_id or 'best[ext=mp4]/best'

            fallback_opts = {
                'format': fallback_format,
                'outtmpl': output_template,
                'quiet': False,
                'no_warnings': False,
                'noplaylist': True,
            }

            try:
                with yt_dlp.YoutubeDL(fallback_opts) as ydl_fallback:
                    download_info = ydl_fallback.extract_info(url, download=True)
                    downloaded_file = ydl_fallback.prepare_filename(download_info)
            except Exception as fallback_error:
                raise FileNotFoundError(f'Download failed - no compatible formats available: {str(fallback_error)}')

            audio_merged = _has_audio(download_info)
            if not audio_merged:
                warning_message = (
                    (warning_message + ' ' if warning_message else '')
                    + 'Final download may still lack audio due to source limitations.'
                )

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
        'info': download_info or metadata_info,
        'direct_error': str(direct_error) if direct_error else None,
    }
