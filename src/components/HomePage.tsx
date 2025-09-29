import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Stethoscope, 
  Heart, 
  Shield, 
  Zap, 
  Users, 
  Activity,
  Bell,
  Calendar,
  Brain,
  Apple,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string) => void;
  logo: string;
}

export function HomePage({ onNavigate, logo }: HomePageProps) {
  const features = [
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Never miss your medication with intelligent alerts'
    },
    {
      icon: Calendar,
      title: 'Easy Scheduling',
      description: 'Book and manage appointments seamlessly'
    },
    {
      icon: Brain,
      title: 'AI Assistant',
      description: 'Get instant health guidance and support'
    },
    {
      icon: Activity,
      title: 'Health Tracking',
      description: 'Monitor your fitness and nutrition goals'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'HIPAA-compliant data protection'
    },
    {
      icon: Apple,
      title: 'Nutrition Insights',
      description: 'Personalized diet recommendations'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Patient',
      content: 'MediNest has transformed how I manage my health. The reminders are lifesaving!',
      rating: 5
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Cardiologist',
      content: 'An excellent platform for patient management. My patients love the convenience.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Patient',
      content: 'The AI assistant is incredibly helpful for quick health questions.',
      rating: 5
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Patients' },
    { number: '2K+', label: 'Healthcare Providers' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.1)_0%,transparent_50%)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-24">
          {/* Navigation */}
          <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-1">
              <img src={logo} alt="MediNest" className="w-16 h-16" />
              <span className="text-3xl text-black">MediNest</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-black transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-black transition-colors">About</a>
              <a href="#testimonials" className="text-gray-600 hover:text-black transition-colors">Reviews</a>
              <Button variant="outline" className="bg-white/50 border-gray-200">
                Contact
              </Button>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl text-black mb-6 leading-tight">
              Your Health,{' '}
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                Simplified
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              MediNest connects patients and healthcare providers in one seamless platform.
              Easily manage medications, track your health, and stay connected with care, all in one place.
            </p>

            {/* Auth Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch mb-16">
              <Card
                className="backdrop-blur-lg bg-white/90 border border-gray-200 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer group max-w-sm opacity-100"
                onClick={() => onNavigate('patient-auth')}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-2">Start as Patient</h3>
                  <p className="text-gray-700 mb-4">Manage your health, medications, and appointments</p>
                  <Button className="w-full bg-black hover:bg-gray-800 text-white group-hover:bg-gray-900 transition-colors font-medium">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              <Card
                className="backdrop-blur-lg bg-white/90 border border-gray-200 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer group max-w-sm opacity-100"
                onClick={() => onNavigate('doctor-auth')}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Stethoscope className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-2">Join as Doctor</h3>
                  <p className="text-gray-700 mb-4">Manage patients, appointments, and medical records</p>
                  <Button className="w-full bg-black hover:bg-gray-800 text-white group-hover:bg-gray-900 transition-colors font-medium">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl text-black mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-black mb-4">Powerful Features for Better Health</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your health journey, backed by cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="backdrop-blur-lg bg-white/70 border border-gray-200/50 hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-black mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-black mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-gray-600">See what our users say about MediNest</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="backdrop-blur-lg bg-white/70 border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="text-black">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl mb-4">Ready to Transform Your Healthcare?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of patients and healthcare providers who trust MediNest
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate('patient-auth')}
              className="bg-white text-black hover:bg-gray-100 transition-colors font-medium px-6 py-3"
            >
              Start as Patient
            </Button>
            <Button
              onClick={() => onNavigate('doctor-auth')}
              className="bg-white text-black hover:bg-gray-100 transition-colors font-medium px-6 py-3"
            >
              Join as Doctor
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white/80 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-1 mb-4 md:mb-0">
              <img src={logo} alt="MediNest" className="w-10 h-10" />
              <span className="text-2xl text-black">MediNest</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span>© 2024 MediNest. All rights reserved.</span>
              <Button
                variant="ghost"
                onClick={() => onNavigate('privacy')}
                className="text-gray-600 hover:text-black p-0 h-auto"
              >
                Privacy Policy
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}