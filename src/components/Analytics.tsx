import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Activity,
  Heart,
  Pill,
  Users,
  Clock,
  Target,
  Award,
  AlertTriangle,
  Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

interface AnalyticsProps {
  onNavigate: () => void;
}

export function Analytics({ onNavigate }: AnalyticsProps) {
  const [timeRange, setTimeRange] = useState('3months');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for charts
  const vitalsData = [
    { date: 'Jan', bloodPressure: 120, heartRate: 72, weight: 180 },
    { date: 'Feb', bloodPressure: 118, heartRate: 75, weight: 178 },
    { date: 'Mar', bloodPressure: 122, heartRate: 70, weight: 176 },
    { date: 'Apr', bloodPressure: 119, heartRate: 73, weight: 174 },
    { date: 'May', bloodPressure: 116, heartRate: 68, weight: 172 },
    { date: 'Jun', bloodPressure: 121, heartRate: 71, weight: 170 }
  ];

  const appointmentTrends = [
    { month: 'Jan', appointments: 3, completed: 3, cancelled: 0 },
    { month: 'Feb', appointments: 2, completed: 2, cancelled: 0 },
    { month: 'Mar', appointments: 4, completed: 3, cancelled: 1 },
    { month: 'Apr', appointments: 2, completed: 2, cancelled: 0 },
    { month: 'May', appointments: 3, completed: 3, cancelled: 0 },
    { month: 'Jun', appointments: 1, completed: 1, cancelled: 0 }
  ];

  const medicationAdherence = [
    { name: 'Taken on Time', value: 85, color: '#10b981' },
    { name: 'Taken Late', value: 10, color: '#f59e0b' },
    { name: 'Missed', value: 5, color: '#ef4444' }
  ];

  const healthMetrics = [
    { metric: 'BMI', current: 24.2, target: 23.0, trend: 'down', improvement: 0.8 },
    { metric: 'Blood Pressure', current: 119, target: 120, trend: 'stable', improvement: 0 },
    { metric: 'Heart Rate', current: 71, target: 70, trend: 'down', improvement: 2 },
    { metric: 'Medication Adherence', current: 95, target: 95, trend: 'up', improvement: 5 }
  ];

  const upcomingGoals = [
    { goal: 'Lose 5 pounds', progress: 70, deadline: '2024-03-01' },
    { goal: 'Reduce blood pressure', progress: 85, deadline: '2024-04-15' },
    { goal: 'Improve medication adherence', progress: 95, deadline: '2024-02-28' },
    { goal: 'Increase exercise frequency', progress: 60, deadline: '2024-03-15' }
  ];

  const recentAchievements = [
    { title: 'Perfect Week', description: 'Took all medications on time for 7 days', date: '2024-01-20', icon: Award },
    { title: 'Weight Goal', description: 'Lost 5 pounds this month', date: '2024-01-15', icon: Target },
    { title: 'Appointment Streak', description: 'Attended 10 consecutive appointments', date: '2024-01-10', icon: Calendar }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <Activity className="w-4 h-4 text-blue-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              onClick={onNavigate} 
              variant="outline"
              className="bg-white/50 border-gray-200"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl text-black flex items-center gap-2">
                <BarChart3 className="w-8 h-8 text-purple-600" />
                Health Analytics
              </h1>
              <p className="text-gray-600">AI-powered insights into your health journey</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40 bg-white/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-white/50">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="goals">Goals & Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {healthMetrics.map((metric, index) => (
                <Card key={index} className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{metric.metric}</p>
                        <p className="text-2xl text-black">{metric.current}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {getTrendIcon(metric.trend)}
                          <span className={`text-sm ${getTrendColor(metric.trend)}`}>
                            {metric.improvement > 0 ? '+' : ''}{metric.improvement}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Target</p>
                        <p className="text-lg text-gray-700">{metric.target}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Medication Adherence */}
              <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="w-5 h-5 text-green-600" />
                    Medication Adherence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={medicationAdherence}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {medicationAdherence.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAchievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                        <achievement.icon className="w-6 h-6 text-yellow-600 mt-1" />
                        <div className="flex-1">
                          <h3 className="text-black">{achievement.title}</h3>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{new Date(achievement.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Insights */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-600" />
                  AI Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <h3 className="text-black">Positive Trend</h3>
                        <p className="text-sm text-gray-600">Your medication adherence has improved by 15% this month. Keep up the great work!</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50/50 rounded-lg border border-green-200">
                    <div className="flex items-start gap-2">
                      <Target className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <h3 className="text-black">Goal Achievement</h3>
                        <p className="text-sm text-gray-600">You're on track to meet your weight loss goal 2 weeks ahead of schedule.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50/50 rounded-lg border border-yellow-200">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1" />
                      <div>
                        <h3 className="text-black">Recommendation</h3>
                        <p className="text-sm text-gray-600">Consider scheduling a follow-up appointment to discuss your blood pressure trends.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-purple-50/50 rounded-lg border border-purple-200">
                    <div className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <h3 className="text-black">Health Tip</h3>
                        <p className="text-sm text-gray-600">Your heart rate data suggests improved cardiovascular health. Great job staying active!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitals" className="space-y-6">
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle>Vital Signs Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vitalsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="bloodPressure" stroke="#ef4444" strokeWidth={2} name="Blood Pressure" />
                      <Line type="monotone" dataKey="heartRate" stroke="#10b981" strokeWidth={2} name="Heart Rate" />
                      <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} name="Weight" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle>Appointment History & Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={appointmentTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#10b981" name="Completed" />
                      <Bar dataKey="cancelled" fill="#ef4444" name="Cancelled" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Appointment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Appointments</p>
                      <p className="text-2xl text-black">15</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Completion Rate</p>
                      <p className="text-2xl text-black">93%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg. Time Between</p>
                      <p className="text-2xl text-black">21 days</p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Health Goals Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {upcomingGoals.map((goal, index) => (
                    <div key={index} className="p-4 bg-white/50 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-black">{goal.goal}</h3>
                          <p className="text-sm text-gray-600">Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
                        </div>
                        <Badge variant={goal.progress >= 90 ? 'default' : goal.progress >= 70 ? 'secondary' : 'outline'}>
                          {goal.progress}%
                        </Badge>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}