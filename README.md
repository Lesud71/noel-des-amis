# Le Noël des Amis — V4

V4 React + Vite de la boutique.

## Ce qui est déjà prêt
- boutique responsive beige / terracotta
- navigation Accueil / Boutique / Ma sélection / Panier
- route `/admin`
- Neon Auth via `@neondatabase/neon-js`
- variables d'environnement pour Neon Auth et la Data API
- structure prête pour remplacer le catalogue de secours par le catalogue Neon live

## Installation locale
```bash
npm install
cp .env.example .env
npm run dev
```

## Important
Le site public conserve actuellement un catalogue de secours statique afin de rester accessible sans authentification.
La Data API Neon configurée sur ce projet exige un JWT. Pour une boutique publique sans connexion, la prochaine couche doit être un petit backend/serverless public en lecture seule (ou une stratégie d'auth anonyme gérée côté serveur), tandis que `/admin` reste protégé par Neon Auth.

Ne jamais mettre de mot de passe Postgres, clé privée ou secret dans les variables `VITE_*`.
