#!/bin/bash

# Clear terminal screen
clear

echo "============================================="
echo " 🚀 wanderwithakhi.com Publish Script"
echo "============================================="
echo ""

# Stage all files
echo "1. Staging updates..."
git add .

# Prompt for commit message
echo ""
echo "Enter a brief message describing your changes (e.g., 'added mysore photo'):"
read -r commit_msg

# If message is empty, use a default
if [ -z "$commit_msg" ]; then
  commit_msg="Update content and essays"
fi

# Commit the changes
echo ""
echo "2. Committing changes..."
git commit -m "$commit_msg"

# Push to GitHub
echo ""
echo "3. Uploading to GitHub..."
git push

echo ""
echo "============================================="
echo " ✅ SUCCESS!"
echo "============================================="
echo "Your changes have been pushed to GitHub."
echo "Vercel has started building the update in the background."
echo "Your changes will be live on wanderwithakhi.com in about 60 seconds."
echo "============================================="
echo ""
