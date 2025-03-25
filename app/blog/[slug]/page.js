import { getPostBySlug, urlFor } from '../../../lib/sanity';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';

// Define components for the Portable Text renderer
const components = {
  types: {
    image: ({value}) => (
      <img 
        src={urlFor(value).width(800).url()} 
        alt={value.alt || ' '} 
        className="my-8 rounded-lg mx-auto"
      />
    ),
  },
  marks: {
    link: ({children, value}) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-blue-600 hover:underline">
          {children}
        </a>
      );
    },
  },
};

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-blue-600">Post Not Found</h1>
        <p className="mb-4">The requested blog post could not be found.</p>
        <Link href="/blog" className="text-blue-500 hover:underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/blog" className="text-blue-500 hover:underline mb-6 inline-block">
        ← Back to Blog
      </Link>
      
      <article className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        {post.mainImage && (
          <img 
            src={urlFor(post.mainImage).width(1200).url()} 
            alt={post.title} 
            className="w-full h-64 md:h-96 object-cover"
          />
        )}
        
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4 text-blue-600">{post.title}</h1>
          
          <div className="flex items-center text-gray-500 mb-8 border-b border-gray-200 pb-4">
            {post.publishedAt && (
              <span className="mr-4">
                {new Date(post.publishedAt).toLocaleDateString()}
              </span>
            )}
            {post.author && (
              <span>By {post.author}</span>
            )}
          </div>
          
          <div className="prose prose-lg max-w-none">
            {post.body ? (
              <PortableText value={post.body} components={components} />
            ) : (
              <p>{post.excerpt || 'No content available'}</p>
            )}
          </div>
          
          {post.categories && post.categories.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-black-500 mb-2">Categories:</h3>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span key={category} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}