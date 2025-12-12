/* eslint-disable react-refresh/only-export-components */
import cookieService from "@/app/services/cookieService";
import type { LoginResponse } from "@/interfaces";
import { createContext, useContext, useState } from "react";
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

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
