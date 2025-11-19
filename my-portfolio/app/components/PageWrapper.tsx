'use client';

import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { AIChat } from './AIChat';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className={`min-h-screen bg-black light:bg-white text-white light:text-gray-900 transition-colors duration-300 overflow-x-hidden ${className}`}>
      <AIChat />
      <Navigation />
      
      {/* Geometric Background Shapes */}
      <div className="geo-shape geo-circle w-32 h-32 top-20 right-10 opacity-20 light:opacity-5" />
      <div className="geo-shape geo-square w-24 h-24 bottom-40 left-10 opacity-20 light:opacity-5" />
      <div className="geo-shape geo-circle w-40 h-40 top-1/2 right-1/4 opacity-15 light:opacity-5" />
      
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}
