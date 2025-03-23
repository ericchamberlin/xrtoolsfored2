'use client';

import { useState, useEffect } from 'react';

export default function VideoThumbnail({ src, alt, className }) {
  const [imageError, setImageError] = useState(false);
  const [cleanedSrc, setCleanedSrc] = useState('');

  useEffect(() => {
    if (src) {
      // Clean the URL by removing angle brackets and any other problematic characters
      let cleaned = src;
      
      // Check if the URL is wrapped in angle brackets
      if (src.startsWith('<') && src.endsWith('>')) {
        cleaned = src.substring(1, src.length - 1);
      }
      
      // Remove any whitespace
      cleaned = cleaned.trim();
      
      // Check if there are encoded angle brackets
      cleaned = cleaned.replace(/%3C/g, '').replace(/%3E/g, '');
      
      // Ensure URL starts with http:// or https://
      if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
        cleaned = 'https://' + cleaned.replace(/^\/\//, '');
      }
      
      setCleanedSrc(cleaned);
    }
  }, [src]);

  // Custom branded placeholder for missing or error images
  const renderPlaceholder = () => (
    <div className={`bg-gradient-to-br from-blue-900 to-black flex flex-col items-center justify-center ${className} rounded-lg overflow-hidden`}>
      <div className="text-center p-4">
        <div className="mb-2">
          <svg className="w-16 h-16 mx-auto text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z" fill="currentColor"/>
            <path d="M16 15C16 17.2091 14.2091 19 12 19C9.79086 19 8 17.2091 8 15C8 12.7909 9.79086 11 12 11C14.2091 11 16 12.7909 16 15Z" fill="currentColor"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">XR Education</h3>
        <p className="text-blue-300 text-sm mt-1">360° Video Experience</p>
      </div>
    </div>
  );

  if (!src || !cleanedSrc) {
    // Return branded placeholder for missing source
    return renderPlaceholder();
  }

  if (imageError) {
    // Return branded placeholder for error state
    return renderPlaceholder();
  }

  return (
    <img
      src={cleanedSrc}
      alt={alt}
      className={className}
      onError={() => setImageError(true)}
    />
  );
}