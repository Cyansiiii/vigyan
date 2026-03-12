#!/bin/bash
expect -c '
set timeout 60
# Step 1: Deploy Vite-built assets from dist/
# These are the optimized files managed by Vite (index, testfirstpage, etc.)
spawn bash -c "cd dist && scp -P 65002 -r index.html aboutpage.html testfirstpage.html vp-assets-v2 u255161845@31.97.101.169:domains/vigyanprep.com/public_html/"
expect "password:"
send "Buddy700@\r"
expect eof

# Step 2: Deploy root HTML files that are NOT managed by Vite (Admin Dashboard, etc.)
# These files live in the root and depend on raw /frontend/ assets
spawn bash -c "scp -P 65002 admin-dashboard-v3.html admin-login.html u255161845@31.97.101.169:domains/vigyanprep.com/public_html/"
expect "password:"
send "Buddy700@\r"
expect eof

# Step 3: Deploy raw public/ assets (Botanical lineart, shared frontend CSS/JS)
# This includes the /frontend/ folder which admin-dashboard-v3.html depends on
spawn bash -c "cd public && scp -P 65002 -r assets frontend u255161845@31.97.101.169:domains/vigyanprep.com/public_html/"
expect "password:"
send "Buddy700@\r"
expect eof
'
echo "Hostinger UI deploy complete."
