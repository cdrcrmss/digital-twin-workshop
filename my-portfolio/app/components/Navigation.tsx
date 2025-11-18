'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
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
          </div>
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
