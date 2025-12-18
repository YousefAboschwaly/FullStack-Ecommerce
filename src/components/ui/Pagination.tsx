// components/ui/admin/Pagination.tsx
import {
  HStack,
  IconButton,
  Button,
  Text,
  Center,
  Box,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useThemeColors } from "@/hooks/useThemeColors";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  totalItems?: number;
  pageSize?: number;
  showInfo?: boolean;
  // ← New props for page size control
  currentPageSize?: number;
  onPageSizeChange?: (newSize: number) => void;
  pageSizeOptions?: number[]; // e.g. [10, 20, 50, 100]
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  totalItems = 0,
  pageSize = 15,
  showInfo = true,
  currentPageSize = 15, // default
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100], // common options
}: PaginationProps) => {
  const { textPrimary, textMuted, bgCardHover, borderDefault, accentPrimary } =
    useThemeColors();

  // Define items for the select collection

  const collection = createListCollection({
    items: pageSizeOptions.map((size) => ({
      label: size.toString(),
      value: size.toString(),
    })),
  });

  if (totalPages <= 1 && !onPageSizeChange) return null; // hide if no pagination needed

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <Box mt={8}>
      <Center>
        <HStack
          gap={8}
          flexWrap="wrap"
          justify="space-between"
          width="100%"
          maxW="6xl"
        >
          {/* Left: Entries per page selector */}
          {onPageSizeChange && (
            <HStack align="center">
              <Text fontSize="sm" color={textMuted} whiteSpace="nowrap">
                Entries per page
              </Text>
              <Select.Root
                collection={collection}
                value={[currentPageSize.toString()]}
                onValueChange={(details) => {
                  const value = details.value[0];
                  if (!value) return;
                  onPageSizeChange?.(Number(value));
                }}
                size="sm"
              >
                <Select.Control
                  borderColor={borderDefault}
                  minW="80px"
                  width="auto"
                >
                  <Select.Trigger
                    bg="transparent"
                    borderRadius="md"
                    _focus={{ borderColor: accentPrimary }}
                  >
                    <Select.ValueText color={textPrimary} />
                    <Select.IndicatorGroup>
                      <Select.Indicator>
                        <ChevronDown size={16} />
                      </Select.Indicator>
                    </Select.IndicatorGroup>
                  </Select.Trigger>
                </Select.Control>

                <Select.Positioner>
                  <Select.Content>
                    <Select.ItemGroup>
                      {collection.items.map((item) => (
                        <Select.Item key={item.value} item={item}>
                          <Select.ItemText>{item.label}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.ItemGroup>
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
            </HStack>
          )}

          {/* Center: Page numbers */}
          <HStack gap={2}>
            <IconButton
              aria-label="Previous page"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1 || isLoading}
              variant="outline"
              size="md"
              borderColor={borderDefault}
              _hover={{ bg: bgCardHover }}
            >
              <ChevronLeft />
            </IconButton>

            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <Text
                  key={`ellipsis-${index}`}
                  px={3}
                  py={2}
                  color={textMuted}
                  fontWeight="medium"
                >
                  ...
                </Text>
              ) : (
                <Button
                  key={page}
                  onClick={() => onPageChange(page as number)}
                  variant={currentPage === page ? "solid" : "outline"}
                  bg={currentPage === page ? accentPrimary : "transparent"}
                  color={currentPage === page ? "white" : textPrimary}
                  borderColor={borderDefault}
                  size="md"
                  minW="40px"
                  fontWeight="medium"
                  _hover={{
                    bg: currentPage === page ? accentPrimary : bgCardHover,
                  }}
                  loading={isLoading}
                >
                  {page}
                </Button>
              )
            )}

            <IconButton
              aria-label="Next page"
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages || isLoading}
              variant="outline"
              size="md"
              borderColor={borderDefault}
              _hover={{ bg: bgCardHover }}
            >
              <ChevronRight />
            </IconButton>
          </HStack>

          {/* Right: Showing info (moved here to balance layout) */}
          {showInfo && totalItems > 0 && !onPageSizeChange && (
            <Text fontSize="sm" color={textMuted} whiteSpace="nowrap">
              Showing {startItem} to {endItem} of {totalItems} products
            </Text>
          )}
        </HStack>
      </Center>

      {/* Full info text below if page size selector is active */}
      {showInfo && totalItems > 0 && onPageSizeChange && (
        <Center mt={4}>
          <Text fontSize="sm" color={textMuted}>
            Showing {startItem} to {endItem} of {totalItems} products
          </Text>
        </Center>
      )}
    </Box>
  );
};

export default Pagination;
