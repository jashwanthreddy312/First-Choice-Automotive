# First Choice Motors

A demo used-car marketplace inspired by Cars24 and Spinny, built with
Next.js (App Router), TypeScript, and Tailwind CSS.

## Features

- Browse listings with search, brand/fuel/transmission filters, a budget
  slider, and sorting (`app/page.tsx`)
- Listing detail page with a callback/test-drive request (`app/cars/[id]`)
- "Sell your car" lead form that adds a `Pending Inspection` listing
  (`app/sell`)
- A demo admin panel to add/edit/delete listings (`app/admin`) — password
  gated for demo purposes only, **not real authentication**

Listings are seeded in [`lib/data.ts`](lib/data.ts). Anything added via the
Sell form or Admin panel is persisted to the browser's `localStorage`
(see [`lib/store.ts`](lib/store.ts)) — it will not sync across devices or
survive clearing browser data. Swap in Supabase (or another database) for
real, shared persistence — see the deployment guide provided alongside this
project for step-by-step instructions.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying

See the full deployment + strategy guide delivered with this project. Quick
version: push this repo to GitHub, import it on [vercel.com](https://vercel.com),
and Vercel builds and deploys it automatically.
