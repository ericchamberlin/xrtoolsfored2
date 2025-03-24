import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Sanity configuration
export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'iphe6n4j',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
};

// Create a client for fetching data
export const sanityClient = createClient(config);

// Helper function for generating image URLs
const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source) => builder.image(source);

// Example function to fetch blog posts
export async function getBlogPosts() {
  try {
    return await sanityClient.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        excerpt,
        "categories": categories[]->title,
        "author": author->name
      }
    `);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Example function to fetch a single blog post by slug
export async function getPostBySlug(slug) {
  try {
    const posts = await sanityClient.fetch(`
      *[_type == "post" && slug.current == $slug] {
        _id,
        title,
        slug,
        mainImage,
        body,
        publishedAt,
        "categories": categories[]->title,
        "author": author->name
      }
    `, { slug });
    
    return posts[0];
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}