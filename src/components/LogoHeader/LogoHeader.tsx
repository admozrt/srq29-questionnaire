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
  const logoHeight = size === 'large' ? 'h-16' : 'h-12';
  
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <div className="flex-shrink-0">
        <img 
          src="/file.png" 
          alt="Logo Kiri" 
          className={`${logoHeight} w-auto object-contain`}
        />
      </div>
      
      {children && (
        <div className="flex-1 text-center px-4">
          {children}
        </div>
      )}
      
      <div className="flex-shrink-0">
        <img 
          src="/logo-rsj.png" 
          alt="Logo RSJ Sambang Lihum" 
          className={`${logoHeight} w-auto object-contain`}
        />
      </div>
    </div>
  );
};

export default LogoHeader;