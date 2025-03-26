import { getBlogPosts } from '../../lib/sanity';
import Image from 'next/image';

export default async function BlogTestPage() {
  const posts = await getBlogPosts();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts (Sanity Test)</h1>
      
      {posts.length === 0 ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p>No blog posts found. You may need to add content in your Sanity Studio.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {post.mainImage && (
                <div className="relative w-full h-64">
                  <Image 
                    src="https://example.com/your-image.jpg" // Replace with your actual image URL
                    alt="Blog post image" 
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                  {post.author && (
                    <span className="text-sm text-gray-500">By {post.author}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
