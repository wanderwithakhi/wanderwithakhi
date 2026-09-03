import os
import glob
import re

content_dir = r"C:\Users\SPURGE\.gemini\antigravity\scratch\wanderwithakhi\src\content"
md_files = glob.glob(os.path.join(content_dir, "**", "*.md"), recursive=True)

short_articles = []
sufficient_articles = []

for filepath in sorted(md_files):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    words = len(text.split())
    filename = os.path.basename(filepath)
    title_match = re.search(r'title:\s*"([^"]+)"', text) or re.search(r"title:\s*'([^']+)'", text) or re.search(r"title:\s*(.+)", text)
    title = title_match.group(1).strip() if title_match else filename
    
    if words < 2000:
        short_articles.append((words, filename, title))
    else:
        sufficient_articles.append((words, filename, title))

print(f"=== WORD COUNT AUDIT SUMMARY ===")
print(f"Total Articles Analyzed: {len(md_files)}")
print(f"Articles with 2,000+ words: {len(sufficient_articles)}")
print(f"Articles under 2,000 words: {len(short_articles)}")

if short_articles:
    print("\n--- ARTICLES UNDER 2,000 WORDS ---")
    for words, fname, title in short_articles:
        print(f"  - [{words} words] {title} ({fname})")

print("\n--- ARTICLES 2,000+ WORDS ---")
for words, fname, title in sufficient_articles:
    print(f"  - [{words} words] {title} ({fname})")
