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

Listings are seeded in [`lib/data.ts`](lib/data.ts). By default, anything
added or changed via the Admin panel is persisted to the browser's
`localStorage` (see [`lib/store.ts`](lib/store.ts)) — it will not sync
across devices or survive clearing browser data.

### Optional: a real, shared database (Azure Cosmos DB)

The app is already wired to use [Azure Cosmos DB](https://azure.microsoft.com/products/cosmos-db)
instead of `localStorage` the moment it's configured — nothing else to
change. Copy [`.env.local.example`](.env.local.example) to `.env.local`
and fill in `COSMOS_ENDPOINT` / `COSMOS_KEY` from your Cosmos DB account
(also add them in your host's environment variable settings for the
deployed site). The `cars` container is created and seeded automatically
on first use. See the deployment guide for the full setup walkthrough.

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
