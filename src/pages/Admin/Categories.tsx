import { useCreateCategoryMutation, useGetCategoriesWithProductsQuery } from "@/app/services/categories";
import { useThemeColors } from "@/hooks/useThemeColors";
import type { ICategory } from "@/interfaces";
import {
  Badge,
  Box,
  Button,
  Dialog,
  Grid,
  HStack,
  Icon,
  Input,
  Spinner,
  Text,
  VStack
} from "@chakra-ui/react";
import { AlertTriangle, ArrowRight, FolderOpen, Package, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Categories = () => {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  const { data, isLoading, isError, refetch } = useGetCategoriesWithProductsQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();

  const {
    textPrimary,
    textMuted,
    bgMain,
    bgCard,
    bgCardHover,
    borderDefault,
    borderHover,
    accentPrimary,
    buttonText,
    shadowCard,
    statusError,
    statusSuccess,
    gradientButton,
  } = useThemeColors();

  const handleCategoryClick = (category: ICategory) => {
    navigate(`/products?categoryId=${category.id}&categoryName=${encodeURIComponent(category.title)}`);
  };

  const handleAddCategory = async () => {
    if (!newCategoryTitle.trim()) return;
    
    try {
      await createCategory({ title: newCategoryTitle.trim() }).unwrap();
      setNewCategoryTitle("");
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  if (isLoading) {
    return (
      <Box p={8} bg={bgMain} minH="100vh">
        <HStack justify="space-between" mb={8}>
          <Text fontSize="3xl" fontWeight="bold" color={textPrimary}>
            Categories
          </Text>
          <Button disabled bg={accentPrimary} color={buttonText} borderRadius="xl" px={6}>
            <Icon as={Plus} mr={2} />
            Add Category
          </Button>
        </HStack>
        <Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={6}>
          {Array.from({ length: 6 }, (_, i) => (
            <Box
              key={i}
              p={6}
              bg={bgCard}
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderDefault}
              h="180px"
            >
              <VStack gap={4} align="stretch" h="full" justify="center">
                <Box w="60px" h="60px" bg={borderDefault} borderRadius="xl" mx="auto" />
                <Box w="60%" h="20px" bg={borderDefault} borderRadius="md" mx="auto" />
                <Box w="40%" h="16px" bg={borderDefault} borderRadius="md" mx="auto" />
              </VStack>
            </Box>
          ))}
        </Grid>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={8} bg={bgMain} minH="100vh">
        <HStack justify="space-between" mb={8}>
          <Text fontSize="3xl" fontWeight="bold" color={textPrimary}>
            Categories
          </Text>
        </HStack>
        <Box
          p={8}
          bg={bgCard}
          borderRadius="2xl"
          border="1px solid"
          borderColor={borderDefault}
          textAlign="center"
        >
          <VStack gap={4}>
            <Icon as={AlertTriangle} boxSize={12} color={statusError} />
            <Text fontSize="xl" fontWeight="bold" color={textPrimary}>
              Failed to load categories
            </Text>
            <Text color={textMuted}>Something went wrong while fetching categories.</Text>
            <Button
              onClick={() => refetch()}
              bg={accentPrimary}
              color={buttonText}
              borderRadius="xl"
              _hover={{ opacity: 0.9 }}
            >
              Try Again
            </Button>
          </VStack>
        </Box>
      </Box>
    );
  }

  const categories = data?.data || [];

  return (
    <Box p={8} bg={bgMain} minH="100vh">
      {/* Header */}
      <HStack justify="space-between" mb={8} flexWrap="wrap" gap={4}>
        <VStack align="start" gap={1}>
          <Text fontSize="3xl" fontWeight="bold" color={textPrimary}>
            Categories
          </Text>
          <Text color={textMuted} fontSize="md">
            Browse products by category • {categories.length} categories available
          </Text>
        </VStack>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          bg={gradientButton}
          color={buttonText}
          borderRadius="xl"
          px={6}
          py={5}
          fontWeight="semibold"
          transition="all 0.3s ease"
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: shadowCard,
          }}
        >
          <Icon as={Plus} mr={2} />
          Add Category
        </Button>
      </HStack>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <Box
          p={12}
          bg={bgCard}
          borderRadius="2xl"
          border="1px solid"
          borderColor={borderDefault}
          textAlign="center"
        >
          <VStack gap={4}>
            <Icon as={FolderOpen} boxSize={16} color={textMuted} />
            <Text fontSize="xl" fontWeight="bold" color={textPrimary}>
              No categories yet
            </Text>
            <Text color={textMuted}>Create your first category to organize your products.</Text>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              bg={accentPrimary}
              color={buttonText}
              borderRadius="xl"
              _hover={{ opacity: 0.9 }}
            >
              <Icon as={Plus} mr={2} />
              Create Category
            </Button>
          </VStack>
        </Box>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
          {categories.map((category) => {
            const productCount = category.products?.length || 0;

            return (
              <Box
                key={category.id}
                p={6}
                bg={bgCard}
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderDefault}
                cursor="pointer"
                transition="all 0.3s ease"
                role="group"
                onClick={() => handleCategoryClick(category)}
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: shadowCard,
                  borderColor: borderHover,
                  bg: bgCardHover,
                }}
              >
                <VStack gap={4} align="stretch">
                  {/* Category Icon */}
                  <HStack justify="space-between">
                    <Box
                      p={4}
                      bg={accentPrimary}
                      borderRadius="xl"
                      display="inline-flex"
                      opacity={0.9}
                    >
                      <Icon as={FolderOpen} boxSize={6} color={buttonText} />
                    </Box>
                    <Icon
                      as={ArrowRight}
                      boxSize={5}
                      color={textMuted}
                      transition="all 0.3s ease"
                      _groupHover={{
                        transform: "translateX(4px)",
                        color: accentPrimary,
                      }}
                    />
                  </HStack>

                  {/* Category Title */}
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color={textPrimary}
                    transition="color 0.3s ease"
                    _groupHover={{ color: accentPrimary }}
                  >
                    {category.title}
                  </Text>

                  {/* Product Count */}
                  <HStack justify="space-between" align="center">
                    <HStack gap={2}>
                      <Icon as={Package} boxSize={4} color={textMuted} />
                      <Text color={textMuted} fontSize="sm">
                        {productCount} {productCount === 1 ? "product" : "products"}
                      </Text>
                    </HStack>
                    <Badge
                      bg={productCount > 0 ? statusSuccess : borderDefault}
                      color={productCount > 0 ? "white" : textMuted}
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                    >
                      {productCount > 0 ? "Active" : "Empty"}
                    </Badge>
                  </HStack>
                </VStack>
              </Box>
            );
          })}
        </Grid>
      )}

      {/* Add Category Modal */}
      <Dialog.Root open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <Dialog.Content className="sm:max-w-md">
          <Dialog.Header>
            <Dialog.Title>Add New Category</Dialog.Title>
            <Dialog.Description>
              Create a new category to organize your products.
            </Dialog.Description>
          </Dialog.Header>
          <div className="py-4">
            <Input
              placeholder="Category name"
              value={newCategoryTitle}
              onChange={(e) => setNewCategoryTitle(e.target.value)}
              bg={bgMain}
              border="1px solid"
              borderColor={borderDefault}
              color={textPrimary}
              _placeholder={{ color: textMuted }}
              _focus={{ borderColor: accentPrimary }}
              borderRadius="xl"
              py={5}
            />
          </div>
          <Dialog.Footer>
            <HStack gap={3}>
              <Button
                variant="ghost"
                onClick={() => setIsAddModalOpen(false)}
                color={textMuted}
                _hover={{ bg: bgCardHover }}
                borderRadius="xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddCategory}
                bg={accentPrimary}
                color={buttonText}
                borderRadius="xl"
                disabled={!newCategoryTitle.trim() || isCreating}
                _hover={{ opacity: 0.9 }}
              >
                {isCreating ? <Spinner size="sm" mr={2} /> : <Icon as={Plus} mr={2} />}
                Create Category
              </Button>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
};

export default Categories;
