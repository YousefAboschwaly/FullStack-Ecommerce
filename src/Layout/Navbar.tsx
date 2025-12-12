import { useColorMode } from "@/components/ui/color-mode";
import { navLinks, profileMenuItems } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  ChevronDown,
  Heart,
  LogOut,
  Menu,
  Moon,
  ShoppingCart,
  Sun,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {user, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  // Mock cart items count - replace with your actual cart state
  const cartItemsCount = 3;
  console.log(user)
  // Use centralized theme colors
  const {
    bgCard,
    bgCardHover,
    textPrimary,
    textMuted,
    borderDefault,
    borderAccent,
    accentPrimary,
    gradientButton,
    gradientLogo,
    statusError,
    statusErrorBg,
  } = useThemeColors();

  const isActiveLink = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={50}
      bg={bgCard}
      borderBottom="1px solid"
      borderColor={borderDefault}
      shadow="lg"
    >
      <Flex
        maxW="1400px"
        mx="auto"
        h="70px"
        px={{ base: 4, md: 6, lg: 8 }}
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <Link to="/">
          <HStack gap={2} cursor="pointer">
            <Box
              w="40px"
              h="40px"
              bg={gradientLogo}
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              color={bgCard}
              fontSize="xl"
            >
              S
            </Box>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={textPrimary}
              display={{ base: "none", sm: "block" }}
            >
              Store
            </Text>
          </HStack>
        </Link>

        {/* Desktop Navigation */}
        <HStack gap={1} display={{ base: "none", md: "flex" }}>
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.path);
            return (
              <Link key={link.name} to={link.path}>
                <Button
                  variant="ghost"
                  fontSize="sm"
                  fontWeight="500"
                  color={isActive ? accentPrimary : textMuted}
                  position="relative"
                  px={4}
                  _hover={{
                    color: accentPrimary,
                    bg: bgCardHover,
                  }}
                  _after={
                    isActive
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: "0",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "60%",
                          height: "2px",
                          bg: accentPrimary,
                          borderRadius: "full",
                        }
                      : undefined
                  }
                >
                  {link.name}
                </Button>
              </Link>
            );
          })}
        </HStack>

        {/* Right Section */}
        <HStack gap={2}>
          {/* Wishlist Icon */}
          <IconButton
            aria-label="Wishlist"
            variant="ghost"
            color={textMuted}
            _hover={{ color: accentPrimary, bg: bgCardHover }}
            display={{ base: "none", md: "flex" }}
          >
            <Heart size={20} />
          </IconButton>

          {/* Cart Icon with Badge */}
          <Box position="relative">
            <IconButton
              aria-label="Shopping Cart"
              variant="ghost"
              color={textMuted}
              _hover={{ color: accentPrimary, bg: bgCardHover }}
            >
              <ShoppingCart size={20} />
            </IconButton>
            {cartItemsCount > 0 && (
              <Box
                position="absolute"
                top="-2px"
                right="-2px"
                bg={gradientButton}
                color="white"
                fontSize="10px"
                fontWeight="bold"
                borderRadius="full"
                minW="18px"
                h="18px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                px="5px"
              >
                {cartItemsCount > 99 ? "99+" : cartItemsCount}
              </Box>
            )}
          </Box>

          {/* Color Mode Toggle */}
          <IconButton
            aria-label={`Switch to ${
              colorMode === "light" ? "dark" : "light"
            } mode`}
            variant="ghost"
            color={textMuted}
            _hover={{ color: accentPrimary, bg: bgCardHover }}
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </IconButton>

          {/* User Profile with Hover Menu */}
          <Box
            position="relative"
            onMouseEnter={() => setIsProfileMenuOpen(true)}
            onMouseLeave={() => setIsProfileMenuOpen(false)}
          >
            <HStack
              gap={2}
              cursor="pointer"
              p={2}
              borderRadius="lg"
              _hover={{ bg: bgCardHover }}
            >
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt="User Avatar"
                w="36px"
                h="36px"
                borderRadius="full"
                border="2px solid"
                borderColor={borderAccent}
              />
              <ChevronDown
                size={16}
                color={textMuted}
                style={{
                  transform: isProfileMenuOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            </HStack>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <Box
                position="absolute"
                top="100%"
                right={0}
                w="220px"
                bg={bgCard}
                borderRadius="xl"
                border="1px solid"
                borderColor={borderDefault}
                shadow="xl"
                overflow="hidden"
                zIndex={100}
              >
                {/* User Info */}
                <Box p={4} borderBottom="1px solid" borderColor={borderDefault}>
                  <HStack gap={3}>
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                      alt="User Avatar"
                      w="40px"
                      h="40px"
                      borderRadius="full"
                    />
                    <Box>
                      <Text fontWeight="600" fontSize="sm" color={textPrimary}>
                       {user?.username||"Guest User"}
                      </Text>
                      <Text fontSize="xs" color={textMuted}>
                        {user?.email||"No email provided"}
                      </Text>
                    </Box>
                  </HStack>
                </Box>

                {/* Menu Items */}
                <VStack gap={0} align="stretch">
                  {profileMenuItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      justifyContent="flex-start"
                      gap={3}
                      py={3}
                      px={4}
                      borderRadius={0}
                      color={textMuted}
                      _hover={{ bg: bgCardHover, color: accentPrimary }}
                      onClick={() => navigate(item.path)}
                    >
                      <item.icon size={18} />
                      <Text fontSize="sm">{item.name}</Text>
                    </Button>
                  ))}

                  <Box borderTop="1px solid" borderColor={borderDefault}>
                    <Button
                      variant="ghost"
                      justifyContent="flex-start"
                      gap={3}
                      py={3}
                      px={4}
                      borderRadius={0}
                      color={statusError}
                      _hover={{ bg: statusErrorBg, color: statusError }}
                      w="full"
                      onClick={logout}
                    >
                      <LogOut size={18} />
                      <Text fontSize="sm">Logout</Text>
                    </Button>
                  </Box>
                </VStack>
              </Box>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            aria-label="Toggle Menu"
            variant="ghost"
            color={textMuted}
            _hover={{ color: accentPrimary, bg: bgCardHover }}
            display={{ base: "flex", md: "none" }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </IconButton>
        </HStack>
      </Flex>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <Box
          display={{ base: "block", md: "none" }}
          bg={bgCard}
          borderTop="1px solid"
          borderColor={borderDefault}
          py={4}
        >
          <VStack gap={1} align="stretch" px={4}>
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.path);
              return (
                <Link key={link.name} to={link.path}>
                  <Button
                    variant="ghost"
                    w="full"
                    justifyContent="flex-start"
                    color={isActive ? accentPrimary : textMuted}
                    bg={isActive ? bgCardHover : "transparent"}
                    fontWeight={isActive ? "600" : "500"}
                    _hover={{ color: accentPrimary, bg: bgCardHover }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    borderLeft={
                      isActive ? `3px solid` : "3px solid transparent"
                    }
                    borderLeftColor={isActive ? accentPrimary : "transparent"}
                    borderRadius="0"
                    pl={4}
                  >
                    {link.name}
                  </Button>
                </Link>
              );
            })}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
