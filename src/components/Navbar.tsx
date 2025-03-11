
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      scrolled ? "bg-white/80 backdrop-blur-md border-b shadow-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-medium text-lg animate-fade-in">
          <span className="text-primary font-bold">Service</span>
          <span className="font-light">CMS</span>
        </Link>

        <div className="flex items-center gap-2">
          <button 
            className="p-2 rounded-full hover:bg-accent transition-colors duration-200"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link 
            to="/messages" 
            className="p-2 rounded-full hover:bg-accent transition-colors duration-200"
            aria-label="Messages"
          >
            <MessageSquare className="w-5 h-5" />
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-accent transition-colors duration-200"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 bg-white pt-16 px-4 transition-all duration-300 ease-in-out z-40",
        isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <nav className="flex flex-col gap-4 pt-8 animate-fade-in">
          <NavLink to="/" label="Home" />
          <NavLink to="/services" label="Services" />
          <NavLink to="/articles" label="Articles" />
          <NavLink to="/about" label="About Us" />
          <NavLink to="/contact" label="Contact" />
          <NavLink to="/admin/login" label="Admin Login" />
        </nav>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={cn(
        "py-3 px-4 text-lg border-b border-gray-100 transition-all duration-200",
        isActive 
          ? "text-primary font-medium" 
          : "text-gray-700 hover:text-primary"
      )}
    >
      {label}
    </Link>
  );
};

export default Navbar;
