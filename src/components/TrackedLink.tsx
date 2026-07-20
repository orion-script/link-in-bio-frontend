'use client';

import React from 'react';

interface TrackedLinkProps {
  linkId: string;
  url: string;
  children: React.ReactNode;
  className?: string;
}

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export function TrackedLink({ linkId, url, children, className }: TrackedLinkProps) {
  const handleClick = () => {
    fetch(`${BaseUrl}/analytics/click/${linkId}`, {
      method: 'POST',
      keepalive: true,
    }).catch(console.error);
  };

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={className} 
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
