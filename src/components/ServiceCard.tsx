import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  title: string;
  provider: {
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
  };
  price: { amount: number; unit: string };
  location: string;
  responseTime: string;
  category: string;
  images: string[];
  isOnline?: boolean;
}

const ServiceCard = ({ 
  id, 
  title, 
  provider, 
  price, 
  location, 
  responseTime, 
  category, 
  images, 
  isOnline = false 
}: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 left-2" variant="secondary">
          {category}
        </Badge>
        <div className="absolute top-2 right-2 flex space-x-1">
          {isOnline && (
            <Badge variant="default" className="bg-green-500">
              Online
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        
        <div className="flex items-center space-x-2 mb-2">
          <img
            src={provider.avatar}
            alt={provider.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm font-medium">{provider.name}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs">{provider.rating}</span>
            <span className="text-xs text-muted-foreground">({provider.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <Clock className="w-3 h-3" />
              <span>Responds in {responseTime}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-primary">R{price.amount}</div>
            <div className="text-xs text-muted-foreground">per {price.unit}</div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Link to={`/service/${id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          <Link to={`/book/${id}`} className="flex-1">
            <Button size="sm" className="w-full btn-gradient">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
