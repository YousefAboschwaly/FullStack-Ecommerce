import {
  useCreateAdminProductMutation,
  useDeleteAdminProductMutation,
  useEditAdminProductMutation,
  useGetProductsQuery,
  useProductsPrefetch,
  useUploadProductImageMutation,
} from "@/app/services/products";
import GenericModal from "@/components/ui/admin/Modal";
import ProductFormModal from "@/components/ui/admin/ProductFormModal";
import ProductMobileCard from "@/components/ui/admin/ProductMobileCard";
import ProductsTableSkeleton from "@/components/ui/admin/productsTableSkeleton";
import ProductTableRow from "@/components/ui/admin/ProductTableRow";
import Pagination from "@/components/ui/Pagination";
import { toaster } from "@/components/ui/toaster";
import { useThemeColors } from "@/hooks/useThemeColors";
import type { IProduct, ProductFormData } from "@/interfaces";
import {
  Box,
  Flex,
  HStack,
  Icon,
  Stack,
  Table,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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
  const [pageSize, setPageSize] = useState<number>(10);

  const { onOpen, open, onClose } = useDisclosure();
  const { data, isLoading } = useGetProductsQuery({
    page: currentPage,
    pageSize: pageSize,
  });

  const [selectedProduct, setSelectedProduct] = useState<
    IProduct | undefined
  >();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [createProduct, { isLoading: isCreating }] =
    useCreateAdminProductMutation();
  const [editProduct, { isLoading: isEditing }] = useEditAdminProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] =
    useDeleteAdminProductMutation();
  const [uploadImage] = useUploadProductImageMutation();
  const prefetchProducts = useProductsPrefetch("getProducts");

  const pagination = data?.meta.pagination;
  const totalPages = pagination?.pageCount || 1;

  useEffect(() => {
    if (!pagination) return;

    // ✅ Prefetch next page
    if (currentPage < pagination.total/pageSize) {
      console.log(currentPage ,  pagination.pageCount,pageSize,pagination.total/pageSize)
      prefetchProducts(
        {
          page: currentPage + 1,
          pageSize,
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
  }, [currentPage, pageSize, pagination, prefetchProducts]);

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
      console.log(data);

      // 1️⃣ edit
      const res = await editProduct({
        id: selectedProduct.documentId,
        body: payload,
      }).unwrap();

      console.log(res);

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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        isLoading={isLoading}
        totalItems={pagination?.total || 0}
        pageSize={pageSize}
        showInfo={true}
        currentPageSize={pageSize} // or use state: const [pageSize, setPageSize] = useState(15)
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setCurrentPage(1); // reset to page 1 when size changes
        }}
        pageSizeOptions={[10, 20, 50, 100]}
      />
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
