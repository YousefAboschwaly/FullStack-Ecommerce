import {
  Box,
  Card,
  Image,
  Text,
  Button,
  Badge,
  HStack,
  VStack,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { ShoppingCart, Heart, Eye, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useThemeColors } from "@/hooks/useThemeColors";
import type { IProduct } from "@/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { searchItemInCart } from "@/utils";
import {
  addToCart,
  deleteSelected,
  selectCart,
} from "@/app/services/cartSlice";
import type { RootState } from "@/app/store";
import { useState } from "react";

interface ProductCardProps {
  product: IProduct;
}

const apiUrl = import.meta.env.VITE_API_URL || "";

export default function ProductCard({ product }: ProductCardProps) {
  const { title, description, price, stock, thumbnail, category, documentId } =
    product;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartProducts } = useSelector((state: RootState) =>
    selectCart(state)
  );

  const {
    bgCard,
    textPrimary,
    textMuted,
    borderDefault,
    borderHover,
    accentPrimary,
    buttonPrimary,
    buttonText,
    shadowCard,
    shadowSoft,
    bgMuted,
    bgOverlay,
  } = useThemeColors();

  const isLowStock = stock < 10;
  const isOutOfStock = stock === 0;

  const cartItem = searchItemInCart(cartProducts, product.id);
  const quantityInCart = cartItem?.quantity || 0;
  const isInCart = quantityInCart > 0;

  // 🔥 animation state
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCartToggle = () => {
    if (isOutOfStock) return;

    setIsAnimating(true);

    setTimeout(() => {
      if (isInCart) {
        dispatch(deleteSelected(product.id));
      } else {
        dispatch(addToCart(product));
      }
      setIsAnimating(false);
    }, 350);
  };

  const handleViewProduct = () => {
    navigate(`/product/${documentId}`);
  };

  return (
    <Card.Root
      overflow="hidden"
      bg={bgCard}
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
      className="group"
    >
      {/* Image */}
      <Box position="relative" overflow="hidden" bg={bgMuted}>
        <Box position="relative" paddingBottom="100%">
          <Image
            src={
              thumbnail?.url
                ? apiUrl + thumbnail.url
                : "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=400"
            }
            alt={title}
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            objectFit="cover"
            transition="transform 0.5s ease"
            _groupHover={{ transform: "scale(1.1)" }}
          />
        </Box>

        {/* Hover Actions */}
        <Flex
          position="absolute"
          right={3}
          top={3}
          direction="column"
          gap={2}
          opacity={0}
          transform="translateX(10px)"
          transition="all 0.3s ease"
          _groupHover={{ opacity: 1, transform: "translateX(0)" }}
        >
          <Button
            size="sm"
            borderRadius="full"
            bg={bgOverlay}
            color={accentPrimary}
            boxShadow={shadowSoft}
          >
            <Icon as={Heart} boxSize={4} />
          </Button>

          <Button
            size="sm"
            borderRadius="full"
            bg={bgOverlay}
            color={accentPrimary}
            boxShadow={shadowSoft}
            onClick={handleViewProduct}
          >
            <Icon as={Eye} boxSize={4} />
          </Button>
        </Flex>

        {/* Badges */}
        <Flex position="absolute" left={3} top={3} direction="column" gap={2}>
          {category && (
            <Badge bg={bgOverlay} color={textPrimary} px={3} py={1}>
              {category.title}
            </Badge>
          )}
          {isOutOfStock && (
            <Badge colorPalette="red">Out of Stock</Badge>
          )}
          {isLowStock && !isOutOfStock && (
            <Badge colorPalette="orange">Low Stock</Badge>
          )}
        </Flex>
      </Box>

      {/* Content */}
      <Card.Body p={4}>
        <VStack align="stretch" gap={3}>
          <Text fontWeight="semibold" color={textPrimary}>
            {title}
          </Text>

          <Text fontSize="sm" color={textMuted} maxLines={1}>
            {description}
          </Text>

          <HStack
            justify="space-between"
            pt={2}
            borderTop="1px solid"
            borderColor={borderDefault}
          >
            <VStack align="start" gap={0}>
              <Text fontSize="xl" fontWeight="bold" color={accentPrimary}>
                ${price.toFixed(2)}
              </Text>
              <Text fontSize="xs" color={textMuted}>
                {stock} in stock
              </Text>
            </VStack>

            {/* 🛒 Animated Add To Cart */}
            <Button
              size="sm"
              borderRadius="full"
              bg={isInCart ? accentPrimary : buttonPrimary}
              color={buttonText}
              onClick={handleCartToggle}
              disabled={isOutOfStock}
              position="relative"
              overflow="hidden"
              transition="all 0.3s ease"
            >
              <Flex align="center" gap={2}>
                <Box
                  transition="all 0.35s cubic-bezier(0.4,0,0.2,1)"
                  transform={
                    isAnimating
                      ? "translateX(16px)"
                      : "translateX(0)"
                  }
                  color={isAnimating ? "green.400" : buttonText}
                >
                  <Icon
                    as={
                      isInCart || isAnimating
                        ? Check
                        : ShoppingCart
                    }
                    boxSize={4}
                  />
                </Box>

                <Text
                  transition="opacity 0.25s ease"
                  opacity={isAnimating ? 0 : 1}
                >
                  {isInCart ? "Added" : "Add"}
                </Text>
              </Flex>
            </Button>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
