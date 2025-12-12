/* eslint-disable react-refresh/only-export-components */
import cookieService from "@/app/services/cookieService";
import { createContext, useContext, useState } from "react";
interface IProps {
  token: string | undefined;
  login: (jwt:string)=>void;
  logout: () => void;
}
const AuthContext = createContext<IProps>({
  token: undefined,
  login:()=>{},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | undefined>(() => {
    return cookieService.getCookie("jwt") || undefined;
  });

  const login = (jwt:string)=>{
    setToken(jwt);
  }

  const logout = () => {
    cookieService.removeCookie("jwt");
    setToken(undefined);
  };

  return (
    <AuthContext.Provider value={{ token,login ,logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
