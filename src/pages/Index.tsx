
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';
import ArticleCard from '@/components/ArticleCard';
import Banner from '@/components/Banner';
import MenuSection from '@/components/MenuSection';
import { ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data - in a real app, this would come from an API
const featuredServices = [
  {
    id: '1',
    title: 'Website Development',
    description: 'Professional website development services for businesses of all sizes.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdlYnNpdGUlMjBkZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    rating: 4.8,
    price: 'From $599',
    featured: true
  },
  {
    id: '2',
    title: 'Mobile App Design',
    description: 'Beautiful and functional mobile app design for iOS and Android platforms.',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    rating: 4.7,
    price: 'From $799'
  },
  {
    id: '3',
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing services to grow your online presence.',
    imageUrl: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    rating: 4.6,
    price: 'From $399'
  }
];

const recentArticles = [
  {
    id: '1',
    title: 'How to Choose the Right Digital Service Provider',
    excerpt: 'Learn the key factors to consider when selecting a service provider for your digital needs.',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlnaXRhbCUyMHNlcnZpY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Guides',
    date: 'May 15, 2023',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'The Future of Web Development in 2023 and Beyond',
    excerpt: 'Explore the emerging trends that will shape the future of web development in the coming years.',
    imageUrl: 'https://images.unsplash.com/photo-1573164713712-03790a178651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    category: 'Trends',
    date: 'April 28, 2023',
    readTime: '7 min read'
  }
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {/* Banner Section */}
      <Banner />

      {/* Menu Section */}
      <MenuSection />

      {/* Search Section */}
      <section className="flex flex-col items-center text-center mb-10 animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Professional Services for Your Digital Needs
        </h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          Discover top-quality digital services to help your business grow and succeed in the online world.
        </p>
        
        <div className="w-full max-w-md relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search for services..."
            className="w-full pl-10 pr-4 py-3 rounded-full border border-input bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Featured Services</h2>
          <Link 
            to="/services" 
            className="text-sm text-primary flex items-center hover:underline"
          >
            View all
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden border shadow-sm animate-pulse">
                <div className="h-32 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {featuredServices.slice(0, 2).map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                imageUrl={service.imageUrl}
                rating={service.rating}
                price={service.price}
                featured={service.featured}
                className="animate-scale-in"
              />
            ))}
          </div>
        )}
      </section>

      {/* Recent Articles Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Recent Articles</h2>
          <Link 
            to="/articles" 
            className="text-sm text-primary flex items-center hover:underline"
          >
            View all
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden border shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {recentArticles.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                excerpt={article.excerpt}
                imageUrl={article.imageUrl}
                category={article.category}
                date={article.date}
                readTime={article.readTime}
                className="animate-scale-in"
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-accent rounded-2xl p-6 text-center">
        <h2 className="text-xl font-semibold mb-3">Need a Custom Service?</h2>
        <p className="text-muted-foreground mb-4">
          Contact us for personalized solutions tailored to your specific business requirements.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors duration-200"
        >
          Get in Touch
        </Link>
      </section>
    </Layout>
  );
};

export default Index;
