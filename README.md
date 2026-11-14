# Projects

Eight website projects and their source files. Six static website previews can be hosted together through GitHub Pages. Tiffin World and Fortis Dental have their own live domains.

## Live websites

- [Tiffin World](https://tiffinworld.com/)
- [Fortis Dental — Canada](https://www.fortisdentalclinic.ca/)

## GitHub Pages preview links

**Pages must first be enabled:** in this repository, choose **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**.

After GitHub Pages finishes publishing, the six previews will be accessible at:

| Project | Preview | Source folder |
| --- | --- | --- |
| Finchbyte | [Preview](https://javal2.github.io/Projects/Finchbyte/) | `Finchbyte/` |
| BulkPharmaChem | [Preview](https://javal2.github.io/Projects/BulkPharmaChem/) | `BulkPharmaChem/` |
| Flemming Pharma | [Preview](https://javal2.github.io/Projects/Flemming%20pharma/) | `Flemming pharma/` |
| Vise Organic | [Preview](https://javal2.github.io/Projects/vise%20organic/) | `vise organic/` |
| BongWholesale | [Preview](https://javal2.github.io/Projects/BongWholesale/) | `BongWholesale/` |
| United Metal | [Preview](https://javal2.github.io/Projects/United%20Metal/) | `United Metal/` |

The [preview directory](https://javal2.github.io/Projects/) is provided by the repository-root `index.html`. The `.nojekyll` file preserves static folders and assets on GitHub Pages.

## Included projects

- BongWholesale
- BulkPharmaChem
- Finchbyte
- Flemming Pharma
- Tiffin World (contains website, customer, vendor and admin sections)
- United Metal
- Fortis Dental (`dental/`)
- Vise Organic

## Preview limitations

These projects contain static HTML/CSS/JavaScript files. GitHub Pages serves the visual frontend and client-side interactions, but cannot run PHP, Node.js servers, server-side authentication, databases, payments, or email/form backends. Production integration is needed for those functions. Assets and intra-site links depend on their relative paths.

## Local use

Open each project's `index.html` (Tiffin World uses `website/index.html`) or serve its folder with a static HTTP server.
