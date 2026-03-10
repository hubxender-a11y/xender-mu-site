# Xender-MU - Plateforme Startup (React + Node + PostgreSQL)

Ce projet contient:
- `frontend`: site React (Vite) avec accueil, services, details produits, actualites et admin UI
- `backend`: API Express connectee a PostgreSQL (contacts, produits, actualites, stats, temoignages)

## 1) Prerequis
- Node.js 18+
- PostgreSQL 14+

## 2) Configuration base de donnees
1. Creer la base:
   ```sql
   CREATE DATABASE startup_agency;
   ```
2. (Optionnel) Executer le script SQL initial:
   ```bash
   psql -U postgres -d startup_agency -f backend/db/init.sql
   ```
   L'API execute aussi `initDatabase()` au demarrage.

## 3) Variables d'environnement
Copier le fichier exemple backend:
```bash
copy backend\.env.example backend\.env
```

Configurer `backend/.env`:
```env
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/startup_agency
ADMIN_TOKEN=votre-token-admin-fort
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Copier le fichier exemple frontend:
```bash
copy frontend\.env.example frontend\.env
```

Configurer `frontend/.env` (optionnel en local):
```env
VITE_API_BASE_URL=
```

Notes:
- `ADMIN_TOKEN` est obligatoire.
- En production, definir `NODE_ENV=production` et vos domaines reels dans `CORS_ORIGINS`.
- Si frontend et backend sont sur des domaines differents, definir `VITE_API_BASE_URL` avec l'URL backend (ex: `https://xender-api.onrender.com`).

## 4) Installer les dependances
```bash
cd backend
npm install
cd ..\frontend
npm install
```

## 5) Lancer en developpement
Terminal 1:
```bash
cd backend
npm run dev
```

Terminal 2:
```bash
cd frontend
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## 6) Acces admin
- Login admin frontend: `http://localhost:5173/admin/login`
- Utiliser le token defini dans `ADMIN_TOKEN`

## 7) Endpoints principaux
Public:
- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:slug`
- `GET /api/news`
- `GET /api/news/:id`
- `POST /api/contacts`

Admin (token requis):
- `GET/DELETE /api/admin/contacts`
- `GET/POST/PUT/DELETE /api/admin/news`
- `GET/POST/PUT/DELETE /api/admin/products`
- `GET/POST/PUT/DELETE /api/admin/stats`
- `GET/POST/PUT/DELETE /api/admin/testimonials`

## 8) Build pre-deploiement
Frontend:
```bash
cd frontend
npm run build
```

Backend (verification syntaxe):
```bash
cd backend
node --check src/server.js
node --check src/db.js
```

## 9) Deploiement exact

### Option A (recommandee): Vercel (frontend) + Render (backend + Postgres)
1. Backend sur Render (Web Service)
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Variables Render backend:
  - `NODE_ENV=production`
  - `PORT=4000` (ou laisse Render injecter)
  - `DATABASE_URL=<Render Postgres Internal URL>`
  - `ADMIN_TOKEN=<token-fort>`
  - `CORS_ORIGINS=https://<ton-frontend>.vercel.app`

2. Base PostgreSQL Render
- Creer une DB Postgres Render
- Recuperer l'`Internal Database URL`
- La coller dans `DATABASE_URL` du backend

3. Frontend sur Vercel
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Variables Vercel frontend:
  - `VITE_API_BASE_URL=https://<ton-backend>.onrender.com`

4. Redeployer frontend + backend
- Tester:
  - `https://<frontend>.vercel.app`
  - `https://<backend>.onrender.com/api/health`

### Option B: Vercel (frontend) + Railway (backend + Postgres)
1. Backend Railway
- Service root: `backend`
- Start: `npm start`
- Variables:
  - `NODE_ENV=production`
  - `DATABASE_URL=<Railway Postgres URL>`
  - `ADMIN_TOKEN=<token-fort>`
  - `CORS_ORIGINS=https://<frontend>.vercel.app`

2. Frontend Vercel
- Root: `frontend`
- Env:
  - `VITE_API_BASE_URL=https://<backend>.up.railway.app`

### Option C: Railway fullstack (frontend statique + backend + postgres)
- Backend service: dossier `backend`
- Frontend service: dossier `frontend` (build `npm run build`, servir `dist` via static host Railway/Nixpacks)
- Meme regle CORS/API: `VITE_API_BASE_URL` frontend + `CORS_ORIGINS` backend

## 10) Checklist go-live
- `ADMIN_TOKEN` fort et secret
- `NODE_ENV=production`
- `CORS_ORIGINS` renseigne avec le vrai domaine frontend
- `VITE_API_BASE_URL` renseigne (si domaines differents)
- `DATABASE_URL` pointe la base cloud
- Build frontend OK
- `/api/health` OK
- Formulaire contact enregistre bien dans `contact_requests`
- Login admin OK + CRUD produits/actualites OK
