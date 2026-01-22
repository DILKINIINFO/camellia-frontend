import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Define the User interface
interface User {
  username: string;
  email: string;
  role: 'superadmin' | 'plantationadmin' | 'tourist';
  plantationId?: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (userData: Omit<User, 'role'> & { role?: 'superadmin' | 'plantationadmin' | 'tourist'; plantationId?: string }) => void;
  logOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error("Failed to save user to localStorage", error);
    }
  }, [user]);

  const signIn = (userData: Omit<User, 'role'> & { role?: 'superadmin' | 'plantationadmin' | 'tourist'; plantationId?: string }) => {
    const userWithRole: User = {
      ...userData,
      role: userData.role || 'tourist',
    };
    setUser(userWithRole);
  };

  const logOut = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, signIn, logOut, isAuthenticated }}>
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
