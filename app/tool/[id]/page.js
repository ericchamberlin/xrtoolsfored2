import { getToolById } from '../../../lib/airtable';
import Link from 'next/link';
import VideoThumbnail from '../../../components/VideoThumbnail';

export default async function ToolPage({ params }) {
  const id = params?.id;
  const item = await getToolById(id);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation bar */}
      <nav className="bg-gray-900 py-4 border-b border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">XR Tools for ED</Link>
          <div className="flex space-x-6">
            <Link href="/" className="text-white hover:text-blue-300">Home</Link>
            <Link href="/new" className="text-white hover:text-blue-300">Added Today</Link>
            <Link href="/videos" className="text-white hover:text-blue-300">Videos</Link>
            <Link href="/about" className="text-white hover:text-blue-300">About</Link>
          </div>
        </div>
      </nav>
      
      {/* Cosmic header image without fade */}
      <div className="w-full h-48 md:h-64 relative">
        <img 
          src="https://i.imgur.com/YNrfsHb.jpeg" 
          alt="Cosmic header" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto p-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 hover:underline mb-4 inline-block transition-colors">
          ← Back to all resources
        </Link>
        
        <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-800">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">{item.title || 'Unnamed Resource'}</h1>
          </div>
          
          {item.thumbnailUrl && (
            <div className="w-full max-w-md mb-6 mx-auto">
              <VideoThumbnail 
                src={item.thumbnailUrl} 
                alt={item.title} 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-400">Description:</h2>
            <p className="text-gray-300">{item.description || 'No description available'}</p>
          </div>
          
          {/* Show different metadata based on content type */}
          {item.duration && (
            <div className="mb-4">
              <h3 className="font-medium text-blue-400">Duration:</h3>
              <p className="text-gray-300">{item.duration}</p>
            </div>
          )}
          
          {item.Platform && (
            <div className="mb-4">
              <h3 className="font-medium text-blue-400">Platform:</h3>
              <p className="text-gray-300">{item.Platform}</p>
            </div>
          )}
          
          {item.Creator && (
            <div className="mb-4">
              <h3 className="font-medium text-blue-400">Creator:</h3>
              <p className="text-gray-300">{item.Creator}</p>
            </div>
          )}
          
          {item.link && (
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-blue-800 text-white px-4 py-2 rounded-lg inline-block hover:bg-blue-700 transition-colors shadow-md"
            >
              Visit Resource
            </a>
          )}
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-400">Tags:</h2>
            <div className="flex flex-wrap gap-2">
              {item.tags && Array.isArray(item.tags) && item.tags.map((tag) => (
                <span key={tag} className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}