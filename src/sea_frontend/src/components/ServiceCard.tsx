
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  id: string;
  title: string;
  provider: {
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
  };
  price: {
    amount: number;
    unit: string;
  };
  location: string;
  responseTime: string;
  category: string;
  images: string[];
  isOnline?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  provider,
  price,
  location,
  responseTime,
  category,
  images,
  isOnline = false,
}) => {
  return (
    <Card className="floating-card p-0 overflow-hidden group">
      <div className="relative">
        <img
          src={images[0] || '/placeholder.svg'}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {category}
        </Badge>
        {isOnline && (
          <div className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="text-right">
            <div className="font-bold text-primary">${price.amount}</div>
            <div className="text-sm text-muted-foreground">/{price.unit}</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <img
            src={provider.avatar || '/placeholder.svg'}
            alt={provider.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="font-medium text-sm">{provider.name}</div>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground">
                {provider.rating} ({provider.reviewCount})
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{responseTime}</span>
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Link to={`/service/${id}`} className="flex-1">
            <Button className="w-full btn-gradient">View Details</Button>
          </Link>
          <Link to={`/book/${id}`}>
            <Button variant="outline" className="px-6">Book Now</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
