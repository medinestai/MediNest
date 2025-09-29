import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Upload, 
  Download, 
  Search, 
  FileText, 
  Calendar,
  Filter,
  Eye,
  Share2,
  Lock,
  Trash2
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';

interface PatientRecordsProps {
  onNavigate: () => void;
}

interface MedicalRecord {
  id: string;
  title: string;
  type: string;
  date: string;
  doctor: string;
  size: string;
  status: 'Available' | 'Processing' | 'Pending Approval';
  isEncrypted: boolean;
  url?: string;
}

export function PatientRecords({ onNavigate }: PatientRecordsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Mock data for medical records
  const medicalRecords: MedicalRecord[] = [
    {
      id: '1',
      title: 'Blood Test Results - Complete Metabolic Panel',
      type: 'Lab Report',
      date: '2024-01-15',
      doctor: 'Dr. Sarah Johnson',
      size: '2.1 MB',
      status: 'Available',
      isEncrypted: true,
      url: '#'
    },
    {
      id: '2',
      title: 'Chest X-Ray - Routine Check',
      type: 'Imaging',
      date: '2024-01-10',
      doctor: 'Dr. Michael Chen',
      size: '15.3 MB',
      status: 'Available',
      isEncrypted: true,
      url: '#'
    },
    {
      id: '3',
      title: 'Prescription - Hypertension Medication',
      type: 'Prescription',
      date: '2024-01-08',
      doctor: 'Dr. Sarah Johnson',
      size: '256 KB',
      status: 'Available',
      isEncrypted: true,
      url: '#'
    },
    {
      id: '4',
      title: 'MRI Scan - Brain',
      type: 'Imaging',
      date: '2024-01-05',
      doctor: 'Dr. Robert Smith',
      size: '45.7 MB',
      status: 'Processing',
      isEncrypted: true
    },
    {
      id: '5',
      title: 'Cardiology Report - ECG Results',
      type: 'Test Results',
      date: '2024-01-03',
      doctor: 'Dr. Lisa Garcia',
      size: '1.8 MB',
      status: 'Pending Approval',
      isEncrypted: true
    }
  ];

  // Filter records based on search and filters
  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || record.type === filterType;
    const matchesDate = filterDate === 'all' || 
                       (filterDate === 'week' && new Date(record.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
                       (filterDate === 'month' && new Date(record.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesType && matchesDate;
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            toast("File uploaded successfully and encrypted with blockchain security");
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleDownload = (record: MedicalRecord) => {
    toast(`Downloading ${record.title}...`);
    // In a real app, this would trigger the download
  };

  const handleShare = (record: MedicalRecord) => {
    toast("Secure sharing link generated. Access expires in 24 hours.");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Pending Approval': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Lab Report': return '🧪';
      case 'Imaging': return '📸';
      case 'Prescription': return '💊';
      case 'Test Results': return '📊';
      default: return '📄';
    }
  };

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
              <FileText className="w-8 h-8 text-blue-600" />
              Patient Records
            </h1>
            <p className="text-gray-600">Securely manage your medical files with HIPAA-compliant storage</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by document name or doctor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/50"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48 bg-white/50">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Lab Report">Lab Reports</SelectItem>
                  <SelectItem value="Imaging">Imaging</SelectItem>
                  <SelectItem value="Prescription">Prescriptions</SelectItem>
                  <SelectItem value="Test Results">Test Results</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterDate} onValueChange={setFilterDate}>
                <SelectTrigger className="w-48 bg-white/50">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  Upload New Record
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Drag & drop files here or click to browse</p>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.jpg,.jpeg,.png,.dcm"
                    />
                    <Label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Choose File
                      </Button>
                    </Label>
                  </div>
                  
                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Uploading...</span>
                        <span className="text-sm text-gray-600">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <Alert>
                    <Lock className="h-4 w-4" />
                    <AlertDescription>
                      All files are automatically encrypted with blockchain security and comply with HIPAA standards.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50 mt-4">
              <CardHeader>
                <CardTitle>Record Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Records</span>
                    <span className="text-black">{medicalRecords.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available</span>
                    <span className="text-green-600">{medicalRecords.filter(r => r.status === 'Available').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing</span>
                    <span className="text-yellow-600">{medicalRecords.filter(r => r.status === 'Processing').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Storage Used</span>
                    <span className="text-blue-600">68.5 MB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Records List */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle>Medical Records ({filteredRecords.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRecords.map((record) => (
                    <div 
                      key={record.id}
                      className="p-4 border border-gray-200 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{getTypeIcon(record.type)}</span>
                            <h3 className="text-black">{record.title}</h3>
                            {record.isEncrypted && <Lock className="w-4 h-4 text-green-600" />}
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(record.date).toLocaleDateString()}
                            </div>
                            <div>Doctor: {record.doctor}</div>
                            <div>Type: {record.type}</div>
                            <div>Size: {record.size}</div>
                          </div>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {record.status === 'Available' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDownload(record)}
                                className="bg-white/50"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleShare(record)}
                                className="bg-white/50"
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-white/50"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}