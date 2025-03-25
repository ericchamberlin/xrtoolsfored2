import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'XR Tools for Education',
  description: 'A directory of XR tools for educational projects',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-blue-500 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">XR Tools for ED</Link>
            <div className="space-x-4">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/blog" className="hover:underline">Blog</Link>
              <Link href="/submit" className="hover:underline">Submit Resource</Link>
              <Link href="/about" className="hover:underline">About</Link>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-100 p-4 text-center">
          <p>© {new Date().getFullYear()} XR Tools for Education</p>
        </footer>
      </body>
    </html>
  );
}