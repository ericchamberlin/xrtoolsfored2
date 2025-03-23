import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'iphe6n4j', // Your Sanity project ID
  dataset: 'production', // or the name of your dataset
  apiVersion: '2023-05-03', // Use the latest API version
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
  token: process.env.SANITY_API_TOKEN, // Optional if you need authenticated requests
})

// Set up a helper function for generating image URLs
const builder = imageUrlBuilder(client)
export function urlFor(source) {
  return builder.image(source)
}

// Helper function to fetch blog posts
export async function getBlogPosts() {
  return await client.fetch(`
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
  `)
}

// Helper function to fetch a single blog post by slug
export async function getPostBySlug(slug) {
  const posts = await client.fetch(`
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
  `, { slug })
  
  return posts[0]
}