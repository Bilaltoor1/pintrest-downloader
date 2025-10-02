# 🚀 Simple Deployment Guide (Root User + Docker Already Installed)

## Prerequisites
- ✅ Ubuntu VPS with root access
- ✅ Docker already installed
- ✅ Domain: yttmp3.com pointing to your server IP

## Quick Deploy (3 Commands)

### 1. Navigate to your project
```bash
cd /root/pintrest-downloader
```

### 2. Run deployment script
```bash
chmod +x deploy/simple-deploy.sh
./deploy/simple-deploy.sh
```

### 3. Setup SSL (optional but recommended)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yttmp3.com -d www.yttmp3.com
```

## That's It! 🎉

Your site should now be accessible at:
- **HTTP**: http://yttmp3.com (before SSL)
- **HTTPS**: https://yttmp3.com (after SSL)

---

## What the Script Does

1. **Builds Docker containers**
   - Backend: Flask + Gunicorn
   - Frontend: React + Nginx

2. **Starts containers**
   - Backend on internal port 5000
   - Frontend on port 8080

3. **Configures Nginx**
   - Copies config to `/etc/nginx/sites-available/`
   - Proxies traffic from port 80/443 → 8080

4. **Sets up firewall**
   - Opens ports for HTTP/HTTPS

---

## Useful Commands

### Check container status
```bash
cd /root/pintrest-downloader
docker compose ps
```

### View logs
```bash
docker compose logs -f              # All logs
docker compose logs -f backend      # Backend only
docker compose logs -f web          # Frontend only
```

### Restart containers
```bash
docker compose restart
```

### Stop containers
```bash
docker compose down
```

### Rebuild after code changes
```bash
docker compose build --no-cache
docker compose up -d
```

### Check Nginx status
```bash
systemctl status nginx
nginx -t
```

### View Nginx logs
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

---

## File Structure

```
/root/pintrest-downloader/
├── docker-compose.yml          ← Container orchestration
├── backend/
│   ├── Dockerfile              ← Backend container config
│   ├── app.py                  ← Flask app
│   └── requirements.txt        ← Python dependencies
├── frontend/
│   ├── Dockerfile              ← Frontend container config
│   ├── nginx/
│   │   └── default.conf        ← Internal nginx config
│   └── src/                    ← React app
└── deploy/
    ├── simple-deploy.sh        ← Main deployment script
    └── nginx/
        └── yttmp3.com.conf     ← Host nginx config
```

```
/etc/nginx/sites-available/
└── yttmp3.com.conf             ← Nginx site config (symlinked)
```

---

## Troubleshooting

### Containers won't start
```bash
docker compose logs backend
docker compose logs web
```

### Port 8080 already in use
```bash
netstat -tulpn | grep 8080
# Kill the process or change port in docker-compose.yml
```

### Nginx errors
```bash
nginx -t
systemctl restart nginx
tail -f /var/log/nginx/error.log
```

### Site not accessible
```bash
# Check containers
docker compose ps

# Check nginx
systemctl status nginx

# Check firewall
ufw status

# Test locally
curl http://localhost:8080
```

### SSL certificate issues
```bash
# Check certificate
certbot certificates

# Renew manually
certbot renew

# Check nginx SSL config
nginx -t
```

---

## SSL Setup Details

After running certbot, it will:
1. Automatically create SSL certificates
2. Modify `/etc/nginx/sites-available/yttmp3.com.conf`
3. Add HTTPS server block
4. Set up auto-renewal

Or manually uncomment the HTTPS block in the nginx config.

---

## Redeploy After Code Changes

```bash
cd /root/pintrest-downloader
git pull origin main
docker compose build --no-cache
docker compose up -d
```

---

## Clean Up

### Remove containers
```bash
docker compose down
```

### Remove images
```bash
docker rmi yttmp3-backend:latest yttmp3-frontend:latest
```

### Remove all unused Docker resources
```bash
docker system prune -a -f
```

---

## Architecture

```
Internet
    ↓
DNS (yttmp3.com → Your IP)
    ↓
Host Nginx (:80/:443)
    ↓
Docker Container: Frontend (:8080)
    ├─→ Static React Files
    └─→ /api/* → Backend Container (:5000)
              └─→ Flask + pinterest-dl
```

---

## Quick Reference

| Task | Command |
|------|---------|
| **Deploy** | `./deploy/simple-deploy.sh` |
| **Status** | `docker compose ps` |
| **Logs** | `docker compose logs -f` |
| **Restart** | `docker compose restart` |
| **Stop** | `docker compose down` |
| **Rebuild** | `docker compose build --no-cache && docker compose up -d` |
| **SSL** | `certbot --nginx -d yttmp3.com -d www.yttmp3.com` |

---

That's all you need! Simple and straightforward. 🚀
