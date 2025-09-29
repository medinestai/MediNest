import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from 'lucide-react';

interface PrivacyPolicyProps {
  onNavigate: (view: string) => void;
}

export function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
  const sections = [
    {
      title: 'Information We Collect',
      icon: Database,
      content: [
        'Personal health information you provide (medical conditions, medications, etc.)',
        'Usage data (how you interact with our platform)',
        'Device information (browser type, IP address)',
        'Health metrics and tracking data you enter',
        'Communication preferences and settings'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: UserCheck,
      content: [
        'Provide personalized health recommendations',
        'Send medication reminders and health alerts',
        'Improve our services and user experience',
        'Ensure platform security and prevent fraud',
        'Comply with legal and regulatory requirements'
      ]
    },
    {
      title: 'Data Protection & Security',
      icon: Lock,
      content: [
        'End-to-end encryption for all sensitive health data',
        'Regular security audits and vulnerability assessments',
        'HIPAA-compliant data handling procedures',
        'Secure cloud storage with backup systems',
        'Limited access on a need-to-know basis'
      ]
    },
    {
      title: 'Your Privacy Rights',
      icon: Eye,
      content: [
        'Access and download your personal data',
        'Correct inaccurate information',
        'Delete your account and associated data',
        'Opt-out of marketing communications',
        'Control data sharing preferences'
      ]
    }
  ];

  const importantNotices = [
    {
      title: 'Medical Disclaimer',
      content: 'MediNest is not intended to replace professional medical advice. Always consult healthcare providers for medical decisions.',
      type: 'warning'
    },
    {
      title: 'Data Retention',
      content: 'We retain your health data for as long as your account is active, plus 7 years for compliance purposes.',
      type: 'info'
    },
    {
      title: 'Third-Party Services',
      content: 'We may integrate with healthcare providers and pharmacies. Their privacy policies may differ from ours.',
      type: 'info'
    }
  ];

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
              <Shield className="w-8 h-8 text-blue-600" />
              Privacy Policy
            </h1>
            <p className="text-gray-600">Your privacy and data security are our top priorities</p>
          </div>
        </div>

        {/* Introduction */}
        <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50 mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-black mb-2">Our Commitment to Your Privacy</h2>
                <p className="text-gray-700">
                  At MediNest, we understand the sensitive nature of health information. This Privacy Policy 
                  explains how we collect, use, protect, and share your information when you use our healthcare 
                  management platform. We are committed to maintaining the highest standards of data protection 
                  and compliance with healthcare privacy regulations.
                </p>
                <p className="text-sm text-gray-600 mt-3">
                  Last updated: January 20, 2024 | Effective Date: January 1, 2024
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-6 mb-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index} className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <Icon className="w-6 h-6 text-blue-600" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Important Notices */}
        <div className="space-y-4 mb-6">
          {importantNotices.map((notice, index) => (
            <Card key={index} className={`backdrop-blur-lg border ${
              notice.type === 'warning' 
                ? 'bg-yellow-50/70 border-yellow-200/50' 
                : 'bg-blue-50/70 border-blue-200/50'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                    notice.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                  <div>
                    <h4 className="text-black mb-1">{notice.title}</h4>
                    <p className="text-sm text-gray-700">{notice.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Blockchain Privacy */}
        <Card className="backdrop-blur-lg bg-gradient-to-br from-indigo-50/70 to-purple-50/70 border border-indigo-200/50 mb-6">
          <CardHeader>
            <CardTitle className="text-black flex items-center gap-2">
              <Shield className="w-6 h-6 text-indigo-600" />
              Blockchain Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              MediNest offers advanced blockchain-based identity management for enhanced privacy and data ownership.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-black mb-2">Blockchain Benefits</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Complete data ownership and control</li>
                  <li>• Immutable audit trails</li>
                  <li>• End-to-end encryption</li>
                  <li>• Decentralized storage</li>
                </ul>
              </div>
              <div>
                <h4 className="text-black mb-2">Your Control</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Choose who accesses your data</li>
                  <li>• Export data anytime</li>
                  <li>• Anonymous mode available</li>
                  <li>• Revoke access instantly</li>
                </ul>
              </div>
            </div>
            <Button 
              onClick={() => onNavigate('blockchain')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              <Shield className="w-4 h-4 mr-2" />
              Set Up Blockchain Identity
            </Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50 mb-6">
          <CardHeader>
            <CardTitle className="text-black">Contact Us About Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-black mb-2">Privacy Officer</h4>
                <p className="text-gray-700 text-sm mb-1">Email: privacy@medinest.com</p>
                <p className="text-gray-700 text-sm mb-1">Phone: 1-800-PRIVACY</p>
                <p className="text-gray-700 text-sm">Response time: 48 hours</p>
              </div>
              <div>
                <h4 className="text-black mb-2">Data Protection Team</h4>
                <p className="text-gray-700 text-sm mb-1">Email: dataprotection@medinest.com</p>
                <p className="text-gray-700 text-sm mb-1">Available: 24/7 for urgent matters</p>
                <p className="text-gray-700 text-sm">Standard response: 24 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Certifications */}
        <Card className="backdrop-blur-lg bg-gradient-to-r from-green-50/70 to-blue-50/70 border border-green-200/50">
          <CardContent className="p-6">
            <h3 className="text-black mb-4">Compliance & Certifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-black">HIPAA Compliant</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm text-black">SOC 2 Certified</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Database className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm text-black">GDPR Ready</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <UserCheck className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-sm text-black">ISO 27001</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button 
            onClick={() => onNavigate('home')}
            className="bg-black hover:bg-gray-800 text-white"
          >
            Return to Dashboard
          </Button>
          <Button variant="outline" className="bg-white/50 border-gray-200">
            Download Privacy Policy
          </Button>
          <Button variant="outline" className="bg-white/50 border-gray-200">
            Manage Privacy Settings
          </Button>
        </div>
      </div>
    </div>
  );
}