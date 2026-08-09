const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'y729p0ml',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
});

async function check() {
  try {
    console.log('Querying posts from Sanity...');
    const query = `*[_type == "post"] {
      title,
      publishDate,
      section,
      category
    } | order(publishDate desc)`;
    
    const posts = await client.fetch(query);
    console.log(`Found ${posts.length} posts:`);
    posts.forEach((p, idx) => {
      console.log(`${idx + 1}. [${p.publishDate}] [${p.section}/${p.category}] "${p.title}"`);
    });
  } catch (e) {
    console.error('Error fetching from Sanity:', e.message);
  }
}

check();
