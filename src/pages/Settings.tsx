import React, { useState } from 'react';
import { ArrowLeft, User, Shield, Palette, Bell, Brain, HardDrive, Code, Info, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

interface SettingsProps {
  userProfileImage: string | null;
  setUserProfileImage: (imageUrl: string | null) => void;
}

const Settings: React.FC<SettingsProps> = ({ userProfileImage, setUserProfileImage }) => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    // Account & Privacy
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Love messaging on Whispr!',
    twoFactorEnabled: false,
    showLastSeen: true,
    showOnlineStatus: true,
    readReceipts: true,
    disappearingMessages: false,
    
    // App Preferences
    theme: 'system',
    language: 'en',
    fontSize: 'medium',
    bubbleStyle: 'modern',
    messagePreview: true,
    
    // Notifications
    messageNotifications: true,
    vibration: true,
    doNotDisturb: false,
    
    // Smart Features
    smartReplies: true,
    autoDownloadMedia: 'wifi',
    aiAssistant: false,
    
    // Storage & Data
    autoBackup: 'weekly',
    networkSettings: 'both'
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const storageData = {
    total: '2.4 GB',
    chats: '1.2 GB',
    media: '800 MB',
    cache: '400 MB'
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-whispr-gray-light">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
            className="text-whispr-black hover:bg-whispr-gray-light"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold text-whispr-black">Settings</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="account" className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center space-x-1">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Theme</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-1">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="smart" className="flex items-center space-x-1">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Smart</span>
            </TabsTrigger>
            <TabsTrigger value="storage" className="flex items-center space-x-1">
              <HardDrive className="w-4 h-4" />
              <span className="hidden sm:inline">Storage</span>
            </TabsTrigger>
            <TabsTrigger value="developer" className="flex items-center space-x-1">
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Dev</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center space-x-1">
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
          </TabsList>

          {/* Account & Privacy */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={userProfileImage || undefined} />
                    <AvatarFallback className="bg-whispr-orange text-white text-xl">
                      {settings.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="profileImageInput"
                  />
                  <Label htmlFor="profileImageInput">
                    <Button variant="outline" asChild>
                      <span>Change Picture</span>
                    </Button>
                  </Label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Display Name</Label>
                    <Input 
                      id="name" 
                      value={settings.name}
                      onChange={(e) => updateSetting('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      value={settings.email}
                      onChange={(e) => updateSetting('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      value={settings.phone}
                      onChange={(e) => updateSetting('phone', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input 
                    id="bio" 
                    value={settings.bio}
                    onChange={(e) => updateSetting('bio', e.target.value)}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Privacy & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <Switch 
                    checked={settings.twoFactorEnabled}
                    onCheckedChange={(checked) => updateSetting('twoFactorEnabled', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Last Seen</Label>
                    <p className="text-sm text-gray-600">Let others see when you were last online</p>
                  </div>
                  <Switch 
                    checked={settings.showLastSeen}
                    onCheckedChange={(checked) => updateSetting('showLastSeen', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Online Status</Label>
                    <p className="text-sm text-gray-600">Show when you're currently online</p>
                  </div>
                  <Switch 
                    checked={settings.showOnlineStatus}
                    onCheckedChange={(checked) => updateSetting('showOnlineStatus', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Read Receipts</Label>
                    <p className="text-sm text-gray-600">Let others know when you've read their messages</p>
                  </div>
                  <Switch 
                    checked={settings.readReceipts}
                    onCheckedChange={(checked) => updateSetting('readReceipts', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Disappearing Messages</Label>
                    <p className="text-sm text-gray-600">Messages delete automatically after 24 hours</p>
                  </div>
                  <Switch 
                    checked={settings.disappearingMessages}
                    onCheckedChange={(checked) => updateSetting('disappearingMessages', checked)}
                  />
                </div>

                <Button variant="outline" className="w-full">
                  Manage Blocked Contacts
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* App Preferences */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>App Preferences</CardTitle>
                <CardDescription>Customize your Whispr experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Theme Mode</Label>
                    <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Language</Label>
                    <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Font Size</Label>
                    <Select value={settings.fontSize} onValueChange={(value) => updateSetting('fontSize', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Chat Bubble Style</Label>
                    <Select value={settings.bubbleStyle} onValueChange={(value) => updateSetting('bubbleStyle', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Message Preview</Label>
                    <p className="text-sm text-gray-600">Show message previews in notifications</p>
                  </div>
                  <Switch 
                    checked={settings.messagePreview}
                    onCheckedChange={(checked) => updateSetting('messagePreview', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Control how you receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Message Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications for new messages</p>
                  </div>
                  <Switch 
                    checked={settings.messageNotifications}
                    onCheckedChange={(checked) => updateSetting('messageNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Vibration</Label>
                    <p className="text-sm text-gray-600">Vibrate when receiving messages</p>
                  </div>
                  <Switch 
                    checked={settings.vibration}
                    onCheckedChange={(checked) => updateSetting('vibration', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Do Not Disturb</Label>
                    <p className="text-sm text-gray-600">Silence all notifications temporarily</p>
                  </div>
                  <Switch 
                    checked={settings.doNotDisturb}
                    onCheckedChange={(checked) => updateSetting('doNotDisturb', checked)}
                  />
                </div>

                <Button variant="outline" className="w-full">
                  Set Custom Notification Tones
                </Button>
                
                <Button variant="outline" className="w-full">
                  Schedule Do Not Disturb
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Smart Features */}
          <TabsContent value="smart" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Smart Features</CardTitle>
                <CardDescription>AI-powered enhancements for your messaging</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Smart Replies</Label>
                    <p className="text-sm text-gray-600">Get AI-suggested quick responses</p>
                  </div>
                  <Switch 
                    checked={settings.smartReplies}
                    onCheckedChange={(checked) => updateSetting('smartReplies', checked)}
                  />
                </div>
                
                <div>
                  <Label>Auto-Download Media</Label>
                  <p className="text-sm text-gray-600 mb-2">Automatically download images and videos</p>
                  <Select value={settings.autoDownloadMedia} onValueChange={(value) => updateSetting('autoDownloadMedia', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="wifi">Wi-Fi Only</SelectItem>
                      <SelectItem value="always">Always</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>AI Assistant Integration</Label>
                    <p className="text-sm text-gray-600">Enable AI-powered chat assistance</p>
                  </div>
                  <Switch 
                    checked={settings.aiAssistant}
                    onCheckedChange={(checked) => updateSetting('aiAssistant', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Storage & Data */}
          <TabsContent value="storage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Storage Usage</CardTitle>
                <CardDescription>Manage your app's storage and data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-whispr-gray-light p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total Usage</span>
                    <span className="text-lg font-bold text-whispr-orange">{storageData.total}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Chat Messages</span>
                      <span className="font-medium">{storageData.chats}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Media Files</span>
                      <span className="font-medium">{storageData.media}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cache</span>
                      <span className="font-medium">{storageData.cache}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline">Clear Cache</Button>
                  <Button variant="outline">Clear Chat History</Button>
                </div>
                
                <div>
                  <Label>Auto-Backup Settings</Label>
                  <p className="text-sm text-gray-600 mb-2">Automatically backup your chats</p>
                  <Select value={settings.autoBackup} onValueChange={(value) => updateSetting('autoBackup', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Network Settings</Label>
                  <p className="text-sm text-gray-600 mb-2">Choose when to sync messages</p>
                  <Select value={settings.networkSettings} onValueChange={(value) => updateSetting('networkSettings', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wifi">Wi-Fi Only</SelectItem>
                      <SelectItem value="cellular">Cellular Only</SelectItem>
                      <SelectItem value="both">Wi-Fi & Cellular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Developer Tools */}
          <TabsContent value="developer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Developer Tools</CardTitle>
                <CardDescription>Advanced settings for debugging and monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-whispr-gray-light p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>Current Latency</span>
                    <Badge className="bg-green-500">24ms</Badge>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Transport Protocol</span>
                    <Badge variant="outline">WebSocket</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Connection Status</span>
                    <Badge className="bg-green-500">Connected</Badge>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  View Application Logs
                </Button>
                
                <Button variant="outline" className="w-full">
                  Export Debug Report
                </Button>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Send Crash Reports</Label>
                    <p className="text-sm text-gray-600">Help improve Whispr by sending anonymous crash data</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Whispr</CardTitle>
                <CardDescription>Information and support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-whispr-orange rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">W</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Whispr</h3>
                  <p className="text-gray-600 mb-1">Version 1.0.0</p>
                  <p className="text-sm text-gray-500">Ultra-fast, secure instant messaging</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="flex items-center justify-between">
                    <span>Terms of Service</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="outline" className="flex items-center justify-between">
                    <span>Privacy Policy</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="outline" className="flex items-center justify-between">
                    <span>Open Source Licenses</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="outline" className="flex items-center justify-between">
                    <span>Contact Support</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                
                <Button className="w-full bg-whispr-orange hover:bg-whispr-orange-dark text-white">
                  Rate Whispr ⭐
                </Button>
                
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-500">
                    Made with ❤️ for secure communication
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
