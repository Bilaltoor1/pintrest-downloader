# Deployment Guide for yttmp3.com

## Complete Deployment Instructions

### Prerequisites
- Ubuntu 20.04+ VPS
- Domain: yttmp3.com pointing to VPS IP
- Root/sudo access

### Step-by-Step Deployment

#### 1. Install Docker
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker
sudo apt install docker-compose-plugin -y
docker --version
docker compose version
```

#### 2. Clone Repository
```bash
cd /var/www
sudo git clone <your-repo-url> pinterest-downloader
cd pinterest-downloader
sudo chown -R $USER:$USER .
```

#### 3. Deploy Containers
```bash
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

**What this does:**
- Builds backend (Flask + Gunicorn)
- Builds frontend (React + Nginx)
- Starts containers on port 8080

#### 4. Install and Configure Nginx
```bash
sudo apt install nginx -y
sudo cp deploy/nginx/yttmp3.com.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/yttmp3.com.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

#### 5. Setup SSL Certificate
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo mkdir -p /var/www/certbot
sudo certbot --nginx -d yttmp3.com -d www.yttmp3.com
```

Follow certbot prompts:
- Enter email
- Agree to terms
- Choose redirect HTTP to HTTPS

After SSL setup, edit nginx config:
```bash
sudo nano /etc/nginx/sites-available/yttmp3.com.conf
```

Uncomment the SSL server block and comment HTTP redirect if needed.

```bash
sudo nginx -t
sudo systemctl reload nginx
```

#### 6. Configure Firewall
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow 'OpenSSH'
sudo ufw allow 8080/tcp
sudo ufw enable
sudo ufw status
```

#### 7. Verify Deployment
```bash
# Check containers
docker compose ps

# Should show:
# NAME                          STATUS          PORTS
# pinterest-downloader-backend  Up             5000/tcp
# pinterest-downloader-web      Up             0.0.0.0:8080->80/tcp

# Check logs
docker compose logs -f

# Test backend
curl http://localhost:8080/api/health

# Test from outside
curl https://yttmp3.com
```

### DNS Configuration

Ensure your domain registrar has these DNS records:

```
Type    Name    Value               TTL
A       @       <your-vps-ip>       3600
A       www     <your-vps-ip>       3600
```

### Maintenance Commands

#### View Logs
```bash
cd /var/www/pinterest-downloader
docker compose logs -f backend
docker compose logs -f web
```

#### Restart Services
```bash
docker compose restart
```

#### Update Code
```bash
git pull origin main
./deploy/deploy.sh
```

#### Stop Services
```bash
docker compose down
```

#### Clean Docker Resources
```bash
docker system prune -a -f
docker volume prune -f
```

### Troubleshooting

#### Containers won't start
```bash
docker compose logs backend
docker compose logs web
docker compose build --no-cache
docker compose up -d
```

#### Nginx errors
```bash
sudo nginx -t
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

#### Port conflicts
```bash
sudo netstat -tulpn | grep 8080
# If something is using 8080, edit docker-compose.yml to use different port
```

#### SSL certificate renewal
```bash
sudo certbot renew --dry-run
# Certbot auto-renews via systemd timer
sudo systemctl status certbot.timer
```

#### Check disk space
```bash
df -h
docker system df
```

### File Structure After Deployment

```
/var/www/pinterest-downloader/
├── backend/
│   ├── app.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── downloads/           # Temporary files
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── nginx/
│   │   └── default.conf
│   └── dist/               # Built files
├── deploy/
│   ├── deploy.sh
│   └── nginx/
│       └── yttmp3.com.conf # Host nginx config
├── docker-compose.yml
└── README.md
```

```
/etc/nginx/sites-available/
└── yttmp3.com.conf         # Symlinked to sites-enabled/
```

### Environment Variables (Optional)

Edit `docker-compose.yml` to add:

```yaml
services:
  backend:
    environment:
      FLASK_ENV: production
      MAX_WORKERS: 4
  web:
    build:
      args:
        VITE_API_URL: https://yttmp3.com
```

Then rebuild:
```bash
docker compose build --no-cache
docker compose up -d
```

### Security Checklist

- [x] SSL certificate installed
- [x] Firewall configured
- [x] Only necessary ports open (80, 443, 22)
- [x] Regular updates: `sudo apt update && sudo apt upgrade`
- [x] Docker containers run as non-root (handled by images)
- [x] Nginx rate limiting (optional, add to nginx config)

### Monitoring

#### System Resources
```bash
docker stats
htop
```

#### Nginx Access Logs
```bash
sudo tail -f /var/log/nginx/access.log
```

#### Application Logs
```bash
docker compose logs -f --tail=100
```

### Backup

#### Backup downloads folder
```bash
docker cp pinterest-downloader-backend-1:/app/downloads ./backup-$(date +%Y%m%d)
```

#### Backup cookies (if logged in)
```bash
docker cp pinterest-downloader-backend-1:/app/cookies.json ./cookies-backup.json
```

### Performance Tuning

#### Adjust Gunicorn Workers
Edit `backend/Dockerfile`:
```dockerfile
CMD ["gunicorn", "--workers", "4", "--bind", "0.0.0.0:5000", "app:app"]
```

Workers = (2 × CPU cores) + 1

#### Nginx Caching
Add to `/etc/nginx/sites-available/yttmp3.com.conf`:
```nginx
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g inactive=60m;

location /api/ {
    proxy_cache my_cache;
    proxy_cache_valid 200 5m;
    # ... rest of config
}
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Deploy | `./deploy/deploy.sh` |
| Status | `docker compose ps` |
| Logs | `docker compose logs -f` |
| Restart | `docker compose restart` |
| Stop | `docker compose down` |
| Update | `git pull && ./deploy/deploy.sh` |
| SSL Renew | `sudo certbot renew` |

**Application URL:** https://yttmp3.com
**Port Mapping:** Host Nginx (80/443) → Container Nginx (8080) → Backend (5000)
