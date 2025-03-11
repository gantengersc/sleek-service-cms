
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, Search, HomeIcon, Newspaper, Phone, Info, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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

  const closeMenu = () => setIsOpen(false);

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
          <Button 
            variant="ghost"
            size="icon"
            className="hover:bg-accent transition-colors duration-200"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </Button>
          <Link 
            to="/messages" 
            className="p-2 rounded-full hover:bg-accent transition-colors duration-200"
            aria-label="Messages"
          >
            <MessageSquare className="w-5 h-5" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="hover:bg-accent transition-colors duration-200"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu with modern design */}
      <div className={cn(
        "fixed inset-0 bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out z-40",
        isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <div className="flex flex-col h-full pt-20 px-4">
          <Button 
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 hover:bg-accent/50"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </Button>
          
          <nav className="flex flex-col gap-2 animate-fade-in">
            <NavLink to="/" icon={<HomeIcon />} label="Home" />
            <NavLink to="/services" icon={<MessageSquare />} label="Services" />
            <NavLink to="/articles" icon={<Newspaper />} label="Articles" />
            <NavLink to="/about" icon={<Info />} label="About Us" />
            <NavLink to="/contact" icon={<Phone />} label="Contact" />
            <NavLink to="/admin/login" icon={<LogIn />} label="Admin Login" />
          </nav>

          <div className="mt-auto mb-8 flex flex-col gap-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="flex flex-col gap-2">
              <Link 
                to="/login" 
                className="w-full py-3 px-4 text-primary font-medium text-center rounded-lg hover:bg-accent transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="w-full py-3 px-4 bg-primary text-white font-medium text-center rounded-lg hover:bg-primary/90 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
        isActive 
          ? "bg-primary text-white shadow-lg shadow-primary/20 transform hover:scale-[0.98] hover:shadow-md" 
          : "text-gray-700 hover:bg-accent/50"
      )}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default Navbar;
