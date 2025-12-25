import { Container } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "@/context/AuthContext";
import CartDrawer from "@/components/ui/cartDrawer";
import ScrollToTop from "@/components/ui/scrollToTop";

export default function Layout() {
  const { token } = useAuth();
  if (!token) {
    console.log("Not authenticated, redirecting to login...");
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <ScrollToTop />

      <Navbar />
      <CartDrawer />
      <Container my={"5"}>
        <Outlet />
      </Container>
    </>
  );
}
