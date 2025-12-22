import {
  useGetProductsQuery,
  useProductsPrefetch,
} from "@/app/services/products";
import ErrorHandler from "@/components/ui/ErrorHandler";
import ProductSkeleton from "@/components/ui/productCardSkeleton";
import { Badge, Box, Button, Grid, HStack, Icon, Text } from "@chakra-ui/react";
import ProductCard from "../components/ui/productCard";
import type { IProduct } from "@/interfaces";
import { useEffect, useState } from "react";
import Pagination from "@/components/ui/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import useThemeColors from "@/hooks/useThemeColors";
import { ArrowLeft, X } from "lucide-react";

export default function Products() {
  const [searchParams] = useSearchParams();
  // if there is filter with Category
  const navigate = useNavigate();
  const categoryId = searchParams.get("categoryId");
  const categoryName = searchParams.get("categoryName");
  // ------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const { data, isLoading, error } = useGetProductsQuery({
    page: currentPage,
    pageSize: pageSize,
    categoryId: categoryId ? parseInt(categoryId) : undefined,
  });
  const { textPrimary, textMuted, bgCard, borderDefault, accentPrimary, bgMain } = useThemeColors();


  const prefetchProducts = useProductsPrefetch("getProducts");

  const pagination = data?.meta.pagination;
  const totalPages = pagination?.pageCount || 1;

  useEffect(() => {
    if (!pagination) return;

    // ✅ Prefetch next page
    if (currentPage < pagination.total / pageSize) {
      console.log(
        currentPage,
        pagination.pageCount,
        pageSize,
        pagination.total / pageSize
      );
      prefetchProducts(
        {
          page: currentPage + 1,
          pageSize,
          categoryId: categoryId ? parseInt(categoryId) : undefined,
        },
        { ifOlderThan: 60 }
      );
    }

    //  Prefetch previous page
    if (currentPage > 1) {
      prefetchProducts({
        page: currentPage - 1,
        pageSize,
      });
    }
  }, [categoryId, currentPage, pageSize, pagination, prefetchProducts]);


  const handleClearFilter = () => {
    navigate("/products");
  };

  if (isLoading)
    return (
      <Grid
        m={30}
        templateColumns={"repeat(auto-fill , minmax(300px,1fr))"}
        gap={6}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </Grid>
    );
  if (error) return <ErrorHandler error={"Failed to fetch Products"} />;

  return (
    <> <Box p={6} bg={bgMain} minH="100vh">
      {/* Header with category filter info */}
      {categoryName && (
        <HStack mb={6} gap={4} flexWrap="wrap" alignItems="center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            color={textMuted}
            _hover={{ color: textPrimary }}
          >
            <Icon  mr={2} ><ArrowLeft/> </Icon>
            Back to Categories
          </Button>
          <Text fontSize="2xl" fontWeight="bold" color={textPrimary}>
            Products in "{categoryName}"
          </Text>
          <Badge
            bg={accentPrimary}
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="sm"
            display="flex"
            alignItems="center"
            gap={2}
            cursor="pointer"
            onClick={handleClearFilter}
            _hover={{ opacity: 0.8 }}
          >
            {categoryName}
            <Icon  boxSize={3} ><X/></Icon>
          </Badge>
        </HStack>
      )}

      {!categoryName && (
        <Text fontSize="2xl" fontWeight="bold" color={textPrimary} mb={6}>
          All Products
        </Text>
      )}

      {data?.data.length === 0 ? (
        <Box
          p={8}
          bg={bgCard}
          borderRadius="xl"
          border="1px solid"
          borderColor={borderDefault}
          textAlign="center"
        >
          <Text color={textMuted} fontSize="lg">
            No products found in this category.
          </Text>
          <Button
            mt={4}
            bg={accentPrimary}
            color="white"
            onClick={handleClearFilter}
            _hover={{ opacity: 0.9 }}
          >
            View All Products
          </Button>
        </Box>
      ) : (
        <>
          <Grid templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={6}>
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
    </>
  );
}
