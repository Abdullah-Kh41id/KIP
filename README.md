# KIP — Knowledge in Play

Turn books into story-mode campaigns. You are the main character acquiring knowledge; each book is a game you complete.

## First campaign

**The Almanack of Naval Ravikant** — eight stages from wealth creation through philosophy & presence.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Progress persisted in `localStorage` (no backend)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project layout

```
src/
  app/                 # App Router entry
  components/          # UI shell (sidebar, top bar, stage content)
  data/campaigns/      # Hardcoded campaign content (extend here)
  hooks/               # Client progress hook
  lib/                 # Progress logic + localStorage
  types/               # Campaign & progress types
```

## Extending

1. Add a new campaign file under `src/data/campaigns/`.
2. Register it in `src/data/campaigns/index.ts`.
3. Later: PDF upload + AI stage generation can plug into the same `Campaign` / `CampaignStage` types.
