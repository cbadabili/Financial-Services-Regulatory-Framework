import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'compliance_officer' | 'user';
  organization: string;
  department: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'John Modise',
    email: 'john.modise@standardcharteredbw.com',
    password: 'password123',
    role: 'compliance_officer' as const,
    organization: 'Standard Chartered Bank Botswana',
    department: 'Risk & Compliance',
    permissions: ['read_documents', 'write_reports', 'manage_compliance', 'view_analytics']
  },
  {
    id: '2',
    name: 'Sarah Kgomo',
    email: 'sarah.kgomo@fnbbotswana.co.bw',
    password: 'password123',
    role: 'admin' as const,
    organization: 'First National Bank Botswana',
    department: 'Operations',
    permissions: ['read_documents', 'write_reports', 'manage_compliance', 'view_analytics', 'admin_access', 'manage_users']
  },
  {
    id: '3',
    name: 'Thabo Seretse',
    email: 'thabo.seretse@absa.co.bw',
    password: 'password123',
    role: 'user' as const,
    organization: 'Absa Bank Botswana',
    department: 'Legal',
    permissions: ['read_documents', 'view_analytics']
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (mockUser) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    hasPermission,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};