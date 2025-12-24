"use client";

import useThemeColors from "@/hooks/useThemeColors";
import type { ICategory } from "@/interfaces";
import {
  Badge,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Table,
  Text,
} from "@chakra-ui/react";
import { Edit, Eye, FolderOpen, Trash2 } from "lucide-react";

interface IProps {
  category: ICategory;
  productCountStatus: { label: string; color: string };
  priceRange: string;
  handleView: (category: ICategory) => void;
  handleEdit: (category: ICategory) => void;
  handleDelete: (category: ICategory) => void;
}
const baseUrl = import.meta.env.VITE_API_URL;
export default function CategoryTableRow({
  category,
  productCountStatus,
  priceRange,
  handleView,
  handleEdit,
  handleDelete,
}: IProps) {
  const {
    textPrimary,
    textMuted,
    bgCardHover,
    borderDefault,
    accentPrimary,
    statusError,
  } = useThemeColors();

  console.log(category.products?.at(0));
  return (
    <Table.Row
      key={category.id}
      transition="all 0.2s"
      _hover={{ bg: bgCardHover }}
      borderBottom="1px solid"
      borderColor={borderDefault}
    >
      <Table.Cell py={4} px={6}>
        <HStack gap={4}>
          <Flex
            w="64px"
            h="64px"
            borderRadius="lg"
            bg={`${accentPrimary}15`}
            align="center"
            justify="center"
            flexShrink={0}
          >
            {category.products?.at(0)?.thumbnail ? (
              <Image
                src={baseUrl + category.products.at(0)?.thumbnail?.url}
                alt={category.title}
                objectFit="cover"
                borderRadius="lg"
              />
            ) : (
              <Icon as={FolderOpen} boxSize={6} color={accentPrimary} />
            )}
          </Flex>
          <Box>
            <Text fontWeight="600" color={textPrimary} mb={0.5}>
              {category.title}
            </Text>
            <Text fontSize="sm" color={textMuted}>
              Created {new Date(category.createdAt).toLocaleDateString()}
            </Text>
          </Box>
        </HStack>
      </Table.Cell>
      <Table.Cell py={4} px={6}>
        <HStack gap={2}>
          <Box w={2} h={2} borderRadius="full" bg={productCountStatus.color} />
          <Text fontSize="sm" color={textPrimary} fontWeight="500">
            {productCountStatus.label}
          </Text>
        </HStack>
      </Table.Cell>
      <Table.Cell py={4} px={6}>
        <Badge
          px={3}
          py={1}
          borderRadius="full"
          bg={bgCardHover}
          color={textPrimary}
          fontWeight="600"
          fontSize="sm"
        >
          {priceRange}
        </Badge>
      </Table.Cell>
      <Table.Cell py={4} px={6}>
        <HStack justify="center" gap={1}>
          <IconButton
            aria-label="View category"
            size="sm"
            variant="ghost"
            borderRadius="lg"
            color={textMuted}
            _hover={{ bg: bgCardHover, color: accentPrimary }}
            onClick={() => handleView(category)}
          >
            <Eye size={18} />
          </IconButton>
          <IconButton
            aria-label="Edit category"
            size="sm"
            variant="ghost"
            borderRadius="lg"
            color={textMuted}
            _hover={{ bg: bgCardHover, color: accentPrimary }}
            onClick={() => handleEdit(category)}
          >
            <Edit size={18} />
          </IconButton>
          <IconButton
            aria-label="Delete category"
            size="sm"
            variant="ghost"
            borderRadius="lg"
            color={textMuted}
            _hover={{ bg: "red.50", color: statusError }}
            onClick={() => handleDelete(category)}
          >
            <Trash2 size={18} />
          </IconButton>
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
}
