# LOLEK Plumbing — CLAUDE.md

**Type:** client-website (see master CLAUDE.md in parent directory for full standards)

## Client Details
- **Business:** LOLEK Plumbing — heating engineer and plumber
- **Domain:** www.lolek.plumbing
- **Contact:** Kris, 07549 251073, info@lolek.plumbing
- **Tier:** Starter/Business (contact form, services, portfolio, reviews, bilingual)

## Brand
- **Primary colour:** #3498db (blue)
- **Accent colours:** #e74c3c (red), #27ae60 (green), #f39c12 (yellow)
- **Font:** Plus Jakarta Sans (variable WOFF2, self-hosted)
- **Theme:** Dark (#1a1a2e background)

## Project-Specific Notes
- **Bilingual:** EN (default, no URL prefix) + PL (/pl prefix). Translations in `src/dictionaries/`.
- **Reviews:** 55 static reviews from Rated People, managed in `src/lib/reviews.ts`. Shuffled server-side, 12 displayed per load.
- **Gas Safe:** Certification badge displayed on all pages, links to Gas Safe register.
- **i18n routing:** `src/proxy.ts` rewrites `/` to `/en` internally, redirects `/en` to `/`.
- **Service areas:** Colchester, Ipswich, Braintree, Witham, Chelmsford, Clacton, Harwich, Manningtree, Sudbury, Halstead, Tiptree, Wivenhoe.
