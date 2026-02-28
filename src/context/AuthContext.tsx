import React, { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface AuthState {
  id: string;
  name: string;
  role: "student" | "faculty" | null;
}

interface AuthContextType extends AuthState {
  login: (id: string, role: "student" | "faculty") => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({ id: "", name: "", role: null });

  const login = useCallback((id: string, role: "student" | "faculty") => {
    setAuth({ id, name: id, role });
  }, []);

  const logout = useCallback(() => {
    setAuth({ id: "", name: "", role: null });
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, isAuthenticated: !!auth.role }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
