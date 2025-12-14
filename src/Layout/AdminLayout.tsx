import AdminHeader from "@/components/ui/admin/AdminHeader";
import AdminSidebar from "@/components/ui/admin/AdminSidebar";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const { bgMain } = useThemeColors();

  return (
    <Box minH="100vh" bg={bgMain}>
      <AdminSidebar />
      <AdminHeader />

      {/* Main Content */}
      <Box
        ml={{ base: 0, lg: "220px" }}
        pt="70px"
        minH="100vh"
        transition="margin-left 0.3s ease"
      >
        <Box p={{ base: 4, md: 6 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
