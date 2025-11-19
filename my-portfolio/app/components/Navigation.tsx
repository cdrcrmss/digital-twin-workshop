'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/documentation', label: 'Documentation' },
    { href: '/advanced-features', label: 'Advanced' },
    { href: '/optimization', label: 'Optimization' },
    { href: '/monitoring', label: 'Monitoring' },
    { href: '/mcp-integration', label: 'MCP' },
    { href: '/demo', label: 'Demo' },
    { href: '/professional', label: 'Branding' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-black/80 dark:bg-black/80 light:bg-white/90 backdrop-blur-xl border-b border-gray-800/50 light:border-gray-200 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="text-xl sm:text-2xl font-bold">
          <Link 
            href="/" 
            className="text-gradient hover:opacity-80 transition-opacity"
          >
            CR
          </Link>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg text-white light:text-gray-700 hover:bg-white/10 light:hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-4 xl:gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-[#6366f1] transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-[#6366f1] font-semibold'
                    : 'text-white light:text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#contact"
              className="hover:text-[#6366f1] transition-colors duration-200 text-white light:text-gray-700"
            >
              Contact
            </a>
          </div>
          
          <ThemeToggle />
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/95 light:bg-white/95 backdrop-blur-xl border-t border-gray-800/50 light:border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-2 px-3 rounded-lg transition-colors duration-200 ${
                    pathname === link.href
                      ? 'text-[#6366f1] bg-[#6366f1]/10 font-semibold'
                      : 'text-white light:text-gray-700 hover:bg-white/10 light:hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="#contact"
                className="block py-2 px-3 rounded-lg text-white light:text-gray-700 hover:bg-white/10 light:hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
