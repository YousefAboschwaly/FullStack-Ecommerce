import { Container } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({
  isAuthenticated,
}: {
  isAuthenticated: string | undefined;
}) {
  if (!isAuthenticated) {
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
