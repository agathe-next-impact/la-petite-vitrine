# Configuration Domaine - La Petite Vitrine

## Compatibilité www.lapetitevitrine.com

### ✅ Configuration CORS Serveur
Le serveur accepte les requêtes depuis :
- `https://lapetitevitrine.com`
- `https://www.lapetitevitrine.com`
- `http://lapetitevitrine.com` (fallback)
- `http://www.lapetitevitrine.com` (fallback)

### ✅ Configuration Frontend Adaptative
L'application détecte automatiquement le domaine utilisé :
```typescript
// Si l'utilisateur accède via www.lapetitevitrine.com
// Les appels API utiliseront https://www.lapetitevitrine.com

// Si l'utilisateur accède via lapetitevitrine.com  
// Les appels API utiliseront https://lapetitevitrine.com
```

### ✅ Fonctionnalités Supportées
- ✅ Envoi d'emails de commande
- ✅ Envoi d'emails de contact
- ✅ Health check API
- ✅ Scroll automatique mobile
- ✅ Navigation entre étapes

### 🧪 Tests
```bash
# Tester la compatibilité des domaines
node test-domain-compatibility.js

# Tester la délivrabilité email
node test-deliverability.js
```

### 📝 URLs de Test
- Health Check: `https://www.lapetitevitrine.com/api/health`
- Application: `https://www.lapetitevitrine.com/ecommerce`
- Formulaire Contact: `https://www.lapetitevitrine.com/#contact`

### ⚙️ Configuration DNS Recommandée
- Redirection `lapetitevitrine.com` → `www.lapetitevitrine.com`
- Ou l'inverse selon la préférence
- Les deux domaines sont techniquement supportés