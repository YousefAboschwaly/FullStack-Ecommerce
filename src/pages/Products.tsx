import { Grid } from "@chakra-ui/react";
import ProductCard from './../components/productCard';

export default function Products() {
  return (
    <Grid m={30} templateColumns={"repeat(auto-fill , minmax(300px,1fr))"} gap={6} >
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
    </Grid>
  )
}
