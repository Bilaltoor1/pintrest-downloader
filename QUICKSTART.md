# ⚡ SUPER QUICK START

Copy-paste these commands on your VPS (as root):

```bash
# 1. Go to project
cd /root/pintrest-downloader

# 2. Deploy everything
chmod +x deploy/simple-deploy.sh && ./deploy/simple-deploy.sh

# 3. Setup SSL (answer prompts)
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yttmp3.com -d www.yttmp3.com
```

**Done!** Visit https://yttmp3.com 🎉

---

## Already deployed? Quick commands:

```bash
cd /root/pintrest-downloader

# View logs
docker compose logs -f

# Restart
docker compose restart

# Update code and redeploy
git pull
docker compose build --no-cache
docker compose up -d
```

---

See **SIMPLE_DEPLOY.md** for full documentation.
