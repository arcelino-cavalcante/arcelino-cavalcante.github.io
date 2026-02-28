#!/bin/bash

# Configuration
PROJECT_DIR="/Users/arc/Vault/quartz"
LOG_FILE="$PROJECT_DIR/publish.log"
NODE_PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

# Export PATH to include node and npm
export PATH="$NODE_PATH"

# Function to show notification
notify() {
    local message="$1"
    local title="$2"
    local sound="$3"
    osascript -e "display notification \"$message\" with title \"$title\" sound name \"$sound\""
}

# Start logging
echo "--- Starting Publish at $(date) ---" > "$LOG_FILE"

# Initial Notification
notify "Iniciando publicação do blog..." "DevEnsino Publisher" "Hero"

# Navigate to project directory
cd "$PROJECT_DIR" || {
    echo "Error: Could not change directory to $PROJECT_DIR" >> "$LOG_FILE"
    notify "Erro: Diretório do projeto não encontrado." "DevEnsino Publisher" "Basso"
    exit 1
}

# Run the publish command
# Redirect stderr to stdout for full logging
echo "Running 'npm run publish'..." >> "$LOG_FILE"
npm run publish >> "$LOG_FILE" 2>&1
EXIT_CODE=$?

# Check result
if [ $EXIT_CODE -eq 0 ]; then
    echo "Success!" >> "$LOG_FILE"
    notify "Blog publicado com sucesso! 🚀" "DevEnsino Publisher" "Glass"
else
    echo "Failure with exit code $EXIT_CODE" >> "$LOG_FILE"
    # Show error dialog if it fails, so the user knows to check logs
    osascript -e 'display dialog "Falha ao publicar o blog. Verifique o arquivo publish.log para detalhes." with title "Erro na Publicação" buttons {"OK"} default button "OK" icon stop'
    notify "Erro ao publicar o blog." "DevEnsino Publisher" "Basso"
fi

echo "--- Finished at $(date) ---" >> "$LOG_FILE"
exit $EXIT_CODE
