import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigations';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Calendar, Clock, MapPin, CreditCard } from 'lucide-react';

const BookService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // ✅ Added for custom modal
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    duration: '',
    location: '',
    notes: '',
    paymentMethod: '',
  });

  const service = {
    title: 'Professional House Cleaning Service',
    provider: 'Nokwazi Ndlovu',
    price: 50,
    unit: 'hour',
  };

  const handleClick = () => {
    console.log('Booking submitted:', bookingData);
    setShowPopup(true);
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Booking submitted:', bookingData);
    setShowPopup(true); 
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
        <Navigation />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h1 className="text-2xl font-bold mb-6">Book Your Service</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date & Time */}
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
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Select Time
                    </Label>
                    <Select onValueChange={(value) => setBookingData({ ...bookingData, time: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose time" />
                      </SelectTrigger>
                      <SelectContent>
                        {['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'].map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Select onValueChange={(value) => setBookingData({ ...bookingData, duration: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 6, 8].map(h => (
                        <SelectItem key={h} value={h.toString()}>{h} hour{h > 1 && 's'}</SelectItem>
                      ))}
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
                    onChange={(e) => setBookingData({ ...bookingData, location: e.target.value })}
                    required
                  />
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific requirements?"
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                    rows={4}
                  />
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                  <Label>
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Payment Method
                  </Label>
                  <Select onValueChange={(value) => setBookingData({ ...bookingData, paymentMethod: value })}>
                    <SelectTrigger>
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

                {/* Submit button (optional if you want 2 buttons) */}
                {/* <Button type="submit" className="hidden" /> */}
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
                {bookingData.date && <div className="flex justify-between"><span>Date:</span><span>{new Date(bookingData.date).toLocaleDateString()}</span></div>}
                {bookingData.time && <div className="flex justify-between"><span>Time:</span><span>{bookingData.time}</span></div>}
                {bookingData.duration && <div className="flex justify-between"><span>Duration:</span><span>{bookingData.duration} hour(s)</span></div>}
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
                type="button"
                className="w-full btn-gradient"
                onClick={handleClick}
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

      {/* ✅ Custom Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black p-1 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-sm text-muted-foreground mb-4">
              You will receive a confirmation email shortly.
            </p>
            <Button
              className="w-full"
              onClick={() => {
                setShowPopup(false);
                navigate('/home');
              }}
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookService;
