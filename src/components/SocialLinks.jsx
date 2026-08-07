import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { contactData } from '../data/contact';

const SocialLinks = () => {
  const links = [];
  if (contactData.github) links.push({ icon: <FaGithub size={20} />, url: contactData.github, label: 'GitHub' });
  if (contactData.linkedin) links.push({ icon: <FaLinkedin size={20} />, url: contactData.linkedin, label: 'LinkedIn' });
  if (contactData.twitter) links.push({ icon: <FaTwitter size={20} />, url: contactData.twitter, label: 'Twitter' });
  if (contactData.email && contactData.email !== "YOUR_EMAIL_HERE") links.push({ icon: <FaEnvelope size={20} />, url: `mailto:${contactData.email}`, label: 'Email' });

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
