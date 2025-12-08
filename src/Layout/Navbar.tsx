import { useColorMode, useColorModeValue } from '@/components/ui/color-mode';
import { navLinks, profileMenuItems } from '@/constants';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ChevronDown, Heart, LogOut, Menu, Moon, ShoppingCart, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
const navBg = useColorModeValue('hsl(0, 0%, 100%)', 'hsl(222, 47%, 11%)');
const navBorderColor = useColorModeValue('hsl(215, 25%, 85%)', 'hsl(215, 25%, 27%)');
const textColor = useColorModeValue('hsl(222, 47%, 11%)', 'hsl(210, 40%, 98%)');
const mutedTextColor = useColorModeValue('hsl(215, 19%, 45%)', 'hsl(215, 19%, 65%)');
const accentColor = 'hsl(48, 96%, 53%)';
const hoverBg = useColorModeValue('hsl(215, 20%, 95%)', 'hsl(217, 33%, 17%)');

const menuBg = useColorModeValue('hsl(0, 0%, 100%)', 'hsl(217, 33%, 17%)');


  const isActiveLink = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={50}
      bg={navBg}
      borderBottom="1px solid"
      borderColor={navBorderColor}
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
              bg={`linear-gradient(135deg, ${accentColor}, hsl(48, 96%, 60%))`}
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              color={navBg}
              fontSize="xl"
            >
              S
            </Box>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={textColor}
              display={{ base: 'none', sm: 'block' }}
            >
              Store
            </Text>
          </HStack>
        </Link>

        {/* Desktop Navigation */}
        <HStack
          gap={1}
          display={{ base: 'none', md: 'flex' }}
        >
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.path);
            return (
              <Link key={link.name} to={link.path}>
                <Button
                  variant="ghost"
                  fontSize="sm"
                  fontWeight="500"
                  color={isActive ? accentColor : mutedTextColor}
                  position="relative"
                  px={4}
                  _hover={{
                    color: accentColor,
                    bg: hoverBg,
                  }}
                  _after={isActive ? {
                    content: '""',
                    position: 'absolute',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60%',
                    height: '2px',
                    bg: accentColor,
                    borderRadius: 'full',
                  } : undefined}
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
            color={mutedTextColor}
            _hover={{ color: accentColor, bg: hoverBg }}
            display={{ base: 'none', md: 'flex' }}
          >
            <Heart size={20} />
          </IconButton>

          {/* Cart Icon */}
          <IconButton
            aria-label="Shopping Cart"
            variant="ghost"
            color={mutedTextColor}
            _hover={{ color: accentColor, bg: hoverBg }}
          >
            <ShoppingCart size={20} />
          </IconButton>

          {/* Color Mode Toggle */}
          <IconButton
            aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
            variant="ghost"
            color={mutedTextColor}
            _hover={{ color: accentColor, bg: hoverBg }}
            onClick={toggleColorMode}
          >
            {colorMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
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
              _hover={{ bg: hoverBg }}
            >
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt="User Avatar"
                w="36px"
                h="36px"
                borderRadius="full"
                border="2px solid"
                borderColor={accentColor}
              />
              <ChevronDown
                size={16}
                color={mutedTextColor}
                style={{
                  transform: isProfileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
              />
            </HStack>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <Box
                position="absolute"
                top="100%"
                right={0}
                mt={2}
                w="220px"
                bg={menuBg}
                borderRadius="xl"
                border="1px solid"
                borderColor={navBorderColor}
                shadow="xl"
                overflow="hidden"
                zIndex={100}
              >
                {/* User Info */}
                <Box p={4} borderBottom="1px solid" borderColor={navBorderColor}>
                  <HStack gap={3}>
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                      alt="User Avatar"
                      w="40px"
                      h="40px"
                      borderRadius="full"
                    />
                    <Box>
                      <Text fontWeight="600" fontSize="sm" color={textColor}>
                        John Doe
                      </Text>
                      <Text fontSize="xs" color={mutedTextColor}>
                        john@example.com
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
                      color={mutedTextColor}
                      _hover={{ bg: hoverBg, color: accentColor }}
                      onClick={() => navigate(item.path)}
                    >
                      <item.icon size={18} />
                      <Text fontSize="sm">{item.name}</Text>
                    </Button>
                  ))}

                  <Box borderTop="1px solid" borderColor={navBorderColor}>
                    <Button
                      variant="ghost"
                      justifyContent="flex-start"
                      gap={3}
                      py={3}
                      px={4}
                      borderRadius={0}
                      color="hsl(0, 84%, 60%)"
                      _hover={{ bg: 'hsl(0, 84%, 60%, 0.1)', color: 'hsl(0, 84%, 60%)' }}
                      w="full"
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
            color={mutedTextColor}
            _hover={{ color: accentColor, bg: hoverBg }}
            display={{ base: 'flex', md: 'none' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </IconButton>
        </HStack>
      </Flex>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <Box
          display={{ base: 'block', md: 'none' }}
          bg={menuBg}
          borderTop="1px solid"
          borderColor={navBorderColor}
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
                    color={isActive ? accentColor : mutedTextColor}
                    bg={isActive ? hoverBg : 'transparent'}
                    fontWeight={isActive ? '600' : '500'}
                    _hover={{ color: accentColor, bg: hoverBg }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    borderLeft={isActive ? `3px solid ${accentColor}` : '3px solid transparent'}
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
