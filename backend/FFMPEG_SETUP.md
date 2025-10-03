# FFmpeg Installation Guide

## For Windows (Development)

### Option 1: Using Chocolatey (Recommended)
```powershell
# Install Chocolatey first if not installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install FFmpeg
choco install ffmpeg -y
```

### Option 2: Manual Installation
1. Download FFmpeg from: https://www.gyan.dev/ffmpeg/builds/
2. Download the "ffmpeg-release-essentials.zip" file
3. Extract to a folder (e.g., `C:\ffmpeg`)
4. Add `C:\ffmpeg\bin` to your System PATH:
   - Right-click "This PC" → Properties → Advanced System Settings
   - Click "Environment Variables"
   - Under "System Variables", find "Path" and click Edit
   - Click "New" and add `C:\ffmpeg\bin`
   - Click OK on all dialogs
5. Restart your terminal/PowerShell
6. Verify: `ffmpeg -version`

## For Linux VPS (Ubuntu/Debian)

```bash
# Update package list
sudo apt update

# Install FFmpeg
sudo apt install ffmpeg -y

# Verify installation
ffmpeg -version
```

## For Linux VPS (CentOS/RHEL)

```bash
# Enable EPEL repository
sudo yum install epel-release -y

# Install FFmpeg
sudo yum install ffmpeg ffmpeg-devel -y

# Verify installation
ffmpeg -version
```

## For macOS

```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install FFmpeg
brew install ffmpeg

# Verify installation
ffmpeg -version
```

## Verify Installation

After installation, run:
```bash
ffmpeg -version
```

You should see output showing the FFmpeg version and configuration.

## How It Works with Pinterest Videos

Pinterest videos often have separate streams:
- Video stream (no audio)
- Audio stream (no video)

FFmpeg is used by yt-dlp to:
1. Download both video and audio streams
2. Merge them into a single MP4 file
3. Ensure you get video WITH audio

Without FFmpeg, you would only get video OR audio, but not both together.
