import { useState } from "react";
import {
  Box,
  Button,
  Badge,
  Icon,
  Drawer,
  Portal,
} from "@chakra-ui/react";
import { SlidersHorizontal } from "lucide-react";
import type { FilterState } from "@/interfaces";
import { useThemeColors } from "@/hooks/useThemeColors";
import ProductsFilter from "./productsFilter";

interface MobileFilterDrawerProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export default function MobileFilterDrawer({
  filters,
  onFiltersChange,
  onClearFilters,
}: MobileFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { bgCard, textPrimary, borderDefault, accentSecondary } = useThemeColors();

  const activeFilterCount = [
    filters.search,
    filters.minPrice,
    filters.maxPrice,
    filters.categoryId,
  ].filter(Boolean).length;

  return (
    <>
      <Button
        variant="outline"
        display={{ base: "flex", lg: "none" }}
        borderColor={borderDefault}
        onClick={() => setIsOpen(true)}
      >
        <Icon as={SlidersHorizontal} boxSize={4} mr={2} />
        Filters
        {activeFilterCount > 0 && (
          <Badge
            ml={2}
            bg={accentSecondary}
            borderRadius="full"
            fontSize="xs"
            minW={5}
            h={5}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {activeFilterCount}
          </Badge>
        )}
      </Button>

      <Drawer.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} placement="start">
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content bg={bgCard} maxW="sm">
              <Drawer.Header borderBottomWidth="1px" borderColor={borderDefault}>
                <Drawer.Title color={textPrimary}>Filters</Drawer.Title>
                <Drawer.CloseTrigger />
              </Drawer.Header>
              <Drawer.Body p={0} overflowY="auto">
                <Box p={4}>
                  <ProductsFilter
                    filters={filters}
                    onFiltersChange={(newFilters) => {
                      onFiltersChange(newFilters);
                    }}
                    onClearFilters={() => {
                      onClearFilters();
                      setIsOpen(false);
                    }}
                  />
                </Box>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}
