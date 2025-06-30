
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import SearchFilters from '@/components/SearchFilters';
import ServiceCard from '@/components/ServiceCard';
import Navigation from '@/components/Navigations';
import { Star, Bell, User, Settings, Calendar, MapPin, TrendingUp, Heart } from 'lucide-react';

const Home = () => {
  const user = {
    name: 'Mawande Hlangu',
    avatar: '/placeholder.svg',
    accountType: 'client',
  };

  const recentBookings = [
    {
      id: '1',
      service: 'House Cleaning',
      provider: 'Nokwazi Ndlovu',
      date: '2024-01-15',
      status: 'confirmed',
    },
    {
      id: '2',
      service: 'Plumbing Repair',
      provider: 'Sipho Mthembu',
      date: '2024-01-10',
      status: 'completed',
    },
  ];

  const quickActions = [
    { icon: Calendar, label: 'My Bookings', href: '/bookings' },
    { icon: Heart, label: 'Favorites', href: '/favorites' },
    { icon: MapPin, label: 'Nearby Services', href: '/map' },
    { icon: TrendingUp, label: 'Trending', href: '/trending' },
  ];

  const featuredServices = [
    {
      id: '1',
      title: 'Professional House Cleaning Service',
      provider: {
        name: 'Nokwazi Ndlovu',
        avatar: '/placeholder.svg',
        rating: 4.9,
        reviewCount: 127,
      },
      price: { amount: 50, unit: 'hour' },
      location: 'KwaMashu',
      responseTime: '< 1 hour',
      category: 'Cleaning',
      images: ['/placeholder.svg'],
      isOnline: true,
    },
    {
      id: '2',
      title: 'Expert Plumbing Repairs & Installation',
      provider: {
        name: 'Sipho Mthembu',
        avatar: '/placeholder.svg',
        rating: 4.8,
        reviewCount: 89,
      },
      price: { amount: 75, unit: 'hour' },
      location: 'Durban North',
      responseTime: '< 30 min',
      category: 'Plumbing',
      images: ['/placeholder.svg'],
      isOnline: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navigation />

      <div className="max-w-7xl mx-auto p-24">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground text-orange-500">
            Find the perfect service for your needs
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <SearchFilters />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <action.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">{action.label}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Services */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Featured Services</h2>
                <Link to="/services">
                  <Button variant="outline">View All</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredServices.map((service) => (
                  <ServiceCard key={service.id} {...service} />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <Card key={booking.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{booking.service}</h3>
                        <p className="text-sm text-muted-foreground">
                          with {booking.provider} • {new Date(booking.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card className="p-6">
              <div className="text-center">
                <Avatar className="w-16 h-16 mx-auto mb-4">
                  <img src={user.avatar} alt={user.name} />
                </Avatar>
                <h3 className="font-semibold">{user.name}</h3>
                <Badge variant="secondary" className="mt-2">
                  {user.accountType === 'client' ? 'Client' : 'Provider'}
                </Badge>
              </div>
              <div className="mt-4 space-y-2">
                <Link to="/profile">
                  <Button variant="outline" className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                </Link>
                <Link to="/settings">
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Your Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Bookings</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Favorite Providers</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reviews Given</span>
                  <span className="font-medium">8</span>
                </div>
              </div>
            </Card>

            {/* App Settings */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">App Settings</h3>
              <div className="space-y-2">
                <Link to="/notifications">
                  <Button variant="ghost" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </Button>
                </Link>
                <Link to="/settings/privacy">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Privacy & Security
                  </Button>
                </Link>
                <Link to="/settings/account">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Footer
            <footer className="border-t  border-border/50 py-12 bg-card/50">
               <div className="max-w-7xl mx-auto px-4 text-center">
                 <div className="flex items-center justify-center space-x-2 mb-4">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-blue-500"></div>
                   <span className="text-xl font-bold gradient-text">ServiceHub</span>
                 </div>
                 <p className="text-muted-foreground">
                   Connecting communities through trusted services.
                 </p>
               </div>
            </footer> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
