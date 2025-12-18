import {
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

  const { onOpen, open, onClose } = useDisclosure();
  const { data, isLoading } = useGetProductsQuery({ page: 1 });
  const [deleteProduct, { isLoading: isDeleting }] =
    useDeleteAdminProductMutation();

  const [selectedProduct, setSelectedProduct] = useState<
    IProduct | undefined
  >();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [editProduct, { isLoading: isEditing }] = useEditAdminProductMutation();
  const [uploadImage] = useUploadProductImageMutation();

  const handleView = (product: IProduct) => {
    navigate(`/product/${product.documentId}`);
  };

  const handleConfirmCreateProduct = (data: ProductFormData) => {
    console.log("Create product:", data);
    setCreateModalOpen(false);
  };

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleConfirmEdit = async(data: ProductFormData) => {
    if (!selectedProduct) return;

    const payload = {
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
      },
    };

  const {data:editedData} = await editProduct({
      id: selectedProduct.documentId,
      body: payload,
    });
      // 2️⃣ Upload image ( if the image changed )
  if (data.thumbnail instanceof File) {
    await  uploadImage({
      productId: `${editedData?.data.id}` ,
      file: data.thumbnail,
    }).unwrap();
  }


    console.log("Update product:", data);
    setEditModalOpen(false);
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
        isLoading={false}
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
