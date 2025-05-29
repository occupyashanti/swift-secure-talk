import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Mic, Smile, Check, CheckCheck, Settings, Pin, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast';
import type { Contact } from '@/types/Contact';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  type: 'text' | 'voice' | 'image';
}

const Index = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [selectedContact, setSelectedContact] = useState<string>('1');
  const [messageText, setMessageText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! How are you doing?',
      sender: 'other',
      timestamp: new Date(Date.now() - 10000),
      status: 'read',
      type: 'text'
    },
    {
      id: '2',
      text: "I'm doing great! Just working on this new chat app called Whispr 🚀",
      sender: 'me',
      timestamp: new Date(Date.now() - 5000),
      status: 'read',
      type: 'text'
    },
    {
      id: '3',
      text: 'That sounds amazing! What features does it have?',
      sender: 'other',
      timestamp: new Date(Date.now() - 2000),
      status: 'read',
      type: 'text'
    }
  ]);
  
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      lastMessage: 'That sounds amazing! What features does it have?',
      timestamp: '2:34 PM',
      unreadCount: 0,
      isOnline: true,
      isTyping: true,
      isPinned: true
    },
    {
      id: '2',
      name: 'Sarah Chen',
      lastMessage: 'See you tomorrow! 👋',
      timestamp: '1:15 PM',
      unreadCount: 2,
      isOnline: false,
      lastSeen: '5 minutes ago',
      isPinned: false
    },
    {
      id: '3',
      name: 'Mike Torres',
      lastMessage: 'Thanks for the help!',
      timestamp: 'Yesterday',
      unreadCount: 0,
      isOnline: true,
      isPinned: false
    },
    {
      id: '4',
      name: 'Emma Wilson',
      lastMessage: 'Let me know when you arrive',
      timestamp: 'Yesterday',
      unreadCount: 1,
      isOnline: false,
      lastSeen: '2 hours ago',
      isPinned: false
    }
  ]);

  const [userProfileImage, setUserProfileImage] = useState<string | null>(
    localStorage.getItem('userProfileImage')
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (userProfileImage) {
      localStorage.setItem('userProfileImage', userProfileImage);
    } else {
      localStorage.removeItem('userProfileImage');
    }
  }, [userProfileImage]);

  const sendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'me',
      timestamp: new Date(),
      status: 'sending',
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageText('');

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' as const }
            : msg
        )
      );
    }, 1000);

    // Simulate read receipt
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'read' as const }
            : msg
        )
      );
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const togglePin = (contactId: string) => {
    setContacts(prev => 
      prev.map(contact => 
        contact.id === contactId 
          ? { ...contact, isPinned: !contact.isPinned }
          : contact
      )
    );
    
    const contact = contacts.find(c => c.id === contactId);
    toast({
      title: contact?.isPinned ? "Chat unpinned" : "Chat pinned",
      description: contact?.isPinned 
        ? `${contact.name} has been unpinned` 
        : `${contact.name} has been pinned to top`,
    });
  };

  const handleVoiceCall = () => {
    const selectedContactData = contacts.find(c => c.id === selectedContact);
    toast({
      title: "Voice call initiated",
      description: `Calling ${selectedContactData?.name}...`,
    });
  };

  const handleVideoCall = () => {
    const selectedContactData = contacts.find(c => c.id === selectedContact);
    toast({
      title: "Video call initiated",
      description: `Starting video call with ${selectedContactData?.name}...`,
    });
  };

  const handleAttachment = () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*,audio/*,.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast({
          title: "File attached",
          description: `${file.name} ready to send`,
        });
      }
    };
    input.click();
  };

  const handleEmojiPicker = () => {
    // In a real app, this would open an emoji picker
    const emojis = ['😀', '😂', '❤️', '👍', '🎉', '🔥', '💯', '🚀'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setMessageText(prev => prev + randomEmoji);
  };

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Recording started",
        description: "Tap again to stop recording",
      });
    } else {
      toast({
        title: "Recording stopped",
        description: "Voice message ready to send",
      });
    }
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <div className="w-3 h-3 rounded-full bg-gray-400 animate-pulse" />;
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-whispr-orange" />;
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  const selectedContactData = contacts.find(c => c.id === selectedContact);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-whispr-orange to-whispr-pink bg-clip-text text-transparent">
            Whispr
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {sortedContacts.map((contact) => (
            <div
              key={contact.id}
              className={cn(
                "p-4 flex items-center gap-3 cursor-pointer transition-colors hover:bg-accent/50",
                selectedContact === contact.id && "bg-accent"
              )}
              onClick={() => setSelectedContact(contact.id)}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={`https://avatar.vercel.sh/${contact.id}`} />
                  <AvatarFallback>{contact.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                {contact.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{contact.name}</p>
                  <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">
                    {contact.isTyping ? (
                      <span className="text-whispr-orange">typing...</span>
                    ) : (
                      contact.lastMessage
                    )}
                  </p>
                  {contact.unreadCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {contact.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "opacity-0 group-hover:opacity-100 transition-opacity",
                  contact.isPinned && "text-whispr-orange opacity-100"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePin(contact.id);
                }}
              >
                <Pin className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={selectedContactData?.isOnline ? `https://avatar.vercel.sh/${selectedContact}` : undefined} />
              <AvatarFallback>{selectedContactData?.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-medium">{selectedContactData?.name}</h2>
              <p className="text-sm text-muted-foreground">
                {selectedContactData?.isOnline
                  ? "Online"
                  : selectedContactData?.lastSeen
                  ? `Last seen ${selectedContactData.lastSeen}`
                  : "Offline"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleVoiceCall}>
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleVideoCall}>
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === 'me' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[70%] rounded-2xl px-4 py-2",
                  message.sender === 'me'
                    ? "bg-whispr-orange text-white rounded-br-none"
                    : "bg-accent rounded-bl-none"
                )}
              >
                <p>{message.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  {message.sender === 'me' && getStatusIcon(message.status)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleAttachment}
              className="text-muted-foreground hover:text-foreground"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <div className="flex-1 relative">
              <Input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="pr-24"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleEmojiPicker}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Smile className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleVoiceRecording}
                  className={cn(
                    "text-muted-foreground hover:text-foreground",
                    isRecording && "text-red-500"
                  )}
                >
                  <Mic className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <Button
              size="icon"
              onClick={sendMessage}
              disabled={!messageText.trim()}
              className="bg-whispr-orange hover:bg-whispr-orange/90"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
