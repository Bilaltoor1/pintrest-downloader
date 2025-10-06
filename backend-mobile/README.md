# Mobile Video Downloader Backend

Flask-based API for downloading videos and audio from multiple platforms.

## Supported Platforms

- YouTube
- Instagram
- TikTok
- Twitter/X
- Facebook
- Dailymotion
- Pinterest
- Vimeo
- SoundCloud

## Installation

1. Create virtual environment:
```bash
python -m venv venv
```

2. Activate virtual environment:
- Windows: `venv\\Scripts\\activate`
- Mac/Linux: `source venv/bin/activate`

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Install FFmpeg (required for audio extraction and merging):
- Windows: Download from https://ffmpeg.org/download.html
- Mac: `brew install ffmpeg`
- Linux: `sudo apt install ffmpeg`

## Running the Server

```bash
python app.py
```

Server will run on `http://0.0.0.0:5001`

## API Endpoints

### Health Check
```
GET /api/health
```

### Detect Platform
```
POST /api/detect-platform
Body: { "url": "video_url" }
```

### Fetch Metadata
```
POST /api/fetch-metadata
Body: { "url": "video_url" }
```

### Download Video
```
POST /api/download-video
Body: {
  "url": "video_url",
  "quality": "best|720|480|360",
  "format_id": "optional_format_id"
}
```

### Download Audio
```
POST /api/download-audio
Body: {
  "url": "video_url",
  "quality": "best|high|medium|low"
}
```

### Serve File
```
GET /api/serve-file/<filename>
```

### Get Available Qualities
```
POST /api/get-qualities
Body: { "url": "video_url" }
```

### Supported Platforms List
```
GET /api/supported-platforms
```

## Configuration

- Change port in `app.py`: `app.run(port=5001)`
- Downloads folder: `downloads/`
- CORS enabled for all origins (configure in production)

## Notes

- Make sure FFmpeg is installed for audio extraction
- Files are served directly and not deleted automatically
- Configure firewall to allow port 5001 for mobile access
- Use your computer's IP address in mobile app (e.g., `192.168.1.103:5001`)
