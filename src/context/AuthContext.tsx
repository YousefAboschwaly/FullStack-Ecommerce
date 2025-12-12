/* eslint-disable react-refresh/only-export-components */
import cookieService from "@/app/services/cookieService";
import type { LoginResponse } from "@/interfaces";
import { createContext, useContext, useEffect, useState } from "react";
interface IProps {
  user: LoginResponse["user"] | null;
  token: string | undefined;
  login: (data: LoginResponse) => void;
  logout: () => void;
}
const AuthContext = createContext<IProps>({
  user: null,
  token: undefined,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | undefined>(() => {
    return cookieService.getCookie("jwt") || undefined;
  });
  const [user, setUser] = useState<LoginResponse["user"] | null>(null);

  const login = (data: LoginResponse) => {
    setToken(data.jwt);
    setUser(data.user);
  };

  const logout = () => {
    cookieService.removeCookie("jwt");
    setToken(undefined);
  };

  // This effect fetches user data when the token changes or when the user refresh the page to persist the login state and make sure user data is up-to-date
  useEffect(() => {
    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => setUser(null));
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
