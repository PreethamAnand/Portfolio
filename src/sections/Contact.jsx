import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import astraImg from '../assets/Astra.png';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 320px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });

      tl.fromTo(leftColRef.current, 
        { x: -50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(rightColRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        "-=0.6"
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = React.useState(''); // 'idle', 'loading', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Fallback if user hasn't added API key yet
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";
    if (accessKey === "YOUR_ACCESS_KEY_HERE") {
      alert("Please add your Web3Forms Access Key to the .env file (VITE_WEB3FORMS_KEY).");
      return;
    }

    setStatus('loading');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          ...formData,
          subject: `New Portfolio Contact from ${formData.name}`,
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', service: '', message: '' }); // reset form
        setTimeout(() => setStatus('idle'), 5000); // clear success message after 5s
      } else {
        console.error("Form submission error", result);
        setStatus('error');
      }
    } catch (error) {
      console.error("Form fetch error", error);
      setStatus('error');
    }
  };

  return (
    <section 
      id="contact" 
      className="section"
      ref={containerRef}
      style={{ 
        position: 'relative',
        padding: '25px 24px 10px 24px',
        background: 'transparent',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div style={{
        display: 'grid',
        gap: '60px',
        alignItems: 'center'
      }} className="container contact-grid">
        
        {/* Left Column: Form */}
        <div ref={leftColRef} style={{ opacity: 0, display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
          <div className="contact-form-container" style={{
            width: '100%',
            maxWidth: '500px',
            background: '#0d0d0d',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              color: 'white',
              fontWeight: '700',
              marginBottom: '24px'
            }}>Let's Work Together</h2>
            
            {status === 'success' && (
              <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', color: '#10b981', borderRadius: '8px', marginBottom: '20px', fontSize: '0.85rem' }}>
                Your message has been sent successfully! I'll get back to you soon.
              </div>
            )}
            
            {status === 'error' && (
              <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', marginBottom: '20px', fontSize: '0.85rem' }}>
                Oops! Something went wrong. Please try again later.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', color: 'white', fontSize: '0.75rem', marginBottom: '6px', fontWeight: '500' }}>
                  Your Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name" 
                  className="contact-input"
                />
              </div>
              
              <div>
                <label htmlFor="email" style={{ display: 'block', color: 'white', fontSize: '0.75rem', marginBottom: '6px', fontWeight: '500' }}>
                  Your Email <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email" 
                  className="contact-input"
                />
              </div>

              <div>
                <label htmlFor="service" style={{ display: 'block', color: 'white', fontSize: '0.75rem', marginBottom: '6px', fontWeight: '500' }}>
                  Service Needed <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <select 
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="contact-input"
                  >
                    <option value="" disabled hidden>Something in mind?</option>
                    <option value="web">Web Development</option>
                    <option value="ai">AI / Machine Learning</option>
                    <option value="consulting">Consulting</option>
                  </select>
                  <div style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: 'rgba(255, 255, 255, 0.5)'
                  }}>
                    ▼
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" style={{ display: 'block', color: 'white', fontSize: '0.75rem', marginBottom: '6px', fontWeight: '500' }}>
                  Explain Your Idea <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Explain your idea..." 
                  rows="4"
                  className="contact-input"
                  style={{ resize: 'vertical' }}
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  background: status === 'loading' ? '#4b5563' : '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  marginTop: '10px',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => { if (status !== 'loading') e.target.style.background = '#1d4ed8' }}
                onMouseLeave={(e) => { if (status !== 'loading') e.target.style.background = '#2563eb' }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Image */}
        <div ref={rightColRef} className="contact-image-container" style={{ display: 'flex', justifyContent: 'flex-end', opacity: 0, width: '100%' }}>
          <img 
            src={astraImg} 
            alt="Astronaut" 
            style={{ 
              width: '100%', 
              maxWidth: '500px', 
              objectFit: 'contain',
              animation: 'float 6s ease-in-out infinite'
            }} 
          />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .contact-input {
          width: 100%;
          background: #1a1a1a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 10px 14px;
          color: white;
          outline: none;
          font-size: 0.85rem;
          transition: border-color 0.3s ease;
          appearance: none;
          font-family: inherit;
        }
        .contact-input:focus {
          border-color: #3b82f6;
        }
        .contact-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr 1.2fr !important;
          }
        }
        @media (max-width: 767px) {
          .contact-grid {
            gap: 30px !important;
          }
          .contact-image-container img {
            max-width: 250px !important;
          }
          .contact-form-container {
            padding: 24px !important;
          }
        }
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}} />
    </section>
  );
};

export default Contact;
