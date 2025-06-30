
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import {
  ArrowLeft,
  User,
  Shield,
  Bell,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  Trash2
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Mawande Hlangu',
    email: 'mawande@email.com',
    phone: '+27 73 123 4567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'account', label: 'Account Settings', icon: User },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (type: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [type]: value }));
  };

  const handleSave = () => {
    console.log('Settings saved:', { formData, notifications, darkMode });
    // Here you would save to backend
  };

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Mail className="w-4 h-4 mr-2" />
            Verify Email Address
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Smartphone className="w-4 h-4 mr-2" />
            Verify Phone Number
          </Button>
          <Button variant="destructive" className="w-full justify-start">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderPrivacySecurity = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.currentPassword}
                onChange={(e) => handleInputChange('currentPassword', e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Profile Visibility</Label>
              <p className="text-sm text-muted-foreground">Control who can see your profile</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Location Sharing</Label>
              <p className="text-sm text-muted-foreground">Allow services to see your location</p>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Data Download</Label>
              <p className="text-sm text-muted-foreground">Download your data</p>
            </div>
            <Button variant="outline" size="sm">Download</Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Add an extra layer of security to your account
          </p>
          <Button className="btn-gradient">
            <Lock className="w-4 h-4 mr-2" />
            Enable 2FA
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Button
              variant={notifications.email ? "default" : "outline"}
              size="sm"
              onClick={() => handleNotificationChange('email', !notifications.email)}
            >
              {notifications.email ? 'On' : 'Off'}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive push notifications</p>
            </div>
            <Button
              variant={notifications.push ? "default" : "outline"}
              size="sm"
              onClick={() => handleNotificationChange('push', !notifications.push)}
            >
              {notifications.push ? 'On' : 'Off'}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive text messages</p>
            </div>
            <Button
              variant={notifications.sms ? "default" : "outline"}
              size="sm"
              onClick={() => handleNotificationChange('sms', !notifications.sms)}
            >
              {notifications.sms ? 'On' : 'Off'}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Marketing Communications</Label>
              <p className="text-sm text-muted-foreground">Promotional emails and offers</p>
            </div>
            <Button
              variant={notifications.marketing ? "default" : "outline"}
              size="sm"
              onClick={() => handleNotificationChange('marketing', !notifications.marketing)}
            >
              {notifications.marketing ? 'On' : 'Off'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">App Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Currency</Label>
              <p className="text-sm text-muted-foreground">South African Rand (R)</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Language</Label>
              <p className="text-sm text-muted-foreground">English</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Service Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-book Favorites</Label>
              <p className="text-sm text-muted-foreground">Automatically book preferred providers</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Search Radius</Label>
              <p className="text-sm text-muted-foreground">Default search distance: 15km</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return renderAccountSettings();
      case 'privacy':
        return renderPrivacySecurity();
      case 'notifications':
        return renderNotifications();
      case 'preferences':
        return renderPreferences();
      default:
        return renderAccountSettings();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto p-4 pt-20">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/profile" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </Button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
            
            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <Button onClick={handleSave} className="btn-gradient">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
