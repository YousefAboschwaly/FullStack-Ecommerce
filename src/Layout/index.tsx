import { Container } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({isAuthenticated}:{isAuthenticated:string|undefined}) {
  if(!isAuthenticated) return <Navigate to="/login" replace/>
  return (
    <>
    <Navbar/>
   <Container my={"8"} >

    <Outlet/>
   </Container>
    </>
  )
}
