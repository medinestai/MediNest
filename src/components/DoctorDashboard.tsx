import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Stethoscope, 
  Users, 
  Calendar, 
  FileText, 
  Bell, 
  Activity, 
  Clock, 
  TrendingUp,
  User,
  Phone,
  Mail,
  MapPin,
  LogOut,
  Shield
} from 'lucide-react';

interface DoctorDashboardProps {
  onNavigate: (view: string) => void;
  user: any;
  logo: string;
  onLogout: () => void;
}

export function DoctorDashboard({ onNavigate, user, logo, onLogout }: DoctorDashboardProps) {
  const upcomingAppointments = [
    {
      id: 1,
      patient: 'John Smith',
      time: '9:00 AM',
      type: 'Follow-up',
      condition: 'Hypertension',
      urgent: false
    },
    {
      id: 2,
      patient: 'Emily Johnson',
      time: '10:30 AM',
      type: 'Consultation',
      condition: 'Diabetes Check',
      urgent: false
    },
    {
      id: 3,
      patient: 'Michael Brown',
      time: '2:00 PM',
      type: 'Emergency',
      condition: 'Chest Pain',
      urgent: true
    },
    {
      id: 4,
      patient: 'Sarah Wilson',
      time: '3:30 PM',
      type: 'Regular Check-up',
      condition: 'Annual Physical',
      urgent: false
    }
  ];

  const recentPatients = [
    {
      name: 'Alice Davis',
      lastVisit: '2024-01-18',
      condition: 'Recovered - Flu',
      status: 'Stable'
    },
    {
      name: 'Robert Taylor',
      lastVisit: '2024-01-17',
      condition: 'Ongoing - Diabetes',
      status: 'Monitoring'
    },
    {
      name: 'Linda Anderson',
      lastVisit: '2024-01-16',
      condition: 'Follow-up - Surgery',
      status: 'Improving'
    }
  ];

  const quickActions = [
    {
      title: 'Patient Records',
      description: 'View and manage patient files',
      icon: FileText,
      action: () => console.log('Patient Records'),
      color: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Schedule Appointment',
      description: 'Book new patient appointments',
      icon: Calendar,
      action: () => onNavigate('appointments'),
      color: 'from-green-500/20 to-green-600/20',
      borderColor: 'border-green-200'
    },
    {
      title: 'Prescriptions',
      description: 'Manage patient prescriptions',
      icon: Bell,
      action: () => console.log('Prescriptions'),
      color: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Analytics',
      description: 'View practice statistics',
      icon: TrendingUp,
      action: () => console.log('Analytics'),
      color: 'from-orange-500/20 to-orange-600/20',
      borderColor: 'border-orange-200'
    },
    {
      title: 'Blockchain Identity',
      description: 'Secure patient data with blockchain',
      icon: Shield,
      action: () => onNavigate('blockchain'),
      color: 'from-indigo-500/20 to-indigo-600/20',
      borderColor: 'border-indigo-200'
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
              <h1 className="text-3xl text-black">Doctor Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name || 'Doctor'}</p>
              <p className="text-sm text-gray-500">{user?.specialty || 'Medical Professional'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white/50 border-gray-200">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
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
                  <p className="text-sm text-gray-600">Today's Patients</p>
                  <p className="text-2xl text-black">12</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-lg bg-gradient-to-br from-white/70 to-white/50 border border-gray-200/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Reviews</p>
                  <p className="text-2xl text-black">8</p>
                </div>
                <FileText className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-lg bg-gradient-to-br from-white/70 to-white/50 border border-gray-200/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Urgent Cases</p>
                  <p className="text-2xl text-black">2</p>
                </div>
                <Bell className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-lg bg-gradient-to-br from-white/70 to-white/50 border border-gray-200/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl text-black">48</p>
                </div>
                <TrendingUp className="w-8 h-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Schedule */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div 
                      key={appointment.id} 
                      className={`p-4 rounded-lg border ${
                        appointment.urgent 
                          ? 'bg-red-50/70 border-red-200' 
                          : 'bg-white/50 border-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            appointment.urgent ? 'bg-red-100' : 'bg-blue-100'
                          }`}>
                            <User className={`w-5 h-5 ${
                              appointment.urgent ? 'text-red-600' : 'text-blue-600'
                            }`} />
                          </div>
                          <div>
                            <h4 className="text-black">{appointment.patient}</h4>
                            <p className="text-sm text-gray-600">{appointment.condition}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-black">{appointment.time}</p>
                          <p className={`text-sm ${
                            appointment.urgent ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {appointment.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-black hover:bg-gray-800 text-white">
                          View Records
                        </Button>
                        <Button size="sm" variant="outline" className="bg-white/50 border-gray-200">
                          Reschedule
                        </Button>
                        {appointment.urgent && (
                          <Button size="sm" variant="destructive">
                            Mark Urgent
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Card 
                        key={index}
                        className={`backdrop-blur-lg bg-gradient-to-br ${action.color} border ${action.borderColor} hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                        onClick={action.action}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <Icon className="w-6 h-6 text-black group-hover:scale-110 transition-transform duration-200" />
                            <h3 className="text-black">{action.title}</h3>
                          </div>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Patients */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentPatients.map((patient, index) => (
                    <div key={index} className="p-3 rounded-lg bg-white/50 border border-gray-100">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-sm text-black">{patient.name}</h4>
                          <p className="text-xs text-gray-600">{patient.condition}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          patient.status === 'Stable' ? 'bg-green-100 text-green-800' :
                          patient.status === 'Monitoring' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {patient.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Last visit: {patient.lastVisit}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="backdrop-blur-lg bg-gradient-to-br from-red-50/70 to-red-100/70 border border-red-200/50">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Phone className="w-5 h-5 text-red-600" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-red-600" />
                  <div>
                    <p className="text-black">Emergency Services</p>
                    <p className="text-red-600">911</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-black">Hospital Main</p>
                    <p className="text-blue-600">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-black">Admin Office</p>
                    <p className="text-green-600">admin@hospital.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Practice Info */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">Practice Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-black">General Hospital</p>
                    <p className="text-gray-600">Main Campus, Wing A</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Stethoscope className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-black">Specialty</p>
                    <p className="text-gray-600">{user?.specialty || 'General Medicine'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-black">Hours</p>
                    <p className="text-gray-600">Mon-Fri 8AM-6PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}