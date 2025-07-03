
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar } from '../components/ui/avatar';
import Navigation from '../components/Navigation';
import { Star, MapPin, Clock, Phone, Mail, ArrowLeft, Heart, Share2 } from 'lucide-react';

const ServiceDetails = () => {
  
  const { id } = useParams();
  const service = {
    id: '1',
    title: 'Professional House Cleaning Service',
    provider: {
      name: 'Nokwazi Ndlovu',
      avatar: '/placeholder.svg',
      rating: 4.9,
      reviewCount: 127,
      memberSince: '2022',
      verified: true,
    },
    price: { amount: 350, unit: 'hour' },
    location: 'KwaMashu, Durban',
    responseTime: '< 1 hour',
    category: 'Cleaning',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    description: 'Professional house cleaning service with attention to detail. I provide thorough cleaning for homes and offices using eco-friendly products.',
    services: ['Deep Cleaning', 'Regular Cleaning', 'Move-in/Move-out', 'Office Cleaning'],
    availability: 'Mon-Sat: 8AM-6PM',
    phone: '+27 73 123 4567',
    email: 'nokwazi@email.com',
    image: ['/img1.jpeg', '/img2.jpeg', '/img3.jpeg'],
  };

  const reviews = [
    {
      id: 1,
      name: 'Thabo Mthembu',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Excellent service! Very thorough and professional.',
      avatar: '/placeholder.svg',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      rating: 5,
      date: '1 month ago',
      comment: 'Nokwazi did an amazing job. Will definitely book again!',
      avatar: '/placeholder.svg',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/home" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Search
          </Link>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <img
            src={service.image[0]}
            alt={service.title}
            className="w-full h-64 md:h-80 object-cover rounded-lg"
         />
          <div className="grid grid-cols-2 gap-2">
            {service.image.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${service.title} ${index + 2}`}
                className="w-full h-32 md:h-40 object-cover rounded-lg"
             />
         ))}
          </div>
       </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Info */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="mb-2">{service.category}</Badge>
                  <h1 className="text-2xl font-bold mb-2">{service.title}</h1>
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{service.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Responds in {service.responseTime}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">${service.price.amount}</div>
                  <div className="text-sm text-muted-foreground">per {service.price.unit}</div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{service.description}</p>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Services Offered:</h3>
                <div className="flex flex-wrap gap-2">
                  {service.services.map((serviceItem, index) => (
                    <Badge key={index} variant="secondary">{serviceItem}</Badge>
                  ))}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <strong>Availability:</strong> {service.availability}
              </div>
            </Card>

            {/* Provider Info */}
            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-16 h-16">
                  <img src={service.provider.avatar} alt={service.provider.name} />
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{service.provider.name}</h3>
                    {service.provider.verified && (
                      <Badge variant="secondary">Verified</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{service.provider.rating}</span>
                    <span className="text-muted-foreground">({service.provider.reviewCount} reviews)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Member since {service.provider.memberSince}
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </Card>

            {/* Reviews */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-border/50 pb-4 last:border-b-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <Avatar className="w-10 h-10">
                        <img src={review.avatar} alt={review.name} />
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.name}</div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-primary mb-1">
                  ${service.price.amount}
                </div>
                <div className="text-sm text-muted-foreground">per {service.price.unit}</div>
              </div>

              <div className="space-y-4">
                <Link to="/bookservice">
                  <Button className="w-full btn-gradient">
                    Book Now
                  </Button>
                </Link>
                <Link to="/message">
                  <Button variant="outline" className="w-full">
                    Send Message
                  </Button>
                </Link>
              </div>

              <div className="mt-4 pt-4 border-t border-border/50 text-center">
                <p className="text-sm text-muted-foreground">
                  Free cancellation up to 24 hours before service
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
