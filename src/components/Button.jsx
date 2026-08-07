import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  onClick, 
  href, 
  type = 'button' 
}) => {
  
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--accent-primary)',
      color: '#000',
      border: 'none',
      boxShadow: '0 0 15px var(--glow-cyan)',
    },
    secondary: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
      border: '1px solid #FFFFFF',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--accent-primary)',
      border: '1px solid var(--accent-primary)',
    }
  };

  const Component = href ? 'a' : 'button';
  const props = href ? { href } : { type, onClick };

  return (
    <Component 
      {...props} 
      className={`btn ${className || ''}`}
      style={{ ...baseStyles, ...variants[variant] }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        if (variant === 'primary') {
          e.currentTarget.style.boxShadow = '0 0 25px var(--glow-cyan)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        if (variant === 'primary') {
          e.currentTarget.style.boxShadow = '0 0 15px var(--glow-cyan)';
        }
      }}
    >
      {children}
    </Component>
  );
};

export default Button;
