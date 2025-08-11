import React from 'react';
import { SettingsIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-4 text-sm text-gray-600">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <span>© RSJ Sambang Lihum {new Date().getFullYear()} - Inst.IT & SIMRS</span>
        
        {/* Separator - hidden on mobile, visible on desktop */}
        <span className="hidden sm:inline text-gray-400">|</span>
        
        <div className="flex items-center gap-2">
          <span>Crafted by</span>
          <SettingsIcon className="w-4 h-4 text-sky-500" />
          <a 
            href="https://admoz.pages.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-sky-700 font-medium transition-colors"
          >
            Adi Rakhmatullah Ma'arif
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;