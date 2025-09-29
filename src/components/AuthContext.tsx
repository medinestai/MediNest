import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  name?: string;
  email?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  userType: 'patient' | 'doctor' | null;
  isAuthenticated: boolean;
  login: (userData: User, type: 'patient' | 'doctor') => void;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'medinest_auth';
const USER_STORAGE_KEY = 'medinest_user';
const USER_TYPE_STORAGE_KEY = 'medinest_user_type';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'patient' | 'doctor' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on app start
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        const storedUserType = localStorage.getItem(USER_TYPE_STORAGE_KEY);

        if (isAuthenticated && storedUser && storedUserType) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setUserType(storedUserType as 'patient' | 'doctor');
        }
      } catch (error) {
        console.error('Error initializing auth state:', error);
        // Clear invalid data
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(USER_TYPE_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback((userData: User, type: 'patient' | 'doctor') => {
    try {
      // Generate a simple session token (in a real app, this would come from your backend)
      const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Store auth state in localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ ...userData, sessionToken }));
      localStorage.setItem(USER_TYPE_STORAGE_KEY, type);
      
      // Update state
      setUser({ ...userData, sessionToken });
      setUserType(type);
    } catch (error) {
      console.error('Error during login:', error);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      // Clear localStorage
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(USER_TYPE_STORAGE_KEY);
      
      // Clear state
      setUser(null);
      setUserType(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, []);

  const updateUser = useCallback((userData: User) => {
    try {
      const updatedUser = { ...user, ...userData };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }, [user]);

  const isAuthenticated = !isLoading && user !== null && userType !== null;

  const value: AuthContextType = {
    user,
    userType,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };

  // Don't render children until auth state is initialized
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center">
        <div className="glass-card p-8 rounded-2xl backdrop-blur-sm bg-white/70 shadow-xl border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            <span className="text-gray-700">Loading MediNest...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}