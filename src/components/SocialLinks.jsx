import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const SocialLinks = () => {
  const links = [
    { icon: <Github size={20} />, url: '#', label: 'GitHub' },
    { icon: <Linkedin size={20} />, url: '#', label: 'LinkedIn' },
    { icon: <Twitter size={20} />, url: '#', label: 'Twitter' },
  ];

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          aria-label={link.label}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-subtle)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-primary)';
            e.currentTarget.style.borderColor = 'var(--accent-primary)';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
