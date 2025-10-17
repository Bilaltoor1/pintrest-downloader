# 🎨 GitHub Actions Deployment Workflow Diagram

## 📊 Complete Deployment Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEVELOPER WORKFLOW                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Developer Makes │
                    │  Code Changes    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  git add .       │
                    │  git commit -m   │
                    │  git push origin │
                    │  main            │
                    └────────┬─────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      GITHUB ACTIONS                              │
└─────────────────────────────────────────────────────────────────┘
                             │
                    ┌────────▼─────────┐
                    │ Push Detected    │
                    │ on 'main' branch │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Workflow Starts  │
                    │ (deploy.yml)     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Load Secrets:    │
                    │ - VPS_HOST       │
                    │ - VPS_USERNAME   │
                    │ - VPS_SSH_KEY    │
                    │ - VPS_PORT       │
                    └────────┬─────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                       SSH CONNECTION                             │
└─────────────────────────────────────────────────────────────────┘
                             │
                    ┌────────▼─────────┐
                    │ Establish SSH    │
                    │ Connection       │
                    │ to VPS           │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Authenticate     │
                    │ using SSH Key    │
                    └────────┬─────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VPS OPERATIONS                                │
└─────────────────────────────────────────────────────────────────┘
                             │
                    ┌────────▼─────────┐
                    │ cd ~/pintrest-   │
                    │ downloader       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ git pull         │
                    │ origin main      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ docker compose   │
                    │ down             │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ docker compose   │
                    │ build --no-cache │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ docker compose   │
                    │ up -d            │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ docker ps        │
                    │ (verify status)  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Show logs        │
                    │ (last 50 lines)  │
                    └────────┬─────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     DEPLOYMENT COMPLETE                          │
└─────────────────────────────────────────────────────────────────┘
                             │
                    ┌────────▼─────────┐
                    │ Frontend Running │
                    │ on port 8080     │
                    └──────────────────┘
                             │
                    ┌────────▼─────────┐
                    │ Backend Running  │
                    │ on port 5000     │
                    └──────────────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Site Updated! 🎉 │
                    └──────────────────┘
```

---

## 🔄 Deployment Timeline

```
┌─────────────────────────────────────────────────────────────────┐
│  Time   │  Step                         │  Status               │
├─────────┼───────────────────────────────┼───────────────────────┤
│  0:00   │  Developer pushes code        │  🚀 Starting...       │
│  0:05   │  GitHub receives push         │  ✅ Received          │
│  0:10   │  Workflow triggered           │  ▶️  Running          │
│  0:15   │  SSH connection established   │  🔐 Connected         │
│  0:20   │  Git pull completed           │  📥 Code pulled       │
│  0:30   │  Docker containers stopped    │  🛑 Stopped           │
│  0:45   │  Docker images building       │  🔨 Building...       │
│  2:00   │  Frontend build complete      │  ✅ Frontend ready    │
│  2:30   │  Backend build complete       │  ✅ Backend ready     │
│  2:35   │  Containers starting          │  ▶️  Starting...      │
│  2:45   │  Health checks passing        │  💚 Healthy           │
│  3:00   │  Deployment complete          │  🎉 LIVE!             │
└─────────────────────────────────────────────────────────────────┘

Total Time: ~3 minutes (varies based on changes)
```

---

## 🔐 Security Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                              │
└──────────────────────────────────────────────────────────────────┘

Developer's Machine
    │
    ├─── Private SSH Key (github_actions_deploy)
    │    ├─── Stored locally (~/.ssh/)
    │    └─── NEVER committed to git
    │
    └─── Public SSH Key (github_actions_deploy.pub)
         └─── Copied to VPS authorized_keys

GitHub Repository
    │
    ├─── Secrets (Encrypted)
    │    ├─── VPS_HOST (encrypted)
    │    ├─── VPS_USERNAME (encrypted)
    │    ├─── VPS_SSH_KEY (encrypted)
    │    └─── VPS_PORT (encrypted)
    │
    └─── Workflow (.github/workflows/deploy.yml)
         └─── Uses secrets (never exposed in logs)

VPS Server
    │
    ├─── ~/.ssh/authorized_keys
    │    └─── Contains public key
    │
    └─── Application
         ├─── Frontend Container (port 8080)
         └─── Backend Container (port 5000)

Connection Flow:
GitHub Actions → Uses VPS_SSH_KEY → Matches VPS authorized_keys → Access Granted
```

---

## 📁 File Structure

```
pintrest-downloader/
│
├── .github/
│   └── workflows/
│       └── deploy.yml ...................... Workflow definition
│
├── backend/ ................................ Flask API
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend-nextjs/ ........................ Next.js frontend
│   ├── app/
│   ├── components/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml ...................... Container orchestration
│
├── GITHUB_ACTIONS_SETUP.md ................. Setup guide (START HERE)
├── QUICK_DEPLOY.md ......................... Quick reference
├── DEPLOYMENT_SUMMARY.md ................... Overview
├── SETUP_CHECKLIST.md ...................... Verification checklist
├── WORKFLOW_DIAGRAM.md ..................... This file
│
├── setup-deploy.sh ......................... Setup helper script
└── test-deploy.sh .......................... Testing script
```

---

## 🎯 Key Components

### 1. Trigger (What starts it?)
```yaml
on:
  push:
    branches:
      - main
```
**Meaning**: Every push to `main` branch triggers deployment

### 2. Secrets (How does it connect?)
```yaml
with:
  host: ${{ secrets.VPS_HOST }}
  username: ${{ secrets.VPS_USERNAME }}
  key: ${{ secrets.VPS_SSH_KEY }}
  port: ${{ secrets.VPS_PORT }}
```
**Meaning**: Uses encrypted secrets for SSH connection

### 3. Script (What does it do?)
```bash
cd ~/pintrest-downloader
git pull origin main
docker compose down
docker compose build --no-cache
docker compose up -d
```
**Meaning**: Updates code, rebuilds, and restarts containers

---

## 🔍 Monitoring Points

```
┌──────────────────────────────────────────────────────────────┐
│  Where to Check                 │  What You See              │
├─────────────────────────────────┼────────────────────────────┤
│  GitHub Actions Tab             │  Workflow runs, logs       │
│  VPS: docker ps                 │  Container status          │
│  VPS: docker compose logs       │  Application logs          │
│  http://VPS_IP:8080             │  Live frontend             │
│  http://VPS_IP:5000/api/health  │  Backend health            │
└──────────────────────────────────────────────────────────────┘
```

---

## ⚡ Quick Reference

### Manual Trigger
```
GitHub → Actions → Deploy to VPS → Run workflow
```

### View Logs
```
GitHub → Actions → Latest run → Deploy to VPS via SSH
```

### Check Status
```bash
ssh root@VPS_IP "docker ps"
```

### Emergency Stop
```bash
ssh root@VPS_IP "cd ~/pintrest-downloader && docker compose down"
```

---

## 📊 Success Indicators

✅ **GitHub Actions Tab**
- Workflow shows green checkmark
- "Deploy to VPS via SSH" step completed

✅ **VPS**
- `docker ps` shows 2 containers running
- No error messages in logs

✅ **Live Site**
- Frontend accessible on port 8080
- Backend responds on port 5000

---

**Visual learner?** Print this page and follow along during setup!

**Need help?** Refer to [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md)
