# Mini projet Supabase - gestion des places

## Objectif
Gerer le stock des places ORUN MOMENT avec Supabase:
- Etudiants: 53 places
- Professionnels: 53 places

## 1) Creer le projet Supabase
1. Cree un projet sur [Supabase](https://supabase.com).
2. Recupere:
   - `Project URL`
   - `anon public key`

## 2) Configurer les variables d'environnement
1. Copie `.env.example` vers `.env`.
2. Renseigne:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## 3) Creer la table et la fonction SQL
1. Ouvre SQL Editor dans Supabase.
2. Execute le script `supabase/stock_setup.sql`.

## 4) Lancer l'application
```bash
npm run dev
```

L'app utilisera automatiquement Supabase pour:
- lire les places restantes
- reserver les places de facon atomique

Si Supabase n'est pas configure, l'app bascule en fallback localStorage.
