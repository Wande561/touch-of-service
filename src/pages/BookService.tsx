
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, Clock, MapPin, CreditCard } from 'lucide-react';

const BookService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    duration: '',
    location: '',
    notes: '',
    paymentMethod: '',
  });

  // Mock service data
  const service = {
    title: 'Professional House Cleaning Service',
    provider: 'Nokwazi Ndlovu',
    price: 50,
    unit: 'hour',
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Booking submitted:', bookingData);
    // Show success message and redirect
    alert('Booking confirmed! You will receive a confirmation email shortly.');
    navigate('/');
  };

  const calculateTotal = () => {
    const duration = parseInt(bookingData.duration) || 0;
    const subtotal = service.price * duration;
    const serviceFee = subtotal * 0.1;
    const total = subtotal + serviceFee;
    return { subtotal, serviceFee, total };
  };

  const { subtotal, serviceFee, total } = calculateTotal();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link to={`/service/${id}`} className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Service
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h1 className="text-2xl font-bold mb-6">Book Your Service</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date & Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Select Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={bookingData.date}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookingData({ ...bookingData, date: e.target.value })}
                      className="bg-background/50 border-border/50 focus:border-primary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Select Time
                    </Label>
                    <Select onValueChange={(value: string) => setBookingData({ ...bookingData, time: value })}>
                      <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                        <SelectValue placeholder="Choose time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="08:00">8:00 AM</SelectItem>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Select onValueChange={(value: string) => setBookingData({ ...bookingData, duration: value })}>
                    <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="3">3 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="6">6 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Service Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="Enter your address"
                    value={bookingData.location}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookingData({ ...bookingData, location: e.target.value })}
                    className="bg-background/50 border-border/50 focus:border-primary"
                    required
                  />
                </div>

                {/* Special Instructions */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific requirements or notes for the service provider..."
                    value={bookingData.notes}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBookingData({ ...bookingData, notes: e.target.value })}
                    className="bg-background/50 border-border/50 focus:border-primary"
                    rows={4}
                  />
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                  <Label>
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Payment Method
                  </Label>
                  <Select onValueChange={(value: string) => setBookingData({ ...bookingData, paymentMethod: value })}>
                    <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="cash">Cash on Service</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div>
                  <div className="font-medium">{service.title}</div>
                  <div className="text-sm text-muted-foreground">by {service.provider}</div>
                </div>
                
                {bookingData.date && (
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{new Date(bookingData.date).toLocaleDateString()}</span>
                  </div>
                )}
                
                {bookingData.time && (
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>{bookingData.time}</span>
                  </div>
                )}
                
                {bookingData.duration && (
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{bookingData.duration} hour(s)</span>
                  </div>
                )}
              </div>

              {bookingData.duration && (
                <div className="space-y-2 mb-6 pt-4 border-t border-border/50">
                  <div className="flex justify-between">
                    <span>Service ({bookingData.duration}h × ${service.price})</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Service fee</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border/50">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full btn-gradient"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  handleSubmit(e as any);
                }}
                disabled={!bookingData.date || !bookingData.time || !bookingData.duration || !bookingData.location}
              >
                Confirm Booking
              </Button>

              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  You won't be charged until the service is confirmed
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookService;
