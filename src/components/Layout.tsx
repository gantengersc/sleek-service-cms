
import React from 'react';
import Navbar from './Navbar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  hideNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className,
  hideNavbar = false
}) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {!hideNavbar && <Navbar />}
      <main className={cn(
        "flex-1 flex flex-col px-4 py-6 transition-all duration-300 animate-fade-in",
        className
      )}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
