/* eslint-disable react-hooks/exhaustive-deps */
import { useThemeColors } from "@/hooks/useThemeColors";
import {
  Box,
  Button,
  Field,
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
import { useForm } from "react-hook-form";

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

// Validation rules
const productValidation = {
  title: {
    required: "Title is required",
    minLength: { value: 3, message: "Title must be at least 3 characters" },
    maxLength: { value: 100, message: "Title must be less than 100 characters" },
  },
  description: {
    required: "Description is required",
    minLength: { value: 10, message: "Description must be at least 10 characters" },
    maxLength: { value: 500, message: "Description must be less than 500 characters" },
  },
  price: {
    required: "Price is required",
    min: { value: 0.01, message: "Price must be greater than 0" },
    max: { value: 999999, message: "Price must be less than 999999" },
  },
  stock: {
    required: "Stock is required",
    min: { value: 0, message: "Stock cannot be negative" },
    max: { value: 999999, message: "Stock must be less than 999999" },
  },
};

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
    accentPrimary,
    accentPrimaryHover,
    buttonText,
    statusError,
  } = useThemeColors();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>();

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // Reset form when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
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
        reset({
          title: "",
          description: "",
          price: 0,
          stock: 0,
          thumbnail: null,
        });
        setThumbnailPreview(null);
        setThumbnailFile(null);
      }
    }
  }, [isOpen, initialData]);

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  const onFormSubmit = (data: ProductFormData) => {
    onSubmit({
      ...data,
      thumbnail: thumbnailFile || initialData?.thumbnail || null,
    });
  };

  const handleClose = () => {
    reset({
      title: "",
      description: "",
      price: 0,
      stock: 0,
      thumbnail: null,
    });
    setThumbnailPreview(null);
    setThumbnailFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={1000}
      display="flex"
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
        borderRadius="xl"
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
          <VStack
            as="form"
            gap={6}
            align="stretch"
            onSubmit={handleSubmit(onFormSubmit)}
            id="product-form"
          >
            {/* Thumbnail Upload */}
            <Box>
              <Text fontSize="sm" fontWeight="600" color={textPrimary} mb={2}>
                Product Image
              </Text>
              <Box position="relative">
                {thumbnailPreview ? (
                  <Box
                    position="relative"
                    borderRadius="lg"
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
                    borderRadius="lg"
                    border="2px dashed"
                    borderColor={borderDefault}
                    bg={bgCardHover}
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      borderColor: accentPrimary,
                      bg: `${accentPrimary}08`,
                    }}
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
            <Field.Root invalid={!!errors.title}>
              <Field.Label>
                Title <Field.RequiredIndicator />
              </Field.Label>
              <Input
                {...register("title", productValidation.title)}
                placeholder="Enter product title"
                bg={bgCardHover}
                border="2px solid"
                borderColor={errors.title ? statusError : borderDefault}
                _placeholder={{ color: textMuted }}
                color={textPrimary}
                _hover={{
                  borderColor: errors.title ? statusError : accentPrimary,
                }}
                _focus={{
                  borderColor: errors.title ? statusError : accentPrimary,
                  boxShadow: `0 0 0 1px ${errors.title ? statusError : accentPrimary}`,
                }}
                h="48px"
                borderRadius="lg"
              />
              {errors.title && (
                <Field.ErrorText>{errors.title.message}</Field.ErrorText>
              )}
            </Field.Root>

            {/* Description */}
            <Field.Root invalid={!!errors.description}>
              <Field.Label>
                Description <Field.RequiredIndicator />
              </Field.Label>
              <Textarea
                {...register("description", productValidation.description)}
                placeholder="Enter product description"
                bg={bgCardHover}
                border="2px solid"
                borderColor={errors.description ? statusError : borderDefault}
                _placeholder={{ color: textMuted }}
                color={textPrimary}
                _hover={{
                  borderColor: errors.description ? statusError : accentPrimary,
                }}
                _focus={{
                  borderColor: errors.description ? statusError : accentPrimary,
                  boxShadow: `0 0 0 1px ${errors.description ? statusError : accentPrimary}`,
                }}
                minH="100px"
                borderRadius="lg"
                resize="vertical"
              />
              {errors.description && (
                <Field.ErrorText>{errors.description.message}</Field.ErrorText>
              )}
            </Field.Root>

            {/* Price & Stock Row */}
            <HStack gap={4}>
              {/* Price */}
              <Field.Root invalid={!!errors.price} flex={1}>
                <Field.Label>
                  Price ($) <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  {...register("price", {
                    ...productValidation.price,
                    valueAsNumber: true,
                  })}
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  bg={bgCardHover}
                  border="2px solid"
                  borderColor={errors.price ? statusError : borderDefault}
                  _placeholder={{ color: textMuted }}
                  color={textPrimary}
                  _hover={{
                    borderColor: errors.price ? statusError : accentPrimary,
                  }}
                  _focus={{
                    borderColor: errors.price ? statusError : accentPrimary,
                    boxShadow: `0 0 0 1px ${errors.price ? statusError : accentPrimary}`,
                  }}
                  h="48px"
                  borderRadius="lg"
                />
                {errors.price && (
                  <Field.ErrorText>{errors.price.message}</Field.ErrorText>
                )}
              </Field.Root>

              {/* Stock */}
              <Field.Root invalid={!!errors.stock} flex={1}>
                <Field.Label>
                  Stock <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  {...register("stock", {
                    ...productValidation.stock,
                    valueAsNumber: true,
                  })}
                  type="number"
                  min="0"
                  placeholder="0"
                  bg={bgCardHover}
                  border="2px solid"
                  borderColor={errors.stock ? statusError : borderDefault}
                  _placeholder={{ color: textMuted }}
                  color={textPrimary}
                  _hover={{
                    borderColor: errors.stock ? statusError : accentPrimary,
                  }}
                  _focus={{
                    borderColor: errors.stock ? statusError : accentPrimary,
                    boxShadow: `0 0 0 1px ${errors.stock ? statusError : accentPrimary}`,
                  }}
                  h="48px"
                  borderRadius="lg"
                />
                {errors.stock && (
                  <Field.ErrorText>{errors.stock.message}</Field.ErrorText>
                )}
              </Field.Root>
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
            borderRadius="lg"
            borderColor={borderDefault}
            color={textPrimary}
            fontWeight="semibold"
            h="48px"
            px={6}
            _hover={{ bg: bgCardHover }}
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="product-form"
            borderRadius="lg"
            bg={accentPrimary}
            color={buttonText}
            fontWeight="semibold"
            h="48px"
            px={6}
            _hover={{ bg: accentPrimaryHover }}
            transition="all 0.2s"
            loading={isLoading}
          >
            {mode === "create" ? "Create Product" : "Save Changes"}
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default memo(ProductFormModal);