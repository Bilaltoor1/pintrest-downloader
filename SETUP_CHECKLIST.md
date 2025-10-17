# ✅ GitHub Actions Setup Checklist

Use this checklist to ensure your automated deployment is properly configured.

---

## 📋 Pre-Setup Checklist

- [ ] You have a VPS with SSH access
- [ ] Docker is installed on VPS
- [ ] Docker Compose is installed on VPS
- [ ] Project is cloned on VPS at `~/pintrest-downloader`
- [ ] You can currently deploy manually
- [ ] You have admin access to GitHub repository

---

## 🔐 SSH Key Setup

- [ ] SSH key generated: `~/.ssh/github_actions_deploy`
- [ ] Public key exists: `~/.ssh/github_actions_deploy.pub`
- [ ] Public key copied to VPS authorized_keys
- [ ] Can SSH without password: `ssh -i ~/.ssh/github_actions_deploy root@VPS_IP`
- [ ] Private key content copied for GitHub secret

**Commands Used:**
```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_actions_deploy
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub root@YOUR_VPS_IP
ssh -i ~/.ssh/github_actions_deploy root@YOUR_VPS_IP  # Test
cat ~/.ssh/github_actions_deploy  # Copy this
```

---

## 🔒 GitHub Secrets

Go to: https://github.com/Bilaltoor1/pintrest-downloader/settings/secrets/actions

- [ ] **VPS_HOST** added (e.g., `123.45.67.89`)
- [ ] **VPS_USERNAME** added (e.g., `root`)
- [ ] **VPS_SSH_KEY** added (entire private key including BEGIN/END lines)
- [ ] **VPS_PORT** added (e.g., `22`)
- [ ] All 4 secrets visible in Actions secrets list
- [ ] Secret values are correct (no extra spaces/characters)

---

## 🖥️ VPS Configuration

SSH to VPS and verify:

- [ ] Git is configured:
  ```bash
  git config --global user.email "your-email@example.com"
  git config --global user.name "Your Name"
  ```

- [ ] GitHub in known_hosts:
  ```bash
  ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
  ```

- [ ] Can pull from GitHub:
  ```bash
  cd ~/pintrest-downloader
  git pull origin main
  ```

- [ ] Docker is running:
  ```bash
  docker --version
  docker compose version
  ```

- [ ] Project directory exists and is correct:
  ```bash
  ls ~/pintrest-downloader/
  # Should show: backend/, frontend-nextjs/, docker-compose.yml, etc.
  ```

---

## 📁 Repository Files

- [ ] `.github/workflows/deploy.yml` exists
- [ ] Workflow file has correct structure
- [ ] No syntax errors in YAML file

**Quick check:**
```bash
cat .github/workflows/deploy.yml | head -20
# Should show workflow name and triggers
```

---

## 🧪 Test Deployment

- [ ] Made a test commit
- [ ] Pushed to `main` branch:
  ```bash
  git add .
  git commit -m "Test automated deployment"
  git push origin main
  ```

- [ ] Workflow started on GitHub Actions tab
- [ ] Workflow shows green checkmarks
- [ ] No error messages in logs
- [ ] Deployment completed successfully

**Check at:** https://github.com/Bilaltoor1/pintrest-downloader/actions

---

## ✅ Verification

After deployment, verify:

- [ ] Containers are running on VPS:
  ```bash
  ssh root@YOUR_VPS_IP "docker ps"
  ```

- [ ] Frontend is accessible:
  ```bash
  curl -I http://YOUR_VPS_IP:8080
  # Should return HTTP 200
  ```

- [ ] Backend is accessible:
  ```bash
  curl http://YOUR_VPS_IP:5000/api/health
  # Should return: {"status": "ok", "message": "..."}
  ```

- [ ] Changes are reflected on live site
- [ ] No errors in container logs:
  ```bash
  ssh root@YOUR_VPS_IP "cd ~/pintrest-downloader && docker compose logs --tail=50"
  ```

---

## 📊 Daily Workflow Test

- [ ] Made a code change
- [ ] Committed and pushed:
  ```bash
  git add .
  git commit -m "Update footer"
  git push origin main
  ```

- [ ] Watched deployment on Actions tab
- [ ] Changes appeared on live site
- [ ] No manual intervention required

---

## 🎯 Troubleshooting Checks

If deployment fails, check:

- [ ] GitHub Actions log for error messages
- [ ] SSH connection works manually
- [ ] VPS has enough disk space: `df -h`
- [ ] VPS has enough memory: `free -h`
- [ ] No port conflicts on VPS
- [ ] Docker daemon is running
- [ ] Git can pull without errors

---

## 📚 Documentation Review

- [ ] Read GITHUB_ACTIONS_SETUP.md
- [ ] Bookmarked QUICK_DEPLOY.md for daily use
- [ ] Know where to find troubleshooting info
- [ ] Understand the deployment workflow

---

## 🎉 Final Confirmation

- [ ] Automated deployment is working
- [ ] Can deploy by just pushing code
- [ ] Understand how to monitor deployments
- [ ] Know how to troubleshoot issues
- [ ] Can manually deploy if needed

---

## 🔄 Regular Maintenance

Monthly checks:

- [ ] Review failed deployments (if any)
- [ ] Update dependencies if needed
- [ ] Rotate SSH keys (optional, annually)
- [ ] Clean up old Docker images on VPS
- [ ] Review GitHub Actions usage (free tier: 2000 min/month)

---

## 📝 Notes

Write any custom configuration or issues you encountered:

```
Date: ___________

VPS IP: ___________

Issues Encountered:
_______________________________________________________
_______________________________________________________

Solutions Applied:
_______________________________________________________
_______________________________________________________

Custom Configuration:
_______________________________________________________
_______________________________________________________
```

---

## 🎓 Knowledge Check

After setup, you should know:

- [ ] What triggers a deployment
- [ ] How long deployments typically take
- [ ] Where to view deployment logs
- [ ] How to manually trigger a deployment
- [ ] How to rollback if something breaks
- [ ] Where secrets are stored (GitHub, not in code)

---

## ✨ Success Criteria

You've successfully set up GitHub Actions when:

✅ You push code and it automatically deploys
✅ No manual SSH or docker commands needed
✅ Deployments complete in 2-5 minutes
✅ You can see deployment status on GitHub
✅ Live site updates reflect your changes

---

**Status**: 

- [ ] Setup In Progress
- [ ] Setup Complete - Testing
- [ ] Fully Operational ✅

**Setup Date**: ___________

**Tested By**: ___________

---

**Need Help?** See [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md) for detailed instructions.
