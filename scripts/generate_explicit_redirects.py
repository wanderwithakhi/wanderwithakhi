import os
import glob
import json

content_dir = r"C:\Users\SPURGE\.gemini\antigravity\scratch\wanderwithakhi\src\content"
md_files = glob.glob(os.path.join(content_dir, "**", "*.md"), recursive=True)

explicit_redirects = [
    {
        "source": "/Digital_Products/:path*",
        "destination": "/digital_products/:path*",
        "permanent": True
    },
    {
        "source": "/digital-products/:path*",
        "destination": "/digital_products/:path*",
        "permanent": True
    },
    {
        "source": "/sitemap.xml",
        "destination": "/sitemap-index.xml",
        "permanent": True
    }
]

# For every markdown file, create explicit redirects from both /essays/type/slug AND /essays/slug -> /blog/type/slug
for filepath in sorted(md_files):
    rel_path = os.path.relpath(filepath, content_dir)
    parts = rel_path.split(os.sep)
    if len(parts) >= 2:
        section = parts[0]
        slug = parts[1].replace('.md', '')
        
        # 1. /essays/section/slug -> /blog/section/slug
        explicit_redirects.append({
            "source": f"/essays/{section}/{slug}",
            "destination": f"/blog/{section}/{slug}",
            "permanent": True
        })
        
        # 2. /essays/slug -> /blog/section/slug (Fix single-level legacy URLs)
        explicit_redirects.append({
            "source": f"/essays/{slug}",
            "destination": f"/blog/{section}/{slug}",
            "permanent": True
        })
        
        # 3. /blog/slug -> /blog/section/slug (Fix single-level blog URLs)
        explicit_redirects.append({
            "source": f"/blog/{slug}",
            "destination": f"/blog/{section}/{slug}",
            "permanent": True
        })

# Wildcard fallback to /blog for any unhandled /essays path
explicit_redirects.append({
    "source": "/essays/:path*",
    "destination": "/blog",
    "permanent": True
})

vercel_config = {
    "redirects": explicit_redirects
}

vercel_json_path = r"C:\Users\SPURGE\.gemini\antigravity\scratch\wanderwithakhi\vercel.json"
with open(vercel_json_path, 'w', encoding='utf-8') as f:
    json.dump(vercel_config, f, indent=2)

print(f"Generated {len(explicit_redirects)} explicit redirect rules in vercel.json!")
