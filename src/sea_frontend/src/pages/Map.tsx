
import React, { useState } from 'react';
import Navigation from '@/components/Navigations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search, Filter, Star, Navigation2, Phone } from 'lucide-react';

const Map = () => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [searchLocation, setSearchLocation] = useState('');

  const providers = [
    {
      id: '1',
      name: 'Nokwazi Ndlovu',
      service: 'House Cleaning',
      rating: 4.9,
      reviewCount: 127,
      price: 'R50/hour',
      distance: '0.8 miles',
      avatar: '/placeholder.svg',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      status: 'available',
      responseTime: '< 1 hour',
    },
    {
      id: '2',
      name: 'Fanele Mbhele',
      service: 'Plumbing',
      rating: 4.8,
      reviewCount: 89,
      price: 'R75/hour',
      distance: '1.2 miles',
      avatar: '/placeholder.svg',
      coordinates: { lat: 40.7580, lng: -73.9855 },
      status: 'busy',
      responseTime: '< 30 min',
    },
    {
      id: '3',
      name: 'Vuyelwa Zungu',
      service: 'Personal Training',
      rating: 5.0,
      reviewCount: 156,
      price: 'R60/session',
      distance: '0.5 miles',
      avatar: '/placeholder.svg',
      coordinates: { lat: 40.7505, lng: -73.9934 },
      status: 'available',
      responseTime: '< 2 hours',
    },
    {
      id: '4',
      name: 'Thando Khumalo',
      service: 'Hair Styling',
      rating: 4.7,
      reviewCount: 73,
      price: 'R65/hour',
      distance: '2.1 miles',
      avatar: '/placeholder.svg',
      coordinates: { lat: 40.7282, lng: -73.9942 },
      status: 'available',
      responseTime: '< 45 min',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'busy':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const selectedProviderData = providers.find(p => p.id === selectedProvider);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        <div className="flex h-[calc(100vh-4rem)]">
          
          {/* Sidebar */}
          <div className="w-96 bg-card border-r border-border flex flex-col">
            
            {/* Search Header */}
            <div className="p-4 border-b border-border">
              <h1 className="text-2xl font-bold mb-4">Nearby Providers</h1>
              
              <div className="space-y-3">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search location..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10 bg-background/50 border-border/50"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Providers List */}
            <div className="flex-1 overflow-y-auto">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id)}
                  className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-accent/50 ${
                    selectedProvider === provider.id ? 'bg-accent/30 border-l-4 border-l-primary' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <img
                        src={provider.avatar}
                        alt={provider.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(provider.status)} rounded-full border-2 border-background`}></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold truncate">{provider.name}</h3>
                        <Badge variant="secondary" className="text-xs">{provider.distance}</Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{provider.service}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{provider.rating}</span>
                          <span className="text-xs text-muted-foreground">({provider.reviewCount})</span>
                        </div>
                        <span className="text-sm font-medium text-primary">{provider.price}</span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-1">
                        Responds {provider.responseTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 relative">
            
            {/* Map Placeholder */}
            <div className="w-full h-full bg-muted/20 flex items-center justify-center relative">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                <p className="text-muted-foreground">Map view showing nearby service providers</p>
              </div>

              {/* Provider Pins Simulation */}
              <div className="absolute inset-0">
                {providers.map((provider, index) => (
                  <div
                    key={provider.id}
                    className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transition-transform hover:scale-110 ${
                      provider.status === 'available' ? 'bg-green-500' : 'bg-orange-500'
                    } ${selectedProvider === provider.id ? 'scale-125 ring-2 ring-primary' : ''}`}
                    style={{
                      top: `${20 + index * 15}%`,
                      left: `${30 + index * 20}%`,
                    }}
                    onClick={() => setSelectedProvider(provider.id)}
                  >
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Provider Details Card */}
            {selectedProviderData && (
              <Card className="absolute bottom-4 left-4 right-4 glass-card p-6 animate-slide-up">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={selectedProviderData.avatar}
                      alt={selectedProviderData.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className={`absolute bottom-0 right-0 w-4 h-4 ${getStatusColor(selectedProviderData.status)} rounded-full border-2 border-background`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{selectedProviderData.name}</h3>
                      <Badge variant={selectedProviderData.status === 'available' ? 'default' : 'secondary'}>
                        {selectedProviderData.status}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{selectedProviderData.service}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{selectedProviderData.rating}</span>
                        <span className="text-muted-foreground">({selectedProviderData.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{selectedProviderData.distance} away</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary">{selectedProviderData.price}</span>
                        <p className="text-sm text-muted-foreground">Responds {selectedProviderData.responseTime}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm">
                          <Navigation2 className="w-4 h-4 mr-2" />
                          Directions
                        </Button>
                        <Button className="btn-gradient">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <Button variant="outline" size="sm" className="glass">
                <Navigation2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="glass">
                +
              </Button>
              <Button variant="outline" size="sm" className="glass">
                -
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
