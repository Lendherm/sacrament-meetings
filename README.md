# Sacrament Meeting Planner

WDD 430 Week 02 assignment — Sunrise Ward sacrament meeting planner built with Next.js App Router, TypeScript, and Tailwind CSS.

## Links

- Repository: https://github.com/Lendherm/sacrament-meetings
- Development branch: `peer-code-review`

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Key routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/meetings` | All meetings |
| `/meetings/[id]` | Meeting detail + print |
| `/meetings/current` | Redirects to current Sunday meeting |
| `/api/meetings` | Meeting collection API |
| `/api/meetings?date=YYYY-MM-DD` | Filter by date |
| `/api/meetings/[id]` | Single meeting API |

## Notes

- Meeting data is stored in-memory in `lib/meetings-db.ts` for this week.
- `main` contains only the Next.js scaffold.
- Assignment implementation lives on `peer-code-review`.
