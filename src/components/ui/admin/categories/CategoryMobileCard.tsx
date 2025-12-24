"use client"

import useThemeColors from "@/hooks/useThemeColors"
import type { ICategory } from "@/interfaces"
import { Badge, Box, Flex, HStack, Icon, IconButton, Text, VStack } from "@chakra-ui/react"
import { Edit, Eye, FolderOpen, Trash2 } from "lucide-react"

interface IProps {
  category: ICategory
  productCountStatus: { label: string; color: string }
  priceRange: string
  handleView: (category: ICategory) => void
  handleEdit: (category: ICategory) => void
  handleDelete: (category: ICategory) => void
}

export default function CategoryMobileCard({
  category,
  productCountStatus,
  priceRange,
  handleView,
  handleEdit,
  handleDelete,
}: IProps) {
  const { textPrimary, textMuted, bgCard, bgCardHover, borderDefault, accentPrimary, statusError } = useThemeColors()

  return (
    <Box
      key={category.id}
      p={4}
      bg={bgCard}
      borderRadius="xl"
      border="1px solid"
      borderColor={borderDefault}
      transition="all 0.2s"
      _hover={{ borderColor: accentPrimary }}
    >
      <Flex gap={4} mb={4}>
        <Flex
          w="70px"
          h="70px"
          borderRadius="lg"
          bg={`${accentPrimary}15`}
          align="center"
          justify="center"
          flexShrink={0}
        >
          <Icon as={FolderOpen} boxSize={8} color={accentPrimary} />
        </Flex>
        <VStack flex={1} align="stretch" gap={2}>
          <Text fontWeight="600" color={textPrimary} fontSize="lg">
            {category.title}
          </Text>
          <HStack justify="space-between">
            <HStack gap={2}>
              <Box w={2} h={2} borderRadius="full" bg={productCountStatus.color} />
              <Text fontSize="sm" color={textMuted}>
                {productCountStatus.label}
              </Text>
            </HStack>
            <Badge
              px={2}
              py={0.5}
              borderRadius="full"
              bg={bgCardHover}
              color={textPrimary}
              fontWeight="600"
              fontSize="xs"
            >
              {priceRange}
            </Badge>
          </HStack>
          <Text fontSize="xs" color={textMuted}>
            Created {new Date(category.createdAt).toLocaleDateString()}
          </Text>
        </VStack>
      </Flex>
      <Flex justify="flex-end" gap={2} borderTop="1px solid" borderColor={borderDefault} pt={3}>
        <IconButton
          aria-label="View category"
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
          onClick={() => handleView(category)}
        >
          <Eye size={16} />
        </IconButton>
        <IconButton
          aria-label="Edit category"
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
          onClick={() => handleEdit(category)}
        >
          <Edit size={16} />
        </IconButton>
        <IconButton
          aria-label="Delete category"
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
          onClick={() => handleDelete(category)}
        >
          <Trash2 size={16} />
        </IconButton>
      </Flex>
    </Box>
  )
}
