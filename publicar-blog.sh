#!/bin/bash

# Script de Publicação Automática do Blog
# Este script sincroniza o conteúdo e faz o deploy para o GitHub Pages

# Define o diretório do projeto Quartz
QUARTZ_DIR="/Users/arc/Vault/quartz"

# Mostra notificação de início
osascript -e 'display notification "Iniciando publicação do blog..." with title "DevEnsino Publisher"'

# Navega para o diretório do Quartz
cd "$QUARTZ_DIR" || exit 1

# Executa o comando de publicação
npm run publish 2>&1

# Verifica se o comando foi bem-sucedido
if [ $? -eq 0 ]; then
    osascript -e 'display notification "Blog publicado com sucesso! 🚀" with title "DevEnsino Publisher" sound name "Glass"'
    exit 0
else
    osascript -e 'display notification "Erro ao publicar o blog. Verifique o terminal." with title "DevEnsino Publisher" sound name "Basso"'
    exit 1
fi
