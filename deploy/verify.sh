#!/bin/bash
# Quick deployment verification script for yttmp3.com

echo "=== Pinterest Downloader Deployment Verification ==="
echo ""

echo "1. Checking Docker installation..."
if command -v docker &> /dev/null; then
    echo "✓ Docker installed: $(docker --version)"
else
    echo "✗ Docker not found"
fi

if command -v docker compose &> /dev/null; then
    echo "✓ Docker Compose installed"
else
    echo "✗ Docker Compose not found"
fi
echo ""

echo "2. Checking Docker containers..."
cd /var/www/pinterest-downloader 2>/dev/null || {
    echo "✗ Project directory not found at /var/www/pinterest-downloader"
    exit 1
}

if docker compose ps | grep -q "Up"; then
    echo "✓ Containers are running:"
    docker compose ps
else
    echo "✗ Containers not running"
    echo "Run: ./deploy/deploy.sh"
fi
echo ""

echo "3. Checking Nginx..."
if systemctl is-active --quiet nginx; then
    echo "✓ Nginx is running"
else
    echo "✗ Nginx not running"
fi

if [ -f /etc/nginx/sites-enabled/yttmp3.com.conf ]; then
    echo "✓ Site config enabled"
else
    echo "✗ Site config not found"
fi
echo ""

echo "4. Checking SSL certificate..."
if [ -d /etc/letsencrypt/live/yttmp3.com ]; then
    echo "✓ SSL certificate exists"
    sudo certbot certificates 2>/dev/null | grep yttmp3.com
else
    echo "✗ SSL certificate not found"
    echo "Run: sudo certbot --nginx -d yttmp3.com -d www.yttmp3.com"
fi
echo ""

echo "5. Checking firewall..."
if sudo ufw status | grep -q "Status: active"; then
    echo "✓ Firewall is active"
    sudo ufw status | grep -E "(80|443|22)"
else
    echo "⚠ Firewall not active"
fi
echo ""

echo "6. Testing backend API..."
if curl -s http://localhost:8080/api/health | grep -q "ok"; then
    echo "✓ Backend API responding"
else
    echo "✗ Backend API not responding"
fi
echo ""

echo "7. Testing public access..."
if curl -s -k https://yttmp3.com | grep -q "Pinterest"; then
    echo "✓ Site accessible at https://yttmp3.com"
else
    echo "⚠ Site may not be publicly accessible yet"
    echo "  Check DNS propagation and firewall rules"
fi
echo ""

echo "=== Deployment Status Summary ==="
echo "View logs: docker compose logs -f"
echo "Restart: docker compose restart"
echo "Full guide: See DEPLOYMENT.md"
