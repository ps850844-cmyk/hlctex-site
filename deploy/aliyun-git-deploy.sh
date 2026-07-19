#!/usr/bin/env bash
set -euo pipefail

# HLC static website Git deployment script for Aliyun Ubuntu.
#
# First use:
#   bash aliyun-git-deploy.sh https://github.com/YOUR_NAME/hlctex-site.git
#
# Later updates:
#   cd /var/www/hlc
#   git pull
#   sudo nginx -t && sudo systemctl reload nginx

REPO_URL="${1:-}"
WEB_ROOT="/var/www/hlc"
BACKUP_ROOT="/var/backups/hlc-site"

if [ -z "$REPO_URL" ]; then
  echo "Usage: bash aliyun-git-deploy.sh <git-repo-url>"
  exit 1
fi

echo "[1/6] Installing required packages..."
sudo apt-get update
sudo apt-get install -y git nginx rsync

echo "[2/6] Backing up current website if present..."
sudo mkdir -p "$BACKUP_ROOT"
if [ -d "$WEB_ROOT" ]; then
  sudo tar -czf "$BACKUP_ROOT/hlc-$(date +%Y%m%d-%H%M%S).tar.gz" -C "$WEB_ROOT" . || true
fi

echo "[3/6] Preparing web root..."
sudo mkdir -p "$WEB_ROOT"
sudo chown -R "$USER:$USER" "$WEB_ROOT"

echo "[4/6] Cloning or updating repository..."
if [ -d "$WEB_ROOT/.git" ]; then
  cd "$WEB_ROOT"
  git remote set-url origin "$REPO_URL"
  git fetch origin
  git reset --hard origin/main || git reset --hard origin/master
else
  rm -rf "$WEB_ROOT"/*
  git clone "$REPO_URL" "$WEB_ROOT"
  cd "$WEB_ROOT"
fi

echo "[5/6] Ensuring file permissions..."
sudo chown -R www-data:www-data "$WEB_ROOT"
sudo find "$WEB_ROOT" -type d -exec chmod 755 {} \;
sudo find "$WEB_ROOT" -type f -exec chmod 644 {} \;

echo "[6/6] Testing Nginx and reloading..."
sudo nginx -t
sudo systemctl reload nginx

echo "Done. Website root: $WEB_ROOT"
echo "Check: https://hlctex.com/"
