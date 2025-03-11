
import React from 'react';
import Navbar from './Navbar';
import FooterNav from './FooterNav';

interface LayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
  className?: string;
}

const Layout = ({ children, hideNavbar = false, className = '' }: LayoutProps) => {
  return (
    <div className={`flex flex-col min-h-screen ${className}`}>
      {!hideNavbar && <Navbar />}
      <main className="flex-1 pb-20">
        {children}
      </main>
      <FooterNav />
    </div>
  );
};

export default Layout;
