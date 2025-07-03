import { useAuth } from '../context/AppContext';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import Navigation from '../components/Navigations';
import { 
  User, 
  Edit3, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Star, 
  Award,
  Camera,
  Save,
  X
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Mawande Hlangu',
    email: 'mawande@email.com',
    phone: '+27 73 123 4567',
    location: 'Umhlanga, Durban',
    bio: 'I love discovering new services and connecting with local providers.',
    memberSince: '2022',
    avatar: '/placeholder.svg'
  });

  const stats = [
    { label: 'Total Bookings', value: '12', icon: Calendar },
    { label: 'Reviews Given', value: '8', icon: Star },
    { label: 'Favorite Providers', value: '5', icon: Award },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Booked House Cleaning',
      provider: 'Nokwazi Ndlovu',
      date: '2 days ago',
      status: 'confirmed'
    },
    {
      id: 2,
      action: 'Left a review for',
      provider: 'Sipho Mthembu',
      date: '1 week ago',
      status: 'completed'
    },
    {
      id: 3,
      action: 'Added to favorites',
      provider: 'Thandi Cleaning Services',
      date: '2 weeks ago',
      status: 'saved'
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile updated:', profile);
  };

  const { identity, getUser } = useAuth();

useEffect(() => {
  const loadUser = async () => {
    if (!identity) return;
    const principal = identity.getPrincipal().toText();
    const user = await getUser(principal);
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        // update other fields as needed
      }));
    }
  };

  loadUser();
}, [identity]);


  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-4 pt-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Link to="/settings">
            <Button variant="outline">
              <User className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <img src={profile.avatar} alt={profile.name} />
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input
                          value={profile.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="text-xl font-bold"
                        />
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold">{profile.name}</h2>
                        <Badge variant="secondary">Client</Badge>
                        <p className="text-muted-foreground mt-1">
                          Member since {profile.memberSince}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} size="sm">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                        size="sm"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} size="sm">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Bio</Label>
                  {isEditing ? (
                    <Input
                      value={profile.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="mt-1">{profile.bio}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Label>
                    {isEditing ? (
                      <Input
                        value={profile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    ) : (
                      <p className="mt-1">{profile.email}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      Phone
                    </Label>
                    {isEditing ? (
                      <Input
                        value={profile.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    ) : (
                      <p className="mt-1">{profile.phone}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium text-muted-foreground flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Location
                    </Label>
                    {isEditing ? (
                      <Input
                        value={profile.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      />
                    ) : (
                      <p className="mt-1">{profile.location}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between py-3 border-b border-border/50 last:border-b-0">
                    <div>
                      <p className="font-medium">
                        {activity.action} <span className="text-primary">{activity.provider}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                    <Badge variant={activity.status === 'confirmed' ? 'default' : 'secondary'}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your Stats</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <stat.icon className="w-5 h-5 text-primary" />
                      <span className="text-sm">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-lg">{stat.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link to="/home">
                  <Button variant="outline" className="w-full justify-start">
                    Find Services
                  </Button>
                </Link>
                <Link to="/messages">
                  <Button variant="outline" className="w-full justify-start">
                    View Messages
                  </Button>
                </Link>
                <Link to="/notifications">
                  <Button variant="outline" className="w-full justify-start">
                    Notifications
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
