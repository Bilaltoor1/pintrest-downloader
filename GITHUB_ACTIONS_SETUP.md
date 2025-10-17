# 🚀 Complete GitHub Actions Setup Guide

## What You'll Achieve
After this setup, every time you push code to GitHub, it will **automatically deploy** to your VPS. No more manual SSH, git pull, or docker commands!

---

## 📋 Step-by-Step Setup

### Step 1: Generate SSH Key (On Your Local Machine)

Open terminal/PowerShell and run:

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_actions_deploy -C "github-actions"
```

When prompted:
- **Enter passphrase**: Press Enter (leave empty for automation)
- **Enter same passphrase again**: Press Enter

You should see:
```
Your identification has been saved in /Users/YourName/.ssh/github_actions_deploy
Your public key has been saved in /Users/YourName/.ssh/github_actions_deploy.pub
```

---

### Step 2: Copy Public Key to VPS

**Option A: Automatic (Recommended)**
```bash
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub root@YOUR_VPS_IP
```

**Option B: Manual**
```bash
# 1. Display your public key
cat ~/.ssh/github_actions_deploy.pub

# 2. Copy the output (entire line starting with ssh-rsa...)

# 3. SSH to your VPS
ssh root@YOUR_VPS_IP

# 4. Add to authorized keys
echo "PASTE_YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

**Test the connection:**
```bash
ssh -i ~/.ssh/github_actions_deploy root@YOUR_VPS_IP
```
If you can login without password, you're good! ✅

---

### Step 3: Get Your Private Key

Run this command:
```bash
cat ~/.ssh/github_actions_deploy
```

You'll see output like:
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn
... (many lines) ...
AAAAEbWluaW1hbEBNaW5pbWFscy1NYWMBAgMEBQ==
-----END OPENSSH PRIVATE KEY-----
```

**COPY THE ENTIRE OUTPUT** (including BEGIN and END lines)

---

### Step 4: Add Secrets to GitHub

1. Go to your repository on GitHub:
   ```
   https://github.com/Bilaltoor1/pintrest-downloader
   ```

2. Click **Settings** (top navigation)

3. In left sidebar, click **Secrets and variables** → **Actions**

4. Click **New repository secret** button

5. Add these 4 secrets one by one:

#### Secret 1: VPS_HOST
- **Name**: `VPS_HOST`
- **Value**: Your VPS IP address (e.g., `123.45.67.89`)
- Click **Add secret**

#### Secret 2: VPS_USERNAME
- **Name**: `VPS_USERNAME`
- **Value**: `root` (or your SSH username)
- Click **Add secret**

#### Secret 3: VPS_SSH_KEY
- **Name**: `VPS_SSH_KEY`
- **Value**: Paste the ENTIRE private key you copied in Step 3
- Click **Add secret**

#### Secret 4: VPS_PORT
- **Name**: `VPS_PORT`
- **Value**: `22` (default SSH port)
- Click **Add secret**

**Verify all 4 secrets are added:**
You should see them listed (values will be hidden):
- VPS_HOST
- VPS_USERNAME
- VPS_SSH_KEY
- VPS_PORT

---

### Step 5: Prepare Your VPS

SSH to your VPS and run these commands:

```bash
# Navigate to project directory
cd ~/pintrest-downloader

# Configure git (if not already done)
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"

# Add GitHub to known hosts
ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

# Test git pull
git pull origin main
```

All commands should run without errors.

---

### Step 6: Test the Deployment

1. **Make a small change** (e.g., edit README.md):
   ```bash
   cd ~/pintrest-downloader
   echo "# Test deployment" >> README.md
   ```

2. **Commit and push**:
   ```bash
   git add .
   git commit -m "Test automated deployment"
   git push origin main
   ```

3. **Watch the deployment**:
   - Go to: https://github.com/Bilaltoor1/pintrest-downloader/actions
   - You should see a workflow run starting
   - Click on it to see live logs

4. **Deployment should take 2-5 minutes**

5. **Check if it worked**:
   ```bash
   ssh root@YOUR_VPS_IP "docker ps"
   ```
   You should see containers running with recent timestamps.

---

## ✅ Success Checklist

- [ ] SSH key generated
- [ ] Public key copied to VPS
- [ ] Can SSH without password
- [ ] All 4 GitHub secrets added
- [ ] Git configured on VPS
- [ ] Test deployment successful
- [ ] Containers running on VPS

---

## 🎯 Daily Workflow (After Setup)

From now on, deployment is automatic:

```bash
# 1. Make your changes
code .

# 2. Commit and push
git add .
git commit -m "Added new feature"
git push origin main

# 3. That's it! GitHub Actions handles the rest.
```

**Monitor deployment**:
- https://github.com/Bilaltoor1/pintrest-downloader/actions

---

## 🔍 Verify Deployment

### Check GitHub Actions
1. Go to **Actions** tab
2. Click latest workflow run
3. Expand "Deploy to VPS via SSH" step
4. Should see green checkmarks ✅

### Check VPS
```bash
ssh root@YOUR_VPS_IP

# Check containers
docker ps

# Check logs
cd ~/pintrest-downloader
docker compose logs --tail=50

# Check if site is live
curl -I http://localhost:8080
```

### Check Live Site
Visit your domain or VPS IP in browser:
- Frontend: `http://YOUR_VPS_IP:8080`
- Backend: `http://YOUR_VPS_IP:5000/api/health`

---

## 🛠️ Troubleshooting

### ❌ "Permission denied (publickey)"

**Solution**:
```bash
# On your local machine
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub root@YOUR_VPS_IP

# Test connection
ssh -i ~/.ssh/github_actions_deploy root@YOUR_VPS_IP
```

### ❌ "Could not resolve hostname"

**Solution**: Check `VPS_HOST` secret value
- Make sure it's just the IP address (e.g., `123.45.67.89`)
- No `http://` or extra spaces

### ❌ "Git pull failed"

**Solution**: SSH to VPS and run:
```bash
cd ~/pintrest-downloader
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
git pull origin main
```

### ❌ "Docker build failed"

**Solution**: Check if Docker is running:
```bash
ssh root@YOUR_VPS_IP
docker --version
docker compose version
```

### ❌ "Port already in use"

**Solution**:
```bash
ssh root@YOUR_VPS_IP
cd ~/pintrest-downloader
docker compose down
docker rm -f $(docker ps -aq)
docker compose up -d
```

---

## 📊 What Happens During Deployment

When you push code, GitHub Actions will:

1. ✅ Connect to your VPS via SSH
2. ✅ Navigate to `~/pintrest-downloader`
3. ✅ Pull latest code: `git pull origin main`
4. ✅ Stop containers: `docker compose down`
5. ✅ Rebuild images: `docker compose build --no-cache`
6. ✅ Start containers: `docker compose up -d`
7. ✅ Show logs: `docker compose logs --tail=50`

**Total time**: 2-5 minutes

---

## 🎉 You're Done!

Your automated deployment is now set up. From now on:

**Before**: Manual SSH → git pull → docker rebuild → restart
**After**: Just `git push` - everything else is automatic!

---

## 📚 Additional Resources

- **Quick Reference**: [QUICK_DEPLOY.md](QUICK_DEPLOY.md)
- **Detailed Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Test Script**: Run `bash test-deploy.sh`

---

**Questions?** Check the Actions tab for deployment logs or review this guide.

**Happy Deploying! 🚀**
