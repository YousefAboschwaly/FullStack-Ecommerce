// ProductDetails.tsx - Chakra UI 3.x version
import useProduct from "@/hooks/useProduct";
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
import ProductDetailsSkeleton from "./productDetailsSkeleton";
import { colors } from "@/constants";

const baseUrl = import.meta.env.VITE_API_URL || "";


const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useProduct(id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return <ProductDetailsSkeleton />;
  
  const product: IProduct = data as IProduct;

  const imageUrl = `${baseUrl}${product.thumbnail.url}`;

  return (
    <Box bg={colors.navy[900]}>
      <Box>
        <Box mb={6}>
          <Button
            variant="ghost"
            color="white"
            _hover={{ bg: colors.navy[800], color: "yellow.400" }}
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
              bg={colors.navy[800]}
              borderRadius="2xl"
              p={8}
              position="relative"
            >
              <IconButton
                aria-label="Add to wishlist"
                position="absolute"
                top={4}
                right={4}
                variant="ghost"
                color={isWishlisted ? "red.500" : colors.navy[600]}
                _hover={{ color: isWishlisted ? "red.400" : "yellow.400" }}
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
              <Badge colorScheme="yellow" px={3} py={1} borderRadius="full">
                {product.category.title}
              </Badge>

              <Heading color="white" size="2xl">
                {product.title}
              </Heading>

              <HStack gap={4}>
                <Text fontSize="4xl" fontWeight="bold" color="yellow.400">
                  ${product.price}
                </Text>
                <Badge colorScheme={product.stock > 0 ? "green" : "red"}>
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </Badge>
              </HStack>

              <Text color={colors.navy[600]} fontSize="lg">
                {product.description}
              </Text>

              {/* Quantity Selector */}
              <HStack>
                <Text color={colors.navy[600]}>Quantity:</Text>
                <HStack
                  bg={colors.navy[800]}
                  borderRadius="lg"
                  border="1px"
                  borderColor={colors.navy[700]}
                >
                  <IconButton
                    aria-label="Decrease"
                    variant="ghost"
                    color="white"
                    _hover={{ bg: colors.navy[700] }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus size={16} />
                  </IconButton>
                  <Text color="white" px={4} fontWeight="semibold">
                    {quantity}
                  </Text>
                  <IconButton
                    aria-label="Increase"
                    variant="ghost"
                    color="white"
                    _hover={{ bg: colors.navy[700] }}
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
                  bg="yellow.500"
                  color={colors.navy[900]}
                  _hover={{ bg: "yellow.400" }}
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
                  borderColor="yellow.500"
                  color="yellow.500"
                  _hover={{ bg: "yellow.500", color: colors.navy[900] }}
                >
                  Buy Now
                </Button>
              </HStack>

              {/* Features */}
              <Grid templateColumns="repeat(3, 1fr)" gap={4} w="full" pt={6}>
                <VStack
                  bg={colors.navy[800]}
                  p={4}
                  borderRadius="lg"
                  border="1px"
                  borderColor={colors.navy[700]}
                  _hover={{ borderColor: "yellow.500" }}
                  transition="all 0.2s"
                >
                  <Icon as={Truck} color="yellow.400" boxSize={6} />
                  <Text color="white" fontSize="sm" textAlign="center">
                    Free Shipping
                  </Text>
                </VStack>
                <VStack
                  bg={colors.navy[800]}
                  p={4}
                  borderRadius="lg"
                  border="1px"
                  borderColor={colors.navy[700]}
                  _hover={{ borderColor: "yellow.500" }}
                  transition="all 0.2s"
                >
                  <Icon as={Shield} color="yellow.400" boxSize={6} />
                  <Text color="white" fontSize="sm" textAlign="center">
                    2 Year Warranty
                  </Text>
                </VStack>
                <VStack
                  bg={colors.navy[800]}
                  p={4}
                  borderRadius="lg"
                  border="1px"
                  borderColor={colors.navy[700]}
                  _hover={{ borderColor: "yellow.500" }}
                  transition="all 0.2s"
                >
                  <Icon as={RotateCcw} color="yellow.400" boxSize={6} />
                  <Text color="white" fontSize="sm" textAlign="center">
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
