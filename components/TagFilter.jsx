'use client';

import { useState } from 'react';

export default function TagFilter({ tags, onFilterChange }) {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => {
      const newSelection = prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag];
      
      // Call the parent component's handler with the updated selection
      onFilterChange(newSelection);
      return newSelection;
    });
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            selectedTags.includes(tag)
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}