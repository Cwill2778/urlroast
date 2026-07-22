'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [audience, setAudience] = useState('General Audience');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async (tier) => {
    if (!url || !email) {
      alert('Please provide your URL and Email.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email, audience, tier })
      });
      
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; 
      } else {
        alert('Failed to initiate checkout.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
      setIsLoading(false);
    }
  };

  const handleFreeRoast = async () => {
    if (!url || !email) {
      alert('Please provide your URL and Email.');
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await fetch('/api/free-roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email, audience })
      });
      
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; 
      } else {
        alert('Failed to process request.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
      setIsLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', padding: '4rem 2rem 0 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      <div className="main-grid">
        
        {/* Left Reviews Column */}
        <div className="reviews-column reviews-left animate-fade-in delay-100">
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p>"I paid $2 and got roasted so hard I cried. Then I fixed my hero section and my conversion rate doubled in a week. Worth every penny."</p>
            <strong>— Sarah T., SaaS Founder</strong>
          </div>
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p>"Brutal? Yes. Accurate? 100%. This AI pointed out that my 'Buy Now' button was literally invisible on mobile. Whoops."</p>
            <strong>— Mark J., E-commerce Store Owner</strong>
          </div>
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p>"It told me my landing page reads like a privacy policy. It was painful to hear, but I rewrote everything and now people actually understand what I do."</p>
            <strong>— Elena R., Freelance Designer</strong>
          </div>
        </div>

        {/* Center Content */}
        <div className="center-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div className="glass-panel animate-fade-in" style={{ width: '100%', textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              Roast My <span className="gradient-text">Landing Page</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#a1a1aa', marginBottom: '2rem' }}>
              Get a brutally honest, slightly hilarious AI audit of your landing page. 
              Discover why you're losing customers.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#d4d4d8' }}>Your Website URL *</label>
                <input 
                  type="url" 
                  placeholder="https://your-startup.com" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#d4d4d8' }}>Your Email (to send results) *</label>
                <input 
                  type="email" 
                  placeholder="founder@startup.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#d4d4d8' }}>Who is your Target Audience?</label>
                <select 
                  className="input-field" 
                  value={audience} 
                  onChange={(e) => setAudience(e.target.value)}
                  style={{ cursor: 'pointer', appearance: 'none' }}
                >
                  <option value="General Audience">General Audience</option>
                  <option value="B2B SaaS / Tech">B2B SaaS / Tech</option>
                  <option value="E-commerce Shoppers">E-commerce Shoppers</option>
                  <option value="Local Homeowners">Local Homeowners</option>
                  <option value="Creators / Influencers">Creators / Influencers</option>
                  <option value="Enterprise Buyers">Enterprise Buyers</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <button 
                  onClick={() => handleCheckout('basic')} 
                  className="btn-primary" 
                  disabled={isLoading}
                  style={{ background: '#3f3f46', boxShadow: 'none' }}
                >
                  {isLoading ? 'Loading...' : 'Basic Roast ($2)'}
                </button>
                <button 
                  onClick={() => handleCheckout('premium')} 
                  className="btn-primary" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Roast + Rewrite ($10)'}
                </button>
              </div>

              <button 
                onClick={handleFreeRoast} 
                className="btn-secondary" 
                disabled={isLoading}
                style={{ marginTop: '0.5rem', width: '100%' }}
              >
                Just give me a free score
              </button>

            </div>
            
            <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#71717a' }}>
              Powered by Gemini 1.5 Pro & Stripe
            </div>
          </div>

          {/* ... existing What you get sections ... */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '3rem', paddingBottom: '4rem' }}>
            <div className="glass-panel animate-fade-in delay-100">
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>What does $2 get you?</h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🔥</span> <div><strong>The Brutal Truth:</strong> An unfiltered, honest take on your hero section.</div>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>💀</span> <div><strong>Conversion Killers:</strong> Identification of major UI/UX issues driving users away.</div>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>✨</span> <div><strong>Actionable Fixes:</strong> Clear, step-by-step suggestions you can implement today.</div>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>💯</span> <div><strong>Overall Score:</strong> A harsh but fair rating out of 10.</div>
                </li>
              </ul>
            </div>

            <div className="glass-panel animate-fade-in delay-100" style={{ borderColor: 'var(--primary)' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>What does $10 get you?</h2>
              <p style={{ textAlign: 'center', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Everything in the $2 roast, PLUS our AI will actually rewrite your landing page copy for you.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>✍️</span> <div><strong>New Hero Headline:</strong> A high-converting hook.</div>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>📝</span> <div><strong>New Subheadline:</strong> Clear, persuasive supporting text.</div>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🎯</span> <div><strong>New Call-To-Action (CTA):</strong> A button text that actually gets clicked.</div>
                </li>
              </ul>
            </div>

            <div className="glass-panel animate-fade-in delay-200">
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>Sneak Peek at a Roast</h2>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <p style={{ color: '#a1a1aa', marginBottom: '1rem', fontSize: '0.9rem' }}>URL: https://naileditpropertysolutions.com</p>
                <p style={{ fontStyle: 'italic', marginBottom: '1rem', lineHeight: '1.5' }}>
                  "Your hero text says 'We do property solutions'. I have absolutely no idea what that means. Are you roofers? Plumbers? Do you just walk around looking at houses? Tell me what you actually fix!"
                </p>
                <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: '#f43f5e', lineHeight: '1.5' }}>
                  <strong>Conversion Killer:</strong> "The only way to contact you is a tiny email link in the footer. People with a leaky roof don't want to play 'Where's Waldo?' with your contact info."
                </p>
                <p style={{ fontStyle: 'italic', color: '#8b5cf6', lineHeight: '1.5' }}>
                  <strong>Actionable Fix:</strong> "Change the headline to 'Reliable Handyman & Property Repairs in [Your City]'. Add a giant, unmissable 'Get a Free Quote' button to the top right corner."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Reviews Column */}
        <div className="reviews-column reviews-right animate-fade-in delay-300">
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p>"The best $2 I've ever spent. It caught a typo in my headline that I had been staring at for 3 weeks and didn't notice. I feel stupid, but grateful."</p>
            <strong>— David L., Indie Hacker</strong>
          </div>
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p>"I thought my landing page was perfect. This AI humbled me real quick. The 'Conversion Killers' section is like a punch in the gut, but highly effective."</p>
            <strong>— Chloe B., Marketing Consultant</strong>
          </div>
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p>"I send all my clients' websites through this before I even start working with them. It does half my job for me in 10 seconds."</p>
            <strong>— Alex W., SEO Specialist</strong>
          </div>
        </div>

      </div>

    </main>
  );
}
