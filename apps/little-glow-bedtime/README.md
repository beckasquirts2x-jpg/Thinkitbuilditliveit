# Little Glow Bedtime

A calm, mobile-first kids bedtime web app by **Hattie Watson**.

Follow tiny firefly **Pip** as she helps dark moon **Luma** remember how to shine in *The Moon Forgot Its Glow* — with lullaby lyric pages, a sleep timer, favorites, and a soft one-time unlock.

## Features

- **Story:** *The Moon Forgot Its Glow* (10 chapters)
- **Songs:** 6 lullaby lyric pages with “Add Suno audio later” placeholders
- **Sleep timer:** 5 / 10 / 15 / 30 minutes → Sleepy mode overlay
- **Favorites:** saved in `localStorage`
- **Monetization (v1):**
  - Free core: home, timer, favorites, Chapter 1, 2 song samples
  - Soft tip jar: “Buy me a cocoa” (mailto placeholder)
  - Optional one-time **Unlock Full Glow** ($3.99 shown) via `localStorage` flag — **no Stripe yet**, **no ads**, **no subscription**

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Deploy on Vercel (free)

1. Push this repo to GitHub (already set up for `Thinkitbuilditliveit`).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the GitHub repo.
3. Framework preset: **Next.js** (auto-detected).
4. Click **Deploy**. No env vars required for v1.
5. Optional: add a custom domain later in Project Settings → Domains.

## Unlock behavior (v1)

- Locked users see Chapter 1 + songs 1–2 (Little Firefly’s Song, Luma’s Sad Song).
- Unlocking sets `localStorage.little-glow-unlocked = "true"` and reveals all chapters, all songs, and audio slots.
- Use **Reset unlock (dev / testing)** on the Unlock page to re-test the gated flow.

## Project layout

```
src/app/           # routes: home, story, songs, timer, favorites, unlock
src/components/    # Nav, unlock CTA, tip jar, timer overlay, etc.
src/lib/content.ts # story chapters + song lyrics
src/hooks/         # unlock, favorites, sleep timer
```

## Content note

Story and songs © as assigned by Hattie Watson. Keep **Luma dark** in every scene until the finale.

---

Made with a little glow ✨
