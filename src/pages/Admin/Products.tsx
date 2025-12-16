import { useThemeColors } from "@/hooks/useThemeColors";
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  Badge,
  Table,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { Edit, Eye, Package, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteAdminProductMutation,
  useGetProductsQuery,
} from "@/app/services/products";
import GenericModal from "@/components/ui/admin/Modal";
import ProductsTableSkeleton from "@/components/ui/admin/productsTableSkeleton";
import { useCallback, useState } from "react";

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


  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const { onOpen, open, onClose } = useDisclosure();
  const { data, isLoading } = useGetProductsQuery({ page: 1 });
  const [deleteProduct, { isLoading: isDeleting, isSuccess }] =
    useDeleteAdminProductMutation();
  console.log(isLoading, isDeleting, isSuccess);

  const handleView = (documentId: string) => {
    navigate(`/product/${documentId}`);
  };

  const handleEdit = (documentId: string) => {
    // TODO: Implement edit functionality
    console.log("Edit product:", documentId);
  };

const handleDelete = useCallback((documentId: string) => {
  setSelectedProduct(documentId);
  onOpen();
}, [onOpen]);


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
                    <Table.Row
                      key={product.id}
                      transition="all 0.2s"
                      _hover={{ bg: bgCardHover }}
                      borderBottom="1px solid"
                      borderColor={borderDefault}
                    >
                      <Table.Cell py={4} px={6}>
                        <HStack gap={4}>
                          <Box
                            w="50px"
                            h="50px"
                            borderRadius="lg"
                            overflow="hidden"
                            bg={bgCardHover}
                            flexShrink={0}
                          >
                            {product.thumbnail?.url ? (
                              <Image
                                src={apiUrl + product.thumbnail.url}
                                alt={product.title}
                                w="100%"
                                h="100%"
                                objectFit="cover"
                              />
                            ) : (
                              <Flex
                                w="100%"
                                h="100%"
                                align="center"
                                justify="center"
                              >
                                <Icon
                                  as={Package}
                                  boxSize={5}
                                  color={textMuted}
                                />
                              </Flex>
                            )}
                          </Box>
                          <Box>
                            <Text fontWeight="600" color={textPrimary} mb={0.5}>
                              {product.title}
                            </Text>
                            <Text
                              fontSize="sm"
                              color={textMuted}
                              lineClamp={1}
                              maxW="250px"
                            >
                              {product.description}
                            </Text>
                          </Box>
                        </HStack>
                      </Table.Cell>
                      <Table.Cell py={4} px={6}>
                        <Badge
                          px={3}
                          py={1}
                          borderRadius="full"
                          bg={bgCardHover}
                          color={textPrimary}
                          fontWeight="500"
                          fontSize="xs"
                        >
                          {product.category?.title || "Uncategorized"}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell py={4} px={6}>
                        <Text fontWeight="600" color={textPrimary}>
                          ${product.price.toFixed(2)}
                        </Text>
                      </Table.Cell>
                      <Table.Cell py={4} px={6}>
                        <HStack gap={2}>
                          <Box
                            w={2}
                            h={2}
                            borderRadius="full"
                            bg={stockStatus.color}
                          />
                          <Text fontSize="sm" color={textPrimary}>
                            {product.stock} units
                          </Text>
                        </HStack>
                      </Table.Cell>
                      <Table.Cell py={4} px={6}>
                        <HStack justify="center" gap={1}>
                          <IconButton
                            aria-label="View product"
                            size="sm"
                            variant="ghost"
                            borderRadius="lg"
                            color={textMuted}
                            _hover={{ bg: bgCardHover, color: accentPrimary }}
                            onClick={() => handleView(product.documentId)}
                          >
                            <Eye size={18} />
                          </IconButton>
                          <IconButton
                            aria-label="Edit product"
                            size="sm"
                            variant="ghost"
                            borderRadius="lg"
                            color={textMuted}
                            _hover={{ bg: bgCardHover, color: accentPrimary }}
                            onClick={() => handleEdit(product.documentId)}
                          >
                            <Edit size={18} />
                          </IconButton>
                          <IconButton
                            aria-label="Delete product"
                            size="sm"
                            variant="ghost"
                            borderRadius="lg"
                            color={textMuted}
                            _hover={{ bg: "red.50", color: statusError }}
                            onClick={() => handleDelete(product.documentId)}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </HStack>
                      </Table.Cell>
                    </Table.Row>
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
                <Box
                  key={product.id}
                  p={4}
                  bg={bgCard}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={borderDefault}
                  transition="all 0.2s"
                  _hover={{ borderColor: accentPrimary }}
                >
                  <Flex gap={4} mb={4}>
                    <Box
                      w="70px"
                      h="70px"
                      borderRadius="lg"
                      overflow="hidden"
                      bg={bgCardHover}
                      flexShrink={0}
                    >
                      {product.thumbnail?.url ? (
                        <Image
                          src={apiUrl + product.thumbnail.url}
                          alt={product.title}
                          w="100%"
                          h="100%"
                          objectFit="cover"
                        />
                      ) : (
                        <Flex w="100%" h="100%" align="center" justify="center">
                          <Icon as={Package} boxSize={6} color={textMuted} />
                        </Flex>
                      )}
                    </Box>
                    <Box flex={1}>
                      <Text fontWeight="600" color={textPrimary} mb={1}>
                        {product.title}
                      </Text>
                      <Badge
                        px={2}
                        py={0.5}
                        borderRadius="full"
                        bg={bgCardHover}
                        color={textPrimary}
                        fontWeight="500"
                        fontSize="xs"
                        mb={2}
                      >
                        {product.category?.title || "Uncategorized"}
                      </Badge>
                      <Flex justify="space-between" align="center">
                        <Text
                          fontWeight="700"
                          color={accentPrimary}
                          fontSize="lg"
                        >
                          ${product.price.toFixed(2)}
                        </Text>
                        <HStack gap={1}>
                          <Box
                            w={2}
                            h={2}
                            borderRadius="full"
                            bg={stockStatus.color}
                          />
                          <Text fontSize="xs" color={textMuted}>
                            {product.stock} units
                          </Text>
                        </HStack>
                      </Flex>
                    </Box>
                  </Flex>
                  <Flex
                    justify="flex-end"
                    gap={2}
                    borderTop="1px solid"
                    borderColor={borderDefault}
                    pt={3}
                  >
                    <IconButton
                      aria-label="View product"
                      size="sm"
                      variant="outline"
                      borderRadius="lg"
                      color={textMuted}
                      borderColor={borderDefault}
                      _hover={{
                        bg: bgCardHover,
                        color: accentPrimary,
                        borderColor: accentPrimary,
                      }}
                      onClick={() => handleView(product.documentId)}
                    >
                      <Eye size={16} />
                    </IconButton>
                    <IconButton
                      aria-label="Edit product"
                      size="sm"
                      variant="outline"
                      borderRadius="lg"
                      color={textMuted}
                      borderColor={borderDefault}
                      _hover={{
                        bg: bgCardHover,
                        color: accentPrimary,
                        borderColor: accentPrimary,
                      }}
                      onClick={() => handleEdit(product.documentId)}
                    >
                      <Edit size={16} />
                    </IconButton>
                    <IconButton
                      aria-label="Delete product"
                      size="sm"
                      variant="outline"
                      borderRadius="lg"
                      color={textMuted}
                      borderColor={borderDefault}
                      _hover={{
                        bg: "red.50",
                        color: statusError,
                        borderColor: statusError,
                      }}
                      onClick={() => handleDelete(product.documentId)}
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </Flex>
                </Box>
              );
            })}
          </Stack>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <GenericModal
        isOpen={open}
        onClose={onClose}
        onConfirm={()=> deleteProduct(selectedProduct)}
        title="Delete Product"
        description={`Are you sure you want to delete ? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </Box>
  );
};

export default Products;
