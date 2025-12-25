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
import { ShoppingCart, Heart, Eye, Plus, Minus, Trash2 } from "lucide-react";
import { useThemeColors } from "@/hooks/useThemeColors";
import type { IProduct } from "@/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { searchItemInCart } from "@/utils";
import type { RootState } from "@/app/store";
import {
  addToCart,
  deleteSelected,
  removeFromCart,
  selectCart,
} from "@/app/services/cartSlice";

interface ProductCardProps {
  product: IProduct;
}
const apiUrl = import.meta.env.VITE_API_URL || "";

export default function ProductCard({ product }: ProductCardProps) {
  const { title, description, price, stock, thumbnail, category } = product;
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state: RootState) => selectCart(state));

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

  // Get current item from cart
  const cartItem = searchItemInCart(cartProducts, product.id);
  const quantityInCart = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleDeleteFromCart = () => {
    dispatch(deleteSelected(product.id));
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
      {/* Image Container */}
      <Box position="relative" overflow="hidden" bg={bgMuted}>
        <Box
          as="div"
          position="relative"
          paddingBottom="100%"
          overflow="hidden"
        >
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
            _hover={{ bg: buttonPrimary, color: buttonText }}
          >
            <Icon as={Heart} boxSize={4} />
          </Button>
          <Button
            size="sm"
            borderRadius="full"
            bg={bgOverlay}
            color={accentPrimary}
            boxShadow={shadowSoft}
            _hover={{ bg: buttonPrimary, color: buttonText }}
          >
            <Icon as={Eye} boxSize={4} />
          </Button>
        </Flex>

        {/* Status Badges */}
        <Flex position="absolute" left={3} top={3} direction="column" gap={2}>
          {category && (
            <Badge
              bg={bgOverlay}
              color={textPrimary}
              px={3}
              py={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="medium"
            >
              {category.title}
            </Badge>
          )}
          {isOutOfStock && (
            <Badge
              colorPalette="red"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="xs"
            >
              Out of Stock
            </Badge>
          )}
          {isLowStock && !isOutOfStock && (
            <Badge
              colorPalette="orange"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="xs"
            >
              Low Stock
            </Badge>
          )}
        </Flex>

        {/* Cart Badge */}
        {quantityInCart > 0 && (
          <Badge
            position="absolute"
            bottom={3}
            right={3}
            bg={accentPrimary}
            color={buttonText}
            px={3}
            py={1}
            borderRadius="full"
            fontSize="xs"
            fontWeight="bold"
          >
            {quantityInCart} in cart
          </Badge>
        )}
      </Box>

      {/* Content */}
      <Card.Body p={4}>
        <VStack gap={3} align="stretch">
          <Text
            fontWeight="semibold"
            color={textPrimary}
            lineClamp={1}
            transition="color 0.2s"
            _groupHover={{ color: accentPrimary }}
          >
            {title}
          </Text>

          <Text
            fontSize="sm"
            color={textMuted}
            lineClamp={1}
            lineHeight="relaxed"
          >
            {description}
          </Text>

          <HStack justify="space-between" pt={2}>
            <VStack gap={0} align="start">
              <Text fontSize="xl" fontWeight="bold" color={accentPrimary}>
                ${price.toFixed(2)}
              </Text>
              <Text fontSize="xs" color={textMuted}>
                {stock} in stock
              </Text>
            </VStack>

            {/* Cart Actions */}
            {quantityInCart > 0 ? (
              <HStack gap={1}>
                <Button
                  size="sm"
                  borderRadius="full"
                  variant="outline"
                  borderColor={borderDefault}
                  onClick={handleRemoveFromCart}
                  p={0}
                  minW="32px"
                  h="32px"
                >
                  <Icon as={Minus} boxSize={4} />
                </Button>
                <Text fontWeight="semibold" minW="24px" textAlign="center">
                  {quantityInCart}
                </Text>
                <Button
                  size="sm"
                  borderRadius="full"
                  bg={buttonPrimary}
                  color={buttonText}
                  onClick={handleAddToCart}
                  disabled={quantityInCart >= stock}
                  p={0}
                  minW="32px"
                  h="32px"
                  _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
                >
                  <Icon as={Plus} boxSize={4} />
                </Button>
                <Button
                  size="sm"
                  borderRadius="full"
                  variant="ghost"
                  color="red.500"
                  onClick={handleDeleteFromCart}
                  p={0}
                  minW="32px"
                  h="32px"
                  _hover={{ bg: "red.50" }}
                >
                  <Icon as={Trash2} boxSize={4} />
                </Button>
              </HStack>
            ) : (
              <Button
                size="sm"
                bg={buttonPrimary}
                color={buttonText}
                borderRadius="full"
                px={4}
                boxShadow={shadowSoft}
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                _hover={{ opacity: 0.9, boxShadow: shadowCard }}
                _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
              >
                <Icon as={ShoppingCart} boxSize={4} mr={2} />
                Add
              </Button>
            )}
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
