
import React, { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const SearchFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const categories = [
    'All Categories',
    'Cleaning',
    'Plumbing',
    'Electrical',
    'Tutoring',
    'Beauty & Wellness',
    'Repairs & Maintenance',
    'Pet Care',
    'Catering',
    'Photography',
  ];

  const priceRanges = [
    'Any Price',
    'Under R25/hour',
    'R25-50/hour',
    'R50-100/hour',
    'Over R100/hour',
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Search:', { searchQuery, location, category, priceRange });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Main Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="What service do you need?"
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 h-12 text-lg bg-background/50 border-border/50 focus:border-primary"
          />
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Location"
              value={location}
              onChange={handleLocationChange}
              className="pl-10 bg-background/50 border-border/50 focus:border-primary"
            />
          </div>

          {/* Category */}
          <Select onValueChange={setCategory}>
            <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase().replace(/\s+/g, '-')}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Price Range */}
          <Select onValueChange={setPriceRange}>
            <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range} value={range.toLowerCase().replace(/\s+/g, '-')}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search Button */}
          <Button type="submit" className="btn-gradient">
            <Filter className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
