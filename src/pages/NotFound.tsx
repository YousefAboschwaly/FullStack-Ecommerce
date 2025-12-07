import { colors } from "@/constants";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack
} from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box bg={colors.navy[900]} w={"full"}  display="flex" alignItems="center">
      <Container maxW="container.md">
        <VStack gap={8} textAlign="center">
          {/* 404 Number with gradient */}
          <Box position="relative">
            <Text
              fontSize={{ base: "8rem", md: "12rem" }}
              fontWeight="bold"
              css={{
                background:
                  "linear-gradient(to right, var(--chakra-colors-yellow-400), var(--chakra-colors-yellow-600))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
              lineHeight="1"
              opacity={0.9}
            >
              404
            </Text>
           
          </Box>

          {/* Message */}
          <VStack gap={4}>
            <Heading color="white" size="xl">
              Page Not Found
            </Heading>
            <Text color={colors.navy[600]} fontSize="lg" maxW="md">
              Oops! The page you're looking for seems to have wandered off.
              Let's get you back on track.
            </Text>
          </VStack>

          {/* Action Buttons */}
          <VStack gap={4} w="full" maxW="sm">
            <Button
              w="full"
              size="lg"
              bg="yellow.500"
              color={colors.navy[900]}
              _hover={{ bg: "yellow.400", transform: "translateY(-2px)" }}
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
            top="20%"
            left="10%"
            w="200px"
            h="200px"
            bg="yellow.500"
            borderRadius="full"
            filter="blur(100px)"
            opacity={0.25}
          />
          <Box
            position="absolute"
            bottom="-20%"
            right="5%"
            w="300px"
            h="300px"
            bg="yellow.400"
            borderRadius="full"
            filter="blur(120px)"
            opacity={0.25}
          />
        </VStack>
      </Container>
    </Box>
  );
};

export default NotFound;
