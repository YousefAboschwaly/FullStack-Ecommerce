// ProductDetails.tsx - Chakra UI 3.x version with proper theming
import useProduct from "@/hooks/useProduct";
import useThemeColors from "@/hooks/useThemeColors";
import type { ICartItem, IProduct } from "@/interfaces";
import {
  Badge,
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Shield,
  ShoppingCart,
  Trash2,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorHandler from "./ErrorHandler";
import ProductDetailsSkeleton from "./productDetailsSkeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteSelected,
  removeFromCart,
  selectCart,
} from "@/app/services/cartSlice";
import { isItemInCart, searchItemInCart } from "@/utils";

const baseUrl = import.meta.env.VITE_API_URL || "";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useProduct(id ?? "");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const {
    bgMain,
    bgCard,
    bgCardHover,
    textPrimary,
    textSecondary,
    textMuted,
    borderDefault,
    accentPrimary,
    accentSecondary,
    buttonPrimary,
    buttonText,
    badgeCategoryBg,
    badgeCategoryText,
    badgeCategoryBorder,
    statusError,
  } = useThemeColors();
  const navigate = useNavigate();

  const { cartProducts } = useSelector(selectCart);
  const dispatch = useDispatch();

  if (isLoading) return <ProductDetailsSkeleton />;
  if (error || !data)
    return <ErrorHandler error={"Failed to Fetch Product of this Id "} />;
  const product: IProduct = data as IProduct;
  const {
    id: productId,
    category,
    description,
    title,
    price,
    stock,
    thumbnail,
  } = product;
  const imageUrl = `${baseUrl}${thumbnail.url}`;

  const isInCart = isItemInCart(cartProducts, productId);
  const searchedItem: ICartItem | undefined = searchItemInCart(
    cartProducts,
    productId
  );
  const quantity = searchedItem ? searchedItem.quantity : 1;
  const handleCartToggle = () => {
    if (isInCart) {
      dispatch(deleteSelected(productId));
    } else {
      dispatch(addToCart(product));
    }
  };
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(productId));
  };

  return (
    <Box bg={bgMain}>
      <Box>
        <Box mb={6}>
          <Button
            variant="ghost"
            color={textPrimary}
            _hover={{ bg: bgCardHover, color: accentSecondary }}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
            Back
          </Button>
        </Box>
        <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={12}>
          {/* Image Section */}
          <GridItem>
            <Box
              bg={bgCard}
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderDefault}
              p={8}
              position="relative"
            >
              <IconButton
                aria-label="Add to wishlist"
                position="absolute"
                top={4}
                right={4}
                variant="ghost"
                color={isWishlisted ? statusError : textMuted}
                _hover={{ color: isWishlisted ? statusError : accentSecondary }}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart fill={isWishlisted ? "currentColor" : "none"} />
              </IconButton>
              <Image
                src={imageUrl}
                alt={title}
                w="full"
                h="400px"
                objectFit="contain"
              />
            </Box>
          </GridItem>

          {/* Details Section */}
          <GridItem>
            <VStack align="start" gap={6}>
              {/* Beautiful Category Badge */}
              <Badge
                bg={badgeCategoryBg}
                color={badgeCategoryText}
                border="1px solid"
                borderColor={badgeCategoryBorder}
                fontSize="14px"
                px={4}
                py={1.5}
                borderRadius="full"
                fontWeight="semibold"
                textTransform="capitalize"
                boxShadow="0 2px 8px rgba(0,0,0,0.08)"
                _hover={{
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                }}
                transition="all 0.2s ease"
                cursor="pointer"
              >
                {category.title}
              </Badge>

              <Heading color={textPrimary} size="2xl">
                {title}
              </Heading>

              <HStack gap={4}>
                <Text fontSize="4xl" fontWeight="bold" color={accentSecondary}>
                  ${price}
                </Text>
                <Badge
                  bg={stock > 0 ? "hsl(142, 76%, 90%)" : "hsl(0, 84%, 92%)"}
                  color={stock > 0 ? "hsl(142, 76%, 30%)" : "hsl(0, 84%, 40%)"}
                  px={3}
                  py={1}
                  borderRadius="md"
                  fontWeight="medium"
                >
                  {stock > 0 ? `${stock} in stock` : "Out of stock"}
                </Badge>
              </HStack>

              <Text color={textSecondary} fontSize="lg">
                {description}
              </Text>

              {/* Quantity Selector */}
              <HStack>
                <Text color={textMuted}>Quantity:</Text>
                <HStack
                  bg={bgCard}
                  borderRadius="lg"
                  border="1px"
                  borderColor={borderDefault}
                >
                  <IconButton
                    aria-label="Decrease"
                    variant="ghost"
                    color={textPrimary}
                    _hover={{ bg: bgCardHover }}
                    onClick={handleRemoveFromCart}
                  >
                    <Minus size={16} />
                  </IconButton>
                  <Text color={textPrimary} px={4} fontWeight="semibold">
                    {quantity}
                  </Text>
                  <IconButton
                    aria-label="Increase"
                    variant="ghost"
                    color={textPrimary}
                    _hover={{ bg: bgCardHover }}
                    onClick={handleAddToCart}
                  >
                    <Plus size={16} />
                  </IconButton>
                </HStack>
              </HStack>

              {/* Action Buttons */}

              <HStack w="full" gap={4}>
                <Button
                  flex={1}
                  bg={isInCart ? statusError : buttonPrimary}
                  color={buttonText}
                  fontWeight="semibold"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
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
                  flex={1}
                  size="lg"
                  variant="outline"
                  borderColor={buttonPrimary}
                  color={buttonPrimary}
                  _hover={{ bg: buttonPrimary, color: buttonText }}
                >
                  Buy Now
                </Button>
              </HStack>

              {/* Features */}
              <Grid templateColumns="repeat(3, 1fr)" gap={4} w="full" pt={6}>
                <VStack
                  bg={bgCard}
                  p={4}
                  borderRadius="lg"
                  border="1px"
                  borderColor={borderDefault}
                  _hover={{ borderColor: accentPrimary }}
                  transition="all 0.2s"
                >
                  <Icon as={Truck} color={accentPrimary} boxSize={6} />
                  <Text color={textPrimary} fontSize="sm" textAlign="center">
                    Free Shipping
                  </Text>
                </VStack>
                <VStack
                  bg={bgCard}
                  p={4}
                  borderRadius="lg"
                  border="1px"
                  borderColor={borderDefault}
                  _hover={{ borderColor: accentPrimary }}
                  transition="all 0.2s"
                >
                  <Icon as={Shield} color={accentPrimary} boxSize={6} />
                  <Text color={textPrimary} fontSize="sm" textAlign="center">
                    2 Year Warranty
                  </Text>
                </VStack>
                <VStack
                  bg={bgCard}
                  p={4}
                  borderRadius="lg"
                  border="1px"
                  borderColor={borderDefault}
                  _hover={{ borderColor: accentPrimary }}
                  transition="all 0.2s"
                >
                  <Icon as={RotateCcw} color={accentPrimary} boxSize={6} />
                  <Text color={textPrimary} fontSize="sm" textAlign="center">
                    30 Day Returns
                  </Text>
                </VStack>
              </Grid>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductDetails;
