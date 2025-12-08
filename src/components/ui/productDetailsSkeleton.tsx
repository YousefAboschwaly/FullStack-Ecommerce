import { useColorModeValue } from '@/components/ui/color-mode';
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductDetailsSkeleton = () => {
  const navigate = useNavigate();

  // Color mode values
  const bgColor = useColorModeValue('hsl(210, 40%, 98%)', 'hsl(222, 47%, 11%)');
  const cardBg = useColorModeValue('hsl(0, 0%, 100%)', 'hsl(217, 33%, 17%)');
  const borderColor = useColorModeValue('hsl(48, 96%, 53%)', 'hsl(48, 96%, 53%)');
  const textColor = useColorModeValue('hsl(222, 47%, 11%)', 'hsl(210, 40%, 98%)');
  const skeletonBase = useColorModeValue('hsl(215, 20%, 90%)', 'hsl(217, 33%, 20%)');
  const skeletonShine = useColorModeValue('hsl(215, 20%, 95%)', 'hsl(217, 33%, 28%)');
  const accentColor = useColorModeValue('hsl(48, 96%, 53%)', 'hsl(48, 96%, 53%)');
  const hoverBg = useColorModeValue('hsl(215, 20%, 95%)', 'hsl(217, 33%, 20%)');

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="container.xl" px={4}>
        {/* Back Button */}
        <Box mb={6}>
          <Button
            variant="ghost"
            color={textColor}
            _hover={{ bg: hoverBg, color: accentColor }}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
            Back
          </Button>
        </Box>

        <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={12}>
          {/* Image Section Skeleton */}
          <GridItem>
            <Box
              bg={cardBg}
              borderRadius="2xl"
              p={8}
              border="1px solid"
              borderColor={borderColor}
              position="relative"
            >
              {/* Wishlist button skeleton */}
              <Box position="absolute" top={4} right={4}>
                <Skeleton height="40px" width="40px" borderRadius="full" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />
              </Box>
              {/* Main image skeleton */}
              <Skeleton height="400px" width="100%" borderRadius="lg" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />
            </Box>
          </GridItem>

          {/* Details Section Skeleton */}
          <GridItem>
            <VStack align="start" gap={6}>
              {/* Category badge */}
              <Skeleton height="28px" width="96px" borderRadius="full" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />

              {/* Title */}
              <VStack align="start" gap={2} width="100%">
                <Skeleton height="40px" width="75%" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />
                <Skeleton height="40px" width="50%" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />
              </VStack>

              {/* Price and stock */}
              <HStack gap={4}>
                <Skeleton height="48px" width="112px" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />
                <Skeleton height="24px" width="96px" borderRadius="full" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />
              </HStack>

              {/* Description */}
              <VStack align="start" gap={2} width="100%">
                <Skeleton height="20px" width="100%" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />
                <Skeleton height="20px" width="100%" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />
                <Skeleton height="20px" width="75%" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />
              </VStack>

              {/* Quantity selector */}
              <HStack gap={3}>
                <Skeleton height="20px" width="80px" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />
                <HStack
                  bg={cardBg}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={borderColor}
                  overflow="hidden"
                  gap={0}
                >
                  <Skeleton height="40px" width="40px" borderRadius="0" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />
                  <Skeleton height="40px" width="48px" borderRadius="0" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />
                  <Skeleton height="40px" width="40px" borderRadius="0" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />
                </HStack>
              </HStack>

              {/* Action buttons */}
              <HStack gap={4} width="100%">
                <Skeleton height="48px" flex={1} borderRadius="lg" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />
                <Skeleton height="48px" flex={1} borderRadius="lg" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />
              </HStack>

              {/* Features grid */}
              <Grid templateColumns="repeat(3, 1fr)" gap={4} width="100%" pt={6}>
                {[1, 2, 3].map((i) => (
                  <VStack
                    key={i}
                    bg={cardBg}
                    p={4}
                    borderRadius="lg"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Skeleton height="24px" width="24px" borderRadius="full" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />
                    <Skeleton height="16px" width="64px" css={{ "--skeleton-start-color": skeletonBase, "--skeleton-end-color": skeletonShine }} />
                  </VStack>
                ))}
              </Grid>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetailsSkeleton;
