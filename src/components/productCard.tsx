import { Button, Card, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import type { IProduct } from "@/interfaces";
interface IProps{
  product:IProduct
}
const apiUrl = import.meta.env.VITE_API_URL;
export default function ProductCard({product}:IProps) {
  const { colorMode } = useColorMode();
  const {title,description,price,thumbnail} = product
  return (
    <Card.Root
      overflow="hidden"
      border={"1px solid #a8b5c8"}
      bg={"none"}
      pt={"24px"}
    >
      <Image
        src={apiUrl+thumbnail.url}
        alt={title}
        boxSize={"200px"}
        rounded={"full"}
        mx={"auto"}
        objectFit={"cover"}
      />
      <Card.Body gap={1} textAlign={"center"}>
        <Card.Title
          fontSize={"xl"}
          fontWeight={"revert"}
          color={"white"}
          autoCapitalize="words"
        >
         {title}
        </Card.Title>
        <Card.Description fontSize={"sm"} color={"white"}>
          {description}
        </Card.Description>
        <Text fontSize={"3xl"} color={"purple.600"} mt="2">
          ${price}
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
          mt={2}
        >
          <Link  to={"/products/1"}>View Details</Link>
        </Button>
      </Card.Body>
    </Card.Root>
  );
}
