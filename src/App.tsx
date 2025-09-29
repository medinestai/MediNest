import React from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { NavigationProvider, useNavigation } from './components/NavigationContext';
import { HomePage } from './components/HomePage';
import { PatientAuth } from './components/PatientAuth';
import { DoctorAuth } from './components/DoctorAuth';
import { Dashboard } from './components/Dashboard';
import { DoctorDashboard } from './components/DoctorDashboard';
import { AccountSetup } from './components/AccountSetup';
import { ProblemReporting } from './components/ProblemReporting';
import { NutritionTracker } from './components/NutritionTracker';
import { AppointmentScheduler } from './components/AppointmentScheduler';
import { AIAssistant } from './components/AIAssistant';
import { MedicineReminders } from './components/MedicineReminders';
import { MedicineExpiration } from './components/MedicineExpiration';
import { FitnessTracker } from './components/FitnessTracker';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { BlockchainIdentity } from './components/BlockchainIdentity';
import { PatientRecords } from './components/PatientRecords';
import { Prescriptions } from './components/Prescriptions';
import { Analytics } from './components/Analytics';
import exampleImage from 'figma:asset/12d0cc00967bc56af5cff999df48a83b65e7c399.png';

function AppContent() {
  const { user, login, logout } = useAuth();
  const { currentView, navigateTo, goBack } = useNavigation();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onNavigate={navigateTo} logo={exampleImage} />;
      case 'patient-auth':
        return <PatientAuth 
          onComplete={(userData) => login(userData, 'patient')} 
          onNavigate={navigateTo} 
          logo={exampleImage} 
        />;
      case 'doctor-auth':
        return <DoctorAuth 
          onComplete={(userData) => login(userData, 'doctor')} 
          onNavigate={navigateTo} 
          logo={exampleImage} 
        />;
      case 'patient-dashboard':
        return <Dashboard onNavigate={navigateTo} user={user} logo={exampleImage} onLogout={logout} />;
      case 'doctor-dashboard':
        return <DoctorDashboard onNavigate={navigateTo} user={user} logo={exampleImage} onLogout={logout} />;
      case 'setup':
        return <AccountSetup onComplete={() => {}} onNavigate={navigateTo} logo={exampleImage} />;
      case 'problems':
        return <ProblemReporting onNavigate={goBack} />;
      case 'nutrition':
        return <NutritionTracker onNavigate={goBack} />;
      case 'appointments':
        return <AppointmentScheduler onNavigate={goBack} />;
      case 'ai-assistant':
        return <AIAssistant onNavigate={goBack} />;
      case 'medicine-reminders':
        return <MedicineReminders onNavigate={goBack} />;
      case 'medicine-expiration':
        return <MedicineExpiration onNavigate={goBack} />;
      case 'fitness':
        return <FitnessTracker onNavigate={goBack} />;
      case 'privacy':
        return <PrivacyPolicy onNavigate={goBack} />;
      case 'blockchain':
        return <BlockchainIdentity onNavigate={goBack} user={user} />;
      case 'patient-records':
        return <PatientRecords onNavigate={goBack} />;
      case 'prescriptions':
        return <Prescriptions onNavigate={goBack} />;
      case 'analytics':
        return <Analytics onNavigate={goBack} />;
      default:
        return <HomePage onNavigate={navigateTo} logo={exampleImage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {renderView()}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </AuthProvider>
  );
}