# Mobile Video Downloader App

A powerful React Native mobile application for downloading videos and audio from multiple platforms, inspired by VidMate and Snaptube.

## Features

- 📱 **Multi-Platform Support**: Download from YouTube, Instagram, TikTok, Twitter/X, Facebook, Dailymotion, Pinterest, Vimeo, and more
- 🎬 **Video Downloads**: Multiple quality options (Best, 720p, 480p, 360p)
- 🎵 **Audio Extraction**: Extract and download audio in MP3 format with quality selection
- 📊 **Metadata Display**: View video title, thumbnail, duration, views, and uploader info
- 🎨 **Modern UI**: Clean, intuitive interface with Material Design principles
- ⚡ **Fast Downloads**: Powered by yt-dlp backend for reliable downloads
- 📱 **Cross-Platform**: Works on Android and iOS

## Tech Stack

### Frontend (Mobile App)
- **React Native** with Expo
- **Expo Router** for navigation
- **Axios** for API calls
- **Expo AV** for media playback
- **Expo File System** for file management

### Backend API
- **Flask** (Python) REST API
- **yt-dlp** for video downloads
- **FFmpeg** for audio extraction and merging
- **CORS** enabled for mobile access

## Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- FFmpeg installed on backend server
- Expo CLI: `npm install -g expo-cli`
- Android Studio (for Android) or Xcode (for iOS)

## Installation

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend-mobile
```

2. Create virtual environment:
```bash
python -m venv venv
```

3. Activate virtual environment:
- Windows: `venv\\Scripts\\activate`
- Mac/Linux: `source venv/bin/activate`

4. Install Python dependencies:
```bash
pip install -r requirements.txt
```

5. Install FFmpeg:
- **Windows**: Download from https://ffmpeg.org/download.html and add to PATH
- **Mac**: `brew install ffmpeg`
- **Linux**: `sudo apt install ffmpeg`

6. Start the backend server:
```bash
python app.py
```

The API will run on `http://0.0.0.0:5001`

### Mobile App Setup

1. Navigate to app directory:
```bash
cd react-downloader-app
```

2. Install dependencies:
```bash
npm install
```

3. Update API URL in `utils/apiClient.js`:
```javascript
const API_BASE_URL = 'http://YOUR_COMPUTER_IP:5001/api';
```
Replace `YOUR_COMPUTER_IP` with your actual IP address (e.g., `192.168.1.103`)

4. Start Expo development server:
```bash
npx expo start
```

5. Run on device:
- Scan QR code with Expo Go app (Android/iOS)
- Or press `a` for Android emulator
- Or press `i` for iOS simulator

## Configuration

### Backend Configuration

Edit `backend-mobile/app.py`:

```python
# Change port
app.run(debug=True, host='0.0.0.0', port=5001)

# Configure CORS (restrict in production)
CORS(app, resources={
    r"/api/*": {
        "origins": "*",  # Change to specific origins
        ...
    }
})
```

### Mobile App Configuration

Edit `react-downloader-app/utils/apiClient.js`:

```javascript
const API_BASE_URL = 'http://192.168.1.103:5001/api';
const TIMEOUT = 30000; // Request timeout in ms
```

## Usage

1. **Start Backend**: Run `python app.py` in `backend-mobile/`
2. **Start Mobile App**: Run `npx expo start` in `react-downloader-app/`
3. **Open App**: Scan QR code or use emulator
4. **Paste URL**: Copy video URL from any supported platform
5. **Fetch Info**: Tap search button to load video metadata
6. **Select Type**: Choose Video or Audio
7. **Download**: Select quality and download

## Supported Platforms

| Platform | Video | Audio | Notes |
|----------|-------|-------|-------|
| YouTube | ✅ | ✅ | Multiple qualities |
| Instagram | ✅ | ✅ | Posts, Reels, IGTV |
| TikTok | ✅ | ✅ | No watermark option |
| Twitter/X | ✅ | ✅ | Videos and GIFs |
| Facebook | ✅ | ✅ | Public videos |
| Dailymotion | ✅ | ✅ | HD support |
| Pinterest | ✅ | ✅ | Video pins |
| Vimeo | ✅ | ✅ | HD/4K support |

## API Endpoints

### Health Check
```http
GET /api/health
```

### Detect Platform
```http
POST /api/detect-platform
Content-Type: application/json

{
  "url": "https://youtube.com/watch?v=..."
}
```

### Fetch Metadata
```http
POST /api/fetch-metadata
Content-Type: application/json

{
  "url": "https://youtube.com/watch?v=..."
}
```

### Download Video
```http
POST /api/download-video
Content-Type: application/json

{
  "url": "https://youtube.com/watch?v=...",
  "quality": "best|720|480|360",
  "format_id": "optional"
}
```

### Download Audio
```http
POST /api/download-audio
Content-Type: application/json

{
  "url": "https://youtube.com/watch?v=...",
  "quality": "best|high|medium|low"
}
```

## Project Structure

```
├── backend-mobile/
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt       # Python dependencies
│   ├── services/
│   │   ├── video_service.py   # Video download service
│   │   ├── audio_service.py   # Audio download service
│   │   └── platform_detector.py # URL platform detection
│   └── downloads/             # Downloaded files
│
├── react-downloader-app/
│   ├── app/                   # Expo Router pages
│   ├── components/
│   │   └── HomeScreen.js      # Main download screen
│   ├── utils/
│   │   └── apiClient.js       # API client configuration
│   └── package.json           # NPM dependencies
```

## Troubleshooting

### Backend Issues

**FFmpeg not found:**
```bash
# Check if FFmpeg is installed
ffmpeg -version

# Install if missing (see Installation section)
```

**Port already in use:**
```bash
# Change port in app.py
app.run(port=5002)  # Use different port
```

### Mobile App Issues

**Cannot connect to backend:**
1. Ensure backend is running
2. Check firewall settings (allow port 5001)
3. Verify IP address in `apiClient.js`
4. Make sure phone and computer are on same network

**Downloads not working:**
1. Check backend logs for errors
2. Verify FFmpeg is installed
3. Check disk space on backend server

## Building for Production

### Android APK
```bash
cd react-downloader-app
npx expo build:android
```

### iOS IPA
```bash
cd react-downloader-app
npx expo build:ios
```

## License

MIT License

## Credits

- Built with [React Native](https://reactnative.dev/) and [Expo](https://expo.dev/)
- Powered by [yt-dlp](https://github.com/yt-dlp/yt-dlp)
- Inspired by VidMate and Snaptube

## Support

For issues and questions, please open an issue on GitHub.

## Roadmap

- [ ] Download queue management
- [ ] Download history and favorites
- [ ] Built-in media player
- [ ] Batch downloads
- [ ] Playlist support
- [ ] Dark mode
- [ ] Download progress notifications
- [ ] Share downloaded files
- [ ] Multiple language support
