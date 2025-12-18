// components/ui/admin/Pagination.tsx
import {
  HStack,
  IconButton,
  Button,
  Text,
  Center,
  Box,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useThemeColors } from "@/hooks/useThemeColors";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean; // Optional: show loading state on buttons
  totalItems?: number;
  pageSize?: number;
  showInfo?: boolean; // Show "Showing X to Y of Z" text
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  totalItems = 0,
  pageSize = 15,
  showInfo = true,
}: PaginationProps) => {
  const { textPrimary, textMuted, bgCardHover, borderDefault, accentPrimary } =
    useThemeColors();

  if (totalPages <= 1) return null;

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
      {/* Pagination Controls */}
      <Center>
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
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || isLoading}
            variant="outline"
            size="md"
            borderColor={borderDefault}
            _hover={{ bg: bgCardHover }}
          >
            <ChevronRight />
          </IconButton>
        </HStack>
      </Center>

      {/* Optional Info Text */}
      {showInfo && totalItems > 0 && (
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
