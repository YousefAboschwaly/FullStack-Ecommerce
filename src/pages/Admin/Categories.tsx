import { useThemeColors } from "@/hooks/useThemeColors";
import { Box, Text } from "@chakra-ui/react";

const Categories = () => {
  const { textPrimary, textMuted, bgCard, borderDefault } = useThemeColors();

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" color={textPrimary} mb={6}>
        Categories
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
          Categories management will appear here...
        </Text>
      </Box>
    </Box>
  );
};

export default Categories;
