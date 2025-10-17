#!/bin/bash

# GitHub Actions Deployment Setup Script
# This script helps you set up automated deployment to your VPS

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   GitHub Actions Deployment Setup for Pinterest Downloader ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() { echo -e "${GREEN}✓ $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠ $1${NC}"; }
print_error() { echo -e "${RED}✗ $1${NC}"; }

# Check if running on VPS or local machine
echo "Are you running this on:"
echo "1) VPS (yttmp3-server)"
echo "2) Local machine"
read -p "Enter choice (1 or 2): " location_choice

if [ "$location_choice" == "1" ]; then
    echo ""
    print_info "Running VPS setup..."
    
    # Add GitHub to known hosts
    print_info "Adding GitHub to known hosts..."
    ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts 2>/dev/null
    
    # Check if git is configured
    if [ -z "$(git config --global user.email)" ]; then
        read -p "Enter your Git email: " git_email
        git config --global user.email "$git_email"
        print_success "Git email configured"
    fi
    
    if [ -z "$(git config --global user.name)" ]; then
        read -p "Enter your Git name: " git_name
        git config --global user.name "$git_name"
        print_success "Git name configured"
    fi
    
    # Test git pull
    print_info "Testing git pull..."
    cd ~/pintrest-downloader
    git pull origin main
    
    print_success "VPS setup complete!"
    
elif [ "$location_choice" == "2" ]; then
    echo ""
    print_info "Local machine setup..."
    
    # Check if SSH key exists
    SSH_KEY_PATH="$HOME/.ssh/github_actions_deploy"
    
    if [ ! -f "$SSH_KEY_PATH" ]; then
        print_warning "SSH key not found. Generating new key..."
        ssh-keygen -t rsa -b 4096 -f "$SSH_KEY_PATH" -N "" -C "github-actions-deploy"
        print_success "SSH key generated at $SSH_KEY_PATH"
    else
        print_info "SSH key already exists at $SSH_KEY_PATH"
    fi
    
    echo ""
    print_info "═══════════════════════════════════════════════════════"
    print_info "Next Steps:"
    print_info "═══════════════════════════════════════════════════════"
    echo ""
    
    print_info "1. Copy the PUBLIC key to your VPS:"
    echo -e "${YELLOW}"
    cat "${SSH_KEY_PATH}.pub"
    echo -e "${NC}"
    
    echo ""
    read -p "Enter your VPS IP or hostname: " vps_host
    read -p "Enter VPS username (default: root): " vps_user
    vps_user=${vps_user:-root}
    
    print_info "Run this command to copy the key to VPS:"
    echo -e "${YELLOW}ssh-copy-id -i ${SSH_KEY_PATH}.pub ${vps_user}@${vps_host}${NC}"
    echo ""
    
    print_info "2. Add these secrets to GitHub:"
    echo "   Go to: https://github.com/Bilaltoor1/pintrest-downloader/settings/secrets/actions"
    echo ""
    echo -e "${BLUE}Secret Name${NC}      | ${BLUE}Value${NC}"
    echo "══════════════════════════════════════════════"
    echo "VPS_HOST         | $vps_host"
    echo "VPS_USERNAME     | $vps_user"
    echo "VPS_PORT         | 22"
    echo ""
    print_warning "VPS_SSH_KEY      | Copy PRIVATE key content below:"
    echo ""
    echo -e "${YELLOW}────── Start copying from here ──────${NC}"
    cat "${SSH_KEY_PATH}"
    echo -e "${YELLOW}────── End copying here ──────${NC}"
    echo ""
    
    print_info "3. Test deployment:"
    echo "   git add ."
    echo "   git commit -m 'Setup GitHub Actions deployment'"
    echo "   git push origin main"
    echo ""
    
    print_success "Setup instructions displayed!"
else
    print_error "Invalid choice. Exiting."
    exit 1
fi

echo ""
print_success "Setup complete! Check DEPLOYMENT.md for more details."
