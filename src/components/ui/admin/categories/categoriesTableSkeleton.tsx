import { useThemeColors } from "@/hooks/useThemeColors"
import { Box, Flex, HStack, Table, Stack, Skeleton } from "@chakra-ui/react"

interface CategoriesTableSkeletonProps {
  rows?: number
}

const CategoriesTableSkeleton = ({ rows = 5 }: CategoriesTableSkeletonProps) => {
  const { bgCard, bgCardHover, borderDefault, skeletonBase } = useThemeColors()

  return (
    <>
      {/* Desktop Table Skeleton */}
      <Box
        display={{ base: "none", lg: "block" }}
        bg={bgCard}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderDefault}
        overflow="hidden"
      >
        <Table.Root size="lg">
          <Table.Header>
            <Table.Row bg={bgCardHover}>
              <Table.ColumnHeader py={4} px={6}>
                <Skeleton height="16px" width="70px" bg={skeletonBase} borderRadius="md" />
              </Table.ColumnHeader>
              <Table.ColumnHeader py={4} px={6}>
                <Skeleton height="16px" width="60px" bg={skeletonBase} borderRadius="md" />
              </Table.ColumnHeader>
              <Table.ColumnHeader py={4} px={6}>
                <Skeleton height="16px" width="80px" bg={skeletonBase} borderRadius="md" />
              </Table.ColumnHeader>
              <Table.ColumnHeader py={4} px={6} textAlign="center">
                <Skeleton height="16px" width="60px" mx="auto" bg={skeletonBase} borderRadius="md" />
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Array.from({ length: rows }).map((_, index) => (
              <Table.Row key={index} borderBottom="1px solid" borderColor={borderDefault}>
                <Table.Cell py={4} px={6}>
                  <HStack gap={4}>
                    <Skeleton width="50px" height="50px" borderRadius="lg" bg={skeletonBase} />
                    <Box>
                      <Skeleton height="16px" width="120px" mb={2} bg={skeletonBase} borderRadius="md" />
                      <Skeleton height="12px" width="100px" bg={skeletonBase} borderRadius="md" />
                    </Box>
                  </HStack>
                </Table.Cell>
                <Table.Cell py={4} px={6}>
                  <HStack gap={2}>
                    <Skeleton width="8px" height="8px" borderRadius="full" bg={skeletonBase} />
                    <Skeleton height="14px" width="70px" bg={skeletonBase} borderRadius="md" />
                  </HStack>
                </Table.Cell>
                <Table.Cell py={4} px={6}>
                  <Skeleton height="24px" width="90px" borderRadius="full" bg={skeletonBase} />
                </Table.Cell>
                <Table.Cell py={4} px={6}>
                  <HStack justify="center" gap={2}>
                    <Skeleton width="32px" height="32px" borderRadius="lg" bg={skeletonBase} />
                    <Skeleton width="32px" height="32px" borderRadius="lg" bg={skeletonBase} />
                    <Skeleton width="32px" height="32px" borderRadius="lg" bg={skeletonBase} />
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      {/* Mobile Cards Skeleton */}
      <Stack display={{ base: "flex", lg: "none" }} gap={4}>
        {Array.from({ length: rows }).map((_, index) => (
          <Box key={index} p={4} bg={bgCard} borderRadius="xl" border="1px solid" borderColor={borderDefault}>
            <Flex gap={4} mb={4}>
              <Skeleton width="70px" height="70px" borderRadius="lg" bg={skeletonBase} flexShrink={0} />
              <Box flex={1}>
                <Skeleton height="18px" width="140px" mb={2} bg={skeletonBase} borderRadius="md" />
                <HStack justify="space-between" mb={2}>
                  <HStack gap={2}>
                    <Skeleton width="8px" height="8px" borderRadius="full" bg={skeletonBase} />
                    <Skeleton height="12px" width="60px" bg={skeletonBase} borderRadius="md" />
                  </HStack>
                  <Skeleton height="20px" width="70px" borderRadius="full" bg={skeletonBase} />
                </HStack>
                <Skeleton height="12px" width="100px" bg={skeletonBase} borderRadius="md" />
              </Box>
            </Flex>
            <Flex justify="flex-end" gap={2} borderTop="1px solid" borderColor={borderDefault} pt={3}>
              <Skeleton width="32px" height="32px" borderRadius="lg" bg={skeletonBase} />
              <Skeleton width="32px" height="32px" borderRadius="lg" bg={skeletonBase} />
              <Skeleton width="32px" height="32px" borderRadius="lg" bg={skeletonBase} />
            </Flex>
          </Box>
        ))}
      </Stack>
    </>
  )
}

export default CategoriesTableSkeleton
