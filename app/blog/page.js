import { getBlogPosts, urlFor } from '../../lib/sanity';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">XR Tools for ED Blog</h1>
      
      {posts.length === 0 ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
          <p>No blog posts found. Check back soon for new content!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              {post.mainImage && (
                <img 
                  src={urlFor(post.mainImage).width(600).url()} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3 text-blue-600">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                  {post.author && (
                    <span>By {post.author}</span>
                  )}
                </div>
                <Link 
                  href={`/blog/${post.slug.current}`} 
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 w-full text-center"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}