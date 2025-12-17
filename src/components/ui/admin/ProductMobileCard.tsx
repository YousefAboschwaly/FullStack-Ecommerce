import useThemeColors from "@/hooks/useThemeColors";
import type { IProduct } from "@/interfaces";
import { Badge, Box, Flex, HStack, Icon, IconButton, Image, Text } from "@chakra-ui/react";
import {  Edit, Eye, Package, Trash2 } from "lucide-react";

interface IProps {
  product: IProduct;
  apiUrl:string
  stockStatus:{ label: string, color: string }
  handleView:(product:IProduct)=>void
  handleEdit:(product:IProduct)=>void
  handleDelete:(product:IProduct)=>void
}

export default function ProductMobileCard({ product,apiUrl,stockStatus, handleView,handleEdit,handleDelete }: IProps) {
  const {
    textPrimary,
    textMuted,
    bgCard,
    bgCardHover,
    borderDefault,
    accentPrimary,
    statusError,
  } = useThemeColors();

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
            <Text fontWeight="700" color={accentPrimary} fontSize="lg">
              ${product.price.toFixed(2)}
            </Text>
            <HStack gap={1}>
              <Box w={2} h={2} borderRadius="full" bg={stockStatus.color} />
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
          onClick={() => handleView(product)}
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
          onClick={() => handleEdit(product)}
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
          onClick={() => handleDelete(product)}
        >
          <Trash2 size={16} />
        </IconButton>
      </Flex>
    </Box>
  );
}
