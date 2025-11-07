#!/bin/bash

# Script de déploiement pour lapetitevitrine.com

echo "🚀 Début du déploiement..."

# Build de l'application
echo "📦 Build de l'application..."
npm run build

# Copier le fichier .env de production
echo "⚙️ Configuration de l'environnement..."
if [ -f .env.production ]; then
    cp .env.production .env
    echo "✅ Configuration production activée"
else
    echo "⚠️ Fichier .env.production non trouvé, vérifiez la configuration"
fi

# Démarrer le serveur en mode production
echo "🌐 Démarrage du serveur production..."
NODE_ENV=production npm run start:prod

echo "✅ Déploiement terminé!"