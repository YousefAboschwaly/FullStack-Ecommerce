import { useThemeColors } from "@/hooks/useThemeColors";
import { Box, Text } from "@chakra-ui/react";

const Products = () => {
  const { textPrimary, textMuted, bgCard, borderDefault } = useThemeColors();

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" color={textPrimary} mb={6}>
        Products
      </Text>

      <Box
        p={8}
        bg={bgCard}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderDefault}
        minH="400px"
      >
        <Text color={textMuted}>
          Products management will appear here...
        </Text>
      </Box>
    </Box>
  );
};

export default Products;
