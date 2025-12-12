import { Container } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "@/context/AuthContext";

export default function Layout() {
  const {token} = useAuth()
  if (!token) {
    console.log("Not authenticated, redirecting to login...");
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Navbar />
      <Container my={"8"}>
        <Outlet />
      </Container>
    </>
  );
}
