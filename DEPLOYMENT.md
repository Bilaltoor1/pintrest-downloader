# GitHub Actions Deployment Setup Guide

This repository is configured with automatic deployment to your VPS using GitHub Actions.

## 🚀 How It Works

Every time you push code to the `main` branch, GitHub Actions will:
1. SSH into your VPS
2. Pull the latest code
3. Rebuild Docker containers
4. Restart the application

## 🔐 Setup Instructions

### Step 1: Generate SSH Key (If you don't have one)

On your local machine or VPS:
```bash
ssh-keygen -t rsa -b 4096 -C "github-actions-deploy"
```

Save it to a specific file (e.g., `github_actions_key`)

### Step 2: Add SSH Public Key to VPS

Copy the public key to your VPS:
```bash
ssh-copy-id -i ~/.ssh/github_actions_key.pub root@your-vps-ip
```

Or manually add it to `~/.ssh/authorized_keys` on your VPS.

### Step 3: Add GitHub Secrets

Go to your GitHub repository:
**Settings → Secrets and variables → Actions → New repository secret**

Add these secrets:

| Secret Name | Value | Example |
|------------|-------|---------|
| `VPS_HOST` | Your VPS IP address | `123.456.789.0` or `yttmp3-server` |
| `VPS_USERNAME` | SSH username (usually `root`) | `root` |
| `VPS_SSH_KEY` | Private SSH key content | Contents of `~/.ssh/github_actions_key` |
| `VPS_PORT` | SSH port (usually `22`) | `22` |

#### How to get VPS_SSH_KEY:
```bash
cat ~/.ssh/github_actions_key
```
Copy the **entire content** including:
```
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

### Step 4: Test the Deployment

1. Make a small change to your code
2. Commit and push to `main` branch:
   ```bash
   git add .
   git commit -m "Test automated deployment"
   git push origin main
   ```
3. Go to **GitHub → Actions** tab to watch the deployment

## 📋 Manual Deployment

You can also trigger deployment manually:
1. Go to **GitHub → Actions**
2. Select "Deploy to VPS" workflow
3. Click **Run workflow** → **Run workflow**

## 🔍 Monitoring Deployments

### View Deployment Logs
- Go to **GitHub → Actions** tab
- Click on the latest workflow run
- Expand the "Deploy to VPS via SSH" step

### Check VPS Status
SSH into your VPS and run:
```bash
cd ~/pintrest-downloader
docker ps
docker compose logs -f
```

## 🛠️ Troubleshooting

### Permission Denied (publickey)
- Verify SSH key is added to VPS `~/.ssh/authorized_keys`
- Check file permissions: `chmod 600 ~/.ssh/authorized_keys`

### Git Pull Fails
- Ensure VPS has access to GitHub (add deploy key if private repo)
- Check if git is configured: `git config --global user.email "you@example.com"`

### Docker Compose Fails
- Verify Docker is running on VPS: `docker --version`
- Check if docker-compose.yml exists in the project

### Containers Won't Start
- Check logs: `docker compose logs`
- Verify ports aren't in use: `netstat -tulpn | grep -E ':(5000|8080)'`

## 📝 Workflow Customization

Edit `.github/workflows/deploy.yml` to customize:
- **Branch**: Change `main` to another branch
- **Build options**: Modify `docker compose build` flags
- **Cleanup**: Adjust image pruning settings

## 🔒 Security Best Practices

1. ✅ Use SSH keys instead of passwords
2. ✅ Store secrets in GitHub Secrets (never in code)
3. ✅ Use a dedicated deploy user (optional)
4. ✅ Restrict SSH key to specific commands (optional)
5. ✅ Enable 2FA on GitHub account

## 🎯 Next Steps

After setup, your workflow:
```
Code Change → Git Push → GitHub Actions → SSH to VPS → Pull Code → Rebuild → Deploy
```

**Deployment time**: ~2-5 minutes depending on build complexity.

---

Need help? Check the Actions tab for detailed logs or review error messages.
