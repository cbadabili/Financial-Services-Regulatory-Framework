import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'compliance_officer' | 'user';
  organization: string;
  department: string;
  permissions: string[];
  /** account status – must be 'active' to log in */
  status: 'active' | 'pending' | 'suspended';
}

/**
 * Payload structure for user registration (mirrors the register UI form).
 * Moving this interface to the top-level ensures it is in scope everywhere
 * including the AuthContextType definition.
 */
export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: User['role'];
  organizationName?: string;
  organizationType?: string;
  jobTitle?: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  isLoading: boolean;
  /* -------- registration / activation ---------- */
  /**
   * Register a new user.  Returns `true` on success, `false` if
   * the email is already taken or validation fails.
   */
  register: (data: RegistrationData) => Promise<boolean>;
  /**
   * Send a (mock) activation email containing a 6-digit code.
   */
  sendActivationEmail: (email: string, code: string) => void;
  /**
   * Verify email with activation code, returns true on success.
   */
  verifyEmail: (email: string, code: string) => boolean;
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
// NOTE:  we keep this mutable so that registration can push
const mockUsers: Array<
  Omit<User, 'permissions'> & { password: string; permissions: string[] }
> = [
  {
    id: '1',
    name: 'John Modise',
    email: 'john.modise@standardcharteredbw.com',
    password: 'password123',
    role: 'compliance_officer' as const,
    organization: 'Standard Chartered Bank Botswana',
    department: 'Risk & Compliance',
    permissions: ['read_documents', 'write_reports', 'manage_compliance', 'view_analytics'],
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Kgomo',
    email: 'sarah.kgomo@fnbbotswana.co.bw',
    password: 'password123',
    role: 'admin' as const,
    organization: 'First National Bank Botswana',
    department: 'Operations',
    permissions: ['read_documents', 'write_reports', 'manage_compliance', 'view_analytics', 'admin_access', 'manage_users'],
    status: 'active'
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
    ,
    status: 'active'
  }
];
/* ------------------------------------------------------------------
 * Activation store – email → code (demo only, in-memory)
 * ----------------------------------------------------------------*/
const activationStore: Record<string, string> = {};

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
      if (mockUser.status !== 'active') {
        // refuse login if not activated
        setIsLoading(false);
        return false;
      }
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

  /**
   * Register a new user.
   * - Ensures email is unique.
   * - Adds sensible default permissions based on role.
   * - Persists to mockUsers so the user can log in immediately afterwards.
   */
  /* ----------------------------------------------------------
   * Registration payload structure – matches the UI form
   * --------------------------------------------------------*/

  const register = async (data: RegistrationData): Promise<boolean> => {
    setIsLoading(true);

    // Quick client-side validation
    if (!data.email || !data.password) {
      setIsLoading(false);
      return false;
    }

    // Email uniqueness check
    if (mockUsers.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      setIsLoading(false);
      return false;
    }

    // Determine default permissions by role
    const rolePermissions: Record<User['role'], string[]> = {
      admin: [
        'read_documents',
        'write_reports',
        'manage_compliance',
        'view_analytics',
        'admin_access',
        'manage_users',
      ],
      compliance_officer: ['read_documents', 'write_reports', 'manage_compliance'],
      user: ['read_documents'],
    };

    const newUser: Omit<User, 'permissions'> & {
      password: string;
      permissions: string[];
    } = {
      id: Date.now().toString(),
      name: `${data.firstName ?? ''} ${data.lastName ?? ''}`.trim() || data.email,
      email: data.email,
      password: data.password,
      role: data.role,
      // Map correct field names from RegistrationData
      organization: data.organizationName ?? '',
      department: data.department ?? '',
      permissions: rolePermissions[data.role] ?? ['read_documents'],
      status: 'pending'
    };

    // Simulate API latency
    await new Promise((r) => setTimeout(r, 800));

    mockUsers.push(newUser);
    // Generate activation code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    activationStore[newUser.email.toLowerCase()] = code;
    sendActivationEmail(newUser.email, code);
    setIsLoading(false);
    return true;
  };

  /* -------- MOCK EMAIL DELIVERY --------------------------------------*/
  const sendActivationEmail = (email: string, code: string) => {
    // In real app this would call backend email service
    console.info(`[MockEmail] Activation code for ${email}: ${code}`);
  };

  /* -------- VERIFY EMAIL --------------------------------------------*/
  const verifyEmail = (email: string, code: string): boolean => {
    const key = email.toLowerCase();
    if (activationStore[key] !== code) return false;
    // find user and activate
    const u = mockUsers.find(m => m.email.toLowerCase() === key);
    if (u) {
      u.status = 'active';
      delete activationStore[key];
      return true;
    }
    return false;
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    sendActivationEmail,
    verifyEmail,
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