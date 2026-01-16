#!/bin/sh
set -e

# Ensure data directory exists with correct permissions
if [ ! -d "/app/data" ]; then
    mkdir -p /app/data
fi

# Create emails.json if it doesn't exist
if [ ! -f "/app/data/emails.json" ]; then
    echo "[]" > /app/data/emails.json
fi

# Fix ownership
chown -R nextjs:nodejs /app/data
chmod 755 /app/data
chmod 644 /app/data/emails.json

# Start the application as nextjs user
exec su-exec nextjs "$@"
