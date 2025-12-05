import { Button, Card, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";

export default function ProductCard() {
  const { colorMode } = useColorMode();
  console.log(colorMode);
  return (
    <Card.Root
      maxW="sm"
      overflow="hidden"
      border={"1px solid #a8b5c8"}
      bg={"none"}
      pt={"24px"}
    >
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
        boxSize={"200px"}
        rounded={"full"}
        mx={"auto"}
        objectFit={"cover"}
      />
      <Card.Body mt={6} gap={3} textAlign={"center"}>
        <Card.Title
          fontSize={"xl"}
          fontWeight={"revert"}
          color={"white"}
          mb={2}
        >
          Living room Sofa
        </Card.Title>
        <Card.Description fontSize={"md"} color={"white"}>
          This sofa is perfect for modern tropical spaces, baroque inspired
          spaces.This sofa is perfect for modern tropical spaces, baroque
          inspired spaces.
        </Card.Description>
        <Text fontSize={"3xl"} color={"purple.600"} mt="2">
          $450
        </Text>
        <Button
          asChild
          bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
          color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
          size={"xl"}
          variant="outline"
          border={"none"}
          py={5}
          overflow={"hidden"}
          w={"full"}
          _hover={{
            bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
            color: colorMode === "light" ? "white" : "#9f7aea",
            border: "transparent",
          }}
          mt={6}
        >
          <Link  to={"/products/1"}>View Details</Link>
        </Button>
      </Card.Body>
    </Card.Root>
  );
}
