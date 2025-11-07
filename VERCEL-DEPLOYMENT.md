# Déploiement Vercel - La Petite Vitrine

## Variables d'environnement à configurer dans Vercel

### 📧 Configuration SMTP
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=contact@lapetitevitrine.com
SMTP_PASS=[VOTRE_MOT_DE_PASSE_SMTP]
SMTP_FROM=contact@lapetitevitrine.com
```

### ⚙️ Configuration Application
```
NODE_ENV=production
PORT=3001
```

## 🚀 Instructions de déploiement

### 1. Préparation du projet
```bash
# S'assurer que .env est dans .gitignore
git status
# Les fichiers .env ne doivent pas apparaître

# Commit et push
git add .
git commit -m "Ready for Vercel deployment"
git push origin master
```

### 2. Configuration Vercel
1. **Connecter le repository** : 
   - Aller sur [vercel.com](https://vercel.com)
   - Importer le projet depuis GitHub : `agat-dev/la-petite-vitrine-3`

2. **Configurer les variables d'environnement** :
   - Project Settings > Environment Variables
   - Ajouter chaque variable du template ci-dessus
   - ⚠️ **Important** : Utiliser les vraies valeurs (mot de passe SMTP)

3. **Configuration Build** :
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 3. Configuration spécifique API
```json
// vercel.json (optionnel si besoin de configuration spécifique)
{
  "functions": {
    "server.js": {
      "maxDuration": 30
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## ✅ Vérifications post-déploiement

### Tests à effectuer :
1. **Health Check** : `https://votre-app.vercel.app/api/health`
2. **Formulaire contact** : `https://votre-app.vercel.app/#contact`
3. **Commande e-commerce** : `https://votre-app.vercel.app/ecommerce`

### Logs et debugging :
- Vercel Dashboard > Project > Functions tab
- Voir les logs des fonctions serverless
- Vérifier les variables d'environnement dans Settings

## 🔧 Troubleshooting

### Erreur 500 - Variables manquantes
- Vérifier que toutes les variables SMTP sont configurées
- Redéployer après ajout de variables

### CORS errors
- Les domaines Vercel sont automatiquement autorisés
- Format type : `https://la-petite-vitrine-3.vercel.app`

### Emails non reçus
- Vérifier les logs dans Vercel Functions
- Tester avec `node test-deliverability.js` en local d'abord