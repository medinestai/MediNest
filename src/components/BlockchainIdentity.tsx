import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  Shield, 
  Key, 
  Lock, 
  ArrowLeft, 
  Copy, 
  CheckCircle, 
  AlertTriangle,
  Wallet,
  Eye,
  EyeOff,
  Zap,
  Globe,
  Database,
  Fingerprint
} from 'lucide-react';

interface BlockchainIdentityProps {
  onNavigate: (view: string) => void;
  user: any;
}

export function BlockchainIdentity({ onNavigate, user }: BlockchainIdentityProps) {
  const [blockchainId, setBlockchainId] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    encryptMedicalRecords: true,
    anonymousMode: false,
    shareWithProviders: true,
    dataPortability: true,
    auditTrail: true
  });

  const generateBlockchainId = useCallback(async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newId = `0x${Math.random().toString(16).substr(2, 40)}`;
      const newPrivateKey = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      setBlockchainId(newId);
      setPrivateKey(newPrivateKey);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to generate blockchain ID:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [isGenerating]);

  const connectWallet = useCallback(async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const walletId = `0x${Math.random().toString(16).substr(2, 40)}`;
      setBlockchainId(walletId);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [isGenerating]);

  const copyToClipboard = useCallback((text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(err => {
        console.error('Failed to copy text:', err);
      });
    }
  }, []);

  const privacyFeatures = useMemo(() => [
    {
      title: 'Medical Record Encryption',
      description: 'End-to-end encryption of all medical data',
      icon: Lock,
      enabled: privacySettings.encryptMedicalRecords,
      setting: 'encryptMedicalRecords'
    },
    {
      title: 'Anonymous Mode',
      description: 'Hide your identity while maintaining continuity',
      icon: Eye,
      enabled: privacySettings.anonymousMode,
      setting: 'anonymousMode'
    },
    {
      title: 'Provider Data Sharing',
      description: 'Control healthcare provider access',
      icon: Database,
      enabled: privacySettings.shareWithProviders,
      setting: 'shareWithProviders'
    },
    {
      title: 'Data Portability',
      description: 'Export and transfer your data',
      icon: Globe,
      enabled: privacySettings.dataPortability,
      setting: 'dataPortability'
    },
    {
      title: 'Audit Trail',
      description: 'Immutable access records',
      icon: Fingerprint,
      enabled: privacySettings.auditTrail,
      setting: 'auditTrail'
    }
  ], [privacySettings]);

  const blockchainBenefits = useMemo(() => [
    'Complete data ownership',
    'Immutable medical history',
    'Cross-platform compatibility',
    'Enhanced privacy & security',
    'Reduced breach risks',
    'Patient-centric model'
  ], []);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            onClick={() => onNavigate(user?.type === 'doctor' ? 'doctor-dashboard' : 'patient-dashboard')} 
            variant="ghost"
            className="text-gray-600 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-black">Blockchain Identity</h1>
            <p className="text-gray-600">Secure your medical data with blockchain technology</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Identity Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Blockchain ID Card */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  Your Blockchain Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isConnected ? (
                  <div className="text-center py-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Key className="w-12 h-12 text-blue-600" />
                    </div>
                    <h3 className="text-black mb-4">Get Started with Blockchain Identity</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Create a decentralized identity to take full control of your medical data
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        onClick={generateBlockchainId}
                        disabled={isGenerating}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        {isGenerating ? (
                          <Zap className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Key className="w-4 h-4 mr-2" />
                        )}
                        Generate New Identity
                      </Button>
                      <Button 
                        onClick={connectWallet}
                        disabled={isGenerating}
                        variant="outline"
                        className="bg-white/50 border-gray-200"
                      >
                        {isGenerating ? (
                          <Zap className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Wallet className="w-4 h-4 mr-2" />
                        )}
                        Connect Existing Wallet
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-600">Blockchain Identity Connected</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-black mb-2 block">Blockchain Address</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            value={blockchainId} 
                            readOnly 
                            className="bg-gray-50 font-mono text-sm"
                          />
                          <Button 
                            onClick={() => copyToClipboard(blockchainId)}
                            size="sm"
                            variant="outline"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {privateKey && (
                        <div>
                          <Label className="text-black mb-2 block flex items-center gap-2">
                            Private Key 
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                          </Label>
                          <div className="flex items-center gap-2">
                            <Input 
                              value={showPrivateKey ? privateKey : '•'.repeat(32)} 
                              readOnly 
                              className="bg-red-50 font-mono text-sm"
                            />
                            <Button 
                              onClick={() => setShowPrivateKey(!showPrivateKey)}
                              size="sm"
                              variant="outline"
                            >
                              {showPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button 
                              onClick={() => copyToClipboard(privateKey)}
                              size="sm"
                              variant="outline"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Privacy Controls */}
            {isConnected && (
              <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <Lock className="w-6 h-6 text-green-600" />
                    Privacy & Security Controls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {privacyFeatures.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-gray-100">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              feature.enabled ? 'bg-green-100' : 'bg-gray-100'
                            }`}>
                              <Icon className={`w-5 h-5 ${
                                feature.enabled ? 'text-green-600' : 'text-gray-400'
                              }`} />
                            </div>
                            <div>
                              <h4 className="text-black mb-1">{feature.title}</h4>
                              <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                          </div>
                          <Switch
                            checked={feature.enabled}
                            onCheckedChange={(checked) => {
                              setPrivacySettings(prev => ({
                                ...prev,
                                [feature.setting]: checked
                              }));
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            <Card className="backdrop-blur-lg bg-gradient-to-br from-blue-50/70 to-purple-50/70 border border-blue-200/50">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Blockchain Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {blockchainBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Security Status */}
            {isConnected && (
              <Card className="backdrop-blur-lg bg-gradient-to-br from-green-50/70 to-teal-50/70 border border-green-200/50">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Security Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Identity Verified</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Data Encryption</span>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Network</span>
                    <Badge className="bg-blue-100 text-blue-800">Ethereum</Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}