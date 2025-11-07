# Guide de Déploiement Vercel - La Petite Vitrine

## 🚀 Déploiement Automatique

### 1. Connecter le Repository à Vercel

1. **Aller sur [vercel.com](https://vercel.com)**
2. **Se connecter avec GitHub**
3. **Importer le projet** :
   - Cliquer "New Project"
   - Sélectionner le repository `agat-dev/la-petite-vitrine-3`
   - Cliquer "Import"

### 2. Configuration Automatique

Vercel détectera automatiquement :
- ✅ **Framework** : Vite
- ✅ **Build Command** : `npm run build`
- ✅ **Output Directory** : `dist`
- ✅ **Install Command** : `npm install`

### 3. Variables d'Environnement

**Dans Vercel Dashboard > Project Settings > Environment Variables**, ajouter :

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=contact@lapetitevitrine.com
SMTP_PASS=[VOTRE_MOT_DE_PASSE_SMTP]
SMTP_FROM=contact@lapetitevitrine.com
NODE_ENV=production
```

### 4. Déploiement

1. **Cliquer "Deploy"**
2. **Attendre le build** (2-3 minutes)
3. **Tester l'application** sur l'URL fournie

## 🔧 API Routes

Les routes API sont automatiquement déployées :
- `/api/health` - Vérification du statut
- `/api/add-contact` - Formulaire de contact
- `/api/send-order-recap` - Emails de commande

## ✅ Tests Post-Déploiement

### URLs à tester :
- **Application** : `https://votre-app.vercel.app`
- **Health Check** : `https://votre-app.vercel.app/api/health`
- **Formulaire** : `https://votre-app.vercel.app/ecommerce`

### Vérifications :
1. ✅ Page d'accueil se charge
2. ✅ Formulaire de contact fonctionne
3. ✅ Commande e-commerce fonctionne
4. ✅ Emails sont envoyés

## 🐛 Troubleshooting

### Problème : Build échoué
- Vérifier les logs dans Vercel Dashboard
- S'assurer que `npm run build` fonctionne en local

### Problème : API ne fonctionne pas
- Vérifier les variables d'environnement
- Tester `/api/health` pour voir le statut

### Problème : Emails non envoyés
- Vérifier les variables SMTP dans Vercel
- Consulter les logs des fonctions

## 🔄 Déploiement Automatique

Une fois configuré, chaque push sur `master` déclenchera automatiquement :
1. **Build** de l'application
2. **Déploiement** sur Vercel
3. **Tests** automatiques
4. **Mise en ligne** si succès

## 📱 Domaine Personnalisé

Pour utiliser `lapetitevitrine.com` :
1. **Vercel Dashboard > Project Settings > Domains**
2. **Ajouter** `lapetitevitrine.com` et `www.lapetitevitrine.com`
3. **Configurer DNS** selon les instructions Vercel