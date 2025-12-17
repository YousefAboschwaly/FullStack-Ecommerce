import { useThemeColors } from "@/hooks/useThemeColors";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { ImagePlus, Package, X } from "lucide-react";
import { memo, useEffect, useState, type ChangeEvent } from "react";

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  stock: number;
  thumbnail: File | string | null;
}

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  mode: "create" | "edit";
  initialData?: Partial<ProductFormData>;
  isLoading?: boolean;
}

const ProductFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  initialData,
  isLoading = false,
}: ProductFormModalProps) => {
  const {
    bgCard,
    bgOverlay,
    bgCardHover,
    textPrimary,
    textMuted,
    borderDefault,
    borderHover,
    accentPrimary,
    statusError,
  } = useThemeColors();

  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    thumbnail: null,
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

  // Reset form when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.title || "",
          description: initialData.description || "",
          price: initialData.price || 0,
          stock: initialData.stock || 0,
          thumbnail: initialData.thumbnail || null,
        });
        if (typeof initialData.thumbnail === "string") {
          setThumbnailPreview(initialData.thumbnail);
        }
      } else {
        setFormData({
          title: "",
          description: "",
          price: 0,
          stock: 0,
          thumbnail: null,
        });
        setThumbnailPreview(null);
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
    // Clear error when user types
    if (errors[name as keyof ProductFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (errors.thumbnail) {
        setErrors((prev) => ({ ...prev, thumbnail: undefined }));
      }
    }
  };

  const removeThumbnail = () => {
    setFormData((prev) => ({ ...prev, thumbnail: null }));
    setThumbnailPreview(null);
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    if (formData.stock < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      price: 0,
      stock: 0,
      thumbnail: null,
    });
    setThumbnailPreview(null);
    setErrors({});
    onClose();
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={1000}
      display={isOpen ? "flex" : "none"}
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      {/* Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        onClick={handleClose}
        bg={bgOverlay}
        backdropFilter="blur(4px)"
      />

      {/* Modal Content */}
      <Box
        position="relative"
        bg={bgCard}
        borderRadius="2xl"
        border="1px solid"
        borderColor={borderDefault}
        maxW="550px"
        w="100%"
        maxH="90vh"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        {/* Header */}
        <Flex
          justify="space-between"
          align="center"
          px={6}
          py={5}
          borderBottom="1px solid"
          borderColor={borderDefault}
        >
          <HStack gap={3}>
            <Flex
              w="40px"
              h="40px"
              borderRadius="xl"
              bg={`${accentPrimary}15`}
              align="center"
              justify="center"
            >
              <Icon as={Package} boxSize={5} color={accentPrimary} />
            </Flex>
            <Box>
              <Text fontSize="lg" fontWeight="700" color={textPrimary}>
                {mode === "create" ? "Add New Product" : "Edit Product"}
              </Text>
              <Text fontSize="sm" color={textMuted}>
                {mode === "create"
                  ? "Fill in the details to add a new product"
                  : "Update the product information"}
              </Text>
            </Box>
          </HStack>
          <Button
            size="sm"
            variant="ghost"
            borderRadius="lg"
            color={textMuted}
            _hover={{ bg: borderDefault }}
            onClick={handleClose}
            minW="auto"
            p={2}
          >
            <X size={20} />
          </Button>
        </Flex>

        {/* Body - Scrollable */}
        <Box flex={1} overflowY="auto" px={6} py={5}>
          <VStack gap={5} align="stretch">
            {/* Thumbnail Upload */}
            <Box>
              <Text fontSize="sm" fontWeight="600" color={textPrimary} mb={2}>
                Product Image
              </Text>
              <Box position="relative">
                {thumbnailPreview ? (
                  <Box
                    position="relative"
                    borderRadius="xl"
                    overflow="hidden"
                    border="2px solid"
                    borderColor={borderDefault}
                  >
                    <Image
                      src={thumbnailPreview}
                      alt="Product thumbnail"
                      w="100%"
                      h="200px"
                      objectFit="contain"
                      bg={bgCardHover}
                    />
                    <Button
                      position="absolute"
                      top={2}
                      right={2}
                      size="sm"
                      borderRadius="full"
                      bg="rgba(0,0,0,0.6)"
                      color="white"
                      _hover={{ bg: "rgba(0,0,0,0.8)" }}
                      onClick={removeThumbnail}
                      minW="auto"
                      p={2}
                    >
                      <X size={16} />
                    </Button>
                  </Box>
                ) : (
                  <Box
                    as="label"
                    htmlFor="thumbnail-upload"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    w="100%"
                    h="180px"
                    borderRadius="xl"
                    border="2px dashed"
                    borderColor={errors.thumbnail ? statusError : borderDefault}
                    bg={bgCardHover}
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{ borderColor: accentPrimary, bg: `${accentPrimary}08` }}
                  >
                    <Flex
                      w="50px"
                      h="50px"
                      borderRadius="full"
                      bg={`${accentPrimary}15`}
                      align="center"
                      justify="center"
                      mb={3}
                    >
                      <Icon as={ImagePlus} boxSize={6} color={accentPrimary} />
                    </Flex>
                    <Text fontSize="sm" fontWeight="600" color={textPrimary} mb={1}>
                      Click to upload image
                    </Text>
                    <Text fontSize="xs" color={textMuted}>
                      PNG, JPG, WEBP up to 5MB
                    </Text>
                  </Box>
                )}
                <Input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  display="none"
                />
              </Box>
            </Box>

            {/* Title */}
            <Box>
              <Text fontSize="sm" fontWeight="600" color={textPrimary} mb={2}>
                Title <Text as="span" color={statusError}>*</Text>
              </Text>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter product title"
                bg={bgCardHover}
                border="1px solid"
                borderColor={errors.title ? statusError : borderDefault}
                borderRadius="xl"
                px={4}
                py={3}
                color={textPrimary}
                _placeholder={{ color: textMuted }}
                _hover={{ borderColor: borderHover }}
                _focus={{ borderColor: accentPrimary, boxShadow: `0 0 0 1px ${accentPrimary}` }}
              />
              {errors.title && (
                <Text fontSize="xs" color={statusError} mt={1}>
                  {errors.title}
                </Text>
              )}
            </Box>

            {/* Description */}
            <Box>
              <Text fontSize="sm" fontWeight="600" color={textPrimary} mb={2}>
                Description <Text as="span" color={statusError}>*</Text>
              </Text>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                bg={bgCardHover}
                border="1px solid"
                borderColor={errors.description ? statusError : borderDefault}
                borderRadius="xl"
                px={4}
                py={3}
                color={textPrimary}
                _placeholder={{ color: textMuted }}
                _hover={{ borderColor: borderHover }}
                _focus={{ borderColor: accentPrimary, boxShadow: `0 0 0 1px ${accentPrimary}` }}
                minH="100px"
                resize="vertical"
              />
              {errors.description && (
                <Text fontSize="xs" color={statusError} mt={1}>
                  {errors.description}
                </Text>
              )}
            </Box>

            {/* Price & Stock Row */}
            <HStack gap={4}>
              {/* Price */}
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="600" color={textPrimary} mb={2}>
                  Price ($) <Text as="span" color={statusError}>*</Text>
                </Text>
                <Input
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  bg={bgCardHover}
                  border="1px solid"
                  borderColor={errors.price ? statusError : borderDefault}
                  borderRadius="xl"
                  px={4}
                  py={3}
                  color={textPrimary}
                  _placeholder={{ color: textMuted }}
                  _hover={{ borderColor: borderHover }}
                  _focus={{ borderColor: accentPrimary, boxShadow: `0 0 0 1px ${accentPrimary}` }}
                />
                {errors.price && (
                  <Text fontSize="xs" color={statusError} mt={1}>
                    {errors.price}
                  </Text>
                )}
              </Box>

              {/* Stock */}
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="600" color={textPrimary} mb={2}>
                  Stock <Text as="span" color={statusError}>*</Text>
                </Text>
                <Input
                  name="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="0"
                  bg={bgCardHover}
                  border="1px solid"
                  borderColor={errors.stock ? statusError : borderDefault}
                  borderRadius="xl"
                  px={4}
                  py={3}
                  color={textPrimary}
                  _placeholder={{ color: textMuted }}
                  _hover={{ borderColor: borderHover }}
                  _focus={{ borderColor: accentPrimary, boxShadow: `0 0 0 1px ${accentPrimary}` }}
                />
                {errors.stock && (
                  <Text fontSize="xs" color={statusError} mt={1}>
                    {errors.stock}
                  </Text>
                )}
              </Box>
            </HStack>
          </VStack>
        </Box>

        {/* Footer */}
        <HStack
          gap={3}
          px={6}
          py={5}
          borderTop="1px solid"
          borderColor={borderDefault}
          justify="flex-end"
        >
          <Button
            variant="outline"
            borderRadius="xl"
            borderColor={borderDefault}
            color={textPrimary}
            fontWeight="600"
            px={6}
            py={5}
            _hover={{ bg: borderDefault }}
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            borderRadius="xl"
            bg={accentPrimary}
            color="white"
            fontWeight="600"
            px={6}
            py={5}
            _hover={{ opacity: 0.9 }}
            onClick={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
          >
            {mode === "create" ? "Create Product" : "Save Changes"}
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default memo(ProductFormModal);
