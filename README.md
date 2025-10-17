# 📌 Pinterest Downloader

Modern Pinterest downloader with **Next.js 15 + React 19** frontend and **Flask** backend. Download individual pins or entire boards with ease!

## 🚀 Features

- ✅ **Single Pin Downloads** - Download images/videos in original format
- ✅ **Bulk Downloads** - Download entire boards as ZIP files
- ✅ **Visual Preview** - See 300x300 pin previews before downloading
- ✅ **Pinterest Login** - Access private boards
- ✅ **Individual Downloads** - Download each media item separately
- ✅ **Component-Based** - Clean React component architecture
- ✅ **CSS Modules** - Scoped styling with no conflicts
- ✅ **Production Ready** - Docker deployment included

## 📦 Tech Stack

### Frontend
- **Framework**: Next.js 15.5.4
- **React**: 19.1.0
- **Build Tool**: Turbopack (10x faster than Webpack)
- **Styling**: CSS Modules
- **HTTP Client**: Axios

### Backend
- **Framework**: Flask
- **Pinterest Library**: pinterest-dl
- **Storage**: Local file system
- **API**: RESTful endpoints

## 🏗️ Project Structure

```
pintrest-downloader/
├── backend/                    # Flask API
│   ├── app.py                 # Main application
│   ├── Dockerfile             # Backend container
│   ├── requirements.txt       # Python dependencies
│   └── downloads/             # Downloaded files
├── frontend-nextjs/           # Next.js 15 frontend
│   ├── app/                   # Next.js App Router
│   ├── components/            # React components
│   ├── utils/                 # Helper functions
│   └── Dockerfile             # Frontend container
├── deploy/                    # Deployment scripts
│   ├── complete-deploy.sh     # Full deployment
│   └── migrate-to-nextjs.sh   # Migration script
├── docker-compose.yml         # Container orchestration
└── DEPLOY_GUIDE.md           # Deployment instructions
```

## 🚀 Quick Start

### Development

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
# Runs on http://localhost:5000
```

#### Frontend
```bash
cd frontend-nextjs
npm install
npm run dev
# Runs on http://localhost:3000
```

### Production (Docker)

```bash
# Build and start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

## 🐳 Docker Deployment

The application uses Docker Compose for easy deployment:

```yaml
services:
  backend:  # Flask API on port 5000
  frontend: # Next.js app on port 3000 (exposed as 8080)
```

### Build from scratch
```bash
docker compose build --no-cache
docker compose up -d
```

## 🌐 VPS Deployment (yttmp3.com)

### Prerequisites
- Ubuntu VPS with root access
- Docker installed
- Domain pointing to server IP

### One-Command Deploy
```bash
cd /root/pintrest-downloader
chmod +x deploy/complete-deploy.sh
./deploy/complete-deploy.sh
```

This script will:
- ✅ Build Docker containers
- ✅ Configure Nginx reverse proxy
- ✅ Setup SSL certificate (Let's Encrypt)
- ✅ Configure firewall
- ✅ Start all services

See [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md) for detailed instructions.

## 📋 API Endpoints

### Backend (Flask)
- `POST /api/scrape` - Scrape Pinterest pins
- `POST /api/download` - Bulk download as ZIP
- `POST /api/download-single` - Download single pin
- `POST /api/download-direct` - Direct media download
- `POST /api/login` - Pinterest authentication
- `GET /api/cookies/status` - Check login status

## 🎨 Frontend Components

**8 React Components**:
- `PinterestDownloader` - Main app container
- `Header` - App header
- `Footer` - App footer
- `LoginStatus` - Pinterest login UI
- `Tabs` - Navigation tabs
- `SinglePinTab` - Single pin downloader
- `BulkDownloaderTab` - Bulk downloader
- `MediaTable` - Media preview table

Each component has its own CSS Module for scoped styling.

## ⚙️ Configuration

### Environment Variables

**Backend** (`.env`):
```env
FLASK_ENV=production
```

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For production:
```env
NEXT_PUBLIC_API_URL=/
```

## 🔧 Development

### Adding New Features

1. **Backend**: Add endpoints in `backend/app.py`
2. **Frontend**: Create components in `frontend-nextjs/components/`
3. **Styling**: Add CSS modules (`*.module.css`)
4. **Utilities**: Add helpers in `frontend-nextjs/utils/`

### Testing
```bash
# Backend
cd backend
python -m pytest

# Frontend
cd frontend-nextjs
npm test
```

## 📊 Performance

Next.js 15 improvements:
- **Build Time**: 4x faster with Turbopack
- **Bundle Size**: 43% smaller than React + Vite
- **Dev Server**: 2x faster startup
- **Hot Reload**: 2.5x faster

## 🔍 Troubleshooting

### Containers won't start
```bash
docker compose logs backend
docker compose logs frontend
```

### Frontend shows 502 Bad Gateway
- Check if backend container is running: `docker compose ps`
- Check backend logs: `docker compose logs backend`
- Verify API URL in frontend environment

### Port already in use
```bash
# Stop all containers
docker compose down

# Remove orphaned containers
docker container prune -f
```

## 📚 Documentation

- [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md) - Deployment instructions
- [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - React to Next.js migration
- [FRONTEND_COMPARISON.md](FRONTEND_COMPARISON.md) - Frontend comparison
- [frontend-nextjs/README.md](frontend-nextjs/README.md) - Frontend details

## 🔄 Migration from React

If you're migrating from the old React + Vite version:

```bash
# Pull latest code
git pull origin main

# Run migration script
chmod +x deploy/migrate-to-nextjs.sh
./deploy/migrate-to-nextjs.sh
```

See [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) for details.

## 🤖 Automated Deployment (GitHub Actions)

**NEW!** Automated deployment to VPS whenever you push code:

### Quick Setup (5 minutes)
```bash
# 1. Generate SSH key
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_actions_deploy

# 2. Copy to VPS
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub root@YOUR_VPS_IP

# 3. Add secrets to GitHub
# Go to: Settings → Secrets → Actions
# Add: VPS_HOST, VPS_USERNAME, VPS_SSH_KEY, VPS_PORT
```

### Daily Workflow
```bash
# Make changes
git add .
git commit -m "Updated features"
git push origin main

# GitHub Actions automatically:
# ✅ Pulls code on VPS
# ✅ Rebuilds containers
# ✅ Restarts services
```

**See**: [QUICK_DEPLOY.md](QUICK_DEPLOY.md) for step-by-step guide

## 🎯 Architecture

```
Internet → Nginx (SSL) → Docker Containers
                         ├─ Next.js Frontend (:3000)
                         └─ Flask Backend (:5000)
```

## ⚡ Quick Commands

| Action | Command |
|--------|---------|
| **Start** | `docker compose up -d` |
| **Stop** | `docker compose down` |
| **Logs** | `docker compose logs -f` |
| **Rebuild** | `docker compose build --no-cache` |
| **Status** | `docker compose ps` |
| **Clean** | `docker system prune -af` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source. See LICENSE file for details.

## 🙏 Credits

- **Pinterest Library**: [pinterest-dl](https://github.com/sean1832/pinterest-dl)
- **Framework**: Next.js, Flask
- **Deployment**: Docker, Nginx

## 📞 Support

- **Issues**: GitHub Issues
- **Documentation**: See `/docs` folder
- **Deployment Help**: See `DEPLOY_GUIDE.md`

---

**Built with ❤️ using Next.js 15 + React 19 + Flask**

🎉 **Happy Downloading!**
