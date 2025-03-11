
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category?: string;
  date: string;
  readTime?: string;
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  excerpt,
  imageUrl,
  category,
  date,
  readTime,
  className,
}) => {
  return (
    <Link 
      to={`/article/${id}`}
      className={cn(
        "group flex flex-col rounded-xl overflow-hidden border bg-white transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {category && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-primary">
              {category}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col p-4 flex-1">
        <h3 className="font-medium text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <span className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {date}
          </span>
          {readTime && (
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {readTime}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
