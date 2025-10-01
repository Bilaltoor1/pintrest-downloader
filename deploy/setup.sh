#!/bin/bash
# One-command setup script for Pinterest Downloader on Ubuntu VPS
# Usage: curl -fsSL <raw-url-to-this-script> | bash

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Pinterest Downloader - Automated Setup for yttmp3.com    ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo "⚠ Please run as regular user with sudo privileges, not as root"
    exit 1
fi

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    echo "✓ Docker installed"
else
    echo "✓ Docker already installed"
fi

# Install Docker Compose
if ! command -v docker compose &> /dev/null; then
    echo "🐳 Installing Docker Compose..."
    sudo apt install docker-compose-plugin -y
    echo "✓ Docker Compose installed"
else
    echo "✓ Docker Compose already installed"
fi

# Install Nginx
if ! command -v nginx &> /dev/null; then
    echo "🌐 Installing Nginx..."
    sudo apt install nginx -y
    sudo systemctl enable nginx
    echo "✓ Nginx installed"
else
    echo "✓ Nginx already installed"
fi

# Install Certbot
if ! command -v certbot &> /dev/null; then
    echo "🔒 Installing Certbot..."
    sudo apt install certbot python3-certbot-nginx -y
    sudo mkdir -p /var/www/certbot
    echo "✓ Certbot installed"
else
    echo "✓ Certbot already installed"
fi

# Clone repository
INSTALL_DIR="/var/www/pinterest-downloader"
if [ ! -d "$INSTALL_DIR" ]; then
    echo "📥 Cloning repository..."
    read -p "Enter your repository URL: " REPO_URL
    sudo mkdir -p /var/www
    cd /var/www
    sudo git clone "$REPO_URL" pinterest-downloader
    sudo chown -R $USER:$USER pinterest-downloader
    echo "✓ Repository cloned"
else
    echo "✓ Repository already exists at $INSTALL_DIR"
fi

cd "$INSTALL_DIR"

# Make scripts executable
chmod +x deploy/deploy.sh
chmod +x deploy/verify.sh

# Deploy containers
echo "🚀 Deploying Docker containers..."
./deploy/deploy.sh

# Configure Nginx
echo "⚙️ Configuring Nginx..."
sudo cp deploy/nginx/yttmp3.com.conf /etc/nginx/sites-available/
sudo ln -sf /etc/nginx/sites-available/yttmp3.com.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

# Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 'Nginx Full'
sudo ufw allow 'OpenSSH'
sudo ufw --force enable

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              ✓ Base Setup Complete!                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Ensure DNS A record for yttmp3.com points to this server's IP"
echo "   Run: curl ifconfig.me  (to see your public IP)"
echo ""
echo "2. Setup SSL certificate:"
echo "   sudo certbot --nginx -d yttmp3.com -d www.yttmp3.com"
echo ""
echo "3. Verify deployment:"
echo "   ./deploy/verify.sh"
echo ""
echo "4. View logs:"
echo "   docker compose logs -f"
echo ""
echo "5. Test the site:"
echo "   Open https://yttmp3.com in your browser"
echo ""
echo "📖 Full documentation: cat DEPLOYMENT.md"
echo ""
echo "⚠ IMPORTANT: You need to log out and back in for Docker group changes"
echo "   Or run: newgrp docker"
