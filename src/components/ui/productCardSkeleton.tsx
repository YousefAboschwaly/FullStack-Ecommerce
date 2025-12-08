// ProductCardSkeleton.tsx - with centralized theme colors
import { useThemeColors } from "@/hooks/useThemeColors";
import { Box, Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ProductCardSkeleton = () => {
  // Use centralized theme colors
  const { bgSkeleton, skeletonBase, borderDefault } = useThemeColors();

  return (
    <Box
      padding="6"
      boxShadow="lg"
      bg={bgSkeleton}
      rounded="lg"
      border="1px solid"
      borderColor={borderDefault}
      css={{ "--skeleton-start-color": skeletonBase }}
    >
      <SkeletonCircle size="40" mx="auto" />
      
      <SkeletonText mt="4" w="20" noOfLines={1} mx="auto" />
      
      <SkeletonText mt="4" noOfLines={1} />
      
      <Flex justifyContent="space-between">
        <SkeletonText mt="4" w="20" noOfLines={1} />
        <SkeletonText mt="4" w="20" noOfLines={1} />
      </Flex>
      
      <SkeletonText mt="4" w="20" noOfLines={1} />
      
      <SkeletonText mt="4" w="20" noOfLines={1} />
      
      <SkeletonText mt="4" noOfLines={1} />
    </Box>
  );
};

export default ProductCardSkeleton;
