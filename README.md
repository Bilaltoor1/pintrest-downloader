# Pinterest Downloader - Full Stack Application

Download images and videos from Pinterest with a React + Vite frontend and Flask backend.

## Features

- 🖼️ **Visual Pin Preview** - See title and 300x300 media before downloading
- 🧭 **Dual Tabs** - Single-pin and Bulk downloader modes
- 📌 **Scrape URLs** - Supports pin.it short links
- ⬇️ **Download Media** - Individual files in original format or bulk ZIP
- 🎬 **Video Support** - MP4 video downloads
- 🔐 **Login Support** - Access private boards
- ⚙️ **Customizable** - Resolution filters, captions, video options

## Quick Start - Docker Deployment

### 1. Install Docker on Ubuntu VPS

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker
sudo apt install docker-compose-plugin -y
```

### 2. Clone and Deploy

```bash
cd /var/www
sudo git clone <your-repo> pinterest-downloader
cd pinterest-downloader
sudo chown -R $USER:$USER .
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

### 3. Setup Nginx (for yttmp3.com)

```bash
sudo apt install nginx -y
sudo cp deploy/nginx/yttmp3.com.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/yttmp3.com.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. SSL Certificate

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo mkdir -p /var/www/certbot
sudo certbot --nginx -d yttmp3.com -d www.yttmp3.com
```

### 5. Firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow 'OpenSSH'
sudo ufw enable
```

## Docker Commands

```bash
# View status
docker compose ps

# View logs
docker compose logs -f

# Restart
docker compose restart

# Rebuild
docker compose build --no-cache
docker compose up -d

# Stop
docker compose down
```

## Architecture

- **Frontend**: React + Vite → Nginx container (port 8080)
- **Backend**: Flask + Gunicorn → Python container (port 5000)
- **Host Nginx**: Reverse proxy → Docker containers
- **SSL**: Let's Encrypt via certbot

## API Endpoints

- `POST /api/scrape` - Preview pin media
- `POST /api/download-single` - Download in original format
- `POST /api/download` - Bulk ZIP download
- `POST /api/download-direct` - Direct media URL download
- `GET /api/health` - Health check

## Usage

**Single Pin:**
1. Paste URL → Fetch Pin → Preview → Download (original format)

**Bulk Download:**
1. Paste board URL → Set quantity → Fetch → Download ZIP

## Troubleshooting

```bash
# Check containers
docker compose ps
docker compose logs backend
docker compose logs web

# Check nginx
sudo nginx -t
sudo systemctl status nginx

# Rebuild if needed
docker compose build --no-cache
docker compose up -d
```

## Credits

Built with [pinterest-dl](https://github.com/sean1832/pinterest-dl)

## License

MIT
