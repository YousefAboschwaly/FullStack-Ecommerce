
import type { ICategory } from "@/interfaces"
import { Box, SimpleGrid, Text } from "@chakra-ui/react"
import CategoryCard from "./category-card"

interface CategoriesGridProps {
  categories: ICategory[]
  onDelete: (id: string) => void
}

export default function CategoriesGrid({ categories, onDelete }: CategoriesGridProps) {
  if (categories.length === 0) {
    return (
      <Box textAlign="center" py={16}>
        <Text fontSize="xl" color="gray.400" mb={4}>
          No categories found
        </Text>
        <Text color="gray.500">
          Create your first category to get started
        </Text>
      </Box>
    )
  }

  return (
    <SimpleGrid 
      columns={{ base: 1, md: 2, lg: 3 }} 
      spacing={6}
      autoRows="max-content"
    >
      {categories.map((category) => (
        <CategoryCard 
          key={category.id} 
          category={category} 
          onDelete={onDelete} 
        />
      ))}
    </SimpleGrid>
  )
}