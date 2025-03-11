
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  rating?: number;
  price?: string;
  className?: string;
  featured?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  rating = 0,
  price = '',
  className,
  featured = false,
}) => {
  return (
    <Link 
      to={`/service/${id}`}
      className={cn(
        "group flex flex-col rounded-xl overflow-hidden border shadow-sm bg-white transition-all duration-300 hover:shadow-md",
        featured ? "border-primary/20" : "border-border",
        className
      )}
    >
      <div className="relative overflow-hidden aspect-[3/2]">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white">
              Featured
            </span>
          </div>
        )}
        {price && (
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-primary">
              {price}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col p-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-base line-clamp-1">{title}</h3>
          {rating > 0 && (
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-amber-500" />
              <span className="text-xs font-medium">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{description}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            Available now
          </span>
          <span className="text-xs font-medium text-primary">View details</span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
