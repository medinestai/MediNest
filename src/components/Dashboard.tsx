import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  AlertTriangle, 
  Apple, 
  Calendar, 
  Bot, 
  Bell, 
  Clock, 
  Activity, 
  Shield,
  User,
  Settings,
  LogOut,
  FileText,
  Pill,
  BarChart3
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: string) => void;
  user: any;
  logo: string;
  onLogout: () => void;
}

export function Dashboard({ onNavigate, user, logo, onLogout }: DashboardProps) {
  const features = [
    {
      title: 'Patient Records',
      description: 'Securely manage your medical files',
      icon: FileText,
      action: () => onNavigate('patient-records'),
      color: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-200',
      featured: true
    },
    {
      title: 'Prescriptions',
      description: 'Manage digital prescriptions and refills',
      icon: Pill,
      action: () => onNavigate('prescriptions'),
      color: 'from-green-500/20 to-green-600/20',
      borderColor: 'border-green-200',
      featured: true
    },
    {
      title: 'Health Analytics',
      description: 'AI-powered health insights and trends',
      icon: BarChart3,
      action: () => onNavigate('analytics'),
      color: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-200',
      featured: true
    },
    {
      title: 'Problem Reporting',
      description: 'Report medication issues or concerns',
      icon: AlertTriangle,
      action: () => onNavigate('problems'),
      color: 'from-red-500/20 to-red-600/20',
      borderColor: 'border-red-200'
    },
    {
      title: 'Nutrition Tracker',
      description: 'Track your daily nutrition and diet',
      icon: Apple,
      action: () => onNavigate('nutrition'),
      color: 'from-green-500/20 to-green-600/20',
      borderColor: 'border-green-200'
    },
    {
      title: 'Appointments',
      description: 'Schedule and manage appointments',
      icon: Calendar,
      action: () => onNavigate('appointments'),
      color: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-200'
    },
    {
      title: 'AI Assistant',
      description: 'Get health advice and support',
      icon: Bot,
      action: () => onNavigate('ai-assistant'),
      color: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Medicine Reminders',
      description: 'Never miss your medication',
      icon: Bell,
      action: () => onNavigate('medicine-reminders'),
      color: 'from-yellow-500/20 to-yellow-600/20',
      borderColor: 'border-yellow-200'
    },
    {
      title: 'Medicine Expiration',
      description: 'Track medication expiry dates',
      icon: Clock,
      action: () => onNavigate('medicine-expiration'),
      color: 'from-orange-500/20 to-orange-600/20',
      borderColor: 'border-orange-200'
    },
    {
      title: 'Fitness Tracker',
      description: 'Monitor your fitness activities',
      icon: Activity,
      action: () => onNavigate('fitness'),
      color: 'from-teal-500/20 to-teal-600/20',
      borderColor: 'border-teal-200'
    },
    {
      title: 'Blockchain Identity',
      description: 'Secure your data with blockchain',
      icon: Shield,
      action: () => onNavigate('blockchain'),
      color: 'from-indigo-500/20 to-indigo-600/20',
      borderColor: 'border-indigo-200'
    },
    {
      title: 'Privacy Policy',
      description: 'View our privacy policy',
      icon: Settings,
      action: () => onNavigate('privacy'),
      color: 'from-gray-500/20 to-gray-600/20',
      borderColor: 'border-gray-200'
    }
  ];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={logo} alt="MediNest" className="w-16 h-16" />
            <div>
              <h1 className="text-3xl text-black">Patient Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name || 'User'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => onNavigate('setup')} 
              variant="outline"
              className="bg-white/50 border-gray-200"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button 
              onClick={() => {
                if (window.confirm('Are you sure you want to logout?')) {
                  onLogout();
                }
              }} 
              variant="outline"
              className="bg-red-50/50 border-red-200 text-red-600 hover:bg-red-100/50 hover:text-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="backdrop-blur-lg bg-gradient-to-br from-white/70 to-white/50 border border-gray-200/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Medical Records</p>
                  <p className="text-2xl text-black">12</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-lg bg-gradient-to-br from-white/70 to-white/50 border border-gray-200/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Prescriptions</p>
                  <p className="text-2xl text-black">3</p>
                </div>
                <Pill className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-lg bg-gradient-to-br from-white/70 to-white/50 border border-gray-200/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Health Score</p>
                  <p className="text-2xl text-black">85%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-lg bg-gradient-to-br from-white/70 to-white/50 border border-gray-200/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Upcoming Appointments</p>
                  <p className="text-2xl text-black">2</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-lg bg-gradient-to-br from-white/70 to-white/50 border border-gray-200/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Calories Today</p>
                  <p className="text-2xl text-black">1,850</p>
                </div>
                <Apple className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-lg bg-gradient-to-br from-white/70 to-white/50 border border-gray-200/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Upcoming Appointments</p>
                  <p className="text-2xl text-black">2</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Features */}
        <div className="mb-8">
          <h2 className="text-xl text-black mb-4">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.filter(f => f.featured).map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className={`backdrop-blur-lg bg-gradient-to-br ${feature.color} border ${feature.borderColor} hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden`}
                  onClick={feature.action}
                >
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Icon className="w-10 h-10 text-black group-hover:scale-110 transition-transform duration-200" />
                      <div className="flex-1">
                        <h3 className="text-black">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Additional Features */}
        <div>
          <h2 className="text-xl text-black mb-4">Additional Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.filter(f => !f.featured).map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className={`backdrop-blur-lg bg-gradient-to-br ${feature.color} border ${feature.borderColor} hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                  onClick={feature.action}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Icon className="w-8 h-8 text-black group-hover:scale-110 transition-transform duration-200" />
                      <div className="w-2 h-2 rounded-full bg-black/20"></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-black mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8 backdrop-blur-lg bg-white/70 border border-gray-200/50">
          <CardHeader>
            <CardTitle className="text-black">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                <FileText className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm text-black">New lab results uploaded to Patient Records</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                <Pill className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm text-black">Prescription refill request sent to pharmacy</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm text-black">Weekly health analytics report generated</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                <Bell className="w-5 h-5 text-yellow-600" />
                <div className="flex-1">
                  <p className="text-sm text-black">Medicine reminder: Take Vitamin D</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm text-black">Appointment scheduled with Dr. Smith</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}