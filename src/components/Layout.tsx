
import React from 'react';
import Navbar from './Navbar';
import FooterNav from './FooterNav';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20">
        {children}
      </main>
      <FooterNav />
    </>
  );
};

export default Layout;
