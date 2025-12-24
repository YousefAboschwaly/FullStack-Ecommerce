"use client"

import { useThemeColors } from "@/hooks/useThemeColors"
import { Box, Button, Field, Flex, HStack, Icon, Input, Text, Textarea, VStack } from "@chakra-ui/react"
import { FolderOpen, X } from "lucide-react"
import { memo, useEffect } from "react"
import { useForm } from "react-hook-form"

interface CategoryFormData {
  title: string
  description?: string
}

interface CategoryFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CategoryFormData) => void
  mode: "create" | "edit"
  initialData?: Partial<CategoryFormData>
  isLoading?: boolean
}

const CategoryFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  initialData,
  isLoading = false,
}: CategoryFormModalProps) => {
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
  } = useThemeColors()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>()

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          title: initialData.title || "",
          description: initialData.description || "",
        })
      } else {
        reset({
          title: "",
          description: "",
        })
      }
    }
  }, [isOpen, initialData, reset])

  const onFormSubmit = (data: CategoryFormData) => {
    onSubmit(data)
  }

  const handleClose = () => {
    reset({
      title: "",
      description: "",
    })
    onClose()
  }

  if (!isOpen) return null

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
        <Flex justify="space-between" align="center" px={6} py={5} borderBottom="1px solid" borderColor={borderDefault}>
          <HStack gap={3}>
            <Flex w="40px" h="40px" borderRadius="xl" bg={`${accentPrimary}15`} align="center" justify="center">
              <Icon as={FolderOpen} boxSize={5} color={accentPrimary} />
            </Flex>
            <Box>
              <Text fontSize="lg" fontWeight="700" color={textPrimary}>
                {mode === "create" ? "Add New Category" : "Edit Category"}
              </Text>
              <Text fontSize="sm" color={textMuted}>
                {mode === "create" ? "Fill in the details to add a new category" : "Update the category information"}
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

        {/* Body */}
        <Box flex={1} overflowY="auto" px={6} py={5}>
          <VStack as="form" gap={6} align="stretch" onSubmit={handleSubmit(onFormSubmit)} id="category-form">
            {/* Title */}
            <Field.Root invalid={!!errors.title}>
              <Field.Label>
                Category Name <Field.RequiredIndicator />
              </Field.Label>
              <Input
                {...register("title", {
                  required: "Category name is required",
                  minLength: {
                    value: 3,
                    message: "Category name must be at least 3 characters",
                  },
                })}
                placeholder="Enter category name"
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
              {errors.title && <Field.ErrorText>{errors.title.message}</Field.ErrorText>}
            </Field.Root>

            {/* Description */}
            <Field.Root invalid={!!errors.description}>
              <Field.Label>Description (Optional)</Field.Label>
              <Textarea
                {...register("description")}
                placeholder="Enter category description"
                bg={bgCardHover}
                border="2px solid"
                borderColor={borderDefault}
                _placeholder={{ color: textMuted }}
                color={textPrimary}
                _hover={{
                  borderColor: accentPrimary,
                }}
                _focus={{
                  borderColor: accentPrimary,
                  boxShadow: `0 0 0 1px ${accentPrimary}`,
                }}
                minH="100px"
                borderRadius="lg"
                resize="vertical"
              />
            </Field.Root>
          </VStack>
        </Box>

        {/* Footer */}
        <HStack gap={3} px={6} py={5} borderTop="1px solid" borderColor={borderDefault} justify="flex-end">
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
            form="category-form"
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
            {mode === "create" ? "Create Category" : "Save Changes"}
          </Button>
        </HStack>
      </Box>
    </Box>
  )
}

export default memo(CategoryFormModal)
