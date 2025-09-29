import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  Pill, 
  Download, 
  Search, 
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Truck,
  Bell,
  Building,
  RefreshCw
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';

interface PrescriptionsProps {
  onNavigate: () => void;
}

interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedBy: string;
  dateIssued: string;
  status: 'Active' | 'Completed' | 'Pending' | 'Cancelled';
  refillsRemaining: number;
  totalRefills: number;
  nextRefillDate: string;
  pharmacy: string;
  instructions: string;
  sideEffects: string[];
}

export function Prescriptions({ onNavigate }: PrescriptionsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('current');

  // Mock data for prescriptions
  const prescriptions: Prescription[] = [
    {
      id: '1',
      medication: 'Lisinopril 10mg',
      dosage: '10mg',
      frequency: 'Once daily',
      duration: '90 days',
      prescribedBy: 'Dr. Sarah Johnson',
      dateIssued: '2024-01-15',
      status: 'Active',
      refillsRemaining: 2,
      totalRefills: 3,
      nextRefillDate: '2024-04-15',
      pharmacy: 'CVS Pharmacy',
      instructions: 'Take with food. Monitor blood pressure regularly.',
      sideEffects: ['Dizziness', 'Dry cough', 'Headache']
    },
    {
      id: '2',
      medication: 'Metformin 500mg',
      dosage: '500mg',
      frequency: 'Twice daily',
      duration: '180 days',
      prescribedBy: 'Dr. Michael Chen',
      dateIssued: '2024-01-10',
      status: 'Active',
      refillsRemaining: 1,
      totalRefills: 2,
      nextRefillDate: '2024-03-10',
      pharmacy: 'Walgreens',
      instructions: 'Take with meals. Monitor blood sugar levels.',
      sideEffects: ['Nausea', 'Stomach upset', 'Metallic taste']
    },
    {
      id: '3',
      medication: 'Amoxicillin 500mg',
      dosage: '500mg',
      frequency: 'Three times daily',
      duration: '10 days',
      prescribedBy: 'Dr. Lisa Garcia',
      dateIssued: '2024-01-05',
      status: 'Completed',
      refillsRemaining: 0,
      totalRefills: 0,
      nextRefillDate: '',
      pharmacy: 'CVS Pharmacy',
      instructions: 'Complete full course even if feeling better.',
      sideEffects: ['Diarrhea', 'Nausea', 'Allergic reactions']
    },
    {
      id: '4',
      medication: 'Atorvastatin 20mg',
      dosage: '20mg',
      frequency: 'Once daily at bedtime',
      duration: '90 days',
      prescribedBy: 'Dr. Robert Smith',
      dateIssued: '2024-01-08',
      status: 'Pending',
      refillsRemaining: 3,
      totalRefills: 3,
      nextRefillDate: '2024-04-08',
      pharmacy: 'Rite Aid',
      instructions: 'Take at bedtime. Avoid grapefruit juice.',
      sideEffects: ['Muscle pain', 'Liver problems', 'Memory issues']
    }
  ];

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (activeTab) {
      case 'current':
        return matchesSearch && (prescription.status === 'Active' || prescription.status === 'Pending');
      case 'history':
        return matchesSearch && (prescription.status === 'Completed' || prescription.status === 'Cancelled');
      case 'refills':
        return matchesSearch && prescription.refillsRemaining > 0 && prescription.status === 'Active';
      default:
        return matchesSearch;
    }
  });

  const handleRefillRequest = (prescription: Prescription) => {
    toast(`Refill request sent to ${prescription.pharmacy} for ${prescription.medication}`);
  };

  const handlePharmacyOrder = (prescription: Prescription) => {
    toast(`Redirecting to ${prescription.pharmacy} online ordering...`);
  };

  const handleDownloadPrescription = (prescription: Prescription) => {
    toast(`Downloading prescription for ${prescription.medication}...`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Completed': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Cancelled': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const upcomingRefills = prescriptions.filter(p => 
    p.status === 'Active' && 
    new Date(p.nextRefillDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={onNavigate} 
            variant="outline"
            className="bg-white/50 border-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl text-black flex items-center gap-2">
              <Pill className="w-8 h-8 text-green-600" />
              Prescriptions
            </h1>
            <p className="text-gray-600">Manage your digital prescriptions and refills</p>
          </div>
        </div>

        {/* Alerts Section */}
        {upcomingRefills.length > 0 && (
          <Alert className="mb-6 border-orange-200 bg-orange-50/50">
            <Bell className="h-4 w-4 text-orange-600" />
            <AlertDescription>
              You have {upcomingRefills.length} prescription(s) due for refill within the next week.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Prescriptions</p>
                    <p className="text-2xl text-black">{prescriptions.filter(p => p.status === 'Active').length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Refills Available</p>
                    <p className="text-2xl text-black">{prescriptions.reduce((sum, p) => sum + p.refillsRemaining, 0)}</p>
                  </div>
                  <RefreshCw className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Upcoming Refills</p>
                    <p className="text-2xl text-black">{upcomingRefills.length}</p>
                  </div>
                  <Bell className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-2">
                <Button className="w-full justify-start" variant="outline" size="sm">
                  <Building className="w-4 h-4 mr-2" />
                  Find Pharmacy
                </Button>
                <Button className="w-full justify-start" variant="outline" size="sm">
                  <Truck className="w-4 h-4 mr-2" />
                  Track Delivery
                </Button>
                <Button className="w-full justify-start" variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Set Reminders
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <CardTitle>My Prescriptions</CardTitle>
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search prescriptions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/50"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="current">Current</TabsTrigger>
                    <TabsTrigger value="refills">Refills</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>

                  <TabsContent value="current" className="space-y-4">
                    {filteredPrescriptions.map((prescription) => (
                      <div key={prescription.id} className="p-4 border border-gray-200 rounded-lg bg-white/50">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-black">{prescription.medication}</h3>
                              {getStatusIcon(prescription.status)}
                              <Badge className={getStatusColor(prescription.status)}>
                                {prescription.status}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm">Prescribed by {prescription.prescribedBy}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownloadPrescription(prescription)}
                              className="bg-white/50"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            {prescription.status === 'Active' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleRefillRequest(prescription)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  <RefreshCw className="w-4 h-4 mr-1" />
                                  Refill
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handlePharmacyOrder(prescription)}
                                  className="bg-white/50"
                                >
                                  <Truck className="w-4 h-4 mr-1" />
                                  Order
                                </Button>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="text-black">Dosage:</span> {prescription.dosage}
                          </div>
                          <div>
                            <span className="text-black">Frequency:</span> {prescription.frequency}
                          </div>
                          <div>
                            <span className="text-black">Duration:</span> {prescription.duration}
                          </div>
                          <div>
                            <span className="text-black">Pharmacy:</span> {prescription.pharmacy}
                          </div>
                        </div>

                        {prescription.status === 'Active' && (
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Refills: {prescription.refillsRemaining} of {prescription.totalRefills} remaining</span>
                              <span>Next refill: {new Date(prescription.nextRefillDate).toLocaleDateString()}</span>
                            </div>
                            <Progress 
                              value={(prescription.refillsRemaining / prescription.totalRefills) * 100} 
                              className="h-2"
                            />
                          </div>
                        )}

                        <div className="text-sm">
                          <p className="text-black mb-1">Instructions:</p>
                          <p className="text-gray-600 mb-2">{prescription.instructions}</p>
                          
                          <p className="text-black mb-1">Common Side Effects:</p>
                          <div className="flex flex-wrap gap-1">
                            {prescription.sideEffects.map((effect, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {effect}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="refills" className="space-y-4">
                    {filteredPrescriptions.map((prescription) => (
                      <div key={prescription.id} className="p-4 border border-gray-200 rounded-lg bg-white/50">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-black">{prescription.medication}</h3>
                            <p className="text-gray-600 text-sm">{prescription.refillsRemaining} refills remaining</p>
                            <p className="text-gray-600 text-sm">Next refill due: {new Date(prescription.nextRefillDate).toLocaleDateString()}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleRefillRequest(prescription)}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <RefreshCw className="w-4 h-4 mr-1" />
                              Request Refill
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePharmacyOrder(prescription)}
                              className="bg-white/50"
                            >
                              <Truck className="w-4 h-4 mr-1" />
                              Order Online
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="history" className="space-y-4">
                    {filteredPrescriptions.map((prescription) => (
                      <div key={prescription.id} className="p-4 border border-gray-200 rounded-lg bg-white/50 opacity-75">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-black">{prescription.medication}</h3>
                              {getStatusIcon(prescription.status)}
                              <Badge className={getStatusColor(prescription.status)}>
                                {prescription.status}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm">Prescribed by {prescription.prescribedBy}</p>
                            <p className="text-gray-600 text-sm">Date issued: {new Date(prescription.dateIssued).toLocaleDateString()}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadPrescription(prescription)}
                            className="bg-white/50"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}