import "./globals.css";

export const metadata = {
  title: "Cronan Technology | Premium Digital Agency",
  description: "Cronan Technology specializes in high-performance web applications, AI automation, and conversion rate optimization for modern businesses.",
};

import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* Global Navbar */}
        <nav style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--foreground)', textDecoration: 'none' }}>
            Cronan<span className="gradient-text">Tech</span>
          </Link>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/" style={{ color: '#d4d4d8', textDecoration: 'none', fontSize: '0.95rem' }}>Home</Link>
            <Link href="/roaster" style={{ color: '#d4d4d8', textDecoration: 'none', fontSize: '0.95rem' }}>AI Roaster</Link>
            <a href="mailto:info@cronantech.com" style={{ color: '#d4d4d8', textDecoration: 'none', fontSize: '0.95rem' }}>Contact Us</a>
          </div>
        </nav>

        {/* Main Content Area */}
        <div style={{ flex: 1 }}>
          {children}
        </div>

        {/* Global Footer */}
        <footer style={{ width: '100%', padding: '2rem', borderTop: '1px solid var(--border)', textAlign: 'center', color: '#a1a1aa', fontSize: '0.9rem' }}>
          <p style={{ marginBottom: '1rem' }}>&copy; {new Date().getFullYear()} Cronan Technology. All rights reserved.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <a href="mailto:info@cronantech.com" style={{ textDecoration: 'underline', color: '#d4d4d8' }}>Contact Us</a>
          </div>
        </footer>

      </body>
    </html>
  );
}
