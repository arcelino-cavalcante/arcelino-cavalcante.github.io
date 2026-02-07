#!/bin/bash

# Wrapper script para abrir o Terminal e executar o script de publicação
osascript <<EOF
tell application "Terminal"
    activate
    do script "cd /Users/arc/Vault/quartz && ./publicar-blog.sh; echo ''; echo 'Pressione qualquer tecla para fechar...'; read -n 1"
end tell
EOF
