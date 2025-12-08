import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useThemeColors from "@/hooks/useThemeColors";

const NotFound = () => {
  const navigate = useNavigate();
  const {
    bgMain,
    textPrimary,
    textSecondary,
    buttonPrimary,
    buttonPrimaryHover,
    buttonText,
    gradientLogo,
  } = useThemeColors();

  return (
    <Box
      bg={bgMain}
      w="full"
      pt={16}
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      px={4}
    >
      <Container maxW="container.md">
        <VStack gap={8} textAlign="center" position="relative">
          {/* 404 Number */}
          <Box>
            <Text
              fontSize={{ base: "8rem", md: "12rem" }}
              fontWeight="bold"
              css={{
                background: gradientLogo,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
              opacity={0.9}
              lineHeight={1}
            >
              404
            </Text>
          </Box>

          {/* Message */}
          <VStack gap={4}>
            <Heading color={textPrimary} size="xl">
              Page Not Found
            </Heading>
            <Text color={textSecondary} fontSize="lg" maxW="md">
              Oops! The page you're looking for seems to have wandered off.
              Let's get you back on track.
            </Text>
          </VStack>

          {/* Buttons */}
          <VStack gap={4} w="full" maxW="sm">
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
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={20} />
              Go Back
            </Button>
          </VStack>

          {/* Decorative Glows */}
          <Box
            position="absolute"
            top="20%"
            left="10%"
            w="200px"
            h="200px"
            bg={buttonPrimary}
            borderRadius="full"
            filter="blur(100px)"
            opacity={0.15}
          />
          <Box
            position="absolute"
            bottom="0%"
            right="5%"
            w="300px"
            h="300px"
            bg={buttonPrimaryHover}
            borderRadius="full"
            filter="blur(120px)"
            opacity={0.15}
          />
        </VStack>
      </Container>
    </Box>
  );
};

export default NotFound;
