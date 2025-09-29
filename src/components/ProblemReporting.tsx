import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, AlertTriangle, Send, Clock } from 'lucide-react';
import { Badge } from './ui/badge';

interface ProblemReportingProps {
  onNavigate: (view: string) => void;
}

export function ProblemReporting({ onNavigate }: ProblemReportingProps) {
  const [formData, setFormData] = useState({
    type: '',
    medicine: '',
    description: '',
    severity: '',
    dateOccurred: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const recentReports = [
    {
      id: 1,
      type: 'Wrong Medicine',
      medicine: 'Aspirin 100mg',
      date: '2024-01-15',
      status: 'Under Review',
      severity: 'High'
    },
    {
      id: 2,
      type: 'Side Effect',
      medicine: 'Metformin 500mg',
      date: '2024-01-10',
      status: 'Resolved',
      severity: 'Medium'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({
      type: '',
      medicine: '',
      description: '',
      severity: '',
      dateOccurred: ''
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
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
              <AlertTriangle className="w-8 h-8 text-red-600" />
              Problem Reporting
            </h1>
            <p className="text-gray-600">Report medication issues or health concerns</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Report Form */}
          <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
            <CardHeader>
              <CardTitle className="text-black">Report a Problem</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-black mb-2">Report Submitted Successfully</h3>
                  <p className="text-gray-600">Our medical team will review your report within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Problem Type</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger className="bg-white/50 border-gray-200">
                        <SelectValue placeholder="Select problem type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wrong-medicine">Wrong Medicine Dispensed</SelectItem>
                        <SelectItem value="side-effect">Unexpected Side Effect</SelectItem>
                        <SelectItem value="allergic-reaction">Allergic Reaction</SelectItem>
                        <SelectItem value="dosage-error">Incorrect Dosage</SelectItem>
                        <SelectItem value="quality-issue">Medicine Quality Issue</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Medicine Name</Label>
                    <Input
                      value={formData.medicine}
                      onChange={(e) => setFormData({ ...formData, medicine: e.target.value })}
                      placeholder="Enter medicine name and dosage"
                      required
                      className="bg-white/50 border-gray-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Severity Level</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, severity: value })}>
                      <SelectTrigger className="bg-white/50 border-gray-200">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Minor inconvenience</SelectItem>
                        <SelectItem value="medium">Medium - Moderate concern</SelectItem>
                        <SelectItem value="high">High - Urgent attention needed</SelectItem>
                        <SelectItem value="critical">Critical - Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Occurred</Label>
                    <Input
                      type="date"
                      value={formData.dateOccurred}
                      onChange={(e) => setFormData({ ...formData, dateOccurred: e.target.value })}
                      required
                      className="bg-white/50 border-gray-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Please describe the problem in detail..."
                      required
                      className="bg-white/50 border-gray-200 min-h-[100px]"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-black hover:bg-gray-800 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Report
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="p-4 rounded-lg bg-white/50 border border-gray-100">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-black">{report.type}</h4>
                        <p className="text-sm text-gray-600">{report.medicine}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge className={getSeverityColor(report.severity)}>
                          {report.severity}
                        </Badge>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Reported on {report.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact */}
        <Card className="mt-6 backdrop-blur-lg bg-gradient-to-r from-red-50/70 to-orange-50/70 border border-red-200/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-black mb-1">Emergency Situation?</h3>
                <p className="text-gray-600">For immediate medical emergencies, please call emergency services or visit the nearest hospital.</p>
              </div>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                Emergency: 911
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}