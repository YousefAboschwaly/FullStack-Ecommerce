import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useThemeColors from "@/hooks/useThemeColors";

interface ErrorHandlerProps {
  error?: Error | string | null;
  onRetry?: () => void;
  title?: string;
  description?: string;
}

const ErrorHandler = ({
  error,
  onRetry,
  title = "Something Went Wrong",
  description = "We encountered an unexpected error. Please try again or go back to the previous page.",
}: ErrorHandlerProps) => {
  const navigate = useNavigate();

  const {
    bgMain,
    bgCard,
    textPrimary,
    textSecondary,
    buttonPrimary,
    buttonPrimaryHover,
    buttonText,
  } = useThemeColors();

  const errorMessage =
    error instanceof AxiosError ? error.response?.data?.error?.message : error;

  return (
    <Box
      bg={bgMain}
      pt="6rem"
      minH="100vh"
      display="flex"
      alignItems="center"
      position="relative"
    >
      <Container maxW="container.md">
        <VStack gap={8} textAlign="center" position="relative">
          {/* Error Icon */}
          <Box
            bg={bgCard}
            p={6}
            borderRadius="full"
            border="2px solid"
            borderColor="red.400"
            position="relative"
          >
            <Icon as={AlertTriangle} boxSize={16} color="red.400" />
            <Box
              position="absolute"
              inset={-2}
              borderRadius="full"
              border="1px solid"
              borderColor="red.500"
              opacity={0.3}
              animation="pulse 2s infinite"
            />
          </Box>

          {/* Error Message */}
          <VStack gap={4}>
            <Heading color={textPrimary} size="xl">
              {title}
            </Heading>

            <Text color={textSecondary} fontSize="lg" maxW="md">
              {description}
            </Text>

            {/* Error Details */}
            {errorMessage && (
              <Box
                bg={bgCard}
                border="1px solid"
                borderColor="red.400"
                borderRadius="lg"
                p={4}
                maxW="md"
                w="full"
              >
                <Text color="red.300" fontSize="sm" fontFamily="mono">
                  {errorMessage}
                </Text>
              </Box>
            )}
          </VStack>

          {/* Buttons */}
          <VStack gap={4} w="full" maxW="sm">
            {onRetry && (
              <Button
                w="full"
                size="lg"
                bg={buttonPrimary}
                color={buttonText}
                _hover={{
                  bg: buttonPrimaryHover,
                  transform: "translateY(-2px)",
                }}
                transition="all 0.2s"
                onClick={onRetry}
              >
                <RefreshCw size={20} />
                Try Again
              </Button>
            )}

            <Button
              w="full"
              size="lg"
              bg={onRetry ? "transparent" : buttonPrimary}
              color={onRetry ? textPrimary : buttonText}
              _hover={{
                bg: onRetry ? bgCard : buttonPrimaryHover,
                transform: "translateY(-2px)",
              }}
              transition="all 0.2s"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={20} />
              Go Back
            </Button>
          </VStack>

          {/* Decorative Glows */}
          <Box
            position="absolute"
            top="30%"
            left="5%"
            w="150px"
            h="150px"
            bg="red.500"
            borderRadius="full"
            filter="blur(80px)"
            opacity={0.08}
          />

          <Box
            position="absolute"
            bottom="20%"
            right="5%"
            w="200px"
            h="200px"
            bg="yellow.400"
            borderRadius="full"
            filter="blur(100px)"
            opacity={0.06}
          />
        </VStack>
      </Container>
    </Box>
  );
};

export default ErrorHandler;
