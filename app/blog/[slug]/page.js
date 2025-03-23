import { getPostBySlug, urlFor } from '../../../lib/sanity'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return <div>Post not found</div>
  }
  
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation bar */}
      <nav className="bg-gray-900 py-4 border-b border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">XR Tools for ED</Link>
          <div className="flex space-x-6">
            <Link href="/" className="text-white hover:text-blue-300">Home</Link>
            <Link href="/blog" className="text-white hover:text-blue-300">Blog</Link>
            <Link href="/submit" className="text-white hover:text-blue-300">Submit Resource</Link>
            <Link href="/about" className="text-white hover:text-blue-300">About</Link>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        <Link href="/blog" className="text-blue-400 hover:text-blue-300 hover:underline mb-4 inline-block">
          ← Back to blog
        </Link>
        
        <article className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-800 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-white">{post.title}</h1>
          
          <div className="flex items-center mb-6 text-sm text-gray-400">
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            {post.author && (
              <>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
              </>
            )}
            {post.categories && post.categories.length > 0 && (
              <>
                <span className="mx-2">•</span>
                <span className="bg-blue-900/40 text-blue-200 px-2 py-0.5 rounded">
                  {post.categories[0]}
                </span>
              </>
            )}
          </div>
          
          {post.mainImage && (
            <img 
              src={urlFor(post.mainImage).width(1200).url()} 
              alt={post.title} 
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          
          <div className="prose prose-invert prose-blue max-w-none">
            <PortableText value={post.body} />
          </div>
        </article>
      </div>
    </div>
  )
}