import React, { useState } from 'react';
import { SettingsIcon } from 'lucide-react';
import { useRouter } from '../SimpleRouter';

const Footer: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const router = useRouter();

  // Secret admin access - click settings icon 5 times
  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 5) {
      router?.goToAdmin();
      setClickCount(0);
    }

    // Reset counter after 3 seconds of inactivity
    setTimeout(() => {
      setClickCount(0);
    }, 3000);
  };

  return (
    <footer className="text-center py-4 text-sm text-gray-600">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <span>© RSJ Sambang Lihum {new Date().getFullYear()} - Inst.IT & SIMRS</span>
        
        {/* Separator - hidden on mobile, visible on desktop */}
        <span className="hidden sm:inline text-gray-400">|</span>
        
        <div className="flex items-center gap-2">
          <span>Crafted by</span>
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-1 group transition-all duration-200"
            title={clickCount > 0 ? `${5 - clickCount} clicks left for admin` : ''}
          >
            <SettingsIcon 
              className={`w-5 h-5 text-sky-500 transition-all duration-200 ${
                clickCount > 0 ? 'animate-pulse text-red-500 scale-110' : ''
              }`} 
            />
            <a 
            href="https://admoz.pages.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-sky-700 font-medium transition-colors"
          >
            Adi Rakhmatullah Ma'arif
          </a>
          </button>
        </div>
      </div>
      
      {/* Debug info for development */}
      {clickCount > 0 && process.env.NODE_ENV === 'development' && (
        <div className="mt-2 text-xs text-red-500">
          Admin access: {clickCount}/5 clicks
        </div>
      )}
    </footer>
  );
};

export default Footer;