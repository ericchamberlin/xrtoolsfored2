'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({ children }) {
  const pathname = usePathname();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              XR Tools for Education
            </Link>
            
            {/* Navigation */}
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link 
                    href="/" 
                    className={`hover:text-blue-200 ${pathname === '/' ? 'font-bold underline' : ''}`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/submit" 
                    className={`hover:text-blue-200 ${pathname === '/submit' ? 'font-bold underline' : ''}`}
                  >
                    Submit Resource
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blog" 
                    className={`hover:text-blue-200 ${pathname === '/blog' ? 'font-bold underline' : ''}`}
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow text-gray-800">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <p className="text-center">© {new Date().getFullYear()} XR Tools for Education. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}