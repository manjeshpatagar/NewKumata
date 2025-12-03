import { useState } from 'react';
import { 
  ArrowLeft, TrendingUp, TrendingDown, Users, Store, ShoppingBag,
  Eye, Heart, BarChart3, PieChart, Activity, Calendar, Download,
  Filter, ArrowUp, ArrowDown, Minus
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AdminAnalyticsPageProps {
  onBack: () => void;
}

export function AdminAnalyticsPage({ onBack }: AdminAnalyticsPageProps) {
  const [timeRange, setTimeRange] = useState('7days');

  const overviewStats = [
    {
      label: 'Total Views',
      value: '45,231',
      change: 12.5,
      trend: 'up',
      icon: Eye,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
    },
    {
      label: 'Active Users',
      value: '8,942',
      change: 8.2,
      trend: 'up',
      icon: Users,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
    },
    {
      label: 'Total Listings',
      value: '1,234',
      change: 5.7,
      trend: 'up',
      icon: Store,
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
    },
    {
      label: 'Advertisements',
      value: '567',
      change: -2.3,
      trend: 'down',
      icon: ShoppingBag,
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30',
    },
  ];

  const topCategories = [
    { name: 'Shops', count: 248, percentage: 35, trend: 'up', change: 12 },
    { name: 'Services', count: 189, percentage: 27, trend: 'up', change: 8 },
    { name: 'Tourism', count: 156, percentage: 22, trend: 'down', change: -3 },
    { name: 'Temples', count: 112, percentage: 16, trend: 'up', change: 5 },
  ];

  const topAds = [
    { name: 'Jobs', count: 164, percentage: 29, trend: 'up', change: 15 },
    { name: 'Electronics', count: 142, percentage: 25, trend: 'up', change: 10 },
    { name: 'Cars', count: 98, percentage: 17, trend: 'stable', change: 0 },
    { name: 'Furniture', count: 87, percentage: 15, trend: 'down', change: -5 },
    { name: 'Bikes', count: 76, percentage: 14, trend: 'up', change: 7 },
  ];

  const userActivity = [
    { day: 'Mon', views: 6234, users: 1245, interactions: 892 },
    { day: 'Tue', views: 7456, users: 1567, interactions: 1023 },
    { day: 'Wed', views: 5678, users: 1123, interactions: 867 },
    { day: 'Thu', views: 8901, users: 1789, interactions: 1245 },
    { day: 'Fri', views: 9234, users: 1890, interactions: 1456 },
    { day: 'Sat', views: 10567, users: 2134, interactions: 1678 },
    { day: 'Sun', views: 8234, users: 1623, interactions: 1234 },
  ];

  const topShops = [
    { name: 'Rajesh General Store', views: 2345, favorites: 156, rating: 4.8 },
    { name: 'Kumta Medical Store', views: 2123, favorites: 142, rating: 4.9 },
    { name: 'Sri Krishna Furniture', views: 1987, favorites: 128, rating: 4.7 },
    { name: 'City Electronics', views: 1765, favorites: 115, rating: 4.6 },
    { name: 'Royal Hotel & Restaurant', views: 1543, favorites: 98, rating: 4.8 },
  ];

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') return <ArrowUp className="w-3 h-3" />;
    if (trend === 'down') return <ArrowDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-emerald-600 dark:text-emerald-400';
    if (trend === 'down') return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-950 dark:via-blue-950/30 dark:to-indigo-950/30">
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
                    <BarChart3 className="w-6 h-6 md:w-7 md:h-7 text-blue-500" />
                    Analytics & Reports
                  </h1>
                  <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
                    Live
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Track performance and user insights
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[140px] rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                size="sm"
                variant="outline"
                className="rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6 pb-24 space-y-6">
          
          {/* Overview Stats */}
          <section>
            <h2 className="text-xl font-bold dark:text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Overview Statistics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {overviewStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card
                    key={index}
                    className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${stat.bgGradient}`}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                      <Icon className="w-full h-full" />
                    </div>
                    
                    <div className="relative p-5">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg mb-3`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      
                      <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {stat.label}
                      </p>
                      
                      <div className={`flex items-center gap-1 text-sm font-semibold ${
                        stat.trend === 'up' 
                          ? 'text-emerald-600 dark:text-emerald-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {stat.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span>{Math.abs(stat.change)}%</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-normal ml-1">
                          vs last period
                        </span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Charts and Category Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* User Activity Chart */}
            <Card className="border-0 shadow-xl">
              <div className="p-6">
                <h3 className="text-lg font-bold dark:text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-500" />
                  Weekly Activity
                </h3>
                <div className="space-y-3">
                  {userActivity.map((day, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{day.day}</span>
                        <span className="text-gray-500 dark:text-gray-400">{day.views.toLocaleString()} views</span>
                      </div>
                      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${(day.views / 12000) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Top Categories */}
            <Card className="border-0 shadow-xl">
              <div className="p-6">
                <h3 className="text-lg font-bold dark:text-white mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-500" />
                  Top Shop Categories
                </h3>
                <div className="space-y-4">
                  {topCategories.map((cat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 dark:text-white">{cat.name}</span>
                          <Badge variant="secondary" className="text-xs">{cat.count}</Badge>
                        </div>
                        <div className={`flex items-center gap-1 text-sm font-semibold ${getTrendColor(cat.trend)}`}>
                          {getTrendIcon(cat.trend, cat.change)}
                          <span>{Math.abs(cat.change)}%</span>
                        </div>
                      </div>
                      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-500"
                          style={{ width: `${cat.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Advertisement Categories */}
          <section>
            <h2 className="text-xl font-bold dark:text-white mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-500" />
              Top Advertisement Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {topAds.map((ad, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="p-4 text-center">
                    <p className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mb-1">
                      {ad.count}
                    </p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {ad.name}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {ad.percentage}% of total
                    </Badge>
                    <div className={`flex items-center justify-center gap-1 text-xs font-semibold mt-2 ${getTrendColor(ad.trend)}`}>
                      {getTrendIcon(ad.trend, ad.change)}
                      <span>{Math.abs(ad.change)}%</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Top Performing Shops */}
          <section>
            <h2 className="text-xl font-bold dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Top Performing Shops
            </h2>
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Shop Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Views
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Favorites
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {topShops.map((shop, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                            index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                            index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                            index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                            'bg-gray-400'
                          }`}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900 dark:text-white">{shop.name}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {shop.views.toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-red-500" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {shop.favorites}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                            ⭐ {shop.rating}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

        </div>
      </ScrollArea>
    </div>
  );
}
