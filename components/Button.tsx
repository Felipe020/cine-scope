"use client";

import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  className?: string;
};

export default function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium';
  const variants: Record<string, string> = {
    primary: 'bg-[var(--color-primary)] text-white hover:opacity-90',
    secondary: 'bg-gray-700 text-white',
  };

  return (
    <button {...rest} className={`${base} ${variants[variant]} ${className}`.trim()}>
      {children}
    </button>
  );
}
