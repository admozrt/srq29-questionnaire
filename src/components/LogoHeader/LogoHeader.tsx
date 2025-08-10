import React from 'react';

interface LogoHeaderProps {
  size?: 'small' | 'large';
  className?: string;
  children?: React.ReactNode;
}

const LogoHeader: React.FC<LogoHeaderProps> = ({ 
  size = 'large', 
  className = '',
  children 
}) => {
  // Responsive logo heights based on size and screen
  const logoClasses = size === 'large' 
    ? 'h-10 sm:h-12 lg:h-16' 
    : 'h-8 sm:h-10 lg:h-12';
  
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <div className="flex-shrink-0">
        <img 
          src="/file.png" 
          alt="Logo Kiri" 
          className={`${logoClasses} w-auto object-contain`}
        />
      </div>
      
      {children && (
        <div className="flex-1 text-center px-2 sm:px-4 min-w-0">
          {children}
        </div>
      )}
      
      <div className="flex-shrink-0">
        <img 
          src="/logo-rsj.png" 
          alt="Logo RSJ Sambang Lihum" 
          className={`${logoClasses} w-auto object-contain`}
        />
      </div>
    </div>
  );
};

export default LogoHeader;