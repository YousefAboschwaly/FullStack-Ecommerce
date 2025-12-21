/* eslint-disable react-hooks/set-state-in-effect */
import { useGetCategoriesQuery } from "@/app/services/categories";
import { useThemeColors } from "@/hooks/useThemeColors";
import type { ICategory, ProductFormData } from "@/interfaces";
import { productValidation } from "@/validation";
import {
  Box,
  Button,
  createListCollection,
  Field,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Portal,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { ImagePlus, Package, X } from "lucide-react";
import { memo, useEffect, useState, type ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";

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
    accentPrimary,
    accentPrimaryHover,
    buttonText,
    statusError,
  } = useThemeColors();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    control,
  } = useForm<ProductFormData>();
  const { data: categoriesData, isLoading: isCategoriesLoading, isError: isCategoriesError } = useGetCategoriesQuery();

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const categoriesItems = categoriesData?.data?.map((category: ICategory) => ({
    label: category.title,
    value: String(category.id),
  })) ?? [];
  
  const categoriesCollection = createListCollection({
    items: categoriesItems,
  });

  // Reset form when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        console.log(initialData)
        reset({
          title: initialData.title || "",
          description: initialData.description || "",
          price: initialData.price || 0,
          stock: initialData.stock || 0,
          category: initialData.category ?? undefined,
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
          category: undefined,
          thumbnail: null,
        });
        setThumbnailPreview(null);
        setThumbnailFile(null);
      }
    }
  }, [isOpen, initialData, reset]);

  // Set category value when categories load and we have initialData
  useEffect(() => {
    if (isOpen && initialData?.category && categoriesItems.length > 0) {
      setValue("category", initialData.category);
    }
  }, [isOpen, initialData?.category, categoriesItems.length, setValue]);

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
      category: undefined,
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
                  <label htmlFor="thumbnail-upload" style={{ cursor: "pointer" }}>
                    <Box
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
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color={textPrimary}
                        mb={1}
                      >
                        Click to upload image
                      </Text>
                      <Text fontSize="xs" color={textMuted}>
                        PNG, JPG, WEBP up to 5MB
                      </Text>
                    </Box>
                  </label>
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
                  boxShadow: `0 0 0 1px ${
                    errors.title ? statusError : accentPrimary
                  }`,
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
                  boxShadow: `0 0 0 1px ${
                    errors.description ? statusError : accentPrimary
                  }`,
                }}
                minH="100px"
                borderRadius="lg"
                resize="vertical"
              />
              {errors.description && (
                <Field.ErrorText>{errors.description.message}</Field.ErrorText>
              )}
            </Field.Root>

            {/* Category */}
            <Field.Root invalid={!!errors.category}>
              <Field.Label>
                Category <Field.RequiredIndicator />
              </Field.Label>

              {isCategoriesError ? (
                <Box
                  p={3}
                  borderRadius="lg"
                  bg={`${statusError}15`}
                  border="1px solid"
                  borderColor={statusError}
                >
                  <Text fontSize="sm" color={statusError}>
                    Failed to load categories. Please try again.
                  </Text>
                </Box>
              ) : isCategoriesLoading ? (
                <Box
                  h="48px"
                  bg={bgCardHover}
                  borderRadius="lg"
                  border="2px solid"
                  borderColor={borderDefault}
                  display="flex"
                  alignItems="center"
                  px={4}
                >
                  <Text fontSize="sm" color={textMuted}>
                    Loading categories...
                  </Text>
                </Box>
              ) : (
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select.Root
                      collection={categoriesCollection}
                      value={field.value ? [String(field.value)] : []}
                      onValueChange={(e) => field.onChange(Number(e.value[0]))}
                    >
                      <Select.HiddenSelect />

                      <Select.Control
                        h="48px"
                        bg={bgCardHover}
                        borderRadius="lg"
                        border="2px solid"
                        borderColor={
                          errors.category ? statusError : borderDefault
                        }
                      >
                        <Select.Trigger border={0}>
                          <Select.ValueText placeholder="Select Category" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>

                      <Portal>
                        <Select.Positioner>
                          <Select.Content>
                            {categoriesItems.map((item) => (
                              <Select.Item key={item.value} item={item}>
                                {item.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  )}
                />
              )}

              {errors.category && (
                <Field.ErrorText>{errors.category.message}</Field.ErrorText>
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
                    boxShadow: `0 0 0 1px ${
                      errors.price ? statusError : accentPrimary
                    }`,
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
                    boxShadow: `0 0 0 1px ${
                      errors.stock ? statusError : accentPrimary
                    }`,
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
