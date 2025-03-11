
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import MessageItem, { MessageStatus } from '@/components/MessageItem';
import { 
  ArrowLeft, 
  Send, 
  Star, 
  Share2, 
  Heart, 
  Clock, 
  CheckCircle, 
  Calendar, 
  Map
} from 'lucide-react';

// Mock data for a single service
const serviceData = {
  id: '1',
  title: 'Website Development',
  description: 'Professional website development services for businesses of all sizes.',
  fullDescription: `Our website development service offers comprehensive solutions tailored to meet the unique needs of your business. We specialize in creating visually appealing, responsive, and functional websites that help you establish a strong online presence.

  Our team of experienced developers uses the latest technologies and best practices to ensure your website not only looks great but also performs exceptionally well. From simple landing pages to complex e-commerce platforms, we have the expertise to bring your vision to life.
  
  Our website development process includes planning, design, development, testing, and deployment, ensuring a seamless and hassle-free experience for our clients.`,
  imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdlYnNpdGUlMjBkZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
  rating: 4.8,
  price: 'From $599',
  features: [
    'Responsive Design',
    'SEO Optimization',
    'Custom Functionality',
    'Content Management System',
    'Security Features',
    'Performance Optimization'
  ],
  availabilityDate: 'Available immediately',
  location: 'Remote / Worldwide',
  provider: {
    name: 'Digital Solutions Inc.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=100&q=60',
    rating: 4.9,
    reviewCount: 127
  }
};

// Mock messages
const initialMessages = [
  {
    id: '1',
    content: 'Hi, I\'m interested in your website development service. Can you tell me more about the pricing?',
    sender: 'user' as 'user' | 'admin',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: 'read' as MessageStatus
  },
  {
    id: '2',
    content: 'Hello! Thanks for your interest. Our website development services start at $599 for a basic website. For more complex requirements, we offer custom quotes based on your specific needs. Would you like to share more details about your project?',
    sender: 'admin' as 'user' | 'admin',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5), // 1.5 hours ago
    status: 'read' as MessageStatus
  }
];

const Service = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showMessageForm, setShowMessageForm] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch service details
    const timer = setTimeout(() => {
      setService(serviceData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Add the new message to the list
    const userMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user' as 'user' | 'admin',
      timestamp: new Date(),
      status: 'sending' as MessageStatus
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    
    // Simulate message being sent
    setTimeout(() => {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' as MessageStatus } 
            : msg
        )
      );
      
      // Simulate message being delivered
      setTimeout(() => {
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === userMessage.id 
              ? { ...msg, status: 'delivered' as MessageStatus } 
              : msg
          )
        );
        
        // Simulate admin reading the message
        setTimeout(() => {
          setMessages(prevMessages => 
            prevMessages.map(msg => 
              msg.id === userMessage.id 
                ? { ...msg, status: 'read' as MessageStatus } 
                : msg
            )
          );
          
          // Simulate admin replying
          setTimeout(() => {
            const adminReply = {
              id: (Date.now() + 1).toString(),
              content: `Thanks for your message! We'll get back to you as soon as possible regarding "${newMessage.substring(0, 30)}${newMessage.length > 30 ? '...' : ''}"`,
              sender: 'admin' as 'user' | 'admin',
              timestamp: new Date(),
              status: 'delivered' as MessageStatus
            };
            
            setMessages(prevMessages => [...prevMessages, adminReply]);
          }, 3000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const handleReplyToMessage = (message: string, messageId: string) => {
    const userReply = {
      id: Date.now().toString(),
      content: message,
      sender: 'user' as 'user' | 'admin',
      timestamp: new Date(),
      status: 'sending' as MessageStatus
    };
    
    setMessages([...messages, userReply]);
    
    // Similar simulation as above
    setTimeout(() => {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === userReply.id 
            ? { ...msg, status: 'delivered' as MessageStatus } 
            : msg
        )
      );
    }, 1000);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </Layout>
    );
  }

  if (!service) {
    return (
      <Layout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-2">Service Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The service you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center text-primary hover:underline"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Back button */}
      <div className="mb-4">
        <Link 
          to="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Services
        </Link>
      </div>

      {/* Main content */}
      <div className="animate-fade-in">
        {/* Service image */}
        <div className="rounded-xl overflow-hidden mb-5 shadow-sm">
          <img 
            src={service.imageUrl} 
            alt={service.title} 
            className="w-full h-auto object-cover aspect-video"
          />
        </div>

        {/* Service header */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-bold">{service.title}</h1>
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 rounded-full bg-white shadow-sm border"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
              </button>
              <button 
                className="p-2 rounded-full bg-white shadow-sm border"
                aria-label="Share"
              >
                <Share2 className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 text-amber-500 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(service.rating) ? "fill-amber-500" : ""}`} 
              />
            ))}
            <span className="text-sm font-medium ml-1">{service.rating}</span>
          </div>
          
          <p className="text-lg font-semibold text-primary">{service.price}</p>
        </div>

        {/* Service details */}
        <div className="mb-6 space-y-4">
          <div className="prose prose-sm max-w-none">
            {service.fullDescription.split('\n\n').map((paragraph: string, idx: number) => (
              <p key={idx} className="mb-4 text-gray-700">{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Features</h2>
          <ul className="grid grid-cols-1 gap-2">
            {service.features.map((feature: string, idx: number) => (
              <li key={idx} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Additional info */}
        <div className="mb-6 grid grid-cols-1 gap-3">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm">{service.availabilityDate}</span>
          </div>
          <div className="flex items-center">
            <Map className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm">{service.location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm">Fast Response Time</span>
          </div>
        </div>

        {/* Service provider */}
        <div className="mb-8 bg-gray-50 rounded-xl p-4">
          <div className="flex items-center">
            <img 
              src={service.provider.image} 
              alt={service.provider.name}
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
            <div>
              <p className="font-medium">{service.provider.name}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" />
                <span>{service.provider.rating} ({service.provider.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Messages</h2>
          
          {messages.length > 0 ? (
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="mb-4 max-h-[300px] overflow-y-auto space-y-1 p-1">
                {messages.map((msg) => (
                  <MessageItem
                    key={msg.id}
                    id={msg.id}
                    content={msg.content}
                    sender={msg.sender}
                    timestamp={msg.timestamp}
                    status={msg.status}
                    onReply={handleReplyToMessage}
                  />
                ))}
              </div>
              
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 text-sm rounded-full border bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className={`p-2 rounded-full text-white transition-colors duration-200 ${
                    newMessage.trim() ? "bg-primary hover:bg-primary/90" : "bg-gray-300"
                  }`}
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              {showMessageForm ? (
                <form onSubmit={handleSendMessage} className="animate-fade-in">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full p-3 rounded-xl border bg-white focus:outline-none focus:ring-1 focus:ring-primary text-sm min-h-[100px] mb-3"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowMessageForm(false)}
                      className="px-4 py-2 text-sm rounded-full border hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className={`px-4 py-2 text-sm rounded-full text-white transition-colors ${
                        newMessage.trim() ? "bg-primary hover:bg-primary/90" : "bg-gray-300"
                      }`}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="text-muted-foreground mb-4">
                    Have questions about this service? Send a message to the provider.
                  </p>
                  <button
                    onClick={() => setShowMessageForm(true)}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send a Message
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="sticky bottom-4 flex justify-center">
          <Link
            to="/contact"
            className="px-6 py-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors animate-scale-in"
          >
            Request This Service
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Service;
