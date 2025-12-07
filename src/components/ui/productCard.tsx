// ProductCard.tsx
import type { IProduct } from "@/interfaces";
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Icon,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useColorMode } from "./color-mode";

interface IProps {
  product: IProduct;
}

const apiUrl = import.meta.env.VITE_API_URL || "";

export default function ProductCard({ product }: IProps) {
  const { colorMode } = useColorMode();
  const { title, description, price, thumbnail, stock, category } = product;
  const isDark = colorMode === "dark";

  return (
    <Card.Root
      overflow="hidden"
      bg={isDark ? "rgba(26, 32, 44, 0.8)" : "white"}
      borderRadius="2xl"
      border="1px solid"
      borderColor={isDark ? "rgba(212, 175, 55, 0.2)" : "gray.200"}
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: isDark
          ? "0 20px 40px rgba(212, 175, 55, 0.15)"
          : "0 20px 40px rgba(0, 0, 0, 0.1)",
        borderColor: isDark ? "rgba(212, 175, 55, 0.4)" : "purple.300",
      }}
      position="relative"
      role="group"
    >
      {/* Quick Actions Overlay */}
      <Flex
        position="absolute"
        top={4}
        right={4}
        zIndex={10}
        gap={2}
        opacity={0}
        transform="translateX(10px)"
        transition="all 0.3s ease"
        _groupHover={{ opacity: 1, transform: "translateX(0)" }}
      >
        <IconButton
          aria-label="Add to wishlist"
          size="sm"
          rounded="full"
          bg={isDark ? "rgba(26, 32, 44, 0.9)" : "white"}
          color={isDark ? "#D4AF37" : "gray.600"}
          _hover={{
            bg: "#D4AF37",
            color: isDark ? "#0F1419" : "white",
          }}
        >
          <Icon as={Heart} boxSize={4} />
        </IconButton>
        <IconButton
          aria-label="Quick view"
          size="sm"
          rounded="full"
          bg={isDark ? "rgba(26, 32, 44, 0.9)" : "white"}
          color={isDark ? "#D4AF37" : "gray.600"}
          _hover={{
            bg: "#D4AF37",
            color: isDark ? "#0F1419" : "white",
          }}
        >
          <Icon as={Eye} boxSize={4} />
        </IconButton>
      </Flex>

      {/* Category Badge */}
      {category && (
        <Badge
          position="absolute"
          top={4}
          left={4}
          bg={isDark ? "rgba(212, 175, 55, 0.2)" : "purple.100"}
          color={isDark ? "#D4AF37" : "purple.700"}
          px={3}
          py={1}
          borderRadius="full"
          fontSize="xs"
          fontWeight="semibold"
          textTransform="capitalize"
        >
          {category.title}
        </Badge>
      )}

      {/* Image Container */}
      <Box
        position="relative"
        pt={8}
        pb={4}
        px={6}
        bg={
          isDark
            ? "linear-gradient(180deg, rgba(212, 175, 55, 0.05) 0%, transparent 100%)"
            : "linear-gradient(180deg, rgba(128, 90, 213, 0.05) 0%, transparent 100%)"
        }
      >
        <Image
          src={`${apiUrl}${thumbnail.url.startsWith("/") ? "" : "/"}${
            thumbnail.url
          }`}
          alt={title}
          boxSize="180px"
          mx="auto"
          objectFit="contain"
          transition="transform 0.3s ease"
          _groupHover={{ transform: "scale(1.05)" }}
        />
      </Box>

      <Card.Body px={5} pb={5} pt={3}>
        {/* Title */}
        <Text
          fontSize="lg"
          fontWeight="bold"
          color={isDark ? "white" : "gray.800"}
          lineClamp={1}
          mb={1}
        >
          {title}
        </Text>

        {/* Description */}
        <Text
          fontSize="sm"
          color={isDark ? "gray.400" : "gray.600"}
          lineClamp={2}
          minH="40px"
          mb={3}
        >
          {description}
        </Text>

        {/* Price & Stock */}
        <Flex justify="space-between" align="center" mb={4}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            css={{
              background: isDark
                ? "linear-gradient(to right, #D4AF37, #F4E4A6)"
                : "linear-gradient(to right, var(--chakra-colors-purple-500), var(--chakra-colors-purple-700))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            ${price}
          </Text>
          <Badge
            colorScheme={stock > 0 ? "green" : "red"}
            variant="subtle"
            px={2}
            py={1}
            borderRadius="md"
            fontSize="xs"
          >
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </Badge>
        </Flex>

        {/* Action Buttons */}
        <Flex gap={2}>
          <Button
            flex={1}
            bg={
              isDark
                ? "linear-gradient(135deg, #D4AF37 0%, #B8962E 100%)"
                : "linear-gradient(135deg, #805AD5 0%, #6B46C1 100%)"
            }
            color={isDark ? "#0F1419" : "white"}
            fontWeight="semibold"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: isDark
                ? "0 4px 20px rgba(212, 175, 55, 0.4)"
                : "0 4px 20px rgba(128, 90, 213, 0.4)",
            }}
            transition="all 0.2s ease"
          >
            <Icon as={ShoppingCart} boxSize={4} />
            Add to Cart
          </Button>
          <Button
            asChild
            variant="outline"
            borderColor={isDark ? "#D4AF37" : "purple.500"}
            color={isDark ? "#D4AF37" : "purple.600"}
            _hover={{
              bg: isDark ? "rgba(212, 175, 55, 0.1)" : "purple.50",
            }}
            px={4}
          >
            <Link to={`/product/${product.documentId}`}>
              <Icon as={Eye} boxSize={4} />
            </Link>
          </Button>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}
