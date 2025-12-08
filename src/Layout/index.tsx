import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
    <Navbar/>
   <Container my={"8"} >

    <Outlet/>
   </Container>
    </>
  )
}
