# 🚀 Quick Deployment Commands for yttmp3.com

## One-Line Deploy (Automated)
```bash
curl -fsSL <url-to-setup.sh> | bash
```

## Manual Deploy (5 Commands)
```bash
# 1. Install Docker
curl -fsSL https://get.docker.com | sudo sh && sudo usermod -aG docker $USER && newgrp docker

# 2. Clone & Setup
cd /var/www && sudo git clone <repo-url> pinterest-downloader && cd pinterest-downloader && sudo chown -R $USER:$USER .

# 3. Deploy Containers
chmod +x deploy/deploy.sh && ./deploy/deploy.sh

# 4. Setup Nginx + SSL
sudo apt install nginx certbot python3-certbot-nginx -y && sudo cp deploy/nginx/yttmp3.com.conf /etc/nginx/sites-available/ && sudo ln -s /etc/nginx/sites-available/yttmp3.com.conf /etc/nginx/sites-enabled/ && sudo nginx -t && sudo systemctl restart nginx && sudo certbot --nginx -d yttmp3.com -d www.yttmp3.com

# 5. Firewall
sudo ufw allow 'Nginx Full' && sudo ufw allow 'OpenSSH' && sudo ufw --force enable
```

## Daily Operations

| Task | Command |
|------|---------|
| **Deploy** | `./deploy/deploy.sh` |
| **Status** | `docker compose ps` |
| **Logs** | `docker compose logs -f` |
| **Restart** | `docker compose restart` |
| **Stop** | `docker compose down` |
| **Update** | `git pull && ./deploy/deploy.sh` |
| **Verify** | `./deploy/verify.sh` |

## Troubleshooting One-Liners

```bash
# Container issues
docker compose logs backend --tail=50

# Nginx issues
sudo nginx -t && sudo systemctl status nginx

# Port conflicts
sudo netstat -tulpn | grep -E "(80|443|8080|5000)"

# Disk space
docker system df && df -h

# Full restart
docker compose down && docker compose build --no-cache && docker compose up -d

# Clean everything
docker compose down && docker system prune -a -f && docker volume prune -f
```

## Architecture at a Glance

```
https://yttmp3.com (port 443)
    ↓
Host Nginx (:80/:443)
    ↓
Container Nginx (:8080)
    ├─→ React App (static files)
    └─→ /api/* → Backend (:5000) → Flask + pinterest-dl
```

## File Locations

```
/var/www/pinterest-downloader/          # Application
/etc/nginx/sites-available/yttmp3.com.conf  # Nginx config
/etc/letsencrypt/live/yttmp3.com/       # SSL certificates
/var/log/nginx/                         # Nginx logs
```

## Emergency Commands

```bash
# Site down? Quick restart
sudo systemctl restart nginx && docker compose restart

# Backend not responding?
docker compose restart backend && docker compose logs -f backend

# Out of disk space?
docker system prune -a -f && docker volume prune -f

# SSL expired?
sudo certbot renew --force-renewal && sudo systemctl reload nginx

# Nuclear option (reset everything)
docker compose down
docker system prune -a -f
./deploy/deploy.sh
```

## Health Checks

```bash
# 1. Containers running?
docker compose ps | grep "Up"

# 2. API working?
curl http://localhost:8080/api/health

# 3. Site accessible?
curl -I https://yttmp3.com

# 4. SSL valid?
echo | openssl s_client -connect yttmp3.com:443 2>/dev/null | openssl x509 -noout -dates
```

## Performance Monitoring

```bash
# Container resources
docker stats

# System resources
htop

# Nginx access
sudo tail -f /var/log/nginx/access.log

# Application logs
docker compose logs -f --tail=100
```

## Backup Commands

```bash
# Backup downloads
docker cp pinterest-downloader-backend-1:/app/downloads ./backup-$(date +%Y%m%d)

# Backup cookies
docker cp pinterest-downloader-backend-1:/app/cookies.json ./cookies-backup.json

# Backup config
sudo cp /etc/nginx/sites-available/yttmp3.com.conf ~/nginx-backup-$(date +%Y%m%d).conf
```

---

**Need help?** See `DEPLOYMENT.md` for full guide or `DEPLOYMENT_SUMMARY.md` for overview.
