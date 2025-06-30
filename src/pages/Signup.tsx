import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Briefcase, Check } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<'client' | 'provider' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    location: '',
    // Provider specific fields
    businessName: '',
    services: '',
    experience: '',
    license: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Signup form submitted:', { accountType, ...formData });
    
    // Redirect based on account type
    if (accountType === 'provider') {
      navigate('/verification');
    } else {
      navigate('/home');
    }
  };

  if (!accountType) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-hero-gradient opacity-5 animate-gradient-x"></div>
        
        <div className="w-full max-w-4xl relative z-10">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-blue-500"></div>
              <span className="text-2xl font-bold gradient-text">ServiceHub</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Join ServiceHub</h1>
            <p className="text-lg text-muted-foreground">Choose how you want to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Client Signup */}
            <Card 
              className="floating-card p-8 cursor-pointer border-2 hover:border-primary/50 transition-all"
              onClick={() => setAccountType('client')}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-8 h-8 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4">I need services</h2>
                <p className="text-muted-foreground mb-6">
                  Find and book trusted professionals for your home and personal needs
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Quick 2-minute signup</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Browse verified professionals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Secure booking & payments</span>
                  </div>
                </div>

                <Button className="w-full btn-gradient">
                  Sign Up as Client
                </Button>
              </div>
            </Card>

            {/* Provider Signup */}
            <Card 
              className="floating-card p-8 cursor-pointer border-2 hover:border-primary/50 transition-all"
              onClick={() => setAccountType('provider')}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-8 h-8 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4">I offer services</h2>
                <p className="text-muted-foreground mb-6">
                  Grow your business by connecting with customers in your area
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Identity verification required</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Professional portfolio setup</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Secure payment processing</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Sign Up as Provider
                </Button>
              </div>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-hero-gradient opacity-5 animate-gradient-x"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => setAccountType(null)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Account Type
          </Button>
        </div>

        <Card className="glass-card p-8">
          <div className="text-center mb-8">
            <Badge className="mb-4" variant={accountType === 'client' ? 'default' : 'secondary'}>
              {accountType === 'client' ? 'Client Account' : 'Provider Account'}
            </Badge>
            <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">
              {accountType === 'client' 
                ? 'Quick signup to start booking services' 
                : 'Professional signup with verification'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter your city or area"
                value={formData.location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, location: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-primary"
                required
              />
            </div>

            {accountType === 'provider' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name (Optional)</Label>
                  <Input
                    id="businessName"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, businessName: e.target.value })}
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="services">Services You Offer</Label>
                  <Input
                    id="services"
                    placeholder="e.g., Cleaning, Plumbing, Tutoring"
                    value={formData.services}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, services: e.target.value })}
                    className="bg-background/50 border-border/50 focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    placeholder="Enter years of experience"
                    value={formData.experience}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, experience: e.target.value })}
                    className="bg-background/50 border-border/50 focus:border-primary"
                    required
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full btn-gradient py-6">
              {accountType === 'client' ? 'Create Account' : 'Continue to Verification'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
