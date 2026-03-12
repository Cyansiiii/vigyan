#!/bin/bash
expect -c '
set timeout 60
spawn scp -P 65002 -r "frontend/js/view-questions.js" "frontend/js/admin-utils.js" u255161845@31.97.101.169:domains/vigyanprep.com/public_html/frontend/js/
expect "password:"
send "Buddy700@\r"
expect eof
'
echo "Hostinger UI deploy complete."
