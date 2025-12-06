import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ui/productCard";
import useProducts from "@/hooks/useProducts";

export default function Products() {
  const { data, error, isLoading } = useProducts();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <Grid
      m={30}
      templateColumns={"repeat(auto-fill , minmax(300px,1fr))"}
      gap={6}
    >
      {data.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Grid>
  );
}
