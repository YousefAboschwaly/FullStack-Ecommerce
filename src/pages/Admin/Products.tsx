import {
  useCreateAdminProductMutation,
  useDeleteAdminProductMutation,
  useEditAdminProductMutation,
  useGetProductsQuery,
  useUploadProductImageMutation,
} from "@/app/services/products";
import GenericModal from "@/components/ui/admin/Modal";
import ProductFormModal from "@/components/ui/admin/ProductFormModal";
import ProductMobileCard from "@/components/ui/admin/ProductMobileCard";
import ProductsTableSkeleton from "@/components/ui/admin/productsTableSkeleton";
import ProductTableRow from "@/components/ui/admin/ProductTableRow";
import { toaster } from "@/components/ui/toaster";
import { useThemeColors } from "@/hooks/useThemeColors";
import type { IProduct, ProductFormData } from "@/interfaces";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Stack,
  Table,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL || "";

const Products = () => {
  const {
    textPrimary,
    textMuted,
    bgCard,
    bgCardHover,
    borderDefault,
    accentPrimary,
    statusSuccess,
    statusWarning,
    statusError,
  } = useThemeColors();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const { onOpen, open, onClose } = useDisclosure();
  const { data, isLoading } = useGetProductsQuery({ page: currentPage });
  const [deleteProduct, { isLoading: isDeleting }] =
    useDeleteAdminProductMutation();

  const [selectedProduct, setSelectedProduct] = useState<
    IProduct | undefined
  >();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [editProduct, { isLoading: isEditing }] = useEditAdminProductMutation();
  const [createProduct, { isLoading: isCreating }] =useCreateAdminProductMutation();
  const [uploadImage] = useUploadProductImageMutation();

  const pagination = data?.meta.pagination;

  const totalPages = pagination?.pageCount || 1;
  const pageSize = pagination?.pageSize || 15;

  const handleView = (product: IProduct) => {
    navigate(`/product/${product.documentId}`);
  };

  const handleConfirmCreateProduct = async (data: ProductFormData) => {
    try {
      const payload = {
        data: {
          title: data.title,
          description: data.description,
          price: data.price,
          stock: data.stock,
        },
      };

      const res = await createProduct(payload).unwrap();

      if (data.thumbnail instanceof File) {
        await uploadImage({
          productId: String(res.data.id),
          file: data.thumbnail,
        }).unwrap();
      }

      toaster.success({
        title: "Product created successfully",
        description: "There is problem in creating product",
        duration: 3000,
        closable: true,
      });

      setCreateModalOpen(false);
    } catch {
      toaster.error({
        title: "Failed to create product",
        duration: 3000,
      });
    }
  };

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleConfirmEdit = async (data: ProductFormData) => {
    if (!selectedProduct) return;

    try {
      const payload = {
        data: {
          title: data.title,
          description: data.description,
          price: data.price,
          stock: data.stock,
        },
      };

      // 1️⃣ edit
      const res = await editProduct({
        id: selectedProduct.documentId,
        body: payload,
      }).unwrap();

      // 2️⃣ upload image
      if (data.thumbnail instanceof File) {
        await uploadImage({
          productId: String(res.data.id),
          file: data.thumbnail,
        }).unwrap();
      }

      toaster.success({
        title: "Product edited successfully",
        duration: 3000,
        closable: true,
      });

      setEditModalOpen(false);
    } catch {
      toaster.error({
        title: "Failed to update product",
        description: "There is problem in editing product",
        duration: 3000,
        closable: true,
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      await deleteProduct(selectedProduct.documentId).unwrap();
      setSelectedProduct(undefined);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = useCallback(
    (product: IProduct) => {
      setSelectedProduct(product);
      onOpen();
    },
    [onOpen]
  );

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: statusError };
    if (stock < 20) return { label: "Low Stock", color: statusWarning };
    return { label: "In Stock", color: statusSuccess };
  };

  // Pagination helpers
  const getPageNumbers = () => {
    const pages = [];
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
  return (
    <Box>
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        mb={6}
        flexWrap="wrap"
        gap={4}
      >
        <Text fontSize="2xl" fontWeight="bold" color={textPrimary}>
          Products
        </Text>
        <HStack
          as="button"
          px={4}
          py={2}
          bg={accentPrimary}
          color="white"
          borderRadius="lg"
          fontWeight="600"
          fontSize="sm"
          transition="all 0.2s"
          _hover={{ opacity: 0.9, transform: "translateY(-1px)" }}
          onClick={() => setCreateModalOpen(true)}
        >
          <Icon as={Plus} boxSize={4} />
          <Text>Add Product</Text>
        </HStack>
      </Flex>
      {/* Show skeleton when loading */}
      {isLoading ? (
        <ProductsTableSkeleton rows={5} />
      ) : (
        <>
          {/* Desktop Table */}
          <Box
            display={{ base: "none", lg: "block" }}
            bg={bgCard}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderDefault}
            overflow="hidden"
          >
            <Table.Root size="lg">
              <Table.Header>
                <Table.Row bg={bgCardHover}>
                  <Table.ColumnHeader
                    color={textMuted}
                    fontWeight="600"
                    py={4}
                    px={6}
                  >
                    Product
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    color={textMuted}
                    fontWeight="600"
                    py={4}
                    px={6}
                  >
                    Category
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    color={textMuted}
                    fontWeight="600"
                    py={4}
                    px={6}
                  >
                    Price
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    color={textMuted}
                    fontWeight="600"
                    py={4}
                    px={6}
                  >
                    Stock
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    color={textMuted}
                    fontWeight="600"
                    py={4}
                    px={6}
                    textAlign="center"
                  >
                    Actions
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data?.data.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <ProductTableRow
                      key={product.id}
                      product={product}
                      apiUrl={apiUrl}
                      stockStatus={stockStatus}
                      handleView={handleView}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  );
                })}
              </Table.Body>
            </Table.Root>
          </Box>

          {/* Mobile Cards */}
          <Stack display={{ base: "flex", lg: "none" }} gap={4}>
            {data?.data.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              return (
                <ProductMobileCard
                  key={product.id}
                  product={product}
                  apiUrl={apiUrl}
                  stockStatus={stockStatus}
                  handleView={handleView}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              );
            })}
          </Stack>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Center mt={8}>
          <HStack spacing={2}>
            <IconButton
              aria-label="Previous page"
              icon={<ChevronLeft />}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              isDisabled={currentPage === 1 || isLoading}
              variant="outline"
              size="sm"
            />

            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <Text key={index} px={3} color={textMuted}>
                  ...
                </Text>
              ) : (
                <Button
                  key={index}
                  onClick={() => setCurrentPage(page as number)}
                  isActive={currentPage === page}
                  variant={currentPage === page ? "solid" : "outline"}
                  colorScheme={currentPage === page ? "blue" : "gray"}
                  size="sm"
                  minW="36px"
                  isLoading={isLoading && currentPage === page}
                >
                  {page}
                </Button>
              )
            )}

            <IconButton
              aria-label="Next page"
              icon={<ChevronRight />}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              isDisabled={currentPage === totalPages || isLoading}
              variant="outline"
              size="sm"
            />
          </HStack>
        </Center>
      )}

      {/* Optional: Show current range */}
      <Center mt={4}>
        <Text fontSize="sm" color={textMuted}>
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, pagination?.total || 0)} of{" "}
          {pagination?.total} products
        </Text>
      </Center>

      {/* Delete Confirmation Modal */}
      <GenericModal
        isOpen={open}
        onClose={onClose}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        description={`Are you sure you want to delete "${selectedProduct?.title}" ? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
      {/* // Create mode */}
      <ProductFormModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={(data) => handleConfirmCreateProduct(data)}
        mode="create"
        isLoading={isCreating}
      />
      {/* // Edit mode */}
      <ProductFormModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={(data) => handleConfirmEdit(data)}
        mode="edit"
        initialData={{
          title: selectedProduct?.title,
          description: selectedProduct?.description,
          price: selectedProduct?.price,
          stock: selectedProduct?.stock,
          thumbnail: apiUrl + selectedProduct?.thumbnail?.url,
        }}
        isLoading={isEditing}
      />
    </Box>
  );
};

export default Products;
