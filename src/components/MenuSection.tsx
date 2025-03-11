
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, FileText, Phone, Clock, ShoppingBag, Heart, Settings, Info, MessageSquare, Search } from 'lucide-react';

const menuItems = [
  {
    id: '1',
    title: 'Services',
    icon: <FileText className="h-5 w-5" />,
    href: '/services',
    color: 'text-blue-500 bg-blue-50'
  },
  {
    id: '2',
    title: 'Contact',
    icon: <Mail className="h-5 w-5" />,
    href: '/contact',
    color: 'text-purple-500 bg-purple-50'
  },
  {
    id: '3',
    title: 'Schedule',
    icon: <Clock className="h-5 w-5" />,
    href: '/schedule',
    color: 'text-green-500 bg-green-50'
  },
  {
    id: '4',
    title: 'Support',
    icon: <Phone className="h-5 w-5" />,
    href: '/support',
    color: 'text-amber-500 bg-amber-50'
  },
  {
    id: '5',
    title: 'Shop',
    icon: <ShoppingBag className="h-5 w-5" />,
    href: '/shop',
    color: 'text-pink-500 bg-pink-50'
  },
  {
    id: '6',
    title: 'Favorites',
    icon: <Heart className="h-5 w-5" />,
    href: '/favorites',
    color: 'text-red-500 bg-red-50'
  },
  {
    id: '7',
    title: 'Search',
    icon: <Search className="h-5 w-5" />,
    href: '/search',
    color: 'text-indigo-500 bg-indigo-50'
  },
  {
    id: '8',
    title: 'Chat',
    icon: <MessageSquare className="h-5 w-5" />,
    href: '/chat',
    color: 'text-teal-500 bg-teal-50'
  },
  {
    id: '9',
    title: 'Settings',
    icon: <Settings className="h-5 w-5" />,
    href: '/settings',
    color: 'text-gray-500 bg-gray-50'
  },
  {
    id: '10',
    title: 'About',
    icon: <Info className="h-5 w-5" />,
    href: '/about',
    color: 'text-orange-500 bg-orange-50'
  }
];

const MenuSection = () => {
  return (
    <section className="mb-8 px-4">
      <h2 className="text-lg font-semibold mb-4">Quick Menu</h2>
      <div className="grid grid-cols-5 gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            className="flex flex-col items-center gap-2 p-2 text-center transition-transform hover:scale-110"
          >
            <div className={`rounded-xl p-2.5 ${item.color}`}>
              {item.icon}
            </div>
            <span className="text-xs font-medium text-gray-700">{item.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
