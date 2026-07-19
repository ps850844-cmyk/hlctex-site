#!/usr/bin/env bash
set -euo pipefail

cd /var/www/hlc
git pull
sudo nginx -t
sudo systemctl reload nginx

echo "HLC website updated."
