'use client';

import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function SubmitResourcePage() {
  // Add these two fields to your formData state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    thumbnailUrl: '',
    contentType: '360 Video', // Default value
    tags: '',
    submitterName: '',
    submitterEmail: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Update only the handleSubmit function in your page.js file
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);
    
    try {
      console.log('Submitting form data:', formData);
      
      // Format tags properly
      const formattedData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };
      
      console.log('Formatted data:', formattedData);
      
      const response = await fetch('/api/submit-resource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      
      console.log('Response status:', response.status);
      
      const result = await response.json();
      console.log('Response data:', result);
      
      if (response.ok) {
        setSubmitResult({
          success: true,
          message: 'Resource submitted successfully! It will be reviewed before being published.',
        });
        // Reset form with all fields including the new ones
        setFormData({
          title: '',
          description: '',
          link: '',
          thumbnailUrl: '',
          contentType: '360 Video',
          tags: '',
          submitterName: '',
          submitterEmail: ''
        });
      } else {
        setSubmitResult({
          success: false,
          message: result.error || 'Failed to submit resource. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error submitting resource:', error);
      setSubmitResult({
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Submit an XR Resource</h1>
        <p className="mb-8 text-gray-400">
          Know of a great XR tool for education that should be included in our directory? 
          Submit it below and our team will review it.
        </p>
        
        {submitResult && (
          <div className={`p-4 mb-6 rounded-lg ${submitResult.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {submitResult.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Resource Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="e.g., VR Anatomy Explorer"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Describe what this resource does and how it can be used in education..."
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label htmlFor="link" className="block text-gray-700 font-medium mb-2">
              Resource Link *
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="https://example.com/resource"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="thumbnailUrl" className="block text-gray-700 font-medium mb-2">
              Thumbnail Image URL
            </label>
            <input
              type="url"
              id="thumbnailUrl"
              name="thumbnailUrl"
              value={formData.thumbnailUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-sm text-gray-500 mt-1">
              Direct link to an image that represents this resource (optional)
            </p>
          </div>
          
          <div className="mb-4">
            <label htmlFor="contentType" className="block text-gray-700 font-medium mb-2">
              Resource Type *
            </label>
            <select
              id="contentType"
              name="contentType"
              value={formData.contentType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            >
              <option value="360 Video">360° Video</option>
              <option value="Immersive Experience">Immersive Experience</option>
              <option value="VR App">VR App</option>
              <option value="AR App">AR App</option>
              <option value="Mixed Reality">Mixed Reality</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="science, biology, anatomy, etc. (comma-separated)"
            />
            <p className="text-sm text-gray-500 mt-1">
              Comma-separated list of relevant tags
            </p>
          </div>
          
          <div className="mb-4">
            <label htmlFor="submitterName" className="block text-gray-700 font-medium mb-2">
              Your Name (optional)
            </label>
            <input
              type="text"
              id="submitterName"
              name="submitterName"
              value={formData.submitterName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Your name"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="submitterEmail" className="block text-gray-700 font-medium mb-2">
              Your Email (optional)
            </label>
            <input
              type="email"
              id="submitterEmail"
              name="submitterEmail"
              value={formData.submitterEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="your.email@example.com"
            />
            <p className="text-sm text-gray-500 mt-1">
              We&apos;ll only use this to contact you if we have questions about your submission
            </p>
          </div>
          
          <div className="flex justify-between items-center">
            <Link href="/" className="text-blue-500 hover:underline">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Resource'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}