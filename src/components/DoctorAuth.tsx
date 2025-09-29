import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Stethoscope, Mail, Lock, User, Phone, Building, GraduationCap, Eye, EyeOff, FileText } from 'lucide-react';

interface DoctorAuthProps {
  onComplete: (user: any) => void;
  onNavigate: (view: string) => void;
  logo: string;
}

export function DoctorAuth({ onComplete, onNavigate, logo }: DoctorAuthProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Login state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup state
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    specialty: '',
    licenseNumber: '',
    hospitalAffiliation: '',
    experience: '',
    education: ''
  });

  const specialties = [
    'Cardiology',
    'Dermatology',
    'Emergency Medicine',
    'Endocrinology',
    'Family Medicine',
    'Gastroenterology',
    'General Practice',
    'Internal Medicine',
    'Neurology',
    'Oncology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Radiology',
    'Surgery',
    'Urology'
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would authenticate with backend
    const user = {
      name: 'Dr. Sarah Wilson',
      email: loginData.email,
      type: 'doctor',
      id: '1',
      specialty: 'Cardiology'
    };
    onComplete(user);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // In a real app, this would create account with backend
    const user = {
      name: `Dr. ${signupData.firstName} ${signupData.lastName}`,
      email: signupData.email,
      type: 'doctor',
      id: Date.now().toString(),
      specialty: signupData.specialty
    };
    onComplete(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <Button 
            onClick={() => onNavigate('home')} 
            variant="ghost"
            className="absolute top-6 left-6 text-gray-600 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl text-black mb-2">Doctor Portal</h1>
          <p className="text-gray-600">Access your medical practice dashboard</p>
        </div>

        <Card className="backdrop-blur-lg bg-white/80 border border-gray-200/50 shadow-2xl">
          <CardContent className="p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Medical Email Address
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      placeholder="doctor@hospital.com"
                      required
                      className="bg-white/70 border-gray-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        placeholder="Enter your secure password"
                        required
                        className="bg-white/70 border-gray-200 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-gray-600">
                      <input type="checkbox" className="rounded" />
                      Keep me signed in
                    </label>
                    <Button variant="ghost" className="text-teal-600 hover:text-teal-700 p-0 h-auto">
                      Forgot password?
                    </Button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white transition-all duration-200"
                  >
                    Access Medical Dashboard
                  </Button>
                </form>

                {/* Security Notice */}
                <div className="mt-4 p-3 bg-blue-50/70 rounded-lg border border-blue-200/50">
                  <p className="text-xs text-blue-700">
                    🔒 HIPAA-compliant secure login. Your access is monitored for security.
                  </p>
                </div>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={signupData.firstName}
                        onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                        placeholder="Sarah"
                        required
                        className="bg-white/70 border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={signupData.lastName}
                        onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                        placeholder="Wilson"
                        required
                        className="bg-white/70 border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Professional Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      placeholder="doctor@hospital.com"
                      required
                      className="bg-white/70 border-gray-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? 'text' : 'password'}
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          placeholder="Create a secure password"
                          required
                          className="bg-white/70 border-gray-200 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                          placeholder="Confirm your password"
                          required
                          className="bg-white/70 border-gray-200 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                        required
                        className="bg-white/70 border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialty" className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4" />
                        Specialty
                      </Label>
                      <Select onValueChange={(value) => setSignupData({ ...signupData, specialty: value })}>
                        <SelectTrigger className="bg-white/70 border-gray-200">
                          <SelectValue placeholder="Select specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map((specialty) => (
                            <SelectItem key={specialty} value={specialty}>
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Medical License Number
                    </Label>
                    <Input
                      id="licenseNumber"
                      value={signupData.licenseNumber}
                      onChange={(e) => setSignupData({ ...signupData, licenseNumber: e.target.value })}
                      placeholder="Enter your medical license number"
                      required
                      className="bg-white/70 border-gray-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hospitalAffiliation" className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Hospital/Clinic Affiliation
                    </Label>
                    <Input
                      id="hospitalAffiliation"
                      value={signupData.hospitalAffiliation}
                      onChange={(e) => setSignupData({ ...signupData, hospitalAffiliation: e.target.value })}
                      placeholder="General Hospital"
                      required
                      className="bg-white/70 border-gray-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        value={signupData.experience}
                        onChange={(e) => setSignupData({ ...signupData, experience: e.target.value })}
                        placeholder="5"
                        required
                        className="bg-white/70 border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="education" className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Medical School
                      </Label>
                      <Input
                        id="education"
                        value={signupData.education}
                        onChange={(e) => setSignupData({ ...signupData, education: e.target.value })}
                        placeholder="Harvard Medical School"
                        required
                        className="bg-white/70 border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <input type="checkbox" required className="mt-1" />
                    <span className="text-gray-600">
                      I verify that I am a licensed medical professional and agree to the{' '}
                      <Button 
                        variant="ghost" 
                        className="text-teal-600 hover:text-teal-700 p-0 h-auto underline"
                        onClick={() => onNavigate('privacy')}
                      >
                        Terms of Service
                      </Button>
                      {' '}and{' '}
                      <Button 
                        variant="ghost" 
                        className="text-teal-600 hover:text-teal-700 p-0 h-auto underline"
                        onClick={() => onNavigate('privacy')}
                      >
                        Medical Privacy Policy
                      </Button>
                    </span>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white transition-all duration-200"
                  >
                    Create Doctor Account
                  </Button>
                </form>

                {/* Verification Notice */}
                <div className="mt-4 p-3 bg-yellow-50/70 rounded-lg border border-yellow-200/50">
                  <p className="text-xs text-yellow-700">
                    📋 Account verification required. Medical credentials will be verified within 24-48 hours.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need assistance? Contact our{' '}
            <Button variant="ghost" className="text-teal-600 hover:text-teal-700 p-0 h-auto underline">
              medical professional support
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}