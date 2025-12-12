import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();

  if (!token) {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
