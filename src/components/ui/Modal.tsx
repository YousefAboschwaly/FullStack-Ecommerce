import { useThemeColors } from "@/hooks/useThemeColors";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AlertTriangle, Info, X } from "lucide-react";
import type { ReactNode } from "react";

export type ModalVariant = "default" | "danger" | "info";

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: ModalVariant;
  isLoading?: boolean;
  showFooter?: boolean;
}

const GenericModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  isLoading = false,
  showFooter = true,
}: GenericModalProps) => {
  const {
    bgCard,
    bgOverlay,
    textPrimary,
    textMuted,
    borderDefault,
    accentPrimary,
    statusError,
  } = useThemeColors();

  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: AlertTriangle,
          iconColor: statusError,
          iconBg: "rgba(239, 68, 68, 0.1)",
          confirmBg: statusError,
          confirmHoverBg: "#dc2626",
        };
      case "info":
        return {
          icon: Info,
          iconColor: accentPrimary,
          iconBg: `${accentPrimary}15`,
          confirmBg: accentPrimary,
          confirmHoverBg: accentPrimary,
        };
      default:
        return {
          icon: null,
          iconColor: accentPrimary,
          iconBg: `${accentPrimary}15`,
          confirmBg: accentPrimary,
          confirmHoverBg: accentPrimary,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      {/* Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={bgOverlay}
        onClick={onClose}
        animation="fade-in 0.2s ease-out"
      />

      {/* Modal Content */}
      <Box
        position="relative"
        bg={bgCard}
        borderRadius="2xl"
        border="1px solid"
        borderColor={borderDefault}
        maxW="450px"
        w="100%"
        overflow="hidden"
        animation="scale-in 0.2s ease-out"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      >
        {/* Close Button */}
        <Button
          position="absolute"
          top={4}
          right={4}
          size="sm"
          variant="ghost"
          borderRadius="lg"
          color={textMuted}
          _hover={{ bg: borderDefault }}
          onClick={onClose}
          minW="auto"
          p={2}
        >
          <X size={18} />
        </Button>

        {/* Header */}
        <VStack gap={3} pt={8} pb={4} px={6} align="center">
          {variantStyles.icon && (
            <Flex
              w="60px"
              h="60px"
              borderRadius="full"
              bg={variantStyles.iconBg}
              align="center"
              justify="center"
            >
              <Icon as={variantStyles.icon} boxSize={7} color={variantStyles.iconColor} />
            </Flex>
          )}
          <Text fontSize="xl" fontWeight="700" color={textPrimary} textAlign="center">
            {title}
          </Text>
          {description && (
            <Text fontSize="sm" color={textMuted} textAlign="center" maxW="350px">
              {description}
            </Text>
          )}
        </VStack>

        {/* Body */}
        {children && (
          <Box px={6} pb={4}>
            {children}
          </Box>
        )}

        {/* Footer */}
        {showFooter && (
          <HStack gap={3} px={6} pb={6} pt={2} justify="center">
            <Button
              flex={1}
              variant="outline"
              borderRadius="xl"
              borderColor={borderDefault}
              color={textPrimary}
              fontWeight="600"
              py={6}
              _hover={{ bg: borderDefault }}
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              flex={1}
              borderRadius="xl"
              bg={variantStyles.confirmBg}
              color="white"
              fontWeight="600"
              py={6}
              _hover={{ bg: variantStyles.confirmHoverBg, opacity: 0.9 }}
              onClick={onConfirm}
              loading={isLoading}
              disabled={isLoading}
            >
              {confirmText}
            </Button>
          </HStack>
        )}
      </Box>
    </Box>
  );
};

export default GenericModal;
