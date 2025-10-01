#!/bin/bash
# One-command setup script for Pinterest Downloader on Ubuntu VPS
# Usage: curl -fsSL <raw-url-to-this-script> | bash

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Pinterest Downloader - Automated Setup for yttmp3.com    ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if running as root and set SUDO accordingly
if [ "$EUID" -eq 0 ]; then
    echo "⚠ Running as root"
    SUDO=""
    CURRENT_USER="root"
else
    echo "✓ Running as user: $USER"
    SUDO="sudo"
    CURRENT_USER="$USER"
fi

# Update system
echo "📦 Updating system packages..."
$SUDO apt update && $SUDO apt upgrade -y

# Install Docker
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    $SUDO sh get-docker.sh
    if [ "$EUID" -ne 0 ]; then
        $SUDO usermod -aG docker $USER
    fi
    rm get-docker.sh
    echo "✓ Docker installed"
else
    echo "✓ Docker already installed"
fi

# Install Docker Compose
if ! command -v docker compose &> /dev/null; then
    echo "🐳 Installing Docker Compose..."
    $SUDO apt install docker-compose-plugin -y
    echo "✓ Docker Compose installed"
else
    echo "✓ Docker Compose already installed"
fi

# Install Nginx
if ! command -v nginx &> /dev/null; then
    echo "🌐 Installing Nginx..."
    $SUDO apt install nginx -y
    $SUDO systemctl enable nginx
    echo "✓ Nginx installed"
else
    echo "✓ Nginx already installed"
fi

# Install Certbot
if ! command -v certbot &> /dev/null; then
    echo "🔒 Installing Certbot..."
    $SUDO apt install certbot python3-certbot-nginx -y
    $SUDO mkdir -p /var/www/certbot
    echo "✓ Certbot installed"
else
    echo "✓ Certbot already installed"
fi

# Detect repository location
echo "� Locating repository..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALL_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "✓ Repository found at: $INSTALL_DIR"

# Ensure we're in the project directory
cd "$INSTALL_DIR"

# Make scripts executable
chmod +x deploy/deploy.sh
chmod +x deploy/verify.sh

# Deploy containers
echo "🚀 Deploying Docker containers..."
./deploy/deploy.sh

# Configure Nginx
echo "⚙️ Configuring Nginx..."
$SUDO cp deploy/nginx/yttmp3.com.conf /etc/nginx/sites-available/
$SUDO ln -sf /etc/nginx/sites-available/yttmp3.com.conf /etc/nginx/sites-enabled/
$SUDO nginx -t && $SUDO systemctl restart nginx

# Configure firewall
echo "🔥 Configuring firewall..."
$SUDO ufw allow 'Nginx Full'
$SUDO ufw allow 'OpenSSH'
$SUDO ufw --force enable

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
if [ "$EUID" -eq 0 ]; then
    echo "   certbot --nginx -d yttmp3.com -d www.yttmp3.com"
else
    echo "   sudo certbot --nginx -d yttmp3.com -d www.yttmp3.com"
fi
echo ""
echo "3. Verify deployment:"
echo "   cd /var/www/pinterest-downloader && ./deploy/verify.sh"
echo ""
echo "4. View logs:"
echo "   cd /var/www/pinterest-downloader && docker compose logs -f"
echo ""
echo "5. Test the site:"
echo "   Open https://yttmp3.com in your browser"
echo ""
echo "📖 Full documentation: cat DEPLOYMENT.md"
echo ""
if [ "$EUID" -eq 0 ]; then
    echo "✓ Running as root - Docker commands will work immediately"
else
    echo "⚠ IMPORTANT: You need to log out and back in for Docker group changes"
    echo "   Or run: newgrp docker"
fi
