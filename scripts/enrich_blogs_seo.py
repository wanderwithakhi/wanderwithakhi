import os
import re

content_dir = r"C:\Users\SPURGE\.gemini\antigravity\scratch\wanderwithakhi\src\content"

# 1. Update all /essays/ links to /blog/ across all markdown files
for root, dirs, files in os.walk(content_dir):
    for f in files:
        if f.endswith('.md'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                text = file.read()
            
            # Replace /essays/ with /blog/
            if '/essays/' in text:
                text = text.replace('/essays/', '/blog/')
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(text)
                print(f"Updated /essays/ links in {f}")

print("Completed link normalization from /essays/ to /blog/.")
