import Link from 'next/link';

export default function Portfolio() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 2rem 0 2rem' }}>
      
      {/* Hero Section */}
      <section style={{ textAlign: 'center', maxWidth: '800px', margin: '4rem auto 6rem auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--primary)', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1.5rem', border: '1px solid var(--primary-glow)' }}>
          Next-Generation Digital Agency
        </div>
        <h1 style={{ fontSize: '4rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          We Build <span className="gradient-text">Digital Experiences</span> That Convert.
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#a1a1aa', lineHeight: '1.6', marginBottom: '3rem', maxWidth: '600px' }}>
          Cronan Technology specializes in high-performance web applications, AI automation, and conversion rate optimization for modern businesses.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <a href="mailto:info@cronantech.com" className="btn-primary" style={{ textDecoration: 'none' }}>
            Work With Us
          </a>
          <Link href="#services" className="btn-secondary">
            View Services
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto 6rem auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem' }}>Our Expertise</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div className="glass-panel animate-fade-in delay-100">
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💻</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Custom Web Development</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6' }}>
              Lightning-fast, highly scalable web applications built with modern frameworks like Next.js and React. We turn complex requirements into seamless user experiences.
            </p>
          </div>

          <div className="glass-panel animate-fade-in delay-200">
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🤖</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>AI Integrations</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6' }}>
              Automate your workflows and supercharge your products with custom AI solutions using the latest LLMs from Google, OpenAI, and Anthropic.
            </p>
          </div>

          <div className="glass-panel animate-fade-in delay-300">
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📈</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Conversion Rate Optimization</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6' }}>
              We don't just build beautiful sites; we build sites that sell. Data-driven design tweaks that maximize your ROI and customer acquisition.
            </p>
          </div>

        </div>
      </section>

      {/* Featured Tools / Products Section */}
      <section style={{ width: '100%', maxWidth: '1200px', margin: '0 auto 6rem auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem' }}>Our Products</h2>
        
        <div className="glass-panel animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '4rem 2rem', border: '1px solid var(--primary-glow)', background: 'linear-gradient(180deg, rgba(244,63,94,0.05) 0%, rgba(24,24,27,0.8) 100%)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔥</div>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>AI Landing Page Roaster</h3>
          <p style={{ fontSize: '1.1rem', color: '#a1a1aa', maxWidth: '600px', marginBottom: '2rem', lineHeight: '1.6' }}>
            Want to know why your landing page isn't converting? Our custom AI tool will brutally roast your website and rewrite your copy for maximum conversions. 
          </p>
          <Link href="/roaster" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            Try The Roaster <span>→</span>
          </Link>
        </div>
      </section>

    </main>
  );
}
