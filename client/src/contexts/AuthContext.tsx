import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User, AuthResponse } from "../types/index";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (authData: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");
    const savedUser =
      localStorage.getItem("auth_user") || sessionStorage.getItem("auth_user");

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  const login = (authData: AuthResponse) => {
    const { user: userData, token: authToken } = authData;

    setUser(userData);
    setToken(authToken);

    const storage = localStorage.getItem("auth_token")
      ? localStorage
      : sessionStorage;
    storage.setItem("auth_token", authToken);
    storage.setItem("auth_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_user");
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
