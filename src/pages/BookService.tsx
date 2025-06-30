import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

const BookService = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    location: '',
    specialRequests: '',
  });

  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Booking data:', bookingData);
    // Here you would typically send the booking data to the backend
    navigate('/home');
  };

  const service = {
    id: '1',
    title: 'Professional House Cleaning Service',
    provider: 'Nokwazi Ndlovu',
    price: 350,
    image: '/img1.jpeg'
  };

  const pricing = {
    basePrice: 350,
    serviceFee: 25,
    get total() {
      return this.basePrice + this.serviceFee;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/servicedetails" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Service
          </Link>
          <h1 className="text-2xl font-bold">Book Service</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="space-y-6">
            {/* Service Info */}
            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">by {service.provider}</p>
                </div>
              </div>
            </Card>

            {/* Date and Time */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Date and Time</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date">Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start" side="bottom">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="time">Select Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                  />
                </div>
              </div>
            </Card>

            {/* Location */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Location</h3>
              <div>
                <Label htmlFor="location">Enter Address</Label>
                <Input
                  id="location"
                  placeholder="Street address, city, province"
                  value={bookingData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>
            </Card>

            {/* Special Requests */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Special Requests</h3>
              <div>
                <Label htmlFor="specialRequests">Additional Details</Label>
                <Textarea
                  id="specialRequests"
                  placeholder="Any specific instructions or requests?"
                  value={bookingData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                />
              </div>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{service.title}</h4>
                    <p className="text-sm text-muted-foreground">{service.provider}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{bookingData.date || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>{bookingData.time || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>{bookingData.location || 'Not selected'}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/50 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Service (2 hours)</span>
                  <span>R{pricing.basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>R{pricing.serviceFee}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t border-border/50 pt-2">
                  <span>Total</span>
                  <span>R{pricing.total}</span>
                </div>
              </div>

              {/* Confirm Booking Button */}
              <Button className="w-full mt-6 btn-gradient" onClick={handleSubmit}>
                Confirm Booking
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookService;
