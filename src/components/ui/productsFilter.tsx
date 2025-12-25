import { useState, } from "react";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Icon,
  Collapsible,
  Portal,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { createListCollection } from "@chakra-ui/react";
import { useGetCategoriesQuery } from "@/app/services/categories";
import { useThemeColors } from "@/hooks/useThemeColors";

interface ProductFiltersProps {
  search: string;
  minPrice: string;
  maxPrice: string;
  categoryId: string;
  onSearchChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onClearFilters: () => void;
}

const ProductFilters = ({
  search,
  minPrice,
  maxPrice,
  categoryId,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
  onCategoryChange,
  onClearFilters,
}: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  
  const {
    bgCard,
    bgCardHover,
    bgInput,
    textPrimary,
    textMuted,
    borderDefault,
    borderInput,
    borderInputFocus,
    borderHover,
    accentPrimary,
    placeholderInput,
    statusError,
    shadowCard,
  } = useThemeColors();
  
  const hasActiveFilters = search || minPrice || maxPrice || categoryId;

  const categories = categoriesData?.data || [];

  // Create collection for category select
  const categoryCollection = createListCollection({
    items: [
      { label: "All Categories", value: "all" },
      ...categories.map((cat) => ({
        label: cat.title,
        value: String(cat.id),
      })),
    ],
  });

  return (
    <Box
      bg={bgCard}
      border="1px solid"
      borderColor={borderDefault}
      borderRadius="xl"
      boxShadow="sm"
      overflow="hidden"

    >
      <Collapsible.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        {/* Header */}
        <Collapsible.Trigger asChild>
          <HStack
            justify="space-between"
            p={4}
            cursor="pointer"
            transition="background 0.2s"
            _hover={{ bg: bgCardHover }}
          >
            <HStack gap={3}>
              <Box
                p={2}
                bg={`${accentPrimary}20`}
                borderRadius="lg"
              >
                <Icon as={SlidersHorizontal} boxSize={5} color={accentPrimary} />
              </Box>
              <Box>
                <Text fontWeight="semibold" color={textPrimary}>
                  Filters
                </Text>
              </Box>
            </HStack>
            <HStack gap={2}>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClearFilters();
                  }}
                  color={statusError}
                  _hover={{ bg: `${statusError}15` }}
                >
                  <Icon as={X} boxSize={4} mr={1} />
                  Clear
                </Button>
              )}
              <Icon
                as={ChevronDown}
                boxSize={5}
                color={textMuted}
                transition="transform 0.2s"
                transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
              />
            </HStack>
          </HStack>
        </Collapsible.Trigger>

        <Collapsible.Content>
          <VStack gap={4} px={4} pb={4} align="stretch">
            {/* Search */}
            <Box>
              <Text
                as="label"
                display="block"
                mb={2}
                fontSize="sm"
                fontWeight="medium"
                color={textPrimary}
              >
                Search Products
              </Text>
              <Box position="relative">
                <Icon
                  as={Search}
                  position="absolute"
                  left={3}
                  top="50%"
                  transform="translateY(-50%)"
                  boxSize={4}
                  color={textMuted}
                  zIndex={1}
                />
                <Input
                  placeholder="Search by title..."
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  pl={10}
                  bg={bgInput}
                  border="1px solid"
                  borderColor={borderInput}
                  color={textPrimary}
                  _placeholder={{ color: placeholderInput }}
                  _focus={{
                    borderColor: borderInputFocus,
                    boxShadow: `0 0 0 1px ${borderInputFocus}`,
                  }}
                  _hover={{ borderColor: borderHover }}
                />
              </Box>
            </Box>

            {/* Price Range */}
            <Box>
              <Text
                as="label"
                display="block"
                mb={2}
                fontSize="sm"
                fontWeight="medium"
                color={textPrimary}
              >
                Price Range
              </Text>
              <HStack gap={3}>
                <Box position="relative" flex={1}>
                  <Text
                    position="absolute"
                    left={3}
                    top="50%"
                    transform="translateY(-50%)"
                    color={textMuted}
                    fontSize="sm"
                    zIndex={1}
                  >
                    $
                  </Text>
                  <Input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => onMinPriceChange(e.target.value)}
                    pl={7}
                    bg={bgInput}
                    border="1px solid"
                    borderColor={borderInput}
                    color={textPrimary}
                    _placeholder={{ color: placeholderInput }}
                    _focus={{
                      borderColor: borderInputFocus,
                      boxShadow: `0 0 0 1px ${borderInputFocus}`,
                    }}
                    _hover={{ borderColor: borderHover }}
                    min={0}
                  />
                </Box>
                <Box position="relative" flex={1}>
                  <Text
                    position="absolute"
                    left={3}
                    top="50%"
                    transform="translateY(-50%)"
                    color={textMuted}
                    fontSize="sm"
                    zIndex={1}
                  >
                    $
                  </Text>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => onMaxPriceChange(e.target.value)}
                    pl={7}
                    bg={bgInput}
                    border="1px solid"
                    borderColor={borderInput}
                    color={textPrimary}
                    _placeholder={{ color: placeholderInput }}
                    _focus={{
                      borderColor: borderInputFocus,
                      boxShadow: `0 0 0 1px ${borderInputFocus}`,
                    }}
                    _hover={{ borderColor: borderHover }}
                    min={0}
                  />
                </Box>
              </HStack>
            </Box>

            {/* Category */}
            <Box>
              <Text
                as="label"
                display="block"
                mb={2}
                fontSize="sm"
                fontWeight="medium"
                color={textPrimary}
              >
                Category
              </Text>
              <Select.Root
                collection={categoryCollection}
                value={categoryId ? [categoryId] : ["all"]}
                onValueChange={(details) => {
                  const value = details.value[0];
                  onCategoryChange(value === "all" ? "" : value);
                }}
                disabled={isCategoriesLoading}
              >
                <Select.Control
                  bg={bgInput}
                  border="1px solid"
                  borderColor={borderInput}
                  borderRadius="md"
                  _hover={{ borderColor: borderHover }}
                >
                  <Select.Trigger
                    px={3}
                    py={2}
                    _focus={{
                      borderColor: borderInputFocus,
                      boxShadow: `0 0 0 1px ${borderInputFocus}`,
                    }}
                  >
                    <Select.ValueText
                      placeholder={isCategoriesLoading ? "Loading..." : "All Categories"}
                      color={textPrimary}
                    />
                    <Select.IndicatorGroup>
                      <Select.Indicator>
                        <ChevronDown size={16} />
                      </Select.Indicator>
                    </Select.IndicatorGroup>
                  </Select.Trigger>
                </Select.Control>

                <Portal>
                  <Select.Positioner>
                    <Select.Content
                      bg={bgCard}
                      border="1px solid"
                      borderColor={borderDefault}
                      borderRadius="md"
                      boxShadow={shadowCard}
                      py={1}
                    >
                      <Select.ItemGroup>
                        {categoryCollection.items.map((item) => (
                          <Select.Item
                            key={item.value}
                            item={item}
                            px={3}
                            py={2}
                            cursor="pointer"
                            _hover={{ bg: bgCardHover }}
                            _highlighted={{ bg: bgCardHover }}
                          >
                            <Select.ItemText color={textPrimary}>
                              {item.label}
                            </Select.ItemText>
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.ItemGroup>
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Box>
          </VStack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};

export default ProductFilters;
