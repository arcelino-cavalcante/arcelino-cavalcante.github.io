#!/bin/bash

# Define paths
PROJECT_DIR="/Users/arc/Vault/quartz"
SCRIPT_PATH="$PROJECT_DIR/publicar-blog-app.sh"
APP_NAME="Publicar Blog.app"
WRAPPER_SCRIPT="$PROJECT_DIR/wrapper.scpt"

echo "Configurando o aplicativo de publicação..."

# Ensure the main script is executable
chmod +x "$SCRIPT_PATH"
echo "Permissões de execução concedidas ao script principal."

# Create the AppleScript wrapper
cat <<EOF > "$WRAPPER_SCRIPT"
do shell script "$SCRIPT_PATH"
EOF

# Compile the AppleScript into a .app bundle
if command -v osacompile >/dev/null 2>&1; then
    osacompile -o "$PROJECT_DIR/$APP_NAME" "$WRAPPER_SCRIPT"
    echo "Aplicativo '$APP_NAME' criado com sucesso em $PROJECT_DIR!"
    
    # Optional: Removing temporary script
    rm "$WRAPPER_SCRIPT"
    
    echo "Você agora pode arrastar '$APP_NAME' para a sua Dock para acesso rápido."
else
    echo "Erro: comando 'osacompile' não encontrado. Certifique-se de estar em um macOS."
    exit 1
fi
