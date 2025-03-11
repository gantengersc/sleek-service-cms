
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  FileText, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronRight,
  BarChart3,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data for the dashboard
const dashboardData = {
  totalServices: 12,
  activeServices: 8,
  totalArticles: 24,
  pendingMessages: 5,
  totalUsers: 187,
  recentActivity: [
    { id: 1, type: 'message', title: 'New message received', time: '2 minutes ago', status: 'pending' },
    { id: 2, type: 'service', title: 'New service published', time: '1 hour ago', status: 'completed' },
    { id: 3, type: 'article', title: 'Article edited', time: '3 hours ago', status: 'completed' },
    { id: 4, type: 'user', title: 'New user registered', time: '5 hours ago', status: 'completed' },
    { id: 5, type: 'message', title: 'Message marked as resolved', time: '1 day ago', status: 'completed' }
  ],
  popularServices: [
    { id: 1, title: 'Website Development', views: 1245, inquiries: 42 },
    { id: 2, title: 'Mobile App Design', views: 987, inquiries: 36 },
    { id: 3, title: 'Digital Marketing', views: 876, inquiries: 29 }
  ]
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      toast.error('You must be logged in to view the dashboard');
      navigate('/admin/login');
      return;
    }
    
    // Simulate fetching dashboard data
    const timer = setTimeout(() => {
      setData(dashboardData);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex h-16 items-center justify-between border-b bg-white px-4">
          <div className="animate-pulse h-8 w-32 bg-gray-200 rounded"></div>
          <div className="animate-pulse h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
        <div className="container mx-auto p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-2 font-medium">
            <span className="text-primary font-bold">Admin</span>
            <span className="font-light">Panel</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
          aria-label="Logout"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-white transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } pt-16 lg:static lg:translate-x-0`}
        >
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              <NavItem 
                to="/admin/dashboard" 
                icon={<LayoutDashboard className="h-5 w-5" />} 
                label="Dashboard" 
                active 
              />
              <NavItem 
                to="/admin/services" 
                icon={<ShoppingBag className="h-5 w-5" />} 
                label="Services" 
                count={data.totalServices} 
              />
              <NavItem 
                to="/admin/articles" 
                icon={<FileText className="h-5 w-5" />} 
                label="Articles" 
                count={data.totalArticles} 
              />
              <NavItem 
                to="/admin/messages" 
                icon={<MessageSquare className="h-5 w-5" />} 
                label="Messages" 
                count={data.pendingMessages} 
                highlight={data.pendingMessages > 0} 
              />
              <NavItem 
                to="/admin/users" 
                icon={<Users className="h-5 w-5" />} 
                label="Users" 
              />
              <NavItem 
                to="/admin/settings" 
                icon={<Settings className="h-5 w-5" />} 
                label="Settings" 
              />
            </ul>
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2 text-sm hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Overlay to close sidebar on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatsCard 
              title="Total Services" 
              value={data.totalServices} 
              icon={<ShoppingBag className="h-5 w-5" />} 
              color="bg-blue-50 text-blue-500"
            />
            <StatsCard 
              title="Total Articles" 
              value={data.totalArticles} 
              icon={<FileText className="h-5 w-5" />} 
              color="bg-purple-50 text-purple-500"
            />
            <StatsCard 
              title="Pending Messages" 
              value={data.pendingMessages} 
              icon={<MessageSquare className="h-5 w-5" />} 
              color="bg-amber-50 text-amber-500"
            />
            <StatsCard 
              title="Registered Users" 
              value={data.totalUsers} 
              icon={<Users className="h-5 w-5" />} 
              color="bg-green-50 text-green-500"
            />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border shadow-sm mb-6">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold">Recent Activity</h2>
              <Link to="#" className="text-sm text-primary hover:underline">View All</Link>
            </div>
            <div className="p-4">
              <ul className="divide-y">
                {data.recentActivity.map((activity: any) => (
                  <li key={activity.id} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <ActivityIcon type={activity.type} status={activity.status} />
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Popular Services */}
          <div className="bg-white rounded-xl border shadow-sm">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold">Popular Services</h2>
              <Link to="/admin/services" className="text-sm text-primary hover:underline">Manage Services</Link>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium px-2 py-3">Service Name</th>
                      <th className="text-right font-medium px-2 py-3">Views</th>
                      <th className="text-right font-medium px-2 py-3">Inquiries</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.popularServices.map((service: any) => (
                      <tr key={service.id} className="border-b last:border-0">
                        <td className="px-2 py-3">{service.title}</td>
                        <td className="text-right px-2 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            {service.views}
                          </div>
                        </td>
                        <td className="text-right px-2 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            {service.inquiries}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  count?: number;
  active?: boolean;
  highlight?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, count, active, highlight }) => {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center justify-between rounded-lg px-3 py-2 transition-colors ${
          active 
            ? 'bg-primary text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </div>
        {count !== undefined && (
          <span 
            className={`ml-auto rounded-full px-2 py-0.5 text-xs ${
              highlight 
                ? 'bg-red-100 text-red-600' 
                : active 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-100 text-gray-600'
            }`}
          >
            {count}
          </span>
        )}
      </Link>
    </li>
  );
};

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className={`rounded-full p-2 ${color}`}>{icon}</div>
        <p className="text-sm font-medium">{title}</p>
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
};

interface ActivityIconProps {
  type: string;
  status: string;
}

const ActivityIcon: React.FC<ActivityIconProps> = ({ type, status }) => {
  let icon;
  let bgColor;
  
  switch (type) {
    case 'message':
      icon = <MessageSquare className="h-4 w-4" />;
      bgColor = 'bg-blue-100 text-blue-500';
      break;
    case 'service':
      icon = <ShoppingBag className="h-4 w-4" />;
      bgColor = 'bg-purple-100 text-purple-500';
      break;
    case 'article':
      icon = <FileText className="h-4 w-4" />;
      bgColor = 'bg-amber-100 text-amber-500';
      break;
    case 'user':
      icon = <Users className="h-4 w-4" />;
      bgColor = 'bg-green-100 text-green-500';
      break;
    default:
      icon = <AlertCircle className="h-4 w-4" />;
      bgColor = 'bg-gray-100 text-gray-500';
  }
  
  const statusIcon = status === 'pending' ? (
    <Clock className="h-3 w-3 text-amber-500" />
  ) : (
    <CheckCircle className="h-3 w-3 text-green-500" />
  );
  
  return (
    <div className="relative">
      <div className={`rounded-full p-2 ${bgColor}`}>{icon}</div>
      <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5">
        {statusIcon}
      </div>
    </div>
  );
};

export default Dashboard;
