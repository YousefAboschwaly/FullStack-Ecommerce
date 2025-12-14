import { useColorMode } from "@/components/ui/color-mode";
import { useThemeColors } from "@/hooks/useThemeColors";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Bell, ChevronDown, Moon, Sun } from "lucide-react";
import { useState } from "react";

const AdminHeader = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  
  const {
    bgCard,
    bgCardHover,
    textPrimary,
    textMuted,
    borderDefault,
    borderAccent,
    accentPrimary,
  } = useThemeColors();

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left="220px"
      right={0}
      h="70px"
      bg={bgCard}
      borderBottom="1px solid"
      borderColor={borderDefault}
      zIndex={30}
    >
      <Flex
        h="full"
        px={6}
        align="center"
        justify="flex-end"
      >
        <HStack gap={3}>
          {/* Color Mode Toggle */}
          <IconButton
            aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
            variant="ghost"
            color={textMuted}
            _hover={{ color: accentPrimary, bg: bgCardHover }}
            onClick={toggleColorMode}
            size="sm"
          >
            {colorMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </IconButton>

          {/* Notifications */}
          <IconButton
            aria-label="Notifications"
            variant="ghost"
            color={textMuted}
            _hover={{ color: accentPrimary, bg: bgCardHover }}
            size="sm"
          >
            <Bell size={20} />
          </IconButton>

          {/* User Profile */}
          <Box
            position="relative"
            onMouseEnter={() => setIsProfileOpen(true)}
            onMouseLeave={() => setIsProfileOpen(false)}
          >
            <HStack
              gap={3}
              cursor="pointer"
              p={2}
              borderRadius="lg"
              _hover={{ bg: bgCardHover }}
            >
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face"
                alt="Admin Avatar"
                w="40px"
                h="40px"
                borderRadius="full"
                border="2px solid"
                borderColor={borderAccent}
              />
              <VStack gap={0} align="start" display={{ base: "none", md: "flex" }}>
                <Text fontSize="sm" fontWeight="600" color={textPrimary}>
                  Justina Clark
                </Text>
                <Text fontSize="xs" color={textMuted}>
                  Admin
                </Text>
              </VStack>
              <ChevronDown
                size={16}
                color={textMuted}
                style={{
                  transform: isProfileOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            </HStack>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <Box
                position="absolute"
                top="100%"
                right={0}
                w="180px"
                bg={bgCard}
                borderRadius="lg"
                border="1px solid"
                borderColor={borderDefault}
                shadow="xl"
                overflow="hidden"
                zIndex={100}
                py={2}
              >
                <Box
                  px={4}
                  py={2}
                  cursor="pointer"
                  _hover={{ bg: bgCardHover }}
                >
                  <Text fontSize="sm" color={textMuted}>Profile Settings</Text>
                </Box>
                <Box
                  px={4}
                  py={2}
                  cursor="pointer"
                  _hover={{ bg: bgCardHover }}
                >
                  <Text fontSize="sm" color={textMuted}>Logout</Text>
                </Box>
              </Box>
            )}
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
};

export default AdminHeader;
