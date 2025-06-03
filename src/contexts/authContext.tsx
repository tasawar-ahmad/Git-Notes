import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  token?: string;
}

interface AuthContextType {
  user: GitHubUser | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<GitHubUser | null>(null);

  const login = async (token: string) => {
    try {
      const res = await fetch('https://api.github.com/user', {
        headers: { Authorization: `token ${token}` },
      });

      if (!res.ok) throw new Error('Login failed');

      const data = await res.json();
      const userData = { ...data };
      setUser(userData);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
