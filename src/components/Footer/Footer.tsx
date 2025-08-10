import React from 'react';
import { SettingsIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-4 text-sm text-gray-600">
      <div className="flex items-center justify-center gap-1">
        <span>© RSJ Sambang Lihum {new Date().getFullYear()} - </span>
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
    </footer>
  );
};

export default Footer;