/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import cookieService from "@/app/services/cookieService";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | undefined>(() => {
    return cookieService.getCookie("jwt") || undefined;
  });
  const login = (jwt: string) => {
    cookieService.setCookie("jwt", jwt, { path: "/", expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) });
    setToken(jwt);
  };

  const logout = () => {
    cookieService.removeCookie("jwt");
    setToken(undefined);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
