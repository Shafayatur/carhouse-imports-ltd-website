# CarHouse Imports Ltd

A cinematic luxury automobile showroom website built for a Bangladeshi car import and sales business. Vehicles are sourced from Japan and other international markets, clearing through Chittagong port.

---

## Features

- **Hero** — Full-screen parallax video with speedometer loading animation
- **Inventory** — Filterable, searchable catalogue with status badges (Available, Reserved, In Transit, Sold)
- **Vehicle Detail Pages** — Cover image, swappable gallery with lightbox, engine bay section, features checklist, dimensions, full spec table, and acquisition roadmap
- **Wishlist** — Client-side wishlist via React context
- **Consultation & Sourcing** — Enquiry pages for custom vehicle requests
- **Admin-driven** — All content managed from a separate admin dashboard; changes reflect instantly

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Routing | React Router v6 |
| Backend & DB | Supabase (PostgreSQL) |
| Storage | Supabase Storage |
| Deployment | Vercel |

---

## Local Development

```bash
git clone https://github.com/your-username/carhouse-imports.git
cd carhouse-imports
npm install
cp .env.example .env.local
npm run dev
```

**.env.local**
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_HERO_VIDEO_URL=your_hero_video_url
```

---

## Deployment

Deployed on Vercel with a `vercel.json` at the root for SPA routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Pushes to `main` trigger automatic deployment.

---

*Built by Shafayatur Rahman*
