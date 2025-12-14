import { useThemeColors } from "@/hooks/useThemeColors";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Grid3X3, Home, Menu, Package, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarContentProps {
  onClose: () => void;
  location: ReturnType<typeof useLocation>;
  colors: ReturnType<typeof useThemeColors>;
}

const SidebarContent = ({ onClose, location, colors }: SidebarContentProps) => {
  const {
    bgCard,
    bgCardHover,
    textPrimary,
    textMuted,
    borderDefault,
    accentPrimary,
    gradientLogo,
  } = colors;

  const isActiveLink = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Logo */}
      <Flex
        h="70px"
        px={6}
        align="center"
        borderBottom="1px solid"
        borderColor={borderDefault}
        justify="space-between"
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
            <Text fontSize="lg" fontWeight="bold" color={textPrimary}>
              Logo
            </Text>
          </Flex>
        </Link>

        {/* Close button for mobile */}
        <IconButton
          aria-label="Close sidebar"
          variant="ghost"
          display={{ base: "flex", lg: "none" }}
          onClick={onClose}
          color={textMuted}
          _hover={{ color: accentPrimary, bg: bgCardHover }}
          size="sm"
        >
          <X size={20} />
        </IconButton>
      </Flex>

      {/* Navigation Links */}
      <VStack gap={1} align="stretch" p={4}>
        {sidebarLinks.map((link) => {
          const isActive = isActiveLink(link.path);
          return (
            <Link key={link.name} to={link.path} onClick={onClose}>
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
    </>
  );
};

const sidebarLinks = [
  { name: "Dashboard", path: "/admin", icon: Home },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Categories", path: "/admin/categories", icon: Grid3X3 },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { open, onOpen, onClose } = useDisclosure();
  const colors = useThemeColors();
  const {
    bgCard,
    bgCardHover,
    textMuted,
    borderDefault,
    accentPrimary,
    bgOverlay,
  } = colors;

  return (
    <>
      {/* Mobile Menu Button */}
      <IconButton
        aria-label="Open menu"
        variant="ghost"
        display={{ base: "flex", lg: "none" }}
        position="fixed"
        top={4}
        left={4}
        zIndex={50}
        onClick={onOpen}
        color={textMuted}
        bg={bgCard}
        border="1px solid"
        borderColor={borderDefault}
        _hover={{ color: accentPrimary, bg: bgCardHover }}
        size="md"
      >
        <Menu size={20} />
      </IconButton>

      {/* Mobile Overlay */}
      {open && (
        <Box
          display={{ base: "block", lg: "none" }}
          position="fixed"
          inset={0}
          bg={bgOverlay}
          zIndex={45}
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <Box
        as="aside"
        display={{ base: open ? "block" : "none", lg: "none" }}
        w="260px"
        h="100vh"
        bg={bgCard}
        borderRight="1px solid"
        borderColor={borderDefault}
        position="fixed"
        left={0}
        top={0}
        zIndex={50}
        transition="transform 0.3s ease"
      >
        <SidebarContent onClose={onClose} location={location} colors={colors} />
      </Box>

      {/* Desktop Sidebar */}
      <Box
        as="aside"
        display={{ base: "none", lg: "block" }}
        w="220px"
        minH="100vh"
        bg={bgCard}
        borderRight="1px solid"
        borderColor={borderDefault}
        position="fixed"
        left={0}
        top={0}
        zIndex={50}
      >
        <SidebarContent onClose={onClose} location={location} colors={colors} />
      </Box>
    </>
  );
};

export default AdminSidebar;
