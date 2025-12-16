import {
  addToCart,
  deleteSelected,
  selectCart,
} from "@/app/services/cartSlice";
import type { RootState } from "@/app/store";
import { useThemeColors } from "@/hooks/useThemeColors";
import type { IProduct } from "@/interfaces";
import { isItemInCart } from "@/utils";
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
import { Eye, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface IProps {
  product: IProduct;
}

const apiUrl = import.meta.env.VITE_API_URL || "";

export default function ProductCard({ product }: IProps) {
  const { id, title, description, price, thumbnail, stock, category } = product;

  const {
    bgCardTranslucent,
    bgOverlay,
    bgCard,
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

  
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state: RootState) => selectCart(state));

  const isInCart = isItemInCart(cartProducts, id);

  function handleCartToggle() {
    if (isInCart) {
      dispatch(deleteSelected(product.id));
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
        hidden
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

      </Flex>

      {/* Category Badge - Ribbon style at top-left corner */}
      {category && (
        <Box
          position="absolute"
          top={0}
          left={"-10px"}
          zIndex={10}
          overflow="hidden"
          w="180px"
          h="300px"
          pointerEvents="none"

        >
          <Badge
          as={"div"}
            position="absolute"
            top="35px"
            left="-35px"
            w="180px"
            transform="rotate(-45deg)"
            bg={accentPrimary}
            color={buttonText}
            py={1.5}
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wide"
            boxShadow="0 3px 10px rgba(0,0,0,0.2)"
          >
           <Box as={"span"} mx={"auto"} > {category.title} </Box>
          </Badge>
        </Box>
      )}

      {/* Image Container */}
      <Box
        position="relative"
        px={8}
        pt={6}
        pb={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg={gradientCardBg}
        minH="280px"
      >
        {thumbnail?.url ? (
          <Image
            src={`${apiUrl}${thumbnail.url.startsWith("/") ? "" : "/"}${thumbnail.url}`}
            alt={title}
            w={"full"}
            objectFit="contain"
            borderRadius="lg"
            transition="transform 0.3s ease"
            _groupHover={{ transform: "scale(1.05)" }}
          />
        ) : (
          <Box
            boxSize="250px"
            bg={bgCard}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="lg"
          >
            <Text color={textMuted}>No image</Text>
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
