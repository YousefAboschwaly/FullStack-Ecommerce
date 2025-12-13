import { addToCart, removeFromCart, selectCart } from "@/app/services/cartSlice";
import type { RootState } from "@/app/store";
import { useThemeColors } from "@/hooks/useThemeColors";
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
import {  Eye, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useColorMode } from "./color-mode";

interface IProps {
  product: IProduct;
}

const apiUrl = import.meta.env.VITE_API_URL || "";

export default function ProductCard({ product }: IProps) {
  const { title, description, price, thumbnail, stock, category } = product;

  const {
    bgCardTranslucent,
    bgOverlay,
    textPrimary,
    textMuted,
    borderDefault,
    borderHover,
    accentPrimary,
    accentSecondary,
    buttonText,
    shadowCard,
    shadowButton,
    gradientCardBg,
    gradientButton,
    gradientPrice,
    statusError,
  } = useThemeColors();
  
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state: RootState) => selectCart(state));

  const isInCart = cartProducts.some((item) => item.id === product.id);

  function handleCartToggle() {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  }

  return (
    <Card.Root
      overflow="hidden"
      bg={bgCardTranslucent}
      borderRadius="2xl"
      border="1px solid"
      borderColor={borderDefault}
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: shadowCard,
        borderColor: borderHover,
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
          bg={bgOverlay}
          color={accentSecondary}
          _hover={{
            bg: accentPrimary,
            color: buttonText,
          }}
        >
          <Icon as={Heart} boxSize={4} />
        </IconButton>
        <IconButton
          aria-label="Quick view"
          size="sm"
          rounded="full"
          bg={bgOverlay}
          color={accentSecondary}
          _hover={{
            bg: accentPrimary,
            color: buttonText,
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
          color={accentSecondary}
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
      <Box position="relative" pt={8} pb={4} px={6} bg={gradientCardBg}>
        {thumbnail?.url ? (
          <Image
            src={`${apiUrl}${thumbnail.url.startsWith("/") ? "" : "/"}${thumbnail.url}`}
            alt={title}
            boxSize="180px"
            mx="auto"
            objectFit="contain"
            transition="transform 0.3s ease"
            _groupHover={{ transform: "scale(1.05)" }}
          />
        ) : (
          <Box
            boxSize="180px"
            mx="auto"
            bg="gray.200"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="gray.500">No image</Text>
          </Box>
        )}
      </Box>

      <Card.Body px={5} pb={5} pt={3}>
        {/* Title */}
        <Text
          fontSize="lg"
          fontWeight="bold"
          color={textPrimary}
          lineClamp={1}
          mb={1}
        >
          {title}
        </Text>

        {/* Description */}
        <Text fontSize="sm" color={textMuted} lineClamp={2} minH="40px" mb={3}>
          {description}
        </Text>

        {/* Price & Stock */}
        <Flex justify="space-between" align="center" mb={4}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            css={{
              background: gradientPrice,
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
            bg={isInCart ? statusError : gradientButton}
            color={buttonText}
            fontWeight="semibold"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: shadowButton,
              opacity: 0.9,
            }}
            transition="all 0.2s ease"
            onClick={handleCartToggle}
          >
            {isInCart ? (
              <>
                <Icon as={Trash2} boxSize={4} mr={1} />
                Remove
              </>
            ) : (
              <>
                <Icon as={ShoppingCart} boxSize={4} mr={1} />
                Add to Cart
              </>
            )}
          </Button>
          <Button
            asChild
            variant="outline"
            borderColor={accentSecondary}
            color={accentSecondary}
            _hover={{
              bg: bgCardTranslucent,
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
