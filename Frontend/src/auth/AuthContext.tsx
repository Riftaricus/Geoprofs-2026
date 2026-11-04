import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { apiFetch, clearToken, getToken, saveToken } from "../api/client";

import type { User } from "../api/user/model";

interface LoginResponse {
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const profile = await apiFetch<User>("/user");
      setUser(profile);
    } catch (error) {
      if (error instanceof Error && error.message.includes("API-fout: 401")) {
        clearToken();
        setUser(null);
      }

      throw error;
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await fetch("/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.detail ?? "Inloggen is mislukt.");
    }

    if (!data?.token) {
      throw new Error("Geen token ontvangen van de server.");
    }

    saveToken((data as LoginResponse).token);

    try {
      const profile = await apiFetch<User>("/user");
      setUser(profile);
    } catch (error) {
      clearToken();
      setUser(null);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      if (getToken()) {
        await apiFetch("/auth/logout/", {
          method: "POST",
        });
      }
    } finally {
      clearToken();
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      try {
        await refreshProfile();
      } catch {
        // Toon de loginpagina als het profiel niet kan worden geladen.
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void initialize();

    return () => {
      cancelled = true;
    };
  }, [refreshProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: user != null,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth moet binnen een AuthProvider worden gebruikt.");
  }

  return context;
}
