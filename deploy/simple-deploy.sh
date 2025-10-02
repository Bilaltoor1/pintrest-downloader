#!/bin/bash
# Simple deployment script for Pinterest Downloader (as root user)
# Assumes: Docker already installed

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     Pinterest Downloader - Simple Deployment              ║"
echo "║                 for yttmp3.com                             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "📁 Project directory: $PROJECT_DIR"
cd "$PROJECT_DIR"

# Step 1: Build and start Docker containers
echo ""
echo "🐳 Step 1: Building and starting Docker containers..."
docker compose down 2>/dev/null || true
docker compose build --no-cache
docker compose up -d

echo "✓ Docker containers started"
echo ""

# Step 2: Install and configure Nginx
echo "🌐 Step 2: Configuring Nginx..."

# Install nginx if not present
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    apt update
    apt install -y nginx
    systemctl enable nginx
fi

# Copy nginx config
cp deploy/nginx/yttmp3.com.conf /etc/nginx/sites-available/yttmp3.com.conf
ln -sf /etc/nginx/sites-available/yttmp3.com.conf /etc/nginx/sites-enabled/

# Remove default if exists
rm -f /etc/nginx/sites-enabled/default

# Test and restart nginx
nginx -t
systemctl restart nginx

echo "✓ Nginx configured"
echo ""

# Step 3: Configure firewall
echo "🔥 Step 3: Configuring firewall..."
ufw allow 'Nginx Full' 2>/dev/null || true
ufw allow 'OpenSSH' 2>/dev/null || true
echo "✓ Firewall configured"
echo ""

# Step 4: Check container status
echo "📊 Step 4: Container status..."
docker compose ps
echo ""

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                  ✓ Deployment Complete!                    ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Check if site is accessible:"
echo "   curl http://localhost:8080"
echo ""
echo "2. Setup SSL certificate:"
echo "   apt install -y certbot python3-certbot-nginx"
echo "   certbot --nginx -d yttmp3.com -d www.yttmp3.com"
echo ""
echo "3. View application logs:"
echo "   docker compose logs -f"
echo ""
echo "4. Restart containers if needed:"
echo "   docker compose restart"
echo ""
echo "🌐 Your site should be accessible at:"
echo "   http://yttmp3.com (before SSL)"
echo "   https://yttmp3.com (after SSL setup)"
echo ""
