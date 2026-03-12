#!/bin/bash
expect -c '
set timeout 60
spawn bash -c "cd dist && scp -P 65002 -r . u255161845@31.97.101.169:domains/vigyanprep.com/public_html/"
expect "password:"
send "Buddy700@\r"
expect eof
'
echo "Hostinger UI deploy complete."
