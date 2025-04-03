'use client';

import Layout from '../components/Layout';

export default function BlogPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Welcome to XR Tools For Ed</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Welcome to XR Tools for Education</h2>
          <p className="text-sm text-gray-500 mb-4">By Eric Chamberlin</p>
          
          <div className="prose text-gray-800 max-w-none">
            <p className="mb-4 text-gray-800">
              Welcome to XR Tools for Education, a comprehensive resource designed to help educators, instructional 
              designers, and learning technologists navigate the exciting world of extended reality (XR) in education. Our 
              mission is to curate and showcase the most effective and innovative XR tools that can transform learning 
              experiences across disciplines.
            </p>
            
            <p className="mb-4 text-gray-800">
              In today&apos;s rapidly evolving educational landscape, XR technologies—including virtual reality (VR), augmented 
              reality (AR), and mixed reality (MR)—offer unprecedented opportunities to create immersive, engaging, and 
              effective learning environments. Whether you&apos;re looking to enhance remote learning, visualize complex 
              concepts, or create hands-on simulations without physical constraints, this resource will guide you through the 
              available tools and help you make informed decisions for your educational projects.
            </p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Categories:</h3>
            <div className="flex gap-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Articles</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}