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
      <button
        onClick={handleViewCV}
        className="btn-outline flex items-center gap-2"
      >
        <Eye className="w-5 h-5" />
        View CV
      </button>
      <button
        onClick={handleDownloadCV}
        className="btn-outline flex items-center gap-2"
      >
        <Download className="w-5 h-5" />
        Download CV
      </button>
    </div>
  );
}
