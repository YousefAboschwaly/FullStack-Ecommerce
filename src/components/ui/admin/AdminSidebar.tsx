import { useThemeColors } from "@/hooks/useThemeColors";
import {
  Box,
  Flex,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Grid3X3, Home, Package } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const sidebarLinks = [
  { name: "Dashboard", path: "/admin", icon: Home },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Categories", path: "/admin/categories", icon: Grid3X3 },
];

const AdminSidebar = () => {
  const location = useLocation();
  const {
    bgCard,
    bgCardHover,
    textPrimary,
    textMuted,
    borderDefault,
    accentPrimary,
    gradientLogo,
  } = useThemeColors();

  const isActiveLink = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Box
      as="aside"
      w="220px"
      minH="100vh"
      bg={bgCard}
      borderRight="1px solid"
      borderColor={borderDefault}
      position="fixed"
      left={0}
      top={0}
      zIndex={40}
    >
      {/* Logo */}
      <Flex
        h="70px"
        px={6}
        align="center"
        borderBottom="1px solid"
        borderColor={borderDefault}
      >
        <Link to="/admin">
          <Flex align="center" gap={2}>
            <Box
              w="36px"
              h="36px"
              bg={gradientLogo}
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              color={bgCard}
              fontSize="lg"
            >
              S
            </Box>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color={textPrimary}
            >
              Logo
            </Text>
          </Flex>
        </Link>
      </Flex>

      {/* Navigation Links */}
      <VStack gap={1} align="stretch" p={4}>
        {sidebarLinks.map((link) => {
          const isActive = isActiveLink(link.path);
          return (
            <Link key={link.name} to={link.path}>
              <Flex
                align="center"
                gap={3}
                px={4}
                py={3}
                borderRadius="lg"
                bg={isActive ? bgCardHover : "transparent"}
                color={isActive ? accentPrimary : textMuted}
                fontWeight={isActive ? "600" : "500"}
                fontSize="sm"
                transition="all 0.2s"
                _hover={{
                  bg: bgCardHover,
                  color: accentPrimary,
                }}
                position="relative"
                _before={
                  isActive
                    ? {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "3px",
                        height: "60%",
                        bg: accentPrimary,
                        borderRadius: "full",
                      }
                    : undefined
                }
              >
                <Icon as={link.icon} boxSize={5} />
                <Text>{link.name}</Text>
              </Flex>
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
};

export default AdminSidebar;
