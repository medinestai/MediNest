import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Clock, AlertTriangle, Plus, Calendar, Package } from 'lucide-react';
import { Badge } from './ui/badge';

interface MedicineExpirationProps {
  onNavigate: (view: string) => void;
}

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  expirationDate: string;
  batchNumber: string;
  quantity: number;
  daysUntilExpiry: number;
  status: 'expired' | 'expiring-soon' | 'valid';
}

export function MedicineExpiration({ onNavigate }: MedicineExpirationProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dosage: '',
    expirationDate: '',
    batchNumber: '',
    quantity: ''
  });

  const calculateDaysUntilExpiry = (expirationDate: string): number => {
    const expiry = new Date(expirationDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatus = (days: number): 'expired' | 'expiring-soon' | 'valid' => {
    if (days < 0) return 'expired';
    if (days <= 30) return 'expiring-soon';
    return 'valid';
  };

  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: 1,
      name: 'Aspirin',
      dosage: '100mg',
      expirationDate: '2024-02-15',
      batchNumber: 'ASP2024001',
      quantity: 30,
      daysUntilExpiry: calculateDaysUntilExpiry('2024-02-15'),
      status: getStatus(calculateDaysUntilExpiry('2024-02-15'))
    },
    {
      id: 2,
      name: 'Metformin',
      dosage: '500mg',
      expirationDate: '2024-12-31',
      batchNumber: 'MET2024002',
      quantity: 60,
      daysUntilExpiry: calculateDaysUntilExpiry('2024-12-31'),
      status: getStatus(calculateDaysUntilExpiry('2024-12-31'))
    },
    {
      id: 3,
      name: 'Vitamin D',
      dosage: '1000 IU',
      expirationDate: '2024-01-10',
      batchNumber: 'VIT2024003',
      quantity: 90,
      daysUntilExpiry: calculateDaysUntilExpiry('2024-01-10'),
      status: getStatus(calculateDaysUntilExpiry('2024-01-10'))
    },
    {
      id: 4,
      name: 'Lisinopril',
      dosage: '10mg',
      expirationDate: '2024-06-30',
      batchNumber: 'LIS2024004',
      quantity: 30,
      daysUntilExpiry: calculateDaysUntilExpiry('2024-06-30'),
      status: getStatus(calculateDaysUntilExpiry('2024-06-30'))
    }
  ]);

  const expiredMedicines = medicines.filter(m => m.status === 'expired');
  const expiringSoon = medicines.filter(m => m.status === 'expiring-soon');
  const validMedicines = medicines.filter(m => m.status === 'valid');

  const handleAddMedicine = () => {
    const days = calculateDaysUntilExpiry(newMedicine.expirationDate);
    const medicine: Medicine = {
      id: medicines.length + 1,
      ...newMedicine,
      quantity: parseInt(newMedicine.quantity),
      daysUntilExpiry: days,
      status: getStatus(days)
    };
    setMedicines([...medicines, medicine]);
    setNewMedicine({
      name: '',
      dosage: '',
      expirationDate: '',
      batchNumber: '',
      quantity: ''
    });
    setShowAddForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'expired': return 'bg-red-100 text-red-800';
      case 'expiring-soon': return 'bg-yellow-100 text-yellow-800';
      case 'valid': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'expired': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'expiring-soon': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'valid': return <Package className="w-4 h-4 text-green-600" />;
      default: return <Package className="w-4 h-4 text-gray-600" />;
    }
  };

  const removeMedicine = (id: number) => {
    setMedicines(medicines.filter(m => m.id !== id));
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
          <div className="flex-1">
            <h1 className="text-3xl text-black flex items-center gap-2">
              <Clock className="w-8 h-8 text-orange-600" />
              Medicine Expiration Tracker
            </h1>
            <p className="text-gray-600">Monitor expiration dates and avoid using expired medications</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-black hover:bg-gray-800 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Medicine
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="backdrop-blur-lg bg-gradient-to-br from-red-50/70 to-red-100/70 border border-red-200/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-700">Expired</p>
                  <p className="text-2xl text-red-800">{expiredMedicines.length}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-lg bg-gradient-to-br from-yellow-50/70 to-yellow-100/70 border border-yellow-200/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-700">Expiring Soon</p>
                  <p className="text-2xl text-yellow-800">{expiringSoon.length}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-lg bg-gradient-to-br from-green-50/70 to-green-100/70 border border-green-200/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">Valid</p>
                  <p className="text-2xl text-green-800">{validMedicines.length}</p>
                </div>
                <Package className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Medicine List */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">Medicine Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medicines.map((medicine) => (
                    <div key={medicine.id} className="p-4 rounded-lg bg-white/50 border border-gray-100">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            {getStatusIcon(medicine.status)}
                          </div>
                          <div>
                            <h4 className="text-black">{medicine.name}</h4>
                            <p className="text-sm text-gray-600">{medicine.dosage}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(medicine.status)}>
                          {medicine.status === 'expired' ? 'Expired' : 
                           medicine.status === 'expiring-soon' ? 'Expiring Soon' : 'Valid'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Expires: {medicine.expirationDate}
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          Quantity: {medicine.quantity}
                        </div>
                        <div className="col-span-2">
                          <span>Batch: {medicine.batchNumber}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          {medicine.daysUntilExpiry < 0 ? (
                            <span className="text-red-600">
                              Expired {Math.abs(medicine.daysUntilExpiry)} days ago
                            </span>
                          ) : medicine.daysUntilExpiry === 0 ? (
                            <span className="text-red-600">Expires today</span>
                          ) : (
                            <span className={medicine.daysUntilExpiry <= 30 ? 'text-yellow-600' : 'text-green-600'}>
                              Expires in {medicine.daysUntilExpiry} days
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/50 border-gray-200"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeMedicine(medicine.id)}
                          >
                            Remove
                          </Button>
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
            {/* Urgent Actions */}
            {(expiredMedicines.length > 0 || expiringSoon.length > 0) && (
              <Card className="backdrop-blur-lg bg-gradient-to-br from-red-50/70 to-orange-50/70 border border-red-200/50">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Urgent Actions Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {expiredMedicines.slice(0, 3).map((medicine) => (
                      <div key={medicine.id} className="p-3 rounded-lg bg-white/50 border border-red-200">
                        <p className="text-sm text-black">{medicine.name}</p>
                        <p className="text-xs text-red-600">Expired - Dispose safely</p>
                      </div>
                    ))}
                    {expiringSoon.slice(0, 2).map((medicine) => (
                      <div key={medicine.id} className="p-3 rounded-lg bg-white/50 border border-yellow-200">
                        <p className="text-sm text-black">{medicine.name}</p>
                        <p className="text-xs text-yellow-600">
                          Expires in {medicine.daysUntilExpiry} days
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">Storage Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>• Store medicines in cool, dry places</p>
                  <p>• Keep original containers and labels</p>
                  <p>• Check expiration dates monthly</p>
                  <p>• Dispose expired medicines safely</p>
                  <p>• Never use expired medications</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">Inventory Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Medicines</span>
                    <span className="text-black">{medicines.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next to Expire</span>
                    <span className="text-orange-600">
                      {Math.min(...medicines.filter(m => m.daysUntilExpiry > 0).map(m => m.daysUntilExpiry))} days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Quantity</span>
                    <span className="text-black">
                      {medicines.reduce((sum, m) => sum + m.quantity, 0)} units
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Medicine Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md backdrop-blur-lg bg-white/90 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">Add New Medicine</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Medicine Name</Label>
                  <Input
                    value={newMedicine.name}
                    onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                    placeholder="e.g., Aspirin"
                    className="bg-white/50 border-gray-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Dosage</Label>
                  <Input
                    value={newMedicine.dosage}
                    onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
                    placeholder="e.g., 100mg"
                    className="bg-white/50 border-gray-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Expiration Date</Label>
                  <Input
                    type="date"
                    value={newMedicine.expirationDate}
                    onChange={(e) => setNewMedicine({ ...newMedicine, expirationDate: e.target.value })}
                    className="bg-white/50 border-gray-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Batch Number</Label>
                  <Input
                    value={newMedicine.batchNumber}
                    onChange={(e) => setNewMedicine({ ...newMedicine, batchNumber: e.target.value })}
                    placeholder="e.g., ASP2024001"
                    className="bg-white/50 border-gray-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={newMedicine.quantity}
                    onChange={(e) => setNewMedicine({ ...newMedicine, quantity: e.target.value })}
                    placeholder="e.g., 30"
                    className="bg-white/50 border-gray-200"
                  />
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
                    onClick={handleAddMedicine}
                    className="flex-1 bg-black hover:bg-gray-800 text-white"
                  >
                    Add Medicine
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