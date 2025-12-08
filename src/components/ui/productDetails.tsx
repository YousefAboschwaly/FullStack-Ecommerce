// ProductDetails.tsx - Chakra UI 3.x version with proper theming
import useProduct from "@/hooks/useProduct";
import useThemeColors from "@/hooks/useThemeColors";
import type { IProduct } from "@/interfaces";
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
  VStack
} from "@chakra-ui/react";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Shield,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorHandler from "./ErrorHandler";
import ProductDetailsSkeleton from "./productDetailsSkeleton";

const baseUrl = import.meta.env.VITE_API_URL || "";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useProduct(id ?? "");
  const [quantity, setQuantity] = useState(1);
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
    buttonPrimaryHover,
    buttonText,
    badgeCategoryBg,
    badgeCategoryText,
    badgeCategoryBorder,
    statusError,
  } = useThemeColors();
  const navigate = useNavigate();

  if (isLoading) return <ProductDetailsSkeleton />;
  if (error || !data) return <ErrorHandler error={"Failed to Fetch Product of this Id "} />;
  const product: IProduct = data as IProduct;

  const imageUrl = `${baseUrl}${product.thumbnail.url}`;

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
                alt={product.title}
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
                  transform: 'translateY(-1px)', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.12)' 
                }}
                transition="all 0.2s ease"
                cursor="pointer"
              >
                {product.category.title}
              </Badge>

              <Heading color={textPrimary} size="2xl">
                {product.title}
              </Heading>

              <HStack gap={4}>
                <Text fontSize="4xl" fontWeight="bold" color={accentSecondary}>
                  ${product.price}
                </Text>
                <Badge
                  bg={product.stock > 0 ? "hsl(142, 76%, 90%)" : "hsl(0, 84%, 92%)"}
                  color={product.stock > 0 ? "hsl(142, 76%, 30%)" : "hsl(0, 84%, 40%)"}
                  px={3}
                  py={1}
                  borderRadius="md"
                  fontWeight="medium"
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </Badge>
              </HStack>

              <Text color={textSecondary} fontSize="lg">
                {product.description}
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
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
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
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                  >
                    <Plus size={16} />
                  </IconButton>
                </HStack>
              </HStack>

              {/* Action Buttons */}
              <HStack w="full" gap={4}>
                <Button
                  flex={1}
                  size="lg"
                  bg={buttonPrimary}
                  color={buttonText}
                  _hover={{ bg: buttonPrimaryHover }}
                >
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
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
