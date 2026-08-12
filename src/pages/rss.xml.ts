import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const travelPosts = await getCollection('travel');
  const mindfulnessPosts = await getCollection('mindfulness');
  const wellnessPosts = await getCollection('wellness');

  const allPosts = [
    ...travelPosts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/essays/travel/${post.id}`,
    })),
    ...mindfulnessPosts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/essays/mindfulness/${post.id}`,
    })),
    ...wellnessPosts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/essays/wellness/${post.id}`,
    })),
  ];

  // Sort by pubDate descending
  allPosts.sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());

  const items = allPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${context.site || 'https://wanderwithakhi.com'}${post.link}</link>
      <guid>${context.site || 'https://wanderwithakhi.com'}${post.link}</guid>
      <pubDate>${new Date(post.pubDate).toUTCString()}</pubDate>
    </item>
  `).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>wanderwithakhi</title>
  <description>Wander Outside &amp; Inside | Slow Travel and Spiritual Reflections by Akhilesh Gowda</description>
  <link>${context.site || 'https://wanderwithakhi.com'}</link>
  <atom:link href="${context.site || 'https://wanderwithakhi.com'}/rss.xml" rel="self" type="application/rss+xml" />
  <language>en-us</language>
  ${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
