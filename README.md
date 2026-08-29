# First-Choice Automotive

A demo dealership site inspired by Cars24 and Spinny, built with
Next.js (App Router), TypeScript, and Tailwind CSS. This is a pure
dealership model — the site only lists inventory the dealership owns;
there's no public "sell your car" intake flow.

## Features

- Browse listings with search, brand/fuel/transmission filters, a budget
  slider, and sorting (`app/page.tsx`)
- Listing detail page with a callback/test-drive request, or a "sold"
  notice once a car is marked sold (`app/cars/[id]`)
- A demo admin panel to add/edit/delete listings, upload real photos, and
  toggle a listing between `Live` and `Sold` (`app/admin`) — password
  gated for demo purposes only, **not real authentication**. Sold cars
  stay visible to visitors with a "Sold" badge rather than disappearing.
- A locations page listing branch hubs with maps (`app/locations`)

Listings are seeded in [`lib/data.ts`](lib/data.ts). Anything added or
changed via the Admin panel is persisted to the browser's `localStorage`
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
