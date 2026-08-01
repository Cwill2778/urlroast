import "./globals.css";

export const metadata = {
  title: "Cronan Technology | Premium Digital Agency",
  description: "Cronan Technology specializes in high-performance web applications, AI automation, and conversion rate optimization for modern businesses.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Roman Exchange",
  },
};

export const viewport = {
  themeColor: "#ffb703",
};

import { Oswald, Space_Mono } from 'next/font/google';
import CustomCursor from '@/components/CustomCursor';
import TerminalOverlay from '@/components/TerminalOverlay';
import Navbar from '@/components/Navbar';
import BootLoader from '@/components/BootLoader';
import PageTransition from '@/components/PageTransition';
import ThemeProvider from '@/components/ThemeProvider';

const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-space' });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${spaceMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem('cronan-theme');
                if (theme) {
                  document.documentElement.style.setProperty('--primary', theme);
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        <ThemeProvider>
          <BootLoader />
          <Navbar />

          {/* Main Content Area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <PageTransition>
              {children}
            </PageTransition>
          </div>

          {/* Global Footer */}
          <footer style={{ width: '100%', padding: '2rem', borderTop: '1px solid var(--border)', textAlign: 'center', color: '#a1a1aa', fontSize: '0.9rem' }}>
            <p style={{ marginBottom: '1rem' }}>&copy; {new Date().getFullYear()} Cronan Technology. All rights reserved.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <a href="tel:7068448193" style={{ textDecoration: 'none', color: '#d4d4d8', fontFamily: 'var(--font-space)' }}>&#9742; (706) 844-8193</a>
              <a href="mailto:c.brianna@cronantech.com" style={{ textDecoration: 'none', color: '#d4d4d8', fontFamily: 'var(--font-space)' }}>&#9993; c.brianna@cronantech.com</a>
              <a href="/contact" style={{ textDecoration: 'underline', color: '#d4d4d8', fontFamily: 'var(--font-space)' }}>Contact Us</a>
            </div>
          </footer>

          {/* Interactive Overlays */}
          <CustomCursor />
          <TerminalOverlay />
        </ThemeProvider>
      </body>
    </html>
  );
}
