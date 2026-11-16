# Javal Patel — Standalone Portfolio

A standalone, editable portfolio adaptation based on the eight project records in the user's Framer portfolio and the supplied `Projects.zip`. Uses standard **HTML, CSS and JavaScript**, with no build tooling required.

> **Important distinction:** This is **not a native export of the original Framer project**, and is **not visually or functionally identical** to its original complex 3D Mission Tunnel, rider animation, Framer CMS, or Framer form backend. Keep the original Framer site live if those exact features matter.

## How to run

- Double-click `index.html` to open locally, or serve this folder with any static server.
- Recommended local check: `python -m http.server 8000`, then open `http://localhost:8000`.
- Upload this folder to GitHub Pages, Netlify, Cloudflare Pages, Vercel or any static web host.
- All 8 case-study pages use hash routes (`#/work/finchbyte`) so they work on GitHub Pages without redirect rules.

## What's included

- Homepage, Work, About, Contact, eight project detail screens.
- Locally bundled project images sourced from supplied `Projects.zip`.
- Responsive layout, accessible navigation, reduced-motion support, scroll and hover animations.
- Source-code and live-preview links for all eight projects.
- Resume download using a stable GitHub PDF URL.
- Contact details for email, phone, Behance, GitHub and LinkedIn.
- A link to the **working Framer-hosted contact form**, rather than a fake email submission backend.

## Editing

| What you want to change | File |
| --- | --- |
| Project names, summaries, covers, GitHub/demo URLs | `projects.js` |
| Home / About / Contact copy and routing | `app.js` |
| Fonts, colors, layout and animation | `styles.css` |
| Header/footer links and metadata | `index.html` |
| Images | `assets/` |

## Resume updates

The resume links point to `https://github.com/Javal2/Projects/raw/refs/heads/main/Javal_Patel_Resume.pdf`. Replace that PDF in the `Projects` repository using the same filename. The link in this portfolio will remain the same. The current PDF is **not included** in this source package because the hosted copy is available in GitHub already.

## Contact form

The Framer production website has the verified email submission destination. This static package does not include Framer's backend. On Contact, the “Open contact form” button goes to `https://gentle-grapefruit-887176.framer.app/contact`. After changing your Framer domain, update the link in `app.js`.

To run an **independent** contact form on this standalone version, connect your own backend or supported form service first; verify it before accepting public enquiries.

## GitHub deployment options

**Option A — existing `Javal2/Projects` repository:** Put this folder under `portfolio-source/`. Your preview will be `https://javal2.github.io/Projects/portfolio-source/` if that repo has GitHub Pages enabled from `main` / root.

**Option B — dedicated repository:** Create `Javal2/portfolio` and upload this folder's contents to the repository root. Enable GitHub Pages via Settings → Pages → Deploy from branch → `main` / root.

## Custom domain

If you want to preserve Framer's exact design, CMS, animations and verified inquiry form, connect your purchased domain directly to Framer: Site Settings → Hosting → Domains → Connect a domain you own. Use DNS instructions Framer displays. This does **not** require migrating the site to GitHub.

If you want to host this **separate** static adaptation on GitHub Pages under your domain, add it in GitHub Pages settings and follow GitHub's DNS instructions. Don't point the same hostname to both Framer and GitHub Pages.