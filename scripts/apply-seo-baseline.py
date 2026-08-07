"""Apply and verify HLC's non-visual technical SEO baseline.

This script intentionally changes metadata only. It does not alter page layout.
"""

from __future__ import annotations

import argparse
import html
import json
import re
import subprocess
from datetime import date
from pathlib import Path
from urllib.parse import urlparse


SITE_ORIGIN = "https://hlctex.com"
ROBOTS_VALUE = (
    "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
)


def git_output(repo: Path, *args: str) -> str:
    return subprocess.check_output(
        ["git", *args], cwd=repo, text=True, encoding="utf-8"
    ).strip()


def tracked_html(repo: Path) -> list[Path]:
    return [repo / item for item in git_output(repo, "ls-files", "*.html").splitlines()]


def attribute(tag: str, name: str) -> str:
    match = re.search(rf"\b{name}=[\"']([^\"']*)", tag, re.I)
    return html.unescape(match.group(1)) if match else ""


def add_robots_meta(text: str) -> str:
    if re.search(r'<meta[^>]+name=["\']robots["\']', text, re.I):
        return text
    marker = re.search(r"<meta\b[^>]*name=[\"']description[\"'][^>]*>", text, re.I)
    if marker:
        pos = marker.end()
        return text[:pos] + f'\n<meta name="robots" content="{ROBOTS_VALUE}">' + text[pos:]
    return text.replace(
        "</head>", f'  <meta name="robots" content="{ROBOTS_VALUE}">\n</head>', 1
    )


def breadcrumb_schema(text: str, canonical: str) -> dict | None:
    nav_match = re.search(
        r'<nav[^>]+class=["\'][^"\']*catalog-breadcrumbs[^"\']*["\'][^>]*>(.*?)</nav>',
        text,
        re.I | re.S,
    )
    if not nav_match:
        return None
    items: list[dict] = []
    for li in re.findall(r"<li\b[^>]*>(.*?)</li>", nav_match.group(1), re.I | re.S):
        link = re.search(r"<a\b([^>]*)>(.*?)</a>", li, re.I | re.S)
        if link:
            href = attribute(link.group(1), "href")
            name = re.sub(r"<[^>]+>", "", link.group(2))
            item = href if href.startswith("http") else SITE_ORIGIN + href
        else:
            name = re.sub(r"<[^>]+>", "", li)
            item = canonical
        name = html.unescape(re.sub(r"\s+", " ", name).strip())
        if name:
            items.append(
                {
                    "@type": "ListItem",
                    "position": len(items) + 1,
                    "name": name,
                    "item": item,
                }
            )
    if len(items) < 2:
        return None
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items,
    }


def add_product_breadcrumb(text: str) -> str:
    if '"@type": "BreadcrumbList"' in text:
        return text
    canonical_tag = next(
        (
            tag
            for tag in re.findall(r"<link\b[^>]*>", text, re.I)
            if re.search(r"\brel=[\"']canonical[\"']", tag, re.I)
        ),
        "",
    )
    canonical = attribute(canonical_tag, "href")
    payload = breadcrumb_schema(text, canonical)
    if not payload:
        return text
    block = (
        '<script type="application/ld+json">\n'
        + json.dumps(payload, ensure_ascii=False, indent=2)
        + "\n</script>\n"
    )
    return text.replace("</head>", block + "</head>", 1)


def update_pages(repo: Path) -> list[str]:
    changed: list[str] = []
    for path in tracked_html(repo):
        text = path.read_text(encoding="utf-8")
        if "noindex" in text.lower():
            continue
        updated = add_robots_meta(text)
        if "/textile/products/" in updated and "product-template" not in path.as_posix():
            updated = add_product_breadcrumb(updated)
        if updated != text:
            path.write_text(updated, encoding="utf-8")
            changed.append(path.relative_to(repo).as_posix())
    return changed


def update_sitemap(repo: Path, changed: set[str]) -> None:
    sitemap = repo / "sitemap.xml"
    text = sitemap.read_text(encoding="utf-8")

    def replace_entry(match: re.Match[str]) -> str:
        url, old_date = match.group(1), match.group(2)
        route = urlparse(url).path.strip("/")
        rel = f"{route}/index.html" if route else "index.html"
        if rel in changed:
            new_date = date.today().isoformat()
        else:
            new_date = git_output(repo, "log", "-1", "--format=%ad", "--date=short", "--", rel)
            new_date = new_date or old_date
        return match.group(0).replace(
            f"<lastmod>{old_date}</lastmod>", f"<lastmod>{new_date}</lastmod>"
        )

    updated = re.sub(
        r"<url><loc>(https://hlctex\.com/.*?)</loc><lastmod>([^<]+)</lastmod>.*?</url>",
        replace_entry,
        text,
    )
    if updated != text:
        sitemap.write_text(updated, encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    repo = args.repo.resolve()
    before = set(filter(None, git_output(repo, "diff", "--name-only").splitlines()))
    changed = update_pages(repo)
    update_sitemap(repo, before | set(changed))
    print(f"Updated {len(changed)} HTML files and synchronized sitemap lastmod dates.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
