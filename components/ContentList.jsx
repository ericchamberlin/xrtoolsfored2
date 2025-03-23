"use client";

import { useState, useEffect } from 'react';
import ContentCard from './ContentCard';

export default function ContentList({ initialContent }) {
  const [content, setContent] = useState(initialContent);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Listen for search events
  useEffect(() => {
    const handleSearch = (e) => {
      setSearchTerm(e.detail.searchTerm);
    };
    
    window.addEventListener('search', handleSearch);
    return () => window.removeEventListener('search', handleSearch);
  }, []);
  
  // Listen for category button clicks
  useEffect(() => {
    const handleCategoryClick = (e) => {
      if (e.target.closest('[data-category]')) {
        const category = e.target.closest('[data-category]').dataset.category;
        setSelectedCategory(prev => prev === category ? '' : category);
      }
    };
    
    document.addEventListener('click', handleCategoryClick);
    return () => document.removeEventListener('click', handleCategoryClick);
  }, []);
  
  // Listen for tag checkbox changes
  useEffect(() => {
    const handleTagChange = (e) => {
      if (e.target.matches('input[data-tag]')) {
        const tag = e.target.dataset.tag;
        setSelectedTags(prev => {
          if (e.target.checked) {
            return [...prev, tag];
          } else {
            return prev.filter(t => t !== tag);
          }
        });
      }
    };
    
    document.addEventListener('change', handleTagChange);
    return () => document.removeEventListener('change', handleTagChange);
  }, []);
  
  // Filter content based on search term, selected category, and tags
  useEffect(() => {
    let filtered = initialContent;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(item => item.contentType === selectedCategory);
    }
    
    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(item => 
        selectedTags.every(tag => item.tags?.includes(tag))
      );
    }
    
    setContent(filtered);
  }, [searchTerm, selectedCategory, selectedTags, initialContent]);
  
  return (
    <div>
      {selectedCategory && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {selectedCategory === '360 Video' ? '360° Videos' : 
               selectedCategory === 'Immersive Experience' ? 'Immersive Experiences' : 
               'VR Apps'}
            </h2>
            <button 
              onClick={() => setSelectedCategory('')}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Clear filter
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.length > 0 ? (
          content.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <h3 className="text-xl font-medium text-gray-400">No resources found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}