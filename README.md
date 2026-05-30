# CV.gen — Générateur de CV avec IA Générative

Application web de génération automatique de CV et lettres de
motivation propulsée par Gemini 1.5 Flash (LLM/Transformer de Google).

## Modèle génératif utilisé
- **Gemini 1.5 Flash** (Google) — LLM / Transformer
- Génère : profil professionnel, amélioration des descriptions
  de projets, lettre de motivation personnalisée

## Fonctionnalités
- Formulaire intelligent en 2 étapes (Informations + Parcours)
- Preview CV en temps réel
- Génération du contenu par IA (Gemini 1.5 Flash)
- Lettre de motivation optionnelle
- Export PDF en un clic

## Stack technique
- Frontend : React + Vite
- Backend : Node.js + Express
- IA : Google Gemini 1.5 Flash API
- PDF : html2pdf.js

## Lancer le projet en local

### Backend
```
cd backend
npm install
node index.js
```

### Frontend
```
cd frontend
npm install
npm run dev
```

Ouvrir http://localhost:5173

## Variables d'environnement
Créer `backend/.env` :
```
GEMINI_API_KEY=ta_clé_api
```

## Étudiante
- Nakkayi Aya — ENSTAB, Cycle Ingénieur
  Digitalisation et Analyse de Données

## Cours
IA Générative — Mme Amira Echtioui — 2025/2026
