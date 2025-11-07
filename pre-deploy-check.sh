#!/bin/bash

# Script de vérification pre-deploy pour Vercel

echo "🔍 Vérification pre-deploy..."

# Vérifier que les fichiers sensibles ne sont pas trackés
echo "📋 Vérification des fichiers sensibles..."

if git ls-files | grep -E "\\.env$|\\.env\\.production$|\\.env\\.local$"; then
    echo "❌ ERREUR: Des fichiers .env sont trackés par git!"
    echo "   Utilisez: git rm --cached .env"
    exit 1
else
    echo "✅ Aucun fichier .env tracké"
fi

# Vérifier que .env.template existe
if [ ! -f ".env.template" ]; then
    echo "⚠️ ATTENTION: .env.template n'existe pas"
    echo "   Les développeurs auront besoin d'un exemple de configuration"
else
    echo "✅ .env.template présent"
fi

# Vérifier la configuration vercel.json
if [ ! -f "vercel.json" ]; then
    echo "⚠️ ATTENTION: vercel.json n'existe pas"
else
    echo "✅ vercel.json configuré"
fi

# Vérifier que le build fonctionne
echo "🔨 Test de build..."
if npm run build; then
    echo "✅ Build réussi"
else
    echo "❌ ERREUR: Le build a échoué"
    exit 1
fi

# Vérifier les dépendances critiques
echo "📦 Vérification des dépendances..."
if npm list nodemailer cors express dotenv > /dev/null 2>&1; then
    echo "✅ Dépendances critiques présentes"
else
    echo "⚠️ ATTENTION: Vérifiez les dépendances dans package.json"
fi

echo ""
echo "🎯 Checklist Vercel:"
echo "  [ ] Variables d'environnement configurées dans Vercel"
echo "  [ ] SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM"
echo "  [ ] NODE_ENV=production"
echo "  [ ] Repository connecté à Vercel"
echo ""
echo "✅ Prêt pour le déploiement Vercel!"