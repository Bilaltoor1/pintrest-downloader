#!/bin/bash

# Deployment Test Script
# Run this to verify your GitHub Actions setup

echo "🧪 Testing GitHub Actions Deployment Setup"
echo "=========================================="
echo ""

# Check if SSH key exists
if [ -f ~/.ssh/github_actions_deploy ]; then
    echo "✅ SSH private key exists"
else
    echo "❌ SSH private key NOT found at ~/.ssh/github_actions_deploy"
    echo "   Run: ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_actions_deploy"
    exit 1
fi

if [ -f ~/.ssh/github_actions_deploy.pub ]; then
    echo "✅ SSH public key exists"
else
    echo "❌ SSH public key NOT found"
    exit 1
fi

# Ask for VPS details
read -p "Enter your VPS IP or hostname: " VPS_HOST
read -p "Enter VPS username (default: root): " VPS_USER
VPS_USER=${VPS_USER:-root}

echo ""
echo "🔐 Testing SSH connection to VPS..."

# Test SSH connection
if ssh -i ~/.ssh/github_actions_deploy -o ConnectTimeout=5 -o StrictHostKeyChecking=no "$VPS_USER@$VPS_HOST" "echo ''" 2>/dev/null; then
    echo "✅ SSH connection successful!"
else
    echo "❌ Cannot connect to VPS via SSH"
    echo "   Make sure you've copied the public key to VPS:"
    echo "   ssh-copy-id -i ~/.ssh/github_actions_deploy.pub $VPS_USER@$VPS_HOST"
    exit 1
fi

echo ""
echo "📦 Checking VPS setup..."

# Check if project directory exists
if ssh -i ~/.ssh/github_actions_deploy "$VPS_USER@$VPS_HOST" "[ -d ~/pintrest-downloader ]" 2>/dev/null; then
    echo "✅ Project directory exists on VPS"
else
    echo "❌ Project directory NOT found on VPS"
    echo "   Clone the repo on VPS:"
    echo "   git clone https://github.com/Bilaltoor1/pintrest-downloader.git ~/pintrest-downloader"
    exit 1
fi

# Check if Docker is installed
if ssh -i ~/.ssh/github_actions_deploy "$VPS_USER@$VPS_HOST" "command -v docker" &>/dev/null; then
    echo "✅ Docker is installed on VPS"
else
    echo "❌ Docker NOT found on VPS"
    exit 1
fi

# Check if Docker Compose is available
if ssh -i ~/.ssh/github_actions_deploy "$VPS_USER@$VPS_HOST" "docker compose version" &>/dev/null; then
    echo "✅ Docker Compose is available"
else
    echo "❌ Docker Compose NOT available"
    exit 1
fi

# Check if git is configured
GIT_EMAIL=$(ssh -i ~/.ssh/github_actions_deploy "$VPS_USER@$VPS_HOST" "git config --global user.email" 2>/dev/null)
if [ -n "$GIT_EMAIL" ]; then
    echo "✅ Git is configured (email: $GIT_EMAIL)"
else
    echo "⚠️  Git email not configured on VPS"
    echo "   Run on VPS: git config --global user.email 'you@example.com'"
fi

echo ""
echo "🎯 GitHub Secrets Checklist:"
echo "   Go to: https://github.com/Bilaltoor1/pintrest-downloader/settings/secrets/actions"
echo ""
echo "   Required secrets:"
echo "   [ ] VPS_HOST        = $VPS_HOST"
echo "   [ ] VPS_USERNAME    = $VPS_USER"
echo "   [ ] VPS_PORT        = 22"
echo "   [ ] VPS_SSH_KEY     = (private key content)"
echo ""

echo "📋 To get your private key for VPS_SSH_KEY:"
echo "   cat ~/.ssh/github_actions_deploy"
echo ""

echo "✅ All checks passed! Your setup looks good."
echo ""
echo "🚀 Next steps:"
echo "   1. Add the 4 secrets to GitHub (if not done already)"
echo "   2. Push code to test: git push origin main"
echo "   3. Watch deployment: https://github.com/Bilaltoor1/pintrest-downloader/actions"
