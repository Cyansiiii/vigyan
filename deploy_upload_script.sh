#!/bin/bash
expect -c '
set timeout 60
spawn scp -P 65002 -r "api/upload-question-image.php" u255161845@31.97.101.169:domains/vigyanprep.com/public_html/api/
expect "password:"
send "Buddy700@\r"
expect eof
'
echo "Hostinger upload-question-image.php deploy complete."
