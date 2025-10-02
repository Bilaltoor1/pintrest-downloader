#!/bin/bash
# Cleanup script to remove old React frontend
# Run this after successfully migrating to Next.js

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     Cleaning Up Old React Frontend                         ║"
echo "╚════════════════════════════════════════════════════════════╝"

# Get current directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "📁 Working from: $PROJECT_DIR"
cd "$PROJECT_DIR"

# Confirm before deleting
echo ""
echo "⚠️  This will permanently delete the old React frontend!"
echo ""
echo "The following will be removed:"
echo "  - frontend/ directory"
echo "  - Old Docker images"
echo "  - Unused containers"
echo ""
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Cleanup cancelled"
    exit 1
fi

# Step 1: Remove old frontend directory
echo ""
echo "🗑️  Step 1: Removing frontend/ directory..."
if [ -d "frontend" ]; then
    rm -rf frontend
    echo "✓ Removed frontend/ directory"
else
    echo "⚠ frontend/ directory not found"
fi

# Step 2: Remove old Docker images
echo ""
echo "🐳 Step 2: Removing old Docker images..."
docker image rm pinterest-frontend:latest 2>/dev/null && echo "✓ Removed pinterest-frontend:latest" || echo "⚠ Image not found"
docker image rm pinterest-frontend-vite:latest 2>/dev/null && echo "✓ Removed pinterest-frontend-vite:latest" || echo "⚠ Image not found"

# Step 3: Clean up dangling images
echo ""
echo "🧹 Step 3: Cleaning up dangling images..."
docker image prune -f
echo "✓ Cleanup complete"

# Step 4: Show current state
echo ""
echo "✅ Cleanup Complete!"
echo ""
echo "📊 Current Docker Images:"
docker images | grep pinterest || echo "No pinterest images found"
echo ""
echo "📁 Current Directories:"
ls -la | grep "frontend" || echo "Only frontend-nextjs remains"
echo ""
echo "🎉 Old React frontend has been removed!"
echo "   Next.js 15 is now the sole frontend."
echo ""
