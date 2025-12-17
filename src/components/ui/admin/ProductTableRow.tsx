import useThemeColors from "@/hooks/useThemeColors";
import type { IProduct } from "@/interfaces";
import { Badge, Box, Flex, HStack, Icon, IconButton, Image, Table, Text } from "@chakra-ui/react";
import {  Edit, Eye, Package, Trash2 } from "lucide-react";
interface IProps {
  product: IProduct;
  apiUrl:string
  stockStatus:{ label: string, color: string }
  handleView:(product:IProduct)=>void
  handleEdit:(product:IProduct)=>void
  handleDelete:(product:IProduct)=>void
}
export default function ProductTableRow({ product,apiUrl,stockStatus, handleView,handleEdit,handleDelete }:IProps){

  const {
    textPrimary,
    textMuted,
    bgCardHover,
    borderDefault,
    accentPrimary,
    statusError,
  } = useThemeColors();


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
              <Flex w="100%" h="100%" align="center" justify="center">
                <Icon as={Package} boxSize={5} color={textMuted} />
              </Flex>
            )}
          </Box>
          <Box>
            <Text fontWeight="600" color={textPrimary} mb={0.5}>
              {product.title}
            </Text>
            <Text fontSize="sm" color={textMuted} lineClamp={1} maxW="250px">
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
          {product.category?.title || "UnCategorized"}
        </Badge>
      </Table.Cell>
      <Table.Cell py={4} px={6}>
        <Text fontWeight="600" color={textPrimary}>
          ${product.price.toFixed(2)}
        </Text>
      </Table.Cell>
      <Table.Cell py={4} px={6}>
        <HStack gap={2}>
          <Box w={2} h={2} borderRadius="full" bg={stockStatus.color} />
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
            onClick={() => handleView(product)}
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
            onClick={() => handleEdit(product)}
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
            onClick={() => handleDelete(product)}
          >
            <Trash2 size={18} />
          </IconButton>
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
}
