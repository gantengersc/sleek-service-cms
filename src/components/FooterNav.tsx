
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, MessageSquare, Search, User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const FooterNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[640px] mx-auto bg-white/80 backdrop-blur-md border-t shadow-lg px-2 py-1 z-50">
      <div className="flex items-center justify-around">
        <NavItem to="/" icon={<HomeIcon />} label="Home" isActive={isActive('/')} />
        <NavItem to="/search" icon={<Search />} label="Search" isActive={isActive('/search')} />
        <NavItem to="/messages" icon={<MessageSquare />} label="Messages" isActive={isActive('/messages')} />
        <NavItem to="/favorites" icon={<Heart />} label="Favorites" isActive={isActive('/favorites')} />
        <NavItem to="/profile" icon={<User />} label="Profile" isActive={isActive('/profile')} />
      </div>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => (
  <Link 
    to={to} 
    className={cn(
      "flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors duration-200",
      isActive 
        ? "text-primary" 
        : "text-gray-500 hover:text-primary hover:bg-primary/5"
    )}
  >
    {React.cloneElement(icon as React.ReactElement, { 
      className: cn(
        "w-5 h-5",
        isActive ? "animate-bounce" : ""
      )
    })}
    <span className="text-xs font-medium">{label}</span>
  </Link>
);

export default FooterNav;
