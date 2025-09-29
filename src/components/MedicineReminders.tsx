import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Bell, Plus, Clock, Pill, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';

interface MedicineRemindersProps {
  onNavigate: (view: string) => void;
}

interface Reminder {
  id: number;
  medicineName: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate: string;
  active: boolean;
  taken: boolean;
  nextDose: string;
}

export function MedicineReminders({ onNavigate }: MedicineRemindersProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    medicineName: '',
    dosage: '',
    frequency: '',
    times: [''],
    startDate: '',
    endDate: ''
  });

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 1,
      medicineName: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      times: ['8:00 AM'],
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      active: true,
      taken: false,
      nextDose: '8:00 AM'
    },
    {
      id: 2,
      medicineName: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      times: ['8:00 AM', '8:00 PM'],
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      active: true,
      taken: true,
      nextDose: '8:00 PM'
    },
    {
      id: 3,
      medicineName: 'Vitamin D',
      dosage: '1000 IU',
      frequency: 'Once daily',
      times: ['9:00 AM'],
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      active: false,
      taken: false,
      nextDose: '9:00 AM'
    }
  ]);

  const todayReminders = reminders.filter(r => r.active);
  const upcomingReminders = reminders.filter(r => !r.taken && r.active);

  const handleAddReminder = () => {
    const reminder: Reminder = {
      id: reminders.length + 1,
      ...newReminder,
      active: true,
      taken: false,
      nextDose: newReminder.times[0] || '8:00 AM'
    };
    setReminders([...reminders, reminder]);
    setNewReminder({
      medicineName: '',
      dosage: '',
      frequency: '',
      times: [''],
      startDate: '',
      endDate: ''
    });
    setShowAddForm(false);
  };

  const toggleReminder = (id: number) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, active: !r.active } : r
    ));
  };

  const markTaken = (id: number) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, taken: true } : r
    ));
  };

  const frequencyOptions = [
    'Once daily',
    'Twice daily',
    'Three times daily',
    'Four times daily',
    'Every other day',
    'Weekly',
    'As needed'
  ];

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
          <div className="flex-1">
            <h1 className="text-3xl text-black flex items-center gap-2">
              <Bell className="w-8 h-8 text-yellow-600" />
              Medicine Reminders
            </h1>
            <p className="text-gray-600">Never miss your medication schedule</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-black hover:bg-gray-800 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Reminder
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Reminders */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayReminders.map((reminder) => (
                    <div key={reminder.id} className="p-4 rounded-lg bg-white/50 border border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            reminder.taken ? 'bg-green-100' : 'bg-yellow-100'
                          }`}>
                            <Pill className={`w-5 h-5 ${
                              reminder.taken ? 'text-green-600' : 'text-yellow-600'
                            }`} />
                          </div>
                          <div>
                            <h4 className="text-black">{reminder.medicineName}</h4>
                            <p className="text-sm text-gray-600">{reminder.dosage} • {reminder.frequency}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={reminder.taken ? "default" : "secondary"}>
                            {reminder.taken ? 'Taken' : 'Pending'}
                          </Badge>
                          <Switch
                            checked={reminder.active}
                            onCheckedChange={() => toggleReminder(reminder.id)}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Next: {reminder.nextDose}
                          </div>
                        </div>
                        {!reminder.taken && (
                          <Button
                            size="sm"
                            onClick={() => markTaken(reminder.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Mark Taken
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* All Reminders */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">All Medicine Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reminders.map((reminder) => (
                    <div key={reminder.id} className="p-3 rounded-lg bg-white/50 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-black">{reminder.medicineName}</h4>
                          <p className="text-sm text-gray-600">{reminder.dosage} • {reminder.frequency}</p>
                          <p className="text-xs text-gray-500">
                            {reminder.startDate} to {reminder.endDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={reminder.active ? "default" : "secondary"}>
                            {reminder.active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Switch
                            checked={reminder.active}
                            onCheckedChange={() => toggleReminder(reminder.id)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="backdrop-blur-lg bg-gradient-to-br from-yellow-50/70 to-yellow-100/70 border border-yellow-200/50">
              <CardHeader>
                <CardTitle className="text-black">Today's Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Medicines</span>
                    <span className="text-black">{todayReminders.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taken</span>
                    <span className="text-green-600">{todayReminders.filter(r => r.taken).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending</span>
                    <span className="text-yellow-600">{todayReminders.filter(r => !r.taken).length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Alerts */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Upcoming Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingReminders.slice(0, 3).map((reminder) => (
                    <div key={reminder.id} className="p-3 rounded-lg bg-white/50 border border-gray-100">
                      <p className="text-sm text-black">{reminder.medicineName}</p>
                      <p className="text-xs text-gray-600">Next dose at {reminder.nextDose}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <Switch id="push-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-reminders">Email Reminders</Label>
                  <Switch id="email-reminders" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound-alerts">Sound Alerts</Label>
                  <Switch id="sound-alerts" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Reminder Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md backdrop-blur-lg bg-white/90 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">Add New Reminder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Medicine Name</Label>
                  <Input
                    value={newReminder.medicineName}
                    onChange={(e) => setNewReminder({ ...newReminder, medicineName: e.target.value })}
                    placeholder="e.g., Aspirin"
                    className="bg-white/50 border-gray-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Dosage</Label>
                  <Input
                    value={newReminder.dosage}
                    onChange={(e) => setNewReminder({ ...newReminder, dosage: e.target.value })}
                    placeholder="e.g., 100mg"
                    className="bg-white/50 border-gray-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Frequency</Label>
                  <Select onValueChange={(value) => setNewReminder({ ...newReminder, frequency: value })}>
                    <SelectTrigger className="bg-white/50 border-gray-200">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {frequencyOptions.map((option, index) => (
                        <SelectItem key={index} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={newReminder.startDate}
                      onChange={(e) => setNewReminder({ ...newReminder, startDate: e.target.value })}
                      className="bg-white/50 border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={newReminder.endDate}
                      onChange={(e) => setNewReminder({ ...newReminder, endDate: e.target.value })}
                      className="bg-white/50 border-gray-200"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => setShowAddForm(false)}
                    variant="outline"
                    className="flex-1 bg-white/50 border-gray-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddReminder}
                    className="flex-1 bg-black hover:bg-gray-800 text-white"
                  >
                    Add Reminder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}