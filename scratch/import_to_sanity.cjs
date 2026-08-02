const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Retrieve API Token from command arguments
const writeToken = process.argv[2];

if (!writeToken) {
  console.error('❌ Error: Please provide your Sanity Write Token as an argument.');
  console.error('Usage: node scratch/import_to_sanity.cjs <YOUR_WRITE_TOKEN>');
  process.exit(1);
}

// Initialize Sanity Client
const client = createClient({
  projectId: 'y729p0ml',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: writeToken,
  useCdn: false,
});

// Helper to parse Markdown frontmatter and body
function parseMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Split frontmatter and body
  const regex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(regex);
  if (!match) return null;

  const frontmatterStr = match[1];
  const bodyStr = match[2];

  // Parse key-value frontmatter pairs
  const data = {};
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      let val = line.substring(colonIndex + 1).trim();
      // Strip surrounding quotes
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1);
      }
      data[key] = val;
    }
  });

  return { data, body: bodyStr };
}

// Convert plain Markdown text to Sanity Block Content (Portable Text)
function markdownToBlocks(markdownText) {
  const paragraphs = markdownText.split(/\r?\n\r?\n/);
  const blocks = [];

  paragraphs.forEach(paragraph => {
    const text = paragraph.trim();
    if (!text) return;

    let style = 'normal';
    let cleanText = text;
    let listItem = undefined;
    let level = undefined;

    if (text.startsWith('## ')) {
      style = 'h2';
      cleanText = text.substring(3).trim();
    } else if (text.startsWith('### ')) {
      style = 'h3';
      cleanText = text.substring(4).trim();
    } else if (text.startsWith('> ')) {
      style = 'blockquote';
      cleanText = text.substring(2).trim();
    } else if (text.startsWith('- ') || text.startsWith('* ')) {
      listItem = 'bullet';
      cleanText = text.substring(2).trim();
      level = 1;
    } else if (/^\d+\.\s+/.test(text)) {
      listItem = 'number';
      cleanText = text.replace(/^\d+\.\s+/, '').trim();
      level = 1;
    }

    blocks.push({
      _type: 'block',
      _key: Math.random().toString(36).substring(2, 11),
      style: style,
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: Math.random().toString(36).substring(2, 11),
          text: cleanText,
          marks: [],
        },
      ],
      ...(listItem ? { listItem, level } : {}),
    });
  });

  return blocks;
}

// Read and upload documents from directories
const categories = [
  { dir: 'travel', section: 'travel' },
  { dir: 'mindfulness', section: 'mindfulness' },
  { dir: 'wellness', section: 'wellness' },
];

const contentRoot = path.join(__dirname, '..', 'src', 'content');

async function migrate() {
  console.log('🔄 Starting migration to Sanity CMS...');

  for (const cat of categories) {
    const dirPath = path.join(contentRoot, cat.dir);
    if (!fs.existsSync(dirPath)) {
      console.log(`⚠️ Folder missing, skipping: ${cat.dir}`);
      continue;
    }

    const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.md'));
    console.log(`📂 Migrating ${files.length} articles from: ${cat.dir}`);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const parsed = parseMarkdown(filePath);
      if (!parsed) {
        console.error(`❌ Could not parse frontmatter in: ${file}`);
        continue;
      }

      const { data, body } = parsed;
      const slug = file.replace('.md', '');

      // Format publish date to YYYY-MM-DD
      let publishDateStr = new Date().toISOString().split('T')[0];
      if (data.publishDate) {
        try {
          publishDateStr = new Date(data.publishDate).toISOString().split('T')[0];
        } catch (e) {
          // Fallback to today
        }
      }

      const docId = `imported-${cat.section}-${slug}`;

      const document = {
        _type: 'post',
        _id: docId, // Unique ID for upserting
        title: data.title || slug.replace(/-/g, ' '),
        slug: {
          _type: 'slug',
          current: slug,
        },
        description: data.description || '',
        section: cat.section,
        category: data.category || 'General',
        location: data.location || undefined,
        publishDate: publishDateStr,
        duration: data.duration || '5 min read',
        body: markdownToBlocks(body),
      };

      try {
        await client.createOrReplace(document);
        console.log(`✅ Uploaded: [${cat.section.toUpperCase()}] ${document.title}`);
      } catch (err) {
        console.error(`❌ Failed uploading ${file}:`, err.message);
      }
    }
  }

  console.log('🎉 Migration completed successfully!');
}

migrate().catch(console.error);
