import os

content_dir = r"C:\Users\SPURGE\.gemini\antigravity\scratch\wanderwithakhi\src\content"

replacements = {
    "product_1_sadhana_journal/readme.md": "product_1_sadhana_journal/full_30_pages.html",
    "product_2_somatic_planner/readme.md": "product_2_somatic_planner/full_30_pages.html",
    "product_3_dinacharya_guide/readme.md": "product_3_dinacharya_guide/full_30_pages.html",
    "product_4_slow_travel_journal/readme.md": "product_4_slow_travel_journal/full_30_pages.html",
    "product_5_lunar_planner/readme.md": "product_5_lunar_planner/full_30_pages.html",
    "product_6_chakra_journal/readme.md": "product_6_chakra_journal/full_30_pages.html",
    "product_7_yin_somatic_guide/readme.md": "product_7_yin_somatic_guide/full_30_pages.html",
}

count = 0
for root, dirs, files in os.walk(content_dir):
    for f in files:
        if f.endswith('.md'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                text = file.read()
            
            modified = False
            for old_link, new_link in replacements.items():
                if old_link in text:
                    text = text.replace(old_link, new_link)
                    modified = True
            
            if modified:
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(text)
                count += 1
                print(f"Fixed product links in {f}")

print(f"Updated product links in {count} blog articles.")
