'use client';

import { useState } from 'react';
import { 
  ArrowLeft, UserX, UserCheck, Edit, Search, Filter, Users,
  Mail, Calendar, Shield, Award, AlertCircle, MoreVertical,
  Eye, Trash2, Crown, Star, TrendingUp
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useAdmin } from '../../contexts/AdminContext';
import { toast } from 'sonner';

interface AdminUsersPageProps {
  onBack: () => void;
}

export function AdminUsersPage({ onBack }: AdminUsersPageProps) {
  const { users, blockUser, unblockUser } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const activeUsers = users.filter(u => u.status === 'active');
  const blockedUsers = users.filter(u => u.status === 'blocked');
  const shopOwners = users.filter(u => u.role === 'shop_owner');
  const regularUsers = users.filter(u => u.role === 'user');

  const filteredUsers = (tab: string) => {
    let userList = tab === 'active' ? activeUsers : 
                   tab === 'blocked' ? blockedUsers :
                   tab === 'owners' ? shopOwners :
                   tab === 'regular' ? regularUsers : users;
    
    return userList.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleBlock = (userId: string) => {
    blockUser(userId);
    toast.success('User blocked successfully');
  };

  const handleUnblock = (userId: string) => {
    unblockUser(userId);
    toast.success('User unblocked successfully');
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'shop_owner':
        return (
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
            <Crown className="w-3 h-3 mr-1" />
            Shop Owner
          </Badge>
        );
      case 'admin':
        return (
          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
            <Shield className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
            <Star className="w-3 h-3 mr-1" />
            User
          </Badge>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <Badge className="bg-emerald-500 text-white border-0">
          <UserCheck className="w-3 h-3 mr-1" />
          Active
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-500 text-white border-0">
        <UserX className="w-3 h-3 mr-1" />
        Blocked
      </Badge>
    );
  };

  const UserCard = ({ user }: { user: any }) => {
    const initials = user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
    const isOwner = user.role === 'shop_owner';
    const isActive = user.status === 'active';
    
    return (
      <Card className="group relative overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
        {/* Top Gradient Bar */}
        <div className={`h-1.5 ${
          isOwner 
            ? 'bg-gradient-to-r from-purple-500 to-pink-600' 
            : 'bg-gradient-to-r from-emerald-500 to-teal-600'
        }`} />
        
        <div className="p-5 space-y-4">
          {/* Header Section */}
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14 border-4 border-white dark:border-gray-800 shadow-lg">
              <AvatarFallback className={`text-lg font-bold ${
                isOwner 
                  ? 'bg-gradient-to-br from-purple-500 to-pink-600' 
                  : 'bg-gradient-to-br from-emerald-500 to-teal-600'
              } text-white`}>
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-white truncate">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{user.email}</p>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {isActive ? (
                      <DropdownMenuItem onClick={() => handleBlock(user.id)} className="text-red-600">
                        <UserX className="w-4 h-4 mr-2" />
                        Block User
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => handleUnblock(user.id)} className="text-emerald-600">
                        <UserCheck className="w-4 h-4 mr-2" />
                        Unblock User
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                {getRoleBadge(user.role)}
                {getStatusBadge(user.status)}
              </div>
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <Mail className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-500">Email</p>
                <p className="font-medium text-gray-900 dark:text-white truncate">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <Calendar className="w-4 h-4 text-purple-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-500">Joined</p>
                <p className="font-medium text-gray-900 dark:text-white truncate">{user.joinedDate}</p>
              </div>
            </div>

            {user.role === 'shop_owner' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Award className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-500">Shops</p>
                    <p className="font-medium text-gray-900 dark:text-white">3 Active</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-500">Rating</p>
                    <p className="font-medium text-gray-900 dark:text-white">4.8 ⭐</p>
                  </div>
                </div>
              </>
            )}

            {user.role === 'user' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Star className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-500">Favorites</p>
                    <p className="font-medium text-gray-900 dark:text-white">12 Items</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Eye className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-500">Activity</p>
                    <p className="font-medium text-gray-900 dark:text-white">Last seen today</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          {isActive ? (
            <Button
              size="sm"
              variant="outline"
              className="w-full text-red-600 border-red-300 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950 transition-all"
              onClick={() => handleBlock(user.id)}
            >
              <UserX className="w-4 h-4 mr-2" />
              Block User
            </Button>
          ) : (
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl"
              onClick={() => handleUnblock(user.id)}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Unblock User
            </Button>
          )}
        </div>
      </Card>
    );
  };

  const stats = {
    total: users.length,
    active: activeUsers.length,
    blocked: blockedUsers.length,
    owners: shopOwners.length,
    regular: regularUsers.length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30 dark:from-gray-950 dark:via-emerald-950/30 dark:to-teal-950/30">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 shadow-lg border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
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
                    <Users className="w-6 h-6 md:w-7 md:h-7 text-emerald-500" />
                    Manage Users
                  </h1>
                  <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0">
                    {stats.total} Total
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  View and manage user accounts
                </p>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                  {stats.total}
                </div>
              </div>
              <div className="text-xs font-medium text-blue-700 dark:text-blue-500">Total Users</div>
            </Card>
            
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
              <div className="flex items-center justify-center gap-2 mb-1">
                <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {stats.active}
                </div>
              </div>
              <div className="text-xs font-medium text-emerald-700 dark:text-emerald-500">Active</div>
            </Card>
            
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Crown className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
                  {stats.owners}
                </div>
              </div>
              <div className="text-xs font-medium text-purple-700 dark:text-purple-500">Shop Owners</div>
            </Card>
            
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30">
              <div className="flex items-center justify-center gap-2 mb-1">
                <UserX className="w-4 h-4 text-red-600 dark:text-red-400" />
                <div className="text-2xl font-extrabold text-red-600 dark:text-red-400">
                  {stats.blocked}
                </div>
              </div>
              <div className="text-xs font-medium text-red-700 dark:text-red-500">Blocked</div>
            </Card>
          </div>

          {/* Search Bar */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search users by name, email, or role..."
              className="pl-11 h-11 rounded-xl border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 bg-white dark:bg-gray-900 shadow-md rounded-xl p-1">
              <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
                <Users className="w-4 h-4 mr-2" />
                All ({stats.total})
              </TabsTrigger>
              <TabsTrigger value="active" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white">
                <UserCheck className="w-4 h-4 mr-2" />
                Active ({stats.active})
              </TabsTrigger>
              <TabsTrigger value="owners" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white">
                <Crown className="w-4 h-4 mr-2" />
                Owners ({stats.owners})
              </TabsTrigger>
              <TabsTrigger value="blocked" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-600 data-[state=active]:text-white">
                <UserX className="w-4 h-4 mr-2" />
                Blocked ({stats.blocked})
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers(selectedTab).length > 0 ? (
                filteredUsers(selectedTab).map((user) => <UserCard key={user.id} user={user} />)
              ) : (
                <div className="col-span-full text-center py-16">
                  <Filter className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg">No users found</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search</p>
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}
