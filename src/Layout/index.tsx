import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
   <Box pt={"14"} px={"20"}>
    <Outlet/>
   </Box>
  )
}
