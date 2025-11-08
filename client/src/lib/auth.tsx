import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiRequest, queryClient } from './queryClient';

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  rut?: string;
  role: string;
  active: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('sicrep_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('sicrep_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await apiRequest('POST', '/api/auth/login', { username, password });

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('sicrep_user', JSON.stringify(userData));
      
      // Invalidate all queries to refresh data with new user context
      queryClient.invalidateQueries();
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sicrep_user');
    queryClient.clear();
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
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

// Helper to get role display name
export function getRoleDisplayName(role: string): string {
  const roleNames: Record<string, string> = {
    admin: 'Administrador',
    gerente_general: 'Gerente General',
    manager_operaciones: 'Manager Operaciones',
    cps: 'CPS',
    evaluador: 'Evaluador',
    auditor: 'Auditor',
    comite: 'Comité',
    proveedor: 'Proveedor',
    cliente_mineria: 'Cliente Minería',
    viewer: 'Visualizador',
    analista: 'Analista ESG',
    coordinador: 'Coordinador',
    tecnico: 'Técnico',
    inspector: 'Inspector',
    supervisor: 'Supervisor',
  };
  return roleNames[role] || role;
}
