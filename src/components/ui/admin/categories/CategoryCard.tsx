import useThemeColors from "@/hooks/useThemeColors";
import type { ICategory } from "@/interfaces";
import {
  Badge,
  Box,
  Button,
  CardBody,
  CardFooter,
  CardRoot,
  HStack,
  Heading,
  Icon,
  Text,
  VStack
} from "@chakra-ui/react";
import { Edit2, Package, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: ICategory;
  onDelete: (id: string) => void;
}

export default function CategoryCard({
  category,
  onDelete,
}: CategoryCardProps) {
  const {
    bgCard,
    bgCardHover,
    buttonText,
    borderDefault,
    accentPrimary,
    accentSecondary,
    textPrimary,
    textMuted,
    textSecondary,
    badgeCategoryBg,
    badgeCategoryText,
    badgeCategoryBorder,
    statusError,
  } = useThemeColors();

  const productCount = category.products?.length || 0;

  return (
    <CardRoot
      overflow="hidden"
      borderRadius="xl"
      borderWidth="1px"
      bg={bgCard}
      borderColor={borderDefault}
      transition="all 0.3s"
      _hover={{
        transform: "scale(1.05)",
        shadow: "2xl",
      }}
      backdropFilter="blur(4px)"
      boxShadow="md"
    >
      {/* Header with gradient accent */}
      <Box
        h="2px"
        bgGradient={`linear(to-r, ${accentPrimary}, ${accentSecondary})`}
      />

      <CardBody p={6}>
        <VStack align="stretch" gap={4}>
          {/* Category Title */}
          <Heading
            size="lg"
            fontWeight="bold"
            maxLines={1}
            textTransform="capitalize"
            color={textPrimary}
          >
            {category.title}
          </Heading>

          {/* Category ID */}
          <Text fontSize="sm" maxLines={1} color={textMuted}>
            ID: {category.documentId}
          </Text>

          {/* Product Count Badge */}
          <Badge
            px={4}
            py={2}
            borderRadius="lg"
            fontWeight="semibold"
            bg={badgeCategoryBg}
            color={badgeCategoryText}
            borderWidth="1px"
            borderColor={badgeCategoryBorder}
            w="fit-content"
          >
            <HStack gap={2}>
              <Icon as={Package} boxSize={4} />
              <span>
                {productCount} Product{productCount !== 1 ? "s" : ""}
              </span>
            </HStack>
          </Badge>

          {/* Products List Preview */}
          {productCount > 0 && (
            <VStack
              align="stretch"
              gap={2}
              pt={4}
              borderTopWidth="1px"
              borderTopColor={borderDefault}
            >
              <Text fontSize="sm" fontWeight="medium" color={textSecondary}>
                Products:
              </Text>
              <VStack align="stretch" gap={1}>
                {category.products!.slice(0, 3).map((product) => (
                  <Text
                    key={product.id}
                    fontSize="sm"
                    maxLines={1}
                    color={textMuted}
                  >
                    • {product.title}
                  </Text>
                ))}
                {productCount > 3 && (
                  <Text fontSize="sm" fontStyle="italic" color={textMuted}>
                    +{productCount - 3} more...
                  </Text>
                )}
              </VStack>
            </VStack>
          )}

          {/* Action Buttons */}
          <HStack
            gap={3}
            pt={4}
            borderTopWidth="1px"
            borderTopColor={borderDefault}
          >
            <Button
              as={Link}
              to={`/admin/categories/${category.id}/edit`}
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              py={2}
              px={3}
              borderRadius="lg"
              fontWeight="semibold"
              transition="all 0.3s"
              _hover={{ shadow: "lg" }}
              bg={accentPrimary}
              color={buttonText}
            >
              <Icon as={Edit2} boxSize={4} />
              Edit
            </Button>
            <Button
              onClick={() => onDelete(category.id.toString())}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              py={2}
              px={3}
              borderRadius="lg"
              fontWeight="semibold"
              transition="all 0.3s"
              _hover={{ shadow: "lg" }}
              bg={`${statusError}20`}
              color={statusError}
              borderWidth="1px"
              borderColor={`${statusError}40`}
            >
              <Icon as={Trash2} boxSize={4} />
              Delete
            </Button>
          </HStack>
        </VStack>
      </CardBody>

      {/* Stats Footer */}
      <CardFooter
        px={6}
        py={3}
        display="flex"
        justifyContent="space-between"
        fontSize="xs"
        fontWeight="medium"
        bg={bgCardHover}
        color={textSecondary}
      >
        <span>
          Created: {new Date(category.createdAt).toLocaleDateString()}
        </span>
        <span>
          Updated: {new Date(category.updatedAt).toLocaleDateString()}
        </span>
      </CardFooter>
    </CardRoot>
  );
}
