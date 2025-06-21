
import React from 'react';
import Navigation from '@/components/Navigation';
import SearchFilters from '@/components/SearchFilters';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Shield, Clock, ArrowRight, Sparkles } from 'lucide-react';

const Index = () => {
  const featuredServices = [
    {
      id: '1',
      title: 'Professional House Cleaning Service',
      provider: {
        name: 'Sarah Johnson',
        avatar: '/placeholder.svg',
        rating: 4.9,
        reviewCount: 127,
      },
      price: { amount: 50, unit: 'hour' },
      location: 'Downtown',
      responseTime: '< 1 hour',
      category: 'Cleaning',
      images: ['/placeholder.svg'],
      isOnline: true,
    },
    {
      id: '2',
      title: 'Expert Plumbing Repairs & Installation',
      provider: {
        name: 'Mike Rodriguez',
        avatar: '/placeholder.svg',
        rating: 4.8,
        reviewCount: 89,
      },
      price: { amount: 75, unit: 'hour' },
      location: 'Midtown',
      responseTime: '< 30 min',
      category: 'Plumbing',
      images: ['/placeholder.svg'],
      isOnline: false,
    },
    {
      id: '3',
      title: 'Personal Fitness Training',
      provider: {
        name: 'Alex Chen',
        avatar: '/placeholder.svg',
        rating: 5.0,
        reviewCount: 156,
      },
      price: { amount: 60, unit: 'session' },
      location: 'Uptown',
      responseTime: '< 2 hours',
      category: 'Fitness',
      images: ['/placeholder.svg'],
      isOnline: true,
    },
  ];

  const categories = [
    { name: 'Cleaning', count: '1.2k+', icon: '🧽' },
    { name: 'Plumbing', count: '800+', icon: '🔧' },
    { name: 'Tutoring', count: '2.1k+', icon: '📚' },
    { name: 'Pet Care', count: '650+', icon: '🐕' },
    { name: 'Moving', count: '450+', icon: '📦' },
    { name: 'Landscaping', count: '720+', icon: '🌿' },
  ];

  const stats = [
    { value: '+65k', label: 'Active Users' },
    { value: '+1.5M', label: 'Services Completed' },
    { value: '+300k', label: 'Verified Providers' },
    { value: '4.9★', label: 'Average Rating' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-10 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-16 pb-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Trusted by 65k+ users</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="hero-text">Find & Book</span><br />
              <span className="text-foreground">Local Services</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Connect with verified professionals in your area. From home repairs to personal services, 
              we've got everything you need with guaranteed quality and secure payments.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Button className="btn-gradient text-lg px-8 py-6 rounded-full">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" className="text-lg px-8 py-6 rounded-full border-border/50">
                Become a Provider
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 -mt-8">
        <SearchFilters />
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-lg text-muted-foreground">Discover services across various categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="floating-card p-6 text-center cursor-pointer group"
              >
                <div className="text-3xl mb-3 group-hover:animate-float">{category.icon}</div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">{category.count} services</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Services</h2>
              <p className="text-lg text-muted-foreground">Popular services in your area</p>
            </div>
            <Button variant="outline" className="hidden md:flex">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ServiceHub?</h2>
            <p className="text-lg text-muted-foreground">Your safety and satisfaction is our priority</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="floating-card p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Verified Professionals</h3>
              <p className="text-muted-foreground">
                All service providers are background-checked and verified for your peace of mind.
              </p>
            </div>

            <div className="floating-card p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                Real reviews from real customers ensure you get the best service every time.
              </p>
            </div>

            <div className="floating-card p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast Response</h3>
              <p className="text-muted-foreground">
                Connect with professionals instantly and get your service scheduled in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500/10 to-blue-500/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of satisfied customers who found their perfect service provider
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="btn-gradient text-lg px-8 py-6 rounded-full">
              Find Services
            </Button>
            <Button variant="outline" className="text-lg px-8 py-6 rounded-full">
              Become a Provider
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-blue-500"></div>
              <span className="text-xl font-bold gradient-text">ServiceHub</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 ServiceHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
