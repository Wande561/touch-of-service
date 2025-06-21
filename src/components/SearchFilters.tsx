
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MapPin, Star } from 'lucide-react';

const SearchFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [rating, setRating] = useState('');

  const serviceTypes = [
    'Cleaning',
    'Plumbing',
    'Electrical',
    'Tutoring',
    'Pet Care',
    'Moving',
    'Landscaping',
    'Handyman',
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="glass-card p-6 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Main Search */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="What service do you need?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary"
            />
          </div>

          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary"
            />
          </div>

          {/* Service Type */}
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger className="h-12 bg-background/50 border-border/50 focus:border-primary">
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent className="glass-card border-border/50">
              {serviceTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Rating Filter */}
          <Select value={rating} onValueChange={setRating}>
            <SelectTrigger className="h-12 bg-background/50 border-border/50 focus:border-primary">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent className="glass-card border-border/50">
              <SelectItem value="4+">4+ Stars</SelectItem>
              <SelectItem value="3+">3+ Stars</SelectItem>
              <SelectItem value="2+">2+ Stars</SelectItem>
              <SelectItem value="1+">1+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between items-center mt-6">
          <Button variant="ghost" className="text-muted-foreground">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
          
          <Button className="btn-gradient px-8">
            <Search className="w-4 h-4 mr-2" />
            Search Services
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
