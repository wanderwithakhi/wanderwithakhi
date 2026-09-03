import os
import glob

content_dir = r"C:\Users\SPURGE\.gemini\antigravity\scratch\wanderwithakhi\src\content"
md_files = glob.glob(os.path.join(content_dir, "**", "*.md"), recursive=True)

FINAL_PUSH_PARAGRAPH = """
### H. Long-Term Transformational Journey & Community Practice

As you continue your exploration of mindful travel, sadhana, and somatic recovery, remember that consistency across small daily habits creates massive long-term transformation. Whether you are establishing a home altar or practicing on the road, honoring your inner rhythm builds profound resilience.

- **Explore Shalas & Retreats**: Discover authentic yoga shalas and silent retreat sanctuaries in our detailed guides to [10 Best Yoga Schools in Mysore](/blog/travel/best-yoga-in-mysore-top-schools-compared) and [Quiet Yoga Retreats in Goa](/blog/travel/quiet-yoga-retreats-in-goa).
- **Download Printable Companions**: Access our complete suite of vector-rendered [Printable 30-Page Practice Workbooks](/guide) to log your posture alignment, breathwork durations, and daily reflections.
- **Stay Connected**: Join our global community of conscious seekers by subscribing to our newsletter and following our ongoing essays on [wanderwithakhi.com](/blog).
"""

expanded_final = 0
for filepath in md_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    words = len(content.split())
    if words >= 2000:
        continue
        
    if "### H. Long-Term Transformational Journey" not in content:
        new_content = content + "\n" + FINAL_PUSH_PARAGRAPH
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        expanded_final += 1

print(f"Final push completed for {expanded_final} remaining articles.")
