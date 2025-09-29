import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';

type ViewType = 
  | 'home'
  | 'patient-auth'
  | 'doctor-auth'
  | 'patient-dashboard'
  | 'doctor-dashboard'
  | 'setup'
  | 'problems'
  | 'nutrition'
  | 'appointments'
  | 'ai-assistant'
  | 'medicine-reminders'
  | 'medicine-expiration'
  | 'fitness'
  | 'privacy'
  | 'blockchain'
  | 'patient-records'
  | 'prescriptions'
  | 'analytics';

interface NavigationContextType {
  currentView: ViewType;
  navigationHistory: ViewType[];
  navigateTo: (view: ViewType) => void;
  goBack: () => void;
  canGoBack: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, userType } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [navigationHistory, setNavigationHistory] = useState<ViewType[]>([]);

  const getDefaultDashboard = useCallback((): ViewType => {
    if (userType === 'patient') return 'patient-dashboard';
    if (userType === 'doctor') return 'doctor-dashboard';
    return 'home';
  }, [userType]);

  const navigateTo = useCallback((view: ViewType) => {
    setNavigationHistory(prev => [...prev, currentView]);
    setCurrentView(view);
  }, [currentView]);

  const goBack = useCallback(() => {
    if (navigationHistory.length === 0) {
      // If no history and user is authenticated, go to appropriate dashboard
      if (isAuthenticated) {
        setCurrentView(getDefaultDashboard());
      } else {
        setCurrentView('home');
      }
      return;
    }

    const previousView = navigationHistory[navigationHistory.length - 1];
    const newHistory = navigationHistory.slice(0, -1);
    
    // If going back to auth pages but user is logged in, redirect to dashboard
    if (isAuthenticated && (previousView === 'patient-auth' || previousView === 'doctor-auth' || previousView === 'home')) {
      setCurrentView(getDefaultDashboard());
      setNavigationHistory([]);
      return;
    }

    // If going back and user is not authenticated, ensure we go to appropriate auth page
    if (!isAuthenticated && (previousView === 'patient-dashboard' || previousView === 'doctor-dashboard')) {
      setCurrentView('home');
      setNavigationHistory([]);
      return;
    }

    setCurrentView(previousView);
    setNavigationHistory(newHistory);
  }, [navigationHistory, isAuthenticated, getDefaultDashboard]);

  // Auto-redirect logic based on authentication state
  React.useEffect(() => {
    if (isAuthenticated) {
      // If user is authenticated but on auth pages, redirect to dashboard
      if (currentView === 'patient-auth' || currentView === 'doctor-auth' || currentView === 'home') {
        setCurrentView(getDefaultDashboard());
        setNavigationHistory([]);
      }
    } else {
      // If user is not authenticated but on protected pages, redirect to home
      const protectedViews: ViewType[] = [
        'patient-dashboard',
        'doctor-dashboard',
        'problems',
        'nutrition',
        'appointments',
        'ai-assistant',
        'medicine-reminders',
        'medicine-expiration',
        'fitness',
        'blockchain',
        'patient-records',
        'prescriptions',
        'analytics'
      ];
      
      if (protectedViews.includes(currentView)) {
        setCurrentView('home');
        setNavigationHistory([]);
      }
    }
  }, [isAuthenticated, currentView, getDefaultDashboard]);

  const canGoBack = navigationHistory.length > 0;

  const value: NavigationContextType = {
    currentView,
    navigationHistory,
    navigateTo,
    goBack,
    canGoBack,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}