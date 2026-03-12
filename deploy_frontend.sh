#!/bin/bash
expect -c '
set timeout 60
spawn scp -P 65002 -r "frontend/js/add-questions-v2.js" "frontend/js/live-test-preview-v2.js" "frontend/js/view-questions.js" "signinpage.html" u255161845@31.97.101.169:domains/vigyanprep.com/public_html/
expect "password:"
send "Buddy700@\r"
expect eof

spawn scp -P 65002 -r "frontend/js-exam/exam-engine.js" u255161845@31.97.101.169:domains/vigyanprep.com/public_html/frontend/js-exam/
expect "password:"
send "Buddy700@\r"
expect eof
'
echo "Hostinger frontend deploy complete."
