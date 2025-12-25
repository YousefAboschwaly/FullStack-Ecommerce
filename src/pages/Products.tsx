/* eslint-disable react-hooks/set-state-in-effect */
import { useGetProductsQuery, useProductsPrefetch } from "@/app/services/products";
import { Box, Grid, Text, Button, Icon, Flex, VStack } from "@chakra-ui/react";
import ProductCard from "@/components/ui/productCard";
import type { IProduct } from "@/interfaces";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Package } from "lucide-react";
import ProductFilters from '@/components/ui/productsFilter';
import Pagination from "@/components/ui/Pagination";
import  ProductSkeleton  from '@/components/ui/productCardSkeleton';
import { useGetCategoriesQuery } from "@/app/services/categories";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get initial values from URL
  const initialCategoryId = searchParams.get("categoryId") || "";
  const categoryName = searchParams.get("categoryName") || "";

  const {
    textPrimary,
    textMuted,
    bgCard,
    borderDefault,
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
  const [selectedCategoryName, setSelectedCategoryName] = useState(categoryName);

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
    const urlCategoryName = searchParams.get("categoryName") || "";
    console.log(urlCategoryName)
    setCategoryId(urlCategoryId);
    setSelectedCategoryName(urlCategoryName);
  }, [searchParams]);
console.log(selectedCategoryName)
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
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  console.log(categoriesData)

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

  if (!value) {
    setSelectedCategoryName("");
    setSearchParams({});
    return;
  }

  const category = categoriesData?.data?.find(
    (cat) => cat.id === parseInt(value)
  );
  console.log(category)

  const catName =
    category?.title
      ?.replaceAll("&", "")
      .replaceAll(" ", "_") || "";
console.log(catName)
  setSelectedCategoryName(catName);

  setSearchParams({
    categoryId: value,
    categoryName: catName,
  });
};


  const handleClearFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setCategoryId("");
    setSelectedCategoryName("");
    setSearchParams({});
  };

  if (error) {
    return (
      <Box p={12} textAlign="center">
        <Text color="red.500">Failed to fetch Products</Text>
      </Box>
    );
  }

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
        {/* Sidebar Filters - Fixed Position */}
        <Box
          w={{ base: "full", lg: "300px" }}
          flexShrink={0}
          position={{ base: "relative", lg: "fixed" }}
          top={{ lg: "115px" }}
          alignSelf="flex-start"
          maxH={{ lg: "calc(100vh - 48px)" }}
          overflowY={{ lg: "auto" }}
          zIndex={10}
          css={{
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: borderDefault,
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: textMuted,
            },
          }}
        >
          <ProductFilters
            search={search}
            minPrice={minPrice}
            maxPrice={maxPrice}
            categoriesData={categoriesData  }
            isCategoriesLoading={isCategoriesLoading}
            categoryId={categoryId}
            categoryName={selectedCategoryName}
            onSearchChange={setSearch}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onCategoryChange={handleCategoryChange}
            onClearFilters={handleClearFilters}
          />
        </Box>

        {/* Main Content - Add margin for fixed sidebar */}
        <Box 
          flex={1}
          ml={{ lg: "324px" }}
        >

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
                pageSizeOptions={[12,24,50,100]}
                currentPageSize={pageSize}
                onPageSizeChange={(newSize) => {
                  setPageSize(newSize);
                  setCurrentPage(1);
                }}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}