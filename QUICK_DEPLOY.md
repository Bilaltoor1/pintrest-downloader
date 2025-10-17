# Quick Deployment Guide

## 🚀 Setup GitHub Actions (One-time setup)

### Option 1: Quick Setup (Recommended)

1. **On your local machine**, run:
```bash
# Generate SSH key
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_actions_deploy -C "github-actions"

# Copy public key to VPS
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub root@YOUR_VPS_IP
```

2. **Add GitHub Secrets**:
   - Go to: https://github.com/Bilaltoor1/pintrest-downloader/settings/secrets/actions
   - Click "New repository secret" and add:

   | Name | Value |
   |------|-------|
   | `VPS_HOST` | Your VPS IP (e.g., `123.45.67.89`) |
   | `VPS_USERNAME` | `root` |
   | `VPS_SSH_KEY` | Content of `~/.ssh/github_actions_deploy` (private key) |
   | `VPS_PORT` | `22` |

3. **Get your private key**:
```bash
cat ~/.ssh/github_actions_deploy
```
Copy everything including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`

4. **Test it**:
```bash
git add .
git commit -m "Setup automated deployment"
git push origin main
```

Watch the deployment at: https://github.com/Bilaltoor1/pintrest-downloader/actions

---

## 📝 Daily Workflow (After Setup)

### Simple: Just Push Your Code!

```bash
# Make your changes
code .

# Commit and push
git add .
git commit -m "Updated footer with social icons"
git push origin main
```

**That's it!** GitHub Actions will automatically:
1. Pull code on VPS
2. Rebuild Docker containers
3. Restart the app

**View deployment**: https://github.com/Bilaltoor1/pintrest-downloader/actions

---

## 🔍 Manual Deploy (If needed)

### From GitHub UI:
1. Go to **Actions** tab
2. Click "Deploy to VPS"
3. Click "Run workflow" → "Run workflow"

### From VPS directly:
```bash
ssh root@YOUR_VPS_IP
cd ~/pintrest-downloader
git pull origin main
docker compose down
docker compose build --no-cache
docker compose up -d
```

---

## ✅ Verify Deployment

Check if it's working:
```bash
# Check containers
ssh root@YOUR_VPS_IP "docker ps"

# Check logs
ssh root@YOUR_VPS_IP "cd ~/pintrest-downloader && docker compose logs --tail=50"
```

Or visit: `http://YOUR_VPS_IP:8080`

---

## 🛠️ Troubleshooting

### Deployment fails with "Permission denied"
```bash
# On VPS, check authorized keys
cat ~/.ssh/authorized_keys
# Should contain your public key
```

### Can't connect to VPS
```bash
# Test SSH connection
ssh -i ~/.ssh/github_actions_deploy root@YOUR_VPS_IP
```

### Containers won't start
```bash
# Check VPS directly
ssh root@YOUR_VPS_IP
cd ~/pintrest-downloader
docker compose logs
```

---

## 📊 Deployment Status

After pushing code, check:
- **GitHub Actions**: https://github.com/Bilaltoor1/pintrest-downloader/actions
- **Live Site**: http://YOUR_VPS_IP:8080
- **API Health**: http://YOUR_VPS_IP:5000/api/health

---

## 🎯 What Gets Deployed

✅ Frontend changes (React/Next.js)
✅ Backend changes (Python/Flask)
✅ Docker configuration updates
✅ Environment changes
✅ All code in `main` branch

**Deployment Time**: ~2-3 minutes

---

## 💡 Tips

- **Test locally first**: Run `docker compose up` locally before pushing
- **Check logs**: Always check Actions tab if deployment fails
- **Rollback**: If needed, revert git commit and push again
- **Manual trigger**: Use Actions tab to redeploy without new commits

---

**Need help?** Check `DEPLOYMENT.md` for detailed documentation.
