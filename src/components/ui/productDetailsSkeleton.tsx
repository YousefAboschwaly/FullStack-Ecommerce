import { colors } from "@/constants";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  VStack
} from "@chakra-ui/react";



const ProductDetailsSkeleton = () => {
  return (
    <Box bg={colors.navy[900]} minH="100vh" py={8}>
      <Box>
        <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={12}>
          {/* Image Section Skeleton */}
          <GridItem>
            <Box
              bg={colors.navy[800]}
              borderRadius="2xl"
              p={8}
 
              position="relative"
            >
              {/* Wishlist button skeleton */}
              <Box position="absolute" top={4} right={4}>
                <Skeleton height="40px" width="40px" borderRadius="full" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />
              </Box>
              {/* Main image skeleton */}
              <Skeleton height="400px" width="100%" borderRadius="lg" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />
            </Box>
          </GridItem>

          {/* Details Section Skeleton */}
          <GridItem>
            <VStack align="start" gap={6}>
              {/* Category badge */}
              <Skeleton height="28px" width="96px" borderRadius="full" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />

              {/* Title */}
              <VStack align="start" gap={2} width="100%">
                <Skeleton height="40px" width="75%" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />
                <Skeleton height="40px" width="50%" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />
              </VStack>

              {/* Price and stock */}
              <HStack gap={4}>
                <Skeleton height="48px" width="112px" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />
                <Skeleton height="24px" width="96px" borderRadius="full" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />
              </HStack>

              {/* Description */}
              <VStack align="start" gap={2} width="100%">
                <Skeleton height="20px" width="100%" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />
                <Skeleton height="20px" width="100%" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />
                <Skeleton height="20px" width="75%" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />
              </VStack>

              {/* Quantity selector */}
              <HStack gap={3}>
                <Skeleton height="20px" width="80px" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />
                <HStack
                  bg={colors.navy[800]}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={colors.navy[700]}
                  overflow="hidden"
                  gap={0}
                >
                  <Skeleton height="40px" width="40px" borderRadius="0" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />
                  <Skeleton height="40px" width="48px" borderRadius="0" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />
                  <Skeleton height="40px" width="40px" borderRadius="0" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />
                </HStack>
              </HStack>

              {/* Action buttons */}
              <HStack gap={4} width="100%">
                <Skeleton height="48px" flex={1} borderRadius="lg" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />
                <Skeleton height="48px" flex={1} borderRadius="lg" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />
              </HStack>

              {/* Features grid */}
              <Grid templateColumns="repeat(3, 1fr)" gap={4} width="100%" pt={6}>
                {[1, 2, 3].map((i) => (
                  <VStack
                    key={i}
                    bg={colors.navy[800]}
                    p={4}
                    borderRadius="lg"
                    border="1px solid"
                    borderColor={colors.navy[700]}
                  >
                    <Skeleton height="24px" width="24px" borderRadius="full" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />
                    <Skeleton height="16px" width="64px" css={{ "--skeleton-start-color": colors.navy[700], "--skeleton-end-color": colors.navy[800] }} />
                  </VStack>
                ))}
              </Grid>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductDetailsSkeleton;
