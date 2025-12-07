import { colors } from '@/constants';
import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  description = "We encountered an unexpected error. Please try again or go back to the previous page."
}: ErrorHandlerProps) => {
  const navigate = useNavigate();
  console.log(error)

  const errorMessage = error instanceof AxiosError ? error.response?.data.error.message : error;

  return (
    <Box bg={colors.navy[900]}  pt={"6rem"} display="flex" alignItems="center">
      <Container maxW="container.md" >
        <VStack gap={8} textAlign="center">
          {/* Error Icon */}
          <Box
            bg={colors.navy[800]}
            p={6}
            borderRadius="full"
            border="2px solid"
            borderColor="red.500"
            position="relative"
          >
            <Icon 
              as={AlertTriangle} 
              boxSize={16} 
              color="red.400"
            />
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
            <Heading color="white" size="xl">
              {title}
            </Heading>
            <Text color={colors.navy[600]} fontSize="lg" maxW="md">
              {description}
            </Text>
            
            {/* Error Details */}
            {errorMessage && (
              <Box
                bg={colors.navy[800]}
                border="1px solid"
                borderColor="red.500"
                borderRadius="lg"
                p={4}
                maxW="md"
                w="full"
              >
                <Text color="red.400" fontSize="sm" fontFamily="mono">
                  {errorMessage}
                </Text>
              </Box>
            )}
          </VStack>

          {/* Action Buttons */}
          <VStack gap={4} w="full" maxW="sm">
            {onRetry && (
              <Button
                w="full"
                size="lg"
                bg="yellow.500"
                color={colors.navy[900]}
                _hover={{ bg: 'yellow.400', transform: 'translateY(-2px)' }}
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
              variant={onRetry ? "outline" : "solid"}
              bg={onRetry ? "transparent" : "yellow.500"}
              borderColor={colors.navy[700]}
              color={onRetry ? "white" : colors.navy[900]}
              _hover={{ 
                bg: onRetry ? colors.navy[800] : 'yellow.400',
                borderColor: 'yellow.500',
                transform: 'translateY(-2px)' 
              }}
              transition="all 0.2s"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={20} />
              Go Back
            </Button>
          </VStack>

          {/* Decorative elements */}
          <Box
            position="absolute"
            top="30%"
            left="5%"
            w="150px"
            h="150px"
            bg="red.500"
            borderRadius="full"
            filter="blur(80px)"
            opacity={0.1}
          />
          <Box
            position="absolute"
            bottom="30%"
            right="5%"
            w="200px"
            h="200px"
            bg="yellow.400"
            borderRadius="full"
            filter="blur(100px)"
            opacity={0.08}
          />
        </VStack>
      </Container>
    </Box>
  );
};

export default ErrorHandler;
