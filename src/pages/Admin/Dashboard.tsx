import { useGetProductsQuery } from "@/app/services/productApi";
import { useThemeColors } from "@/hooks/useThemeColors";
import {
  Box,
  Flex,
  Grid,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

const statsData = [
  { label: "Total Revenue", value: "$45,231.89", change: "+20.1%", icon: DollarSign, positive: true },
  { label: "Orders", value: "2,350", change: "+15.2%", icon: ShoppingCart, positive: true },
  { label: "Products", value: "1,234", change: "+8.4%", icon: Package, positive: true },
  { label: "Customers", value: "573", change: "+12.5%", icon: Users, positive: true },
];

const Dashboard = () => {
  const {
    bgCard,
    bgCardHover,
    textPrimary,
    textMuted,
    borderDefault,
    accentPrimary,
    statusSuccess,
  } = useThemeColors();
  const {data,isLoading,isError} = useGetProductsQuery({page:1})
  console.log({data,isLoading,isError})

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" color={textPrimary} mb={6}>
        Dashboard
      </Text>

      {/* Stats Grid */}
      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={6}
        mb={8}
      >
        {statsData.map((stat) => (
          <Box
            key={stat.label}
            p={6}
            bg={bgCard}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderDefault}
            transition="all 0.2s"
            _hover={{ borderColor: accentPrimary, transform: "translateY(-2px)" }}
          >
            <Flex justify="space-between" align="start" mb={4}>
              <Text fontSize="sm" color={textMuted} fontWeight="500">
                {stat.label}
              </Text>
              <Box
                p={2}
                bg={bgCardHover}
                borderRadius="lg"
              >
                <Icon as={stat.icon} boxSize={5} color={accentPrimary} />
              </Box>
            </Flex>
            <Text fontSize="2xl" fontWeight="bold" color={textPrimary} mb={1}>
              {stat.value}
            </Text>
            <HStack>
              <Text
                fontSize="sm"
                fontWeight="600"
                color={stat.positive ? statusSuccess : "red.500"}
              >
                {stat.change}
              </Text>
              <Text fontSize="xs" color={textMuted}>
                from last month
              </Text>
            </HStack>
          </Box>
        ))}
      </Grid>

      {/* Placeholder for additional content */}
      <Box
        p={8}
        bg={bgCard}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderDefault}
        minH="300px"
      >
        <Text fontSize="lg" fontWeight="600" color={textPrimary} mb={4}>
          Recent Activity
        </Text>
        <Text color={textMuted}>
          Dashboard content will appear here...
        </Text>
      </Box>
    </Box>
  );
};

export default Dashboard;
