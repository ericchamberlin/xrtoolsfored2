'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import VideoThumbnail from './VideoThumbnail';
import TagFilter from './TagFilter';

export default function FilteredVideos({ videos, popularTags }) {
  const [filteredContent, setFilteredContent] = useState(videos);
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [contentTypeFilter, setContentTypeFilter] = useState('all');
  
  // Apply filters when activeFilters, searchTerm, or contentTypeFilter changes
  useEffect(() => {
    let filtered = videos;
    
    // Apply tag filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter(item => {
        if (!item.tags || !Array.isArray(item.tags)) return false;
        return activeFilters.some(tag => item.tags.includes(tag));
      });
    }
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => {
        const title = (item.title || '').toLowerCase();
        const description = (item.description || '').toLowerCase();
        const tags = Array.isArray(item.tags) ? item.tags.join(' ').toLowerCase() : '';
        
        return title.includes(term) || description.includes(term) || tags.includes(term);
      });
    }
    
    // Apply content type filter
    if (contentTypeFilter !== 'all') {
      filtered = filtered.filter(item => item.contentType === contentTypeFilter);
    }
    
    setFilteredContent(filtered);
  }, [activeFilters, searchTerm, contentTypeFilter, videos]);

  const handleFilterChange = (selectedTags) => {
    setActiveFilters(selectedTags);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleContentTypeChange = (type) => {
    setContentTypeFilter(type);
  };

  // Get content type counts
  const contentTypeCounts = {
    all: videos.length,
    '360 Video': videos.filter(item => item.contentType === '360 Video').length,
    'Immersive Experience': videos.filter(item => item.contentType === 'Immersive Experience').length,
    'VR App': videos.filter(item => item.contentType === 'VR App').length
  };

  return (
    <div>
      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title, description, or tags..."
          className="w-full p-2 border rounded-lg bg-gray-800 text-white border-gray-700"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      {/* Content type filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => handleContentTypeChange('all')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            contentTypeFilter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          All ({contentTypeCounts.all})
        </button>
        <button
          onClick={() => handleContentTypeChange('360 Video')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            contentTypeFilter === '360 Video'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          360° Videos ({contentTypeCounts['360 Video']})
        </button>
        <button
          onClick={() => handleContentTypeChange('Immersive Experience')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            contentTypeFilter === 'Immersive Experience'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Immersive Experiences ({contentTypeCounts['Immersive Experience']})
        </button>
        <button
          onClick={() => handleContentTypeChange('VR App')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            contentTypeFilter === 'VR App'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          VR Apps ({contentTypeCounts['VR App']})
        </button>
      </div>
      
      {/* Tag filters */}
      <TagFilter tags={popularTags} onFilterChange={handleFilterChange} />
      
      {/* Results count */}
      <div className="mb-4 text-gray-400">
        Showing {filteredContent.length} of {videos.length} resources
      </div>
      
      {/* Content grid */}
      {filteredContent.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <div key={item.id} className="border border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-gray-900">
              {item.thumbnailUrl && (
                <div className="mb-3 relative h-40 w-full overflow-hidden rounded-lg">
                  <VideoThumbnail 
                    src={item.thumbnailUrl} 
                    alt={item.title || 'Content thumbnail'} 
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold">{item.title || 'Unnamed Resource'}</h2>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  item.contentType === '360 Video' ? 'bg-blue-900 text-blue-200' :
                  item.contentType === 'Immersive Experience' ? 'bg-purple-900 text-purple-200' :
                  'bg-green-900 text-green-200'
                }`}>
                  {item.contentType}
                </span>
              </div>
              <p className="text-gray-400 mb-4 line-clamp-2">{item.description || 'No description available'}</p>
              
              {/* Show different metadata based on content type */}
              <div className="mb-3 text-sm text-gray-500">
                {item.contentType === '360 Video' && item.duration && (
                  <div className="flex items-center gap-1">
                    <span>Duration: {item.duration}</span>
                  </div>
                )}
                
                {item.Platform && (
                  <div className="flex items-center gap-1">
                    <span>Platform: {item.Platform}</span>
                  </div>
                )}
                
                {item.Price && (
                  <div className="flex items-center gap-1 mt-1">
                    <span>Price: {item.Price}</span>
                  </div>
                )}
                
                {item.Creator && (
                  <div className="flex items-center gap-1 mt-1">
                    <span>Creator: {item.Creator}</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  {item.tags && Array.isArray(item.tags) && item.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/tool/${item.id}`} className="text-blue-400 hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">No Resources Found</h2>
          <p>No resources match your current filter selection. Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
}