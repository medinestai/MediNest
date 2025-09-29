import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Calendar, Clock, User, MapPin, Phone } from 'lucide-react';
import { Badge } from './ui/badge';

interface AppointmentSchedulerProps {
  onNavigate: (view: string) => void;
}

export function AppointmentScheduler({ onNavigate }: AppointmentSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentType, setAppointmentType] = useState('');

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Wilson',
      specialty: 'Cardiologist',
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'Follow-up',
      status: 'Confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Endocrinologist',
      date: '2024-01-25',
      time: '2:30 PM',
      type: 'Consultation',
      status: 'Pending'
    }
  ];

  const availableDoctors = [
    { name: 'Dr. Sarah Wilson', specialty: 'Cardiologist', rating: 4.9 },
    { name: 'Dr. Michael Chen', specialty: 'Endocrinologist', rating: 4.8 },
    { name: 'Dr. Emily Davis', specialty: 'General Practice', rating: 4.7 },
    { name: 'Dr. Robert Taylor', specialty: 'Orthopedic', rating: 4.6 }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const handleSchedule = () => {
    // In a real app, this would make an API call
    console.log('Scheduling appointment:', { selectedDate, selectedTime, selectedDoctor, appointmentType });
  };

  const handleReschedule = (appointmentId: number) => {
    // In a real app, this would handle rescheduling
    console.log('Rescheduling appointment:', appointmentId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={() => onNavigate('home')} 
            variant="outline"
            className="bg-white/50 border-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl text-black flex items-center gap-2">
              <Calendar className="w-8 h-8 text-blue-600" />
              Appointment Scheduler
            </h1>
            <p className="text-gray-600">Schedule and manage your medical appointments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Schedule New Appointment */}
          <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
            <CardHeader>
              <CardTitle className="text-black">Schedule New Appointment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Appointment Type</Label>
                <Select onValueChange={setAppointmentType}>
                  <SelectTrigger className="bg-white/50 border-gray-200">
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="check-up">Regular Check-up</SelectItem>
                    <SelectItem value="specialist">Specialist Visit</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Select Doctor</Label>
                <Select onValueChange={setSelectedDoctor}>
                  <SelectTrigger className="bg-white/50 border-gray-200">
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDoctors.map((doctor, index) => (
                      <SelectItem key={index} value={doctor.name}>
                        {doctor.name} - {doctor.specialty} (★ {doctor.rating})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="bg-white/50 border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Select onValueChange={setSelectedTime}>
                    <SelectTrigger className="bg-white/50 border-gray-200">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time, index) => (
                        <SelectItem key={index} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleSchedule}
                className="w-full bg-black hover:bg-gray-800 text-white"
                disabled={!selectedDate || !selectedTime || !selectedDoctor || !appointmentType}
              >
                Schedule Appointment
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 rounded-lg bg-white/50 border border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-black">{appointment.doctor}</h4>
                          <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {appointment.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {appointment.time}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReschedule(appointment.id)}
                        className="bg-white/50 border-gray-200"
                      >
                        Reschedule
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/50 border-gray-200"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Doctor Information */}
        <Card className="mt-6 backdrop-blur-lg bg-white/70 border border-gray-200/50">
          <CardHeader>
            <CardTitle className="text-black">Available Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableDoctors.map((doctor, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/50 border border-gray-100">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="text-black mb-1">{doctor.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
                    <div className="flex items-center justify-center gap-1 text-sm text-yellow-600">
                      <span>★</span>
                      <span>{doctor.rating}</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Main Hospital</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>(555) 123-4567</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}