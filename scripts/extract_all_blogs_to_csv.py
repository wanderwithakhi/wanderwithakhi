import os
import glob
import re
import csv

content_dir = r"C:\Users\SPURGE\.gemini\antigravity\scratch\wanderwithakhi\src\content"
output_csv_f = r"F:\Wanderwithakhi\all_blogs_progress_tracker.csv"
output_csv_local = r"C:\Users\SPURGE\.gemini\antigravity\scratch\wanderwithakhi\all_blogs_progress_tracker.csv"

md_files = glob.glob(os.path.join(content_dir, "**", "*.md"), recursive=True)

rows = []
art_count = 1

for filepath in sorted(md_files):
    filename = os.path.basename(filepath)
    slug = filename.replace('.md', '')
    
    # Determine type folder (travel, mindfulness, wellness, reflections)
    rel_path = os.path.relpath(filepath, content_dir)
    folder_type = rel_path.split(os.sep)[0] if os.sep in rel_path else "blog"
    
    with open(filepath, 'r', encoding='utf-8') as file:
        text = file.read()
        
    # Extract Frontmatter Title
    title_match = re.search(r'title:\s*"([^"]+)"', text) or re.search(r"title:\s*'([^']+)'", text) or re.search(r"title:\s*(.+)", text)
    title = title_match.group(1).strip() if title_match else slug.replace('-', ' ').title()
    
    # Extract Category
    cat_match = re.search(r'category:\s*"([^"]+)"', text) or re.search(r"category:\s*'([^']+)'", text) or re.search(r"category:\s*(.+)", text)
    category = cat_match.group(1).strip() if cat_match else folder_type.capitalize()
    
    # Extract Date
    date_match = re.search(r'publishDate:\s*(.+)', text)
    publish_date = date_match.group(1).strip() if date_match else "2026-08-01"
    
    # Calculate Word Count
    words = len(text.split())
    
    # Checks
    has_rag = "Direct Answer Block" in text or "GEO Summary" in text or "Direct Answer" in text
    has_faq = "faqs:" in text or "Frequently Asked Questions" in text
    has_product_link = "digital_products" in text or "/guide" in text
    
    canonical_url = f"https://wanderwithakhi.com/blog/{folder_type}/{slug}"
    
    art_id = f"ART-{art_count:03d}"
    art_count += 1
    
    rows.append({
        "Article ID": art_id,
        "Title": title,
        "Category": category,
        "Section": folder_type,
        "Publish Date": publish_date,
        "Word Count": words,
        "RAG Answer Block": "Yes" if has_rag else "Standard",
        "FAQ Schema": "Yes" if has_faq else "Standard",
        "Product Funnel Link": "Yes" if has_product_link else "Global Banner",
        "Canonical URL": canonical_url,
        "Target AI Engines": "Google AI / Perplexity / ChatGPT"
    })

# Write CSV to F:\Wanderwithakhi\
fieldnames = ["Article ID", "Title", "Category", "Section", "Publish Date", "Word Count", "RAG Answer Block", "FAQ Schema", "Product Funnel Link", "Canonical URL", "Target AI Engines"]

for out_path in [output_csv_f, output_csv_local]:
    try:
        with open(out_path, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for r in rows:
                writer.writerow(r)
        print(f"Successfully extracted {len(rows)} articles to {out_path}")
    except Exception as e:
        print(f"Error writing to {out_path}: {e}")
