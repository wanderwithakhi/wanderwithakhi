import os
import glob

src_dir = r"C:\Users\SPURGE\.gemini\antigravity\scratch\wanderwithakhi\src"
files = glob.glob(os.path.join(src_dir, "**", "*.*"), recursive=True)

replaced_count = 0
file_count = 0

for filepath in files:
    if not (filepath.endswith('.md') or filepath.endswith('.astro') or filepath.endswith('.html') or filepath.endswith('.json')):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if '/Digital_Products/' in content:
        new_content = content.replace('/Digital_Products/', '/digital_products/')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        replaced_count += content.count('/Digital_Products/')
        file_count += 1

print(f"Replaced {replaced_count} occurrences of '/Digital_Products/' across {file_count} files.")
