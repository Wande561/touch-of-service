
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Search, MapPin, Star, ArrowRight, CheckCircle, Shield, Zap } from 'lucide-react';

const Index = () => {
  const featuredServices = [
    {
      id: '1',
      title: 'Professional House Cleaning',
      provider: 'Nokwazi Ndlovu',
      rating: 4.9,
      reviews: 127,
      price: 50,
      location: 'KwaMashu',
      image: '/placeholder.svg',
      category: 'Cleaning'
    },
    {
      id: '2',
      title: 'Expert Plumbing Services',
      provider: 'Sipho Mthembu',
      rating: 4.8,
      reviews: 89,
      price: 75,
      location: 'Durban North',
      image: '/placeholder.svg',
      category: 'Plumbing'
    },
    {
      id: '3',
      title: 'Private Math Tutoring',
      provider: 'Thandiwe Mbeki',
      rating: 5.0,
      reviews: 45,
      price: 35,
      location: 'Westville',
      image: '/placeholder.svg',
      category: 'Education'
    }
  ];

  const categories = [
    { name: 'Cleaning', icon: '🧹', count: '120+ providers' },
    { name: 'Plumbing', icon: '🔧', count: '85+ providers' },
    { name: 'Tutoring', icon: '📚', count: '200+ providers' },
    { name: 'Beauty', icon: '💄', count: '150+ providers' },
    { name: 'Repairs', icon: '🔨', count: '95+ providers' },
    { name: 'Pet Care', icon: '🐕', count: '60+ providers' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-blue-500"></div>
              <span className="text-xl font-bold gradient-text">ServiceHub</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button className="btn-gradient">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-10 animate-gradient-x"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find trusted
            <span className="gradient-text block">service providers</span>
            in your area
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with verified professionals for home services, tutoring, beauty, and more. 
            Book instantly and pay securely.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="What service do you need?"
                className="w-full pl-12 pr-4 py-4 text-lg rounded-full border border-border/50 bg-background/50 backdrop-blur-sm focus:outline-none focus:border-primary"
              />
              <Button className="absolute right-2 top-2 rounded-full btn-gradient">
                Search
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="px-4 py-2">🏠 Home Services</Badge>
            <Badge variant="secondary" className="px-4 py-2">📚 Tutoring</Badge>
            <Badge variant="secondary" className="px-4 py-2">💄 Beauty & Wellness</Badge>
            <Badge variant="secondary" className="px-4 py-2">🔧 Repairs</Badge>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all cursor-pointer group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Services</h2>
            <Link to="/services">
              <Button variant="outline" className="group">
                View All
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-all">
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="secondary">{service.category}</Badge>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">${service.price}</div>
                      <div className="text-sm text-muted-foreground">per hour</div>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-3">by {service.provider}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{service.rating}</span>
                      <span className="text-muted-foreground">({service.reviews})</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {service.location}
                    </div>
                  </div>
                  
                  <Link to={`/service/${service.id}`}>
                    <Button className="w-full btn-gradient">View Details</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ServiceHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Providers</h3>
              <p className="text-muted-foreground">All service providers are background-checked and verified for your safety.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
              <p className="text-muted-foreground">Safe and secure payment processing with multiple payment options.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Booking</h3>
              <p className="text-muted-foreground">Book services instantly and get confirmed appointments within minutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-5 animate-gradient-x"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of satisfied customers who trust ServiceHub for their service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="btn-gradient text-lg px-8 py-6">
                Find Services
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-blue-500"></div>
            <span className="text-xl font-bold gradient-text">ServiceHub</span>
          </div>
          <p className="text-muted-foreground">
            Connecting communities through trusted services.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
