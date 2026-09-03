import os
import glob
import re

content_dir = r"C:\Users\SPURGE\.gemini\antigravity\scratch\wanderwithakhi\src\content"

md_files = glob.glob(os.path.join(content_dir, "**", "*.md"), recursive=True)

categories = {}
keywords_found = []
faqs_count = 0
product_links_count = 0

for f in md_files:
    with open(f, 'r', encoding='utf-8') as file:
        text = file.read()
        
        # Category
        cat_match = re.search(r'category:\s*"([^"]+)"', text)
        if cat_match:
            cat = cat_match.group(1)
            categories[cat] = categories.get(cat, 0) + 1
        
        # FAQs
        if 'faqs:' in text:
            faqs_count += 1
            
        # Product links
        if 'digital_products' in text or '/guide' in text:
            product_links_count += 1

print(f"Total Content Collection Files: {len(md_files)}")
print(f"Articles with Schema FAQs: {faqs_count}")
print(f"Articles with Digital Product Links: {product_links_count}")
print("\nCategory Breakdown:")
for cat, count in categories.items():
    print(f"  - {cat}: {count} articles")
