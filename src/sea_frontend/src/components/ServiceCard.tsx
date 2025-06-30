
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Heart } from 'lucide-react';

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
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3" variant="secondary">
          {category}
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white"
        >
          <Heart className="w-4 h-4" />
        </Button>
        {isOnline && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-green-500 text-white">
              <div className="w-2 h-2 bg-green-300 rounded-full mr-1 animate-pulse"></div>
              Online
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{title}</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
            <Clock className="w-3 h-3 ml-2" />
            <span>{responseTime}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="text-sm font-medium">{provider.name}</div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">
                  {provider.rating} ({provider.reviewCount})
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-bold text-primary">
              ${price.amount}
            </div>
            <div className="text-xs text-muted-foreground">
              per {price.unit}
            </div>
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Link to="/servicedetails" className="flex-1">
            <Button variant="outline" className="w-full">
               View Details
            </Button>
          </Link>
          <Link to="/bookservice" className="flex-1">
            <Button className="w-full btn-gradient">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
