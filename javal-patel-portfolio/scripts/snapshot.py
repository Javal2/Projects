#!/usr/bin/env python3
"""Refresh the static portfolio HTML snapshot from the public live Vercel site.

This is the published Framer-generated HTML mirror, NOT editable Framer canvas source.
External Framer CDN assets remain external; preserve as-is.
"""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError
import time

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://javal-patel.vercel.app"
ROUTES = [
    ("/", "index.html"),
    ("/about", "about.html"),
    ("/contact", "contact.html"),
    ("/work", "work.html"),
    ("/work/bongwholesale", "work/bongwholesale.html"),
    ("/work/bulkpharmachem", "work/bulkpharmachem.html"),
    ("/work/finchbyte", "work/finchbyte.html"),
    ("/work/flemming-pharma", "work/flemming-pharma.html"),
    ("/work/fortis-dental", "work/fortis-dental.html"),
    ("/work/tiffin-world", "work/tiffin-world.html"),
    ("/work/united-metal", "work/united-metal.html"),
    ("/work/vise-organic", "work/vise-organic.html"),
    ("/404", "404.html"),
]
ASSETS = ["/favicon.png", "/favicon.ico", "/apple-touch-icon.png", "/robots.txt", "/sitemap.xml"]


def download(path: str) -> bytes:
    last = None
    for attempt in range(3):
        try:
            req = Request(BASE + path, headers={"User-Agent": "JavalPortfolioGitHubSnapshot/1.0", "Accept": "*/*"})
            with urlopen(req, timeout=40) as response:
                if response.status != 200:
                    raise RuntimeError(f"Unexpected HTTP status {response.status} for {path}")
                return response.read()
        except Exception as error:
            last = error
            time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"Cannot download {path}: {last}")


def main() -> None:
    for route, filename in ROUTES:
        content = download(route)
        if b"<html" not in content.lower() or b"</html>" not in content.lower():
            raise RuntimeError(f"Non-HTML response for {route}")
        path = ROOT / filename
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(content)
        print(f"Saved {filename}: {len(content):,} bytes")

    for route in ASSETS:
        content = download(route)
        if route == "/favicon.png" and not content.startswith(b"\x89PNG\r\n\x1a\n"):
            raise RuntimeError("favicon.png did not return a PNG file")
        path = ROOT / route.lstrip("/")
        path.write_bytes(content)
        print(f"Saved {path.name}: {len(content):,} bytes")
    print("Portfolio snapshot saved successfully. External Framer CDN assets are not copied.")


if __name__ == "__main__":
    main()
