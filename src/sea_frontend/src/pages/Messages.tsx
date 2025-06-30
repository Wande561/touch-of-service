
import React, { useState } from 'react';
import Navigation from '@/components/Navigations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Star } from 'lucide-react';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState('1');
  const [messageInput, setMessageInput] = useState('');

  const conversations = [
    {
      id: '1',
      name: 'Nokwazi Ndlovu',
      service: 'House Cleaning',
      avatar: '/placeholder.svg',
      lastMessage: 'I can start the cleaning service tomorrow at 9 AM. Does that work for you?',
      timestamp: '2m ago',
      unread: 2,
      online: true,
      rating: 4.9,
    },
    {
      id: '2',
      name: 'Fanele Mbhele',
      service: 'Plumbing Repair',
      avatar: '/placeholder.svg',
      lastMessage: 'Thanks for the photos. I can fix that issue today.',
      timestamp: '1h ago',
      unread: 0,
      online: false,
      rating: 4.8,
    },
    {
      id: '3',
      name: 'Vuyelwa Zungu',
      service: 'Personal Training',
      avatar: '/placeholder.svg',
      lastMessage: 'Great workout today! See you next week.',
      timestamp: '1d ago',
      unread: 0,
      online: true,
      rating: 5.0,
    },
  ];

  const messages = [
    {
      id: '1',
      senderId: '2',
      content: 'Hi! I saw your booking request for house cleaning. I can help you with that.',
      timestamp: '10:30 AM',
      type: 'text',
    },
    {
      id: '2',
      senderId: '1',
      content: 'Great! What time would work best for you?',
      timestamp: '10:32 AM',
      type: 'text',
    },
    {
      id: '3',
      senderId: '2',
      content: 'I have availability tomorrow at 9 AM or 2 PM. Which would you prefer?',
      timestamp: '10:35 AM',
      type: 'text',
    },
    {
      id: '4',
      senderId: '1',
      content: '9 AM would be perfect! Here are some photos of the areas that need attention.',
      timestamp: '10:37 AM',
      type: 'text',
    },
    {
      id: '5',
      senderId: '1',
      content: '/placeholder.svg',
      timestamp: '10:37 AM',
      type: 'image',
    },
    {
      id: '6',
      senderId: '2',
      content: 'Perfect! I can see what needs to be done. I can start the cleaning service tomorrow at 9 AM. Does that work for you?',
      timestamp: '10:40 AM',
      type: 'text',
    },
  ];

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  const sendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
            
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <Card className="glass-card h-full flex flex-col">
                <div className="p-4 border-b border-border/50">
                  <h1 className="text-2xl font-bold mb-4">Messages</h1>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search conversations..."
                      className="pl-10 bg-background/50 border-border/50"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedChat(conversation.id)}
                      className={`p-4 border-b border-border/50 cursor-pointer transition-colors hover:bg-accent/50 ${
                        selectedChat === conversation.id ? 'bg-accent/30' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <img
                            src={conversation.avatar}
                            alt={conversation.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          {conversation.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold truncate">{conversation.name}</h3>
                            {conversation.unread > 0 && (
                              <Badge className="bg-primary text-primary-foreground text-xs">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-1 mb-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">{conversation.rating}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{conversation.service}</span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              {selectedConversation ? (
                <Card className="glass-card h-full flex flex-col">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-border/50 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={selectedConversation.avatar}
                          alt={selectedConversation.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {selectedConversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      <div>
                        <h2 className="font-semibold">{selectedConversation.name}</h2>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-muted-foreground">{selectedConversation.rating}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{selectedConversation.service}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === '1' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.senderId === '1'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-accent'
                          }`}
                        >
                          {message.type === 'image' ? (
                            <img
                              src={message.content}
                              alt="Shared image"
                              className="rounded-lg max-w-full h-auto"
                            />
                          ) : (
                            <p className="text-sm">{message.content}</p>
                          )}
                          <span className={`text-xs mt-1 block ${
                            message.senderId === '1' 
                              ? 'text-primary-foreground/70' 
                              : 'text-muted-foreground'
                          }`}>
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-border/50">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Type a message..."
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          className="bg-background/50 border-border/50 pr-12"
                        />
                        <Button
                          onClick={sendMessage}
                          size="sm"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 btn-gradient"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="glass-card h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">Choose a conversation to start messaging</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
