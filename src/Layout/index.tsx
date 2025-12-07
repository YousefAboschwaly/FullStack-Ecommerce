import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
   <Container pt={"14"} >
    <Outlet/>
   </Container>
  )
}
