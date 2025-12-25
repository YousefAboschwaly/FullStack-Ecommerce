import GenericModal from "@/components/ui/admin/Modal";
import CategoryFormModal from "@/components/ui/admin/categories/CategoryFormModal";
import CategoryMobileCard from "@/components/ui/admin/categories/CategoryMobileCard";
import CategoriesTableSkeleton from "@/components/ui/admin/categories/categoriesTableSkeleton";
import CategoryTableRow from "@/components/ui/admin/categories/CategoryTableRow";
import { toaster } from "@/components/ui/toaster";
import { useThemeColors } from "@/hooks/useThemeColors";
import type { ICategory } from "@/interfaces";
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
import { useGetCategoriesWithProductsQuery } from "@/app/services/categories";
import { useNavigate } from "react-router-dom";

interface CategoryFormData {
  title: string;
  description?: string;
}

const Categories = () => {
  const navigate = useNavigate();
  const { data } = useGetCategoriesWithProductsQuery();
  const {
    textPrimary,
    textMuted,
    bgCard,
    bgCardHover,
    borderDefault,
    accentPrimary,
    statusSuccess,
    statusWarning,
  } = useThemeColors();

  const { onOpen, open, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isLoading] = useState(false);
  const [isCreating] = useState(false);
  const [isEditing] = useState(false);
  const [isDeleting] = useState(false);

  const handleView = (category: ICategory) => {
    const params = new URLSearchParams({
      categoryId: category.id.toString(),
      categoryName:
        category.title.replaceAll("&", "").replaceAll(" ", "_") || "",
    });

    navigate(`/?${params.toString()}`);
    console.log("View category:", category);
  };

  const handleConfirmCreateCategory = async (data: CategoryFormData) => {
    try {
      console.log("Create category:", data);
      toaster.success({
        title: "Category created successfully",
        duration: 3000,
        closable: true,
      });
      setCreateModalOpen(false);
    } catch {
      toaster.error({
        title: "Failed to create category",
        duration: 3000,
      });
    }
  };

  const handleEdit = (category: ICategory) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  const handleConfirmEdit = async (data: CategoryFormData) => {
    if (!selectedCategory) return;
    try {
      console.log("Edit category:", data);
      toaster.success({
        title: "Category edited successfully",
        duration: 3000,
        closable: true,
      });
      setEditModalOpen(false);
    } catch {
      toaster.error({
        title: "Failed to update category",
        duration: 3000,
        closable: true,
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;
    try {
      console.log("Delete category:", selectedCategory);
      toaster.success({
        title: "Category deleted successfully",
        duration: 3000,
        closable: true,
      });
      setSelectedCategory(undefined);
      onClose();
    } catch (error) {
      console.error(error);
      toaster.error({
        title: "Failed to delete category",
        duration: 3000,
      });
    }
  };

  const handleDelete = useCallback(
    (category: ICategory) => {
      setSelectedCategory(category);
      onOpen();
    },
    [onOpen]
  );

  const getProductCountStatus = (count: number) => {
    if (count === 0) return { label: "No Products", color: textMuted };
    if (count < 3) return { label: `${count} Products`, color: statusWarning };
    return { label: `${count} Products`, color: statusSuccess };
  };

  const getPriceRange = (category: ICategory) => {
    if (!category.products || category.products.length === 0) {
      return "N/A";
    }
    const prices = category.products.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    if (min === max) {
      return `$${min.toFixed(2)}`;
    }
    return `$${min.toFixed(2)} - $${max.toFixed(2)}`;
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
          Categories
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
          <Text>Add Category</Text>
        </HStack>
      </Flex>

      {/* Show skeleton when loading */}
      {isLoading ? (
        <CategoriesTableSkeleton rows={5} />
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
                    Category
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    color={textMuted}
                    fontWeight="600"
                    py={4}
                    px={6}
                  >
                    Products
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    color={textMuted}
                    fontWeight="600"
                    py={4}
                    px={6}
                  >
                    Price Range
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
                {data?.data.map((category) => {
                  const productCountStatus = getProductCountStatus(
                    category.products?.length || 0
                  );
                  const priceRange = getPriceRange(category);
                  return (
                    <CategoryTableRow
                      key={category.id}
                      category={category}
                      productCountStatus={productCountStatus}
                      priceRange={priceRange}
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
            {data?.data.map((category) => {
              const productCountStatus = getProductCountStatus(
                category.products?.length || 0
              );
              const priceRange = getPriceRange(category);
              return (
                <CategoryMobileCard
                  key={category.id}
                  category={category}
                  productCountStatus={productCountStatus}
                  priceRange={priceRange}
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
        title="Delete Category"
        description={`Are you sure you want to delete "${selectedCategory?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />

      {/* Create Modal */}
      <CategoryFormModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={(data) => handleConfirmCreateCategory(data)}
        mode="create"
        isLoading={isCreating}
      />

      {/* Edit Modal */}
      <CategoryFormModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={(data) => handleConfirmEdit(data)}
        mode="edit"
        initialData={{
          title: selectedCategory?.title,
        }}
        isLoading={isEditing}
      />
    </Box>
  );
};

export default Categories;
