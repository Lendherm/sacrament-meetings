# Sacrament Meeting Planner

WDD 430 Sacrament Meeting Planner — Next.js App Router, TypeScript, Tailwind CSS, Neon Postgres, and Auth.js.

## Links

- Repository: https://github.com/Lendherm/sacrament-meetings
- Production: https://sacrament-meetings-phi.vercel.app

## Run locally

```bash
npm install
cp .env.example .env.local
# Fill DATABASE_URL, AUTH_SECRET, AUTH_URL, BISHOPRIC_EMAIL, BISHOPRIC_PASSWORD_HASH
npm run dev
```

Open http://localhost:3000

## Authentication (W05)

Bishopric credentials login via Auth.js (Credentials + JWT).

- Login: `/login`
- Protected routes (middleware redirect to login): `/meetings/new`, `/meetings/[id]/edit`
- Server Actions for create/update/delete also require a session
- Demo account (local/Vercel env): `bishop@sunriseward.local` / password set in env hash

## Metadata (W05)

- Site defaults and Open Graph image: `app/layout.tsx` + `app/opengraph-image.png`
- Route metadata examples: `/login`, `/meetings`, `/meetings/[id]` (`generateMetadata`)

## Key routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/login` | Bishopric sign in |
| `/meetings` | Browse / search / paginate |
| `/meetings/new` | Create meeting (auth required) |
| `/meetings/[id]` | Meeting detail + print |
| `/meetings/[id]/edit` | Edit meeting (auth required) |
| `/meetings/current` | Redirects to current Sunday meeting |
