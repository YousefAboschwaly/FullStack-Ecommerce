/* eslint-disable react-hooks/set-state-in-effect */
import { useGetProductsQuery, useProductsPrefetch } from "@/app/services/products";
import ErrorHandler from "@/components/ui/ErrorHandler";
import ProductSkeleton from "@/components/ui/productCardSkeleton";
import { Box, Grid, Text, HStack, Badge, Button, Icon, Flex, VStack } from "@chakra-ui/react";
import ProductCard from "../components/ui/productCard";
import type { IProduct } from "@/interfaces";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useThemeColors } from "@/hooks/useThemeColors";
import { X, ArrowLeft, Package } from "lucide-react";
import ProductFilters  from '@/components/ui/productsFilter';
import Pagination from "@/components/ui/Pagination";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get initial values from URL
  const initialCategoryId = searchParams.get("categoryId") || "";
  const categoryName = searchParams.get("categoryName") || "";

  const {
    textPrimary,
    textMuted,
    bgCard,
    borderDefault,
    accentPrimary,
    bgMain,
    bgCardHover,
    buttonText,
    shadowCard,
    gradientButton,
  } = useThemeColors();

  // Filter states
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(12);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Update categoryId when URL changes
  useEffect(() => {
    const urlCategoryId = searchParams.get("categoryId") || "";
    setCategoryId(urlCategoryId);
  }, [searchParams]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, minPrice, maxPrice, categoryId]);

  const { data, isLoading, error } = useGetProductsQuery({
    page: currentPage,
    pageSize: pageSize,
    categoryId: categoryId ? parseInt(categoryId) : undefined,
    search: debouncedSearch || undefined,
    minPrice: minPrice ? parseFloat(minPrice) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
  });

  const prefetchProducts = useProductsPrefetch("getProducts");

  const pagination = data?.meta.pagination;
  const totalPages = pagination?.pageCount || 1;

  useEffect(() => {
    if (!pagination) return;

    if (currentPage < pagination.total / pageSize) {
      prefetchProducts(
        {
          page: currentPage + 1,
          pageSize,
          categoryId: categoryId ? parseInt(categoryId) : undefined,
          search: debouncedSearch || undefined,
          minPrice: minPrice ? parseFloat(minPrice) : undefined,
          maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        },
        { ifOlderThan: 60 }
      );
    }

    if (currentPage > 1) {
      prefetchProducts({
        page: currentPage - 1,
        pageSize,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        search: debouncedSearch || undefined,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      });
    }
  }, [currentPage, pageSize, pagination, prefetchProducts, categoryId, debouncedSearch, minPrice, maxPrice]);

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    // Update URL params
    if (value) {
      const category = data?.data.find((p: IProduct) => p.category?.id === parseInt(value));
      setSearchParams({
        categoryId: value,
        categoryName: category?.category?.title || "",
      });
    } else {
      setSearchParams({});
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setCategoryId("");
    setSearchParams({});
  };

  const handleClearCategoryFilter = () => {
    setCategoryId("");
    setSearchParams({});
  };

  if (error) return <ErrorHandler error={"Failed to fetch Products"} />;

  return (
    <Box bg={bgMain} minH="100vh">
      <Flex
        maxW="8xl"
        mx="auto"
        px={{ base: 4, md: 6 }}
        py={6}
        gap={6}
        direction={{ base: "column", lg: "row" }}
      >
        {/* Sidebar Filters */}
        <Box
          w={{ base: "full", lg: "300px" }}
          flexShrink={0}
          position={{ base: "relative", lg: "sticky" }}
          top={{ lg: "24px" }}
          alignSelf="flex-start"
        >
          <ProductFilters
            search={search}
            minPrice={minPrice}
            maxPrice={maxPrice}
            categoryId={categoryId}
            onSearchChange={setSearch}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onCategoryChange={handleCategoryChange}
            onClearFilters={handleClearFilters}
          />
        </Box>

        {/* Main Content */}
        <Box flex={1}>
          {/* Header */}
          <HStack mb={6} gap={4} flexWrap="wrap" alignItems="center">
            {categoryName ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/categories")}
                  color={textMuted}
                  _hover={{ color: textPrimary, bg: bgCardHover }}
                >
                  <Icon as={ArrowLeft} mr={2} />
                  Back to Categories
                </Button>
                <Text fontSize="2xl" fontWeight="bold" color={textPrimary}>
                  Products in "{categoryName}"
                </Text>
                <Badge
                  bg={accentPrimary}
                  color={buttonText}
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  cursor="pointer"
                  onClick={handleClearCategoryFilter}
                  _hover={{ opacity: 0.8 }}
                >
                  {categoryName}
                  <Icon as={X} boxSize={3} />
                </Badge>
              </>
            ) : (
              <HStack gap={3}>
                <Box p={2} bg={`${accentPrimary}20`} borderRadius="lg">
                  <Icon as={Package} boxSize={6} color={accentPrimary} />
                </Box>
                <VStack align="start" gap={0}>
                  <Text fontSize="2xl" fontWeight="bold" color={textPrimary}>
                    All Products
                  </Text>
                  {pagination && (
                    <Text fontSize="sm" color={textMuted}>
                      {pagination.total} products found
                    </Text>
                  )}
                </VStack>
              </HStack>
            )}
          </HStack>

          {/* Loading State */}
          {isLoading ? (
            <Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={6}>
              {Array.from({ length: 12 }, (_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </Grid>
          ) : data?.data.length === 0 ? (
            /* Empty State */
            <Box
              p={12}
              bg={bgCard}
              borderRadius="xl"
              border="1px solid"
              borderColor={borderDefault}
              textAlign="center"
            >
              <VStack gap={4}>
                <Box p={4} bg={bgCardHover} borderRadius="full">
                  <Icon as={Package} boxSize={8} color={textMuted} />
                </Box>
                <Text fontSize="xl" fontWeight="semibold" color={textPrimary}>
                  No products found
                </Text>
                <Text color={textMuted}>
                  Try adjusting your filters or search terms.
                </Text>
                <Button
                  bg={gradientButton}
                  color={buttonText}
                  onClick={handleClearFilters}
                  _hover={{ opacity: 0.9 }}
                  boxShadow={shadowCard}
                >
                  Clear All Filters
                </Button>
              </VStack>
            </Box>
          ) : (
            /* Products Grid */
            <>
              <Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={6}>
                {data?.data.map((product: IProduct) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </Grid>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                isLoading={isLoading}
                totalItems={pagination?.total || 0}
                pageSize={pageSize}
                showInfo={true}
                currentPageSize={pageSize}
                onPageSizeChange={(newSize) => {
                  setPageSize(newSize);
                  setCurrentPage(1);
                }}
                pageSizeOptions={[12, 24, 50, 100]}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
