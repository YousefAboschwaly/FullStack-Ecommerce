import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}: {children: ReactNode}) {
  const {token} = useAuth()
  
  if (!token) {
    console.log("Not authenticated, redirecting to login...");
    return <Navigate to="/login" replace />;
  }
  return (
    <>{children}</>
  )
}
