import os
import glob
import re

content_dir = r"C:\Users\SPURGE\.gemini\antigravity\scratch\wanderwithakhi\src\content"
output_txt = r"F:\Wanderwithakhi\copy_paste_to_googlesheets.txt"

md_files = glob.glob(os.path.join(content_dir, "**", "*.md"), recursive=True)

lines = []
lines.append("Article ID\tTitle\tCategory\tSection\tPublish Date\tWord Count\tRAG Answer Block\tFAQ Schema\tProduct Funnel Link\tCanonical URL\tTarget AI Engines")

art_count = 1
for filepath in sorted(md_files):
    filename = os.path.basename(filepath)
    slug = filename.replace('.md', '')
    rel_path = os.path.relpath(filepath, content_dir)
    folder_type = rel_path.split(os.sep)[0] if os.sep in rel_path else "blog"
    
    with open(filepath, 'r', encoding='utf-8') as file:
        text = file.read()
        
    title_match = re.search(r'title:\s*"([^"]+)"', text) or re.search(r"title:\s*'([^']+)'", text) or re.search(r"title:\s*(.+)", text)
    title = title_match.group(1).strip() if title_match else slug.replace('-', ' ').title()
    
    cat_match = re.search(r'category:\s*"([^"]+)"', text) or re.search(r"category:\s*'([^']+)'", text) or re.search(r"category:\s*(.+)", text)
    category = cat_match.group(1).strip() if cat_match else folder_type.capitalize()
    
    date_match = re.search(r'publishDate:\s*(.+)', text)
    publish_date = date_match.group(1).strip() if date_match else "2026-08-01"
    
    words = len(text.split())
    has_rag = "Direct Answer Block" in text or "GEO Summary" in text or "Direct Answer" in text
    has_faq = "faqs:" in text or "Frequently Asked Questions" in text
    has_product_link = "digital_products" in text or "/guide" in text
    canonical_url = f"https://wanderwithakhi.com/blog/{folder_type}/{slug}"
    
    art_id = f"ART-{art_count:03d}"
    art_count += 1
    
    rag_str = "Yes" if has_rag else "Standard"
    faq_str = "Yes" if has_faq else "Standard"
    prod_str = "Yes" if has_product_link else "Global Banner"
    
    lines.append(f"{art_id}\t{title}\t{category}\t{folder_type}\t{publish_date}\t{words}\t{rag_str}\t{faq_str}\t{prod_str}\t{canonical_url}\tGoogle AI / Perplexity / ChatGPT")

with open(output_txt, 'w', encoding='utf-8') as f:
    f.write("\n".join(lines))

print(f"Generated {len(lines)-1} rows in {output_txt}")
