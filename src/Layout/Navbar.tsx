import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Text,
  VStack,
  Image,
} from '@chakra-ui/react';
import { Menu, X, ShoppingCart, Heart, Settings, LogOut, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const colors = {
  navy: {
    900: '#0a1628',
    800: '#1a2744',
    700: '#2a3a5c',
    600: '#3d4f6f',
  },
  yellow: {
    500: '#eab308',
    400: '#facc15',
  }
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const profileMenuItems = [
    { name: 'My Profile', icon: User, path: '/profile' },
    { name: 'My Orders', icon: ShoppingCart, path: '/orders' },
    { name: 'Wishlist', icon: Heart, path: '/wishlist' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={50}
      bg={colors.navy[900]}
      borderBottom="1px solid"
      borderColor={colors.navy[700]}
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
              bg={`linear-gradient(135deg, ${colors.yellow[500]}, ${colors.yellow[400]})`}
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              color={colors.navy[900]}
              fontSize="xl"
            >
              S
            </Box>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="white"
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
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path}>
              <Button
                variant="ghost"
                color="gray.300"
                fontWeight="medium"
                px={4}
                _hover={{
                  color: colors.yellow[400],
                  bg: colors.navy[800],
                }}
                transition="all 0.2s"
              >
                {link.name}
              </Button>
            </Link>
          ))}
        </HStack>

        {/* Right Section */}
        <HStack gap={3}>
          {/* Cart Icon */}
          <IconButton
            aria-label="Cart"
            variant="ghost"
            color="gray.300"
            _hover={{ color: colors.yellow[400], bg: colors.navy[800] }}
            display={{ base: 'none', sm: 'flex' }}
          >
            <ShoppingCart size={20} />
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
              borderRadius="full"
              bg={isProfileMenuOpen ? colors.navy[800] : 'transparent'}
              transition="all 0.2s"
              _hover={{ bg: colors.navy[800] }}
            >
              <Box
                w="40px"
                h="40px"
                borderRadius="full"
                overflow="hidden"
                border="2px solid"
                borderColor={isProfileMenuOpen ? colors.yellow[400] : colors.navy[600]}
                transition="all 0.2s"
              >
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                  alt="User avatar"
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              </Box>
              <ChevronDown
                size={16}
                color={isProfileMenuOpen ? colors.yellow[400] : '#9ca3af'}
                style={{
                  transform: isProfileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              />
            </HStack>

            {/* Dropdown Menu */}
            <Box
              position="absolute"
              top="100%"
              right={0}
              mt={2}
              w="220px"
              bg={colors.navy[800]}
              borderRadius="xl"
              border="1px solid"
              borderColor={colors.navy[600]}
              shadow="xl"
              opacity={isProfileMenuOpen ? 1 : 0}
              visibility={isProfileMenuOpen ? 'visible' : 'hidden'}
              transform={isProfileMenuOpen ? 'translateY(0)' : 'translateY(-10px)'}
              transition="all 0.2s ease-in-out"
              overflow="hidden"
              zIndex={100}
            >
              {/* User Info Header */}
              <Box
                p={4}
                borderBottom="1px solid"
                borderColor={colors.navy[600]}
                bg={colors.navy[900]}
              >
                <HStack gap={3}>
                  <Box
                    w="45px"
                    h="45px"
                    borderRadius="full"
                    overflow="hidden"
                    border="2px solid"
                    borderColor={colors.yellow[400]}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                      alt="User avatar"
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  </Box>
                  <VStack align="start" gap={0}>
                    <Text color="white" fontWeight="semibold" fontSize="sm">
                      John Doe
                    </Text>
                    <Text color="gray.400" fontSize="xs">
                      john@example.com
                    </Text>
                  </VStack>
                </HStack>
              </Box>

              {/* Menu Items */}
              <VStack gap={0} py={2}>
                {profileMenuItems.map((item) => (
                  <Box
                    key={item.name}
                    as="button"
                    w="full"
                    px={4}
                    py={3}
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color="gray.300"
                    _hover={{
                      bg: colors.navy[700],
                      color: colors.yellow[400],
                    }}
                    transition="all 0.15s"
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon size={18} />
                    <Text fontSize="sm">{item.name}</Text>
                  </Box>
                ))}
              </VStack>

              {/* Logout */}
              <Box
                borderTop="1px solid"
                borderColor={colors.navy[600]}
                p={2}
              >
                <Box
                  as="button"
                  w="full"
                  px={4}
                  py={3}
                  display="flex"
                  alignItems="center"
                  gap={3}
                  color="red.400"
                  borderRadius="lg"
                  _hover={{
                    bg: 'rgba(239, 68, 68, 0.1)',
                  }}
                  transition="all 0.15s"
                >
                  <LogOut size={18} />
                  <Text fontSize="sm" fontWeight="medium">Logout</Text>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            aria-label="Menu"
            variant="ghost"
            color="gray.300"
            _hover={{ color: colors.yellow[400], bg: colors.navy[800] }}
            display={{ base: 'flex', md: 'none' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </IconButton>
        </HStack>
      </Flex>

      {/* Mobile Menu */}
      <Box
        display={{ base: isMobileMenuOpen ? 'block' : 'none', md: 'none' }}
        bg={colors.navy[800]}
        borderTop="1px solid"
        borderColor={colors.navy[700]}
        pb={4}
      >
        <VStack gap={1} px={4} pt={4}>
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} style={{ width: '100%' }}>
              <Button
                variant="ghost"
                w="full"
                justifyContent="flex-start"
                color="gray.300"
                _hover={{
                  color: colors.yellow[400],
                  bg: colors.navy[700],
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Button>
            </Link>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default Navbar;
