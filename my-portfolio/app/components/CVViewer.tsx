'use client';

import { Eye, Download } from 'lucide-react';

export function CVViewer() {
  const handleViewCV = () => {
    window.open('https://week2-ai-cv-website.vercel.app/', '_blank');
  };

  const handleDownloadCV = () => {
    window.open('/Cedric-Ramos-CV.pdf', '_blank');
  };

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      <a
        href="#contact"
        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full font-medium transition flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Contact Me
      </a>
      <button
        onClick={handleViewCV}
        className="px-8 py-3 bg-zinc-900 light:bg-zinc-200 hover:bg-zinc-800 light:hover:bg-zinc-300 rounded-full font-medium transition flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
      >
        <Eye className="w-5 h-5" />
        View CV
      </button>
      <button
        onClick={handleDownloadCV}
        className="px-8 py-3 bg-zinc-900 light:bg-zinc-200 hover:bg-zinc-800 light:hover:bg-zinc-300 rounded-full font-medium transition flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
      >
        <Download className="w-5 h-5" />
        Download CV
      </button>
    </div>
  );
}
