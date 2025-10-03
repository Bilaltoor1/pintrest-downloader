#!/bin/bash
# Complete deployment script for Pinterest Downloader on yttmp3.com
# Run as root user

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║          Pinterest Downloader Deployment                   ║"
echo "║                   yttmp3.com                               ║"
echo "╚════════════════════════════════════════════════════════════╝"

# Get current directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "📁 Deploying from: $PROJECT_DIR"
cd "$PROJECT_DIR"

# Step 1: Stop any existing containers
echo ""
echo "🛑 Step 1: Stopping existing containers..."
docker compose down 2>/dev/null || true
docker container stop pinterest-backend pinterest-frontend 2>/dev/null || true
docker container rm pinterest-backend pinterest-frontend 2>/dev/null || true

# Step 2: Build and start containers
echo ""
echo "🐳 Step 2: Building Docker containers..."
docker compose build --no-cache

echo "🚀 Starting containers..."
docker compose up -d

# Wait a moment for containers to start
sleep 5

# Step 3: Install and configure Nginx
echo ""
echo "🌐 Step 3: Setting up Nginx..."

# Install nginx if not present
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    apt update
    apt install -y nginx
    systemctl enable nginx
else
    echo "✓ Nginx already installed"
fi

# Ensure nginx service is enabled and running before attempting a reload
echo "Ensuring Nginx service is running..."
systemctl enable nginx >/dev/null 2>&1 || true
if ! systemctl is-active --quiet nginx; then
    systemctl start nginx
fi

# Create nginx config
echo "Configuring Nginx for yttmp3.com..."

# Remove default site
rm -f /etc/nginx/sites-enabled/default
rm -f /etc/nginx/sites-enabled/yttmp3.com /etc/nginx/sites-enabled/yttmp3.com.conf

# Create our site config
cat > /etc/nginx/sites-available/yttmp3.com << 'EOF'
server {
    listen 80;
    server_name yttmp3.com www.yttmp3.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";

    # Let's Encrypt challenge
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    # Proxy to Docker container
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Large file uploads
        client_max_body_size 100M;
        
        # Timeouts for downloads
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
        proxy_read_timeout 300;
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/yttmp3.com /etc/nginx/sites-enabled/

# Test and reload nginx
nginx -t
if ! systemctl reload nginx; then
    echo "Nginx reload failed; attempting to start service and retry..."
    systemctl start nginx
    systemctl reload nginx
fi

echo "✓ Nginx configured"

# Step 4: Setup firewall
echo ""
echo "🔥 Step 4: Configuring firewall..."
ufw --force enable 2>/dev/null || true
ufw allow 'Nginx Full' 2>/dev/null || true
ufw allow 'OpenSSH' 2>/dev/null || true
ufw allow 8080 2>/dev/null || true

echo "✓ Firewall configured"

# Step 5: Install SSL certificate
echo ""
echo "🔒 Step 5: Setting up SSL certificate..."

# Install certbot if not present
if ! command -v certbot &> /dev/null; then
    echo "Installing certbot..."
    apt install -y certbot python3-certbot-nginx
fi

echo ""
echo "Getting SSL certificate for yttmp3.com..."
echo "Follow the prompts to complete SSL setup:"
echo ""

# Get certificate
certbot --nginx -d yttmp3.com -d www.yttmp3.com --non-interactive --agree-tos --email admin@yttmp3.com || {
    echo "⚠️  Automated SSL failed. Run manually:"
    echo "   certbot --nginx -d yttmp3.com -d www.yttmp3.com"
}

# Step 6: Final status check
echo ""
echo "📊 Step 6: Checking deployment status..."

echo ""
echo "Docker containers:"
docker compose ps

echo ""
echo "Nginx status:"
systemctl status nginx --no-pager -l

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                 ✅ DEPLOYMENT COMPLETE!                    ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "🌐 Your Pinterest Downloader is now available at:"
echo "   https://yttmp3.com"
echo "   http://yttmp3.com (redirects to HTTPS)"
echo ""
echo "📋 Useful commands:"
echo "   docker compose logs -f         # View logs"
echo "   docker compose restart         # Restart containers"  
echo "   systemctl status nginx         # Check Nginx status"
echo "   certbot renew --dry-run        # Test SSL renewal"
echo ""
echo "📁 Project location: $PROJECT_DIR"
echo ""