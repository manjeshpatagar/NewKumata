import { useState } from 'react';
import { 
  ArrowLeft, Send, Bell, Users, Crown, Star, Calendar, Clock,
  Check, TrendingUp, Sparkles, Zap, MessageSquare, Target, Filter,
  CheckCheck, XCircle, Megaphone, Info, Gift, AlertTriangle, MapPin,
  ShoppingBag, Eye, Trash2, Search
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { ScrollArea } from '../ui/scroll-area';
import { Alert, AlertDescription } from '../ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';

interface AdminNotificationsPageProps {
  onBack: () => void;
}

interface SentNotification {
  id: number;
  type: 'approval' | 'rejection' | 'promotion' | 'update' | 'system' | 'event' | 'warning' | 'announcement';
  title: string;
  message: string;
  sent: string;
  target: string;
  priority: 'high' | 'normal' | 'low';
  delivered: number;
  opened: number;
  status: 'sent' | 'scheduled' | 'draft';
}

export function AdminNotificationsPage({ onBack }: AdminNotificationsPageProps) {
  const [sent, setSent] = useState(false);
  const [selectedTab, setSelectedTab] = useState('send');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    target: 'all',
    priority: 'normal',
    type: 'announcement',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.message) {
      toast.error('Please fill all required fields');
      return;
    }

    setSent(true);
    toast.success('Notification sent successfully!');
    
    setTimeout(() => {
      setSent(false);
      setFormData({ 
        title: '', 
        message: '', 
        target: 'all', 
        priority: 'normal',
        type: 'announcement'
      });
    }, 3000);
  };

  const allNotifications: SentNotification[] = [
    { 
      id: 1, 
      type: 'update',
      title: 'New Features Available', 
      message: 'Check out our latest updates: Dark mode, Kannada support, and improved search',
      sent: '2 hours ago', 
      target: 'All Users',
      priority: 'high',
      delivered: 1250,
      opened: 890,
      status: 'sent',
    },
    { 
      id: 2, 
      type: 'promotion',
      title: 'Festival Offers', 
      message: 'Special discounts for Diwali celebration - Check out exclusive deals!',
      sent: '5 hours ago', 
      target: 'All Users',
      priority: 'normal',
      delivered: 1250,
      opened: 756,
      status: 'sent',
    },
    { 
      id: 3, 
      type: 'approval',
      title: 'Listing Approved', 
      message: 'Your shop "Kumar Bakery" has been approved and is now live',
      sent: '8 hours ago', 
      target: 'Shop Owners',
      priority: 'high',
      delivered: 84,
      opened: 72,
      status: 'sent',
    },
    { 
      id: 4, 
      type: 'rejection',
      title: 'Advertisement Rejected', 
      message: 'Your ad does not meet our community guidelines. Please review and resubmit.',
      sent: '12 hours ago', 
      target: 'Shop Owners',
      priority: 'high',
      delivered: 5,
      opened: 5,
      status: 'sent',
    },
    { 
      id: 5, 
      type: 'announcement',
      title: 'New Shop Added', 
      message: 'Kumta Medical Store is now live on Namma Kumta',
      sent: '1 day ago', 
      target: 'All Users',
      priority: 'normal',
      delivered: 1250,
      opened: 423,
      status: 'sent',
    },
    { 
      id: 6, 
      type: 'event',
      title: 'Yakshagana Performance', 
      message: 'Traditional Yakshagana this weekend at Town Hall. Book tickets now!',
      sent: '1 day ago', 
      target: 'All Users',
      priority: 'normal',
      delivered: 1250,
      opened: 567,
      status: 'sent',
    },
    { 
      id: 7, 
      type: 'system',
      title: 'App Maintenance', 
      message: 'Scheduled maintenance this weekend from 2 AM to 4 AM',
      sent: '2 days ago', 
      target: 'All Users',
      priority: 'high',
      delivered: 1250,
      opened: 982,
      status: 'sent',
    },
    { 
      id: 8, 
      type: 'warning',
      title: 'Policy Update', 
      message: 'Important: Updated community guidelines. Please review before posting.',
      sent: '3 days ago', 
      target: 'Shop Owners',
      priority: 'high',
      delivered: 84,
      opened: 78,
      status: 'sent',
    },
    { 
      id: 9, 
      type: 'promotion',
      title: 'Beach Resort Opening', 
      message: 'New beach resort with special inaugural rates. Limited time offer!',
      sent: '4 days ago', 
      target: 'All Users',
      priority: 'normal',
      delivered: 1250,
      opened: 645,
      status: 'sent',
    },
    { 
      id: 10, 
      type: 'announcement',
      title: 'New Category Added', 
      message: 'Sports & Equipments category now available. List your items!',
      sent: '5 days ago', 
      target: 'Shop Owners',
      priority: 'low',
      delivered: 84,
      opened: 52,
      status: 'sent',
    },
    { 
      id: 11, 
      type: 'update',
      title: 'Search Improvements', 
      message: 'Enhanced search with smart suggestions and filters',
      sent: '1 week ago', 
      target: 'All Users',
      priority: 'low',
      delivered: 1250,
      opened: 534,
      status: 'sent',
    },
    { 
      id: 12, 
      type: 'event',
      title: 'Temple Festival', 
      message: 'Annual Mahabaleshwar Temple festival next week. View schedule in app.',
      sent: '1 week ago', 
      target: 'All Users',
      priority: 'normal',
      delivered: 1250,
      opened: 789,
      status: 'sent',
    },
  ];

  const filteredNotifications = allNotifications.filter(notif => {
    const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || notif.type === filterType;
    return matchesSearch && matchesType;
  });

  const stats = {
    totalSent: allNotifications.length,
    delivered: 98.4,
    opened: 67.2,
    avgOpenRate: 68.5,
  };

  const getTargetIcon = (target: string) => {
    switch (target) {
      case 'All Users':
        return <Users className="w-4 h-4" />;
      case 'Shop Owners':
        return <Crown className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500 text-white border-0 text-xs">High Priority</Badge>;
      case 'low':
        return <Badge className="bg-blue-500 text-white border-0 text-xs">Low Priority</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white border-0 text-xs">Normal</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return <CheckCheck className="w-4 h-4" />;
      case 'rejection':
        return <XCircle className="w-4 h-4" />;
      case 'promotion':
        return <Megaphone className="w-4 h-4" />;
      case 'update':
        return <Bell className="w-4 h-4" />;
      case 'system':
        return <Info className="w-4 h-4" />;
      case 'event':
        return <Calendar className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'announcement':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      approval: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400',
      rejection: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400',
      promotion: 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400',
      update: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
      system: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
      event: 'bg-pink-100 text-pink-700 dark:bg-pink-950/50 dark:text-pink-400',
      warning: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
      announcement: 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400',
    };

    return (
      <Badge className={`border-0 text-xs ${colors[type] || 'bg-gray-100 text-gray-700'}`}>
        <span className="flex items-center gap-1">
          {getTypeIcon(type)}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </Badge>
    );
  };

  const notificationTypes = [
    { value: 'all', label: 'All Types', count: allNotifications.length },
    { value: 'approval', label: 'Approvals', count: allNotifications.filter(n => n.type === 'approval').length },
    { value: 'rejection', label: 'Rejections', count: allNotifications.filter(n => n.type === 'rejection').length },
    { value: 'promotion', label: 'Promotions', count: allNotifications.filter(n => n.type === 'promotion').length },
    { value: 'event', label: 'Events', count: allNotifications.filter(n => n.type === 'event').length },
    { value: 'update', label: 'Updates', count: allNotifications.filter(n => n.type === 'update').length },
    { value: 'system', label: 'System', count: allNotifications.filter(n => n.type === 'system').length },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/30 dark:from-gray-950 dark:via-pink-950/30 dark:to-purple-950/30">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 shadow-lg border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-5">
          <div className="flex items-center gap-3 mb-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl dark:text-white flex items-center gap-2">
                  <Bell className="w-6 h-6 md:w-7 md:h-7 text-pink-500" />
                  Push Notifications
                </h1>
                <Badge className="bg-gradient-to-r from-pink-600 to-purple-600 text-white border-0">
                  Active
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Send announcements and updates to users
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Send className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                  {stats.totalSent}
                </div>
              </div>
              <div className="text-xs font-medium text-blue-700 dark:text-blue-500">Total Sent</div>
            </Card>
            
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {stats.delivered}%
                </div>
              </div>
              <div className="text-xs font-medium text-emerald-700 dark:text-emerald-500">Delivered</div>
            </Card>
            
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
                  {stats.opened}%
                </div>
              </div>
              <div className="text-xs font-medium text-purple-700 dark:text-purple-500">Opened</div>
            </Card>
            
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <div className="text-2xl font-extrabold text-orange-600 dark:text-orange-400">
                  {stats.avgOpenRate}%
                </div>
              </div>
              <div className="text-xs font-medium text-orange-700 dark:text-orange-500">Avg Open Rate</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[180px] sm:top-[156px] z-10 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-transparent p-0 h-auto">
              <TabsTrigger 
                value="send" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-none border-b-2 border-transparent data-[state=active]:border-pink-600 py-3"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Notification
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-none border-b-2 border-transparent data-[state=active]:border-pink-600 py-3"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                History ({allNotifications.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
          <Tabs value={selectedTab} className="w-full">
            {/* Send Notification Tab */}
            <TabsContent value="send" className="mt-0">
              <div className="max-w-2xl mx-auto">
                <Card className="border-0 shadow-xl bg-white dark:bg-gray-900">
                  <div className="p-6 space-y-6">
                    <div>
                      <h2 className="text-xl font-bold dark:text-white flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-pink-500" />
                        Compose New Notification
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Broadcast message to users
                      </p>
                    </div>

                    {sent && (
                      <Alert className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <AlertDescription className="text-emerald-800 dark:text-emerald-300">
                          Notification sent successfully!
                        </AlertDescription>
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="target" className="dark:text-gray-200 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Target Audience *
                          </Label>
                          <Select
                            value={formData.target}
                            onValueChange={(value) => setFormData({ ...formData, target: value })}
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Select audience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4" />
                                  All Users (1,250)
                                </div>
                              </SelectItem>
                              <SelectItem value="shopowners">
                                <div className="flex items-center gap-2">
                                  <Crown className="w-4 h-4" />
                                  Shop Owners (84)
                                </div>
                              </SelectItem>
                              <SelectItem value="customers">
                                <div className="flex items-center gap-2">
                                  <Star className="w-4 h-4" />
                                  Customers Only (1,166)
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="type" className="dark:text-gray-200 flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            Notification Type *
                          </Label>
                          <Select
                            value={formData.type}
                            onValueChange={(value) => setFormData({ ...formData, type: value })}
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="announcement">Announcement</SelectItem>
                              <SelectItem value="approval">Approval</SelectItem>
                              <SelectItem value="rejection">Rejection</SelectItem>
                              <SelectItem value="promotion">Promotion</SelectItem>
                              <SelectItem value="event">Event</SelectItem>
                              <SelectItem value="update">Update</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                              <SelectItem value="warning">Warning</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="priority" className="dark:text-gray-200 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Priority Level *
                        </Label>
                        <Select
                          value={formData.priority}
                          onValueChange={(value) => setFormData({ ...formData, priority: value })}
                        >
                          <SelectTrigger className="mt-1.5">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                High Priority
                              </div>
                            </SelectItem>
                            <SelectItem value="normal">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                Normal
                              </div>
                            </SelectItem>
                            <SelectItem value="low">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                Low Priority
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="title" className="dark:text-gray-200">Notification Title *</Label>
                        <Input
                          id="title"
                          placeholder="Enter notification title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                          className="mt-1.5"
                          maxLength={60}
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {formData.title.length}/60 characters
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="message" className="dark:text-gray-200">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Enter notification message..."
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          className="mt-1.5"
                          maxLength={200}
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {formData.message.length}/200 characters
                        </p>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl h-11"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Notification
                      </Button>
                    </form>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="mt-0 space-y-4">
              {/* Search and Filter */}
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search notifications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="sm:w-[200px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      {notificationTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label} ({type.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </Card>

              {/* Notifications List */}
              {filteredNotifications.length === 0 ? (
                <Card className="p-12 text-center border-0 shadow-xl bg-white dark:bg-gray-900">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-950/30 dark:to-purple-950/30 flex items-center justify-center">
                      <MessageSquare className="w-10 h-10 text-pink-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        No Notifications Found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {searchQuery ? 'Try adjusting your search or filters.' : 'Start sending notifications to see them here.'}
                      </p>
                    </div>
                  </div>
                </Card>
              ) : (
                filteredNotifications.map(notif => (
                  <Card key={notif.id} className="border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="p-5 space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h3 className="font-bold text-base text-gray-900 dark:text-white">
                              {notif.title}
                            </h3>
                            {getTypeBadge(notif.type)}
                            {getPriorityBadge(notif.priority)}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {notif.message}
                          </p>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            {getTargetIcon(notif.target)}
                            <span className="text-xs text-gray-500 dark:text-gray-400">Target</span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {notif.target}
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Send className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">Sent</span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {notif.delivered}
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Eye className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">Opened</span>
                          </div>
                          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                            {notif.opened}
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <TrendingUp className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">Rate</span>
                          </div>
                          <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                            {((notif.opened / notif.delivered) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t dark:border-gray-800">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{notif.sent}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="rounded-lg">
                            <Eye className="w-3.5 h-3.5 mr-1.5" />
                            View Details
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 dark:text-red-400">
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}
