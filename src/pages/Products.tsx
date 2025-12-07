import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ui/productCard";
import useProducts from "@/hooks/useProducts";
import ProductSkeleton from "@/components/ui/productCardSkeleton";
import ErrorHandler from "@/components/ui/ErrorHandler";

export default function Products() {
  const { data,isLoading ,error} = useProducts();
  if (isLoading) return <Grid
      m={30}
      templateColumns={"repeat(auto-fill , minmax(300px,1fr))"}
      gap={6}
    >
      {Array.from({length:12},(_,i)=><ProductSkeleton key={i}/>)}
    </Grid>
  if (error) return <ErrorHandler error={"Failed to fetch Products"} />;

  return (
    <Grid
      templateColumns={"repeat(auto-fill , minmax(300px,1fr))"}
      gap={6}
    >
      {data.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Grid>
  );
}
