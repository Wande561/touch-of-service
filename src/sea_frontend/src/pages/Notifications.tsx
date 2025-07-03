
import React, { useState } from 'react';
import Navigation from '../components/Navigations';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Bell, Check, Clock, Star, MessageCircle, Calendar, DollarSign, Settings } from 'lucide-react';

const Notifications = () => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: '1',
      type: 'booking',
      title: 'New Booking Request',
      message: 'Nokwazi Ndlovu requested your house cleaning service for tomorrow at 9 AM.',
      timestamp: '5 minutes ago',
      unread: true,
      avatar: '/placeholder.svg',
      action: 'respond',
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      message: 'Fanele Mbhele sent you a message about the plumbing repair.',
      timestamp: '1 hour ago',
      unread: true,
      avatar: '/placeholder.svg',
      action: 'view',
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Received',
      message: 'You received R175 for the electrical repair service.',
      timestamp: '2 hours ago',
      unread: false,
      avatar: null,
      action: null,
    },
    {
      id: '4',
      type: 'review',
      title: 'New Review',
      message: 'Vuyelwa Zungu left you a 5-star review for personal training session.',
      timestamp: '1 day ago',
      unread: false,
      avatar: '/placeholder.svg',
      action: 'view',
    },
    {
      id: '5',
      type: 'reminder',
      title: 'Upcoming Appointment',
      message: 'You have a hair appointment tomorrow at 2 PM.',
      timestamp: '1 day ago',
      unread: false,
      avatar: null,
      action: 'view',
    },
    {
      id: '6',
      type: 'system',
      title: 'Profile Update',
      message: 'Your professional verification has been approved.',
      timestamp: '2 days ago',
      unread: false,
      avatar: null,
      action: null,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-green-500" />;
      case 'payment':
        return <DollarSign className="w-5 h-5 text-orange-500" />;
      case 'review':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-purple-500" />;
      case 'system':
        return <Settings className="w-5 h-5 text-gray-500" />;
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => n.unread).length;

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'booking', label: 'Bookings', count: notifications.filter(n => n.type === 'booking').length },
    { id: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
    { id: 'payment', label: 'Payments', count: notifications.filter(n => n.type === 'payment').length },
    { id: 'review', label: 'Reviews', count: notifications.filter(n => n.type === 'review').length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        <div className="max-w-4xl mx-auto p-4">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Notifications</h1>
                <p className="text-muted-foreground">
                  {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'You\'re all caught up!'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Check className="w-4 h-4 mr-2" />
                  Mark All Read
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1 bg-muted/20 rounded-lg p-1">
              {filters.map((filterOption) => (
                <Button
                  key={filterOption.id}
                  variant={filter === filterOption.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter(filterOption.id)}
                  className="flex-1"
                >
                  {filterOption.label}
                  {filterOption.count > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {filterOption.count}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`floating-card p-6 transition-all ${
                  notification.unread ? 'border-l-4 border-l-primary bg-primary/5' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {notification.avatar ? (
                      <img
                        src={notification.avatar}
                        alt="Avatar"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center">
                        {getIcon(notification.type)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                      {notification.unread && (
                        <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                      {notification.action && (
                        <Button variant="outline" size="sm">
                          {notification.action === 'respond' ? 'Respond' : 'View'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <Card className="glass-card p-12 text-center">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {filter === 'all' 
                  ? "You don't have any notifications yet." 
                  : `No ${filter} notifications found.`
                }
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
