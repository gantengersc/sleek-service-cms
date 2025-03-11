
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, PhoneCall, FileText, Clock } from 'lucide-react';

const menuItems = [
  {
    id: '1',
    title: 'Our Services',
    description: 'View all our professional services',
    icon: <FileText className="h-6 w-6" />,
    href: '/services',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    title: 'Contact Us',
    description: 'Get in touch with our team',
    icon: <Mail className="h-6 w-6" />,
    href: '/contact',
    color: 'bg-purple-500'
  },
  {
    id: '3',
    title: 'Schedule',
    description: 'Book an appointment',
    icon: <Clock className="h-6 w-6" />,
    href: '/schedule',
    color: 'bg-green-500'
  },
  {
    id: '4',
    title: 'Support',
    description: '24/7 customer support',
    icon: <PhoneCall className="h-6 w-6" />,
    href: '/support',
    color: 'bg-amber-500'
  }
];

const MenuSection = () => {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Quick Menu</h2>
      <div className="grid grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            className="group relative overflow-hidden rounded-xl border bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className={`absolute -right-4 -top-4 h-16 w-16 rounded-full ${item.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
            <div className={`mb-2 inline-flex rounded-lg p-2 ${item.color} bg-opacity-10`}>
              {React.cloneElement(item.icon, { className: `${item.color.replace('bg-', 'text-')}` })}
            </div>
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
