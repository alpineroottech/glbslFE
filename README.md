# Gurans Laghubitta Bittiya Sanstha Ltd. — Frontend

React + TypeScript + Vite frontend for the Gurans Bank (GLBSL) website with bilingual (English/Nepali) support.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **CMS**: Sanity v3 (embedded studio at `/studio`)
- **Styling**: Tailwind CSS + Flowbite
- **Deployment**: Vercel
- **Email**: Resend (serverless via `api/send-email.ts`)

## Getting Started

```bash
npm install
npm run dev        # dev server on http://localhost:3000
npm run build      # production build
npm run preview    # preview production build
```

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

| Variable | Description |
|---|---|
| `VITE_SANITY_PROJECT_ID` | Sanity project ID |
| `VITE_SANITY_DATASET` | Sanity dataset (production) |

The `RESEND_API_KEY` must be set in the **Vercel dashboard** only — never in `.env`.

## CMS Studio

Navigate to `http://localhost:3000/studio` to access Sanity Studio. The studio is embedded directly in the app (no second server needed).

## Documentation

See the `/documentation` folder for setup guides, changelogs, and feature documentation.
