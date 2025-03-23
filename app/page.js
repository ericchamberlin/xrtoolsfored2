import { getAllContent, getMostCommonTags } from '../lib/airtable';
import ContentList from '../components/ContentList';
import Link from 'next/link';
import SearchBar from '../components/SearchBar';

export default async function Home() {
  const allContent = await getAllContent();
  const popularTags = await getMostCommonTags(15);
  
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
      
      {/* Cosmic header image without fade */}
      <div className="w-full h-48 relative">
        <img 
          src="https://i.imgur.com/YNrfsHb.jpeg" 
          alt="Cosmic header" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 py-6">
        {/* Search bar */}
        <SearchBar />
        
        {/* Main category filters - made smaller */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button 
            className="bg-blue-900 hover:bg-blue-800 text-white rounded-lg p-3 text-center transition-colors"
            data-category="360 Video"
          >
            <h2 className="text-lg font-bold">360° Videos</h2>
            <p className="text-sm text-blue-200">Immersive panoramic video experiences</p>
          </button>
          <button 
            className="bg-purple-900 hover:bg-purple-800 text-white rounded-lg p-3 text-center transition-colors"
            data-category="Immersive Experience"
          >
            <h2 className="text-lg font-bold">Immersive Experiences</h2>
            <p className="text-sm text-purple-200">Interactive 3D environments</p>
          </button>
          <button 
            className="bg-green-900 hover:bg-green-800 text-white rounded-lg p-3 text-center transition-colors"
            data-category="VR App"
          >
            <h2 className="text-lg font-bold">VR Apps</h2>
            <p className="text-sm text-green-200">Applications designed for virtual reality</p>
          </button>
        </div>
        
        {/* Tag filters - organized like futuretools.io */}
        <div className="mb-6 bg-gray-900 rounded-lg p-4 border border-gray-800">
          <h2 className="text-xl font-bold mb-3 text-white">Filter by Tags</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {popularTags.map((tag) => (
              <div key={tag} className="flex items-center">
                <input
                  type="checkbox"
                  id={`tag-${tag}`}
                  className="mr-2 h-4 w-4 rounded border-gray-700 text-blue-600 focus:ring-blue-500"
                  data-tag={tag}
                />
                <label htmlFor={`tag-${tag}`} className="text-gray-300 text-sm">
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <ContentList initialContent={allContent} />
      </div>
    </div>
  );
}