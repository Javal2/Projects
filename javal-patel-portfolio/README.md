# Javal Patel — UI/UX Portfolio

Live Vercel website: https://javal-patel.vercel.app/

This directory contains a **deployable static HTML snapshot of the published portfolio**. It is not Framer's editable canvas/project source. CSS, fonts, scripts and images served from Framer's CDN remain external dependencies, so animations and the contact form may not behave identically after deployment on another host.

## Project structure

- `index.html`, `about.html`, `contact.html`, `work.html`: main pages.
- `work/*.html`: eight project case studies.
- `favicon.png`, `apple-touch-icon.png` (if available): personal JP brand assets.
- `package.json`, `scripts/build.mjs`, `vercel.json`: static Vercel build configuration.

## Run locally

```bash
npm run build
npx serve dist
```

## Deploy to Vercel

Import the repository with **Root Directory** set to `javal-patel-portfolio`, build command `npm run build`, and output directory `dist`. Do **not** connect this import to the existing Vercel project without reviewing its current settings; the live deployment is separately managed.

## Snapshot source

The GitHub Actions workflow `.github/workflows/import-javal-portfolio.yml` fetches these pages from the user's public Vercel site. Updating the site will not automatically refresh this folder unless the workflow runs again.

Known limitations: Framer runtime hydration warnings and cross-domain form submission have not been fully resolved or verified. The canonical live site is https://javal-patel.vercel.app/.
