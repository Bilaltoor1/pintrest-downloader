# 🚀 One-Click Deployment for yttmp3.com

## Prerequisites
- ✅ Ubuntu VPS with root access
- ✅ Docker installed
- ✅ Domain yttmp3.com pointing to your server IP
- ✅ Project files uploaded to server

## 🎯 Super Simple Deployment

### 1. Upload Files to Server
```bash
# On your VPS, clone or upload the project to:
/root/pintrest-downloader/
```

### 2. Run Single Command
```bash
cd /root/pintrest-downloader
chmod +x deploy/complete-deploy.sh
./deploy/complete-deploy.sh
```

**That's it!** ✨

The script will:
- ✅ Build Docker containers (Backend + Next.js Frontend)
- ✅ Start services
- ✅ Configure Nginx
- ✅ Setup firewall
- ✅ Install SSL certificate
- ✅ Configure everything automatically

## 🌐 Your Site Will Be Live At:
- **https://yttmp3.com**
- **https://www.yttmp3.com**

---

## 📋 Manual Commands (if needed)

### Check Status
```bash
cd /root/pintrest-downloader

# Container status
docker compose ps

# View logs
docker compose logs -f

# Nginx status
systemctl status nginx

# Test site
curl https://yttmp3.com
```

### Restart Services
```bash
# Restart containers
docker compose restart

# Restart nginx
systemctl restart nginx
```

### Update Code
```bash
cd /root/pintrest-downloader
git pull origin main
docker compose build --no-cache
docker compose up -d
```

### SSL Certificate Management
```bash
# Check certificates
certbot certificates

# Renew manually
certbot renew

# Test renewal
certbot renew --dry-run
```

---

## 🔧 Troubleshooting

### Containers won't start
```bash
docker compose logs backend
docker compose logs frontend
```

### Site not accessible
```bash
# Check if containers are running
docker compose ps

# Check nginx
nginx -t
systemctl status nginx

# Check firewall
ufw status
```

### SSL issues
```bash
# Manual SSL setup
certbot --nginx -d yttmp3.com -d www.yttmp3.com
```

---

## 📁 Project Structure
```
/root/pintrest-downloader/
├── docker-compose.yml          # Container orchestration
├── backend/
│   ├── Dockerfile             # Backend container
│   ├── app.py                 # Flask application
│   ├── requirements.txt       # Python dependencies
│   └── downloads/             # Download storage
├── frontend-nextjs/
│   ├── Dockerfile             # Next.js container
│   ├── app/                   # Next.js App Router
│   ├── components/            # React components
│   └── utils/                 # Helper functions
└── deploy/
    └── complete-deploy.sh     # Deployment script
```

---

## 🎯 Architecture

```
Internet
    ↓
yttmp3.com (DNS)
    ↓
Server Nginx (:80/:443) + SSL
    ↓
Docker Next.js Container (:8080→3000)
    ├─ Next.js 15 App (React 19)
    └─ Internal API proxy → Backend Container (:5000)
                           └─ Flask + pinterest-dl
```

---

## ⚡ Quick Commands Reference

| Action | Command |
|--------|---------|
| **Deploy** | `./deploy/complete-deploy.sh` |
| **Status** | `docker compose ps` |
| **Logs** | `docker compose logs -f` |
| **Restart** | `docker compose restart` |
| **Update** | `git pull && docker compose build --no-cache && docker compose up -d` |
| **SSL Renew** | `certbot renew` |

---

## ✅ Success Indicators

After deployment, you should see:
- ✅ 2 Docker containers running (backend + frontend)
- ✅ Nginx serving on ports 80/443
- ✅ SSL certificate installed
- ✅ Site accessible at https://yttmp3.com
- ✅ Pinterest downloads working

---

**Need help?** Check the deployment script output or container logs for any errors.

🎉 **Enjoy your Pinterest Downloader!**