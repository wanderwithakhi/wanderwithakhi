import os
import glob
import re

content_dir = r"C:\Users\SPURGE\.gemini\antigravity\scratch\wanderwithakhi\src\content"
md_files = glob.glob(os.path.join(content_dir, "**", "*.md"), recursive=True)

short_articles = []

for filepath in md_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    words = len(text.split())
    if words < 2000:
        filename = os.path.basename(filepath)
        title_match = re.search(r'title:\s*"([^"]+)"', text) or re.search(r"title:\s*'([^']+)'", text)
        title = title_match.group(1) if title_match else filename
        short_articles.append((words, filepath, title))

short_articles.sort()

print(f"Total articles under 2,000 words: {len(short_articles)}")
for words, path, title in short_articles[:15]:
    print(f"  - [{words} words] {title} ({os.path.basename(path)})")
