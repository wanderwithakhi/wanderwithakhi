import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Initialize Sanity Client
export const sanityClient = createClient({
  projectId: 'y729p0ml',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false, // Disabling CDN forces latest data fetches during static compilation
});

// Configure Image URL Builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Fetch all posts sorted by publishDate desc
export async function getAllPosts() {
  const query = `*[_type == "post"] | order(publishDate desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    section,
    category,
    location,
    publishDate,
    duration,
    coverImage,
    body
  }`;
  return await sanityClient.fetch(query);
}

// Fetch a single post by slug and section type
export async function getPostBySlug(slug: string, section: string) {
  const query = `*[_type == "post" && slug.current == $slug && section == $section][0] {
    title,
    "slug": slug.current,
    description,
    section,
    category,
    location,
    publishDate,
    duration,
    coverImage,
    body
  }`;
  return await sanityClient.fetch(query, { slug, section });
}
