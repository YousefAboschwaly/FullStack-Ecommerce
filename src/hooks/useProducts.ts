import type { IProduct } from "@/interfaces";
import { getProducts } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";

interface ProductsResponse {
  data: IProduct[];
}
export default function useProducts() {
  const { data, isLoading, error } = useQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { data: data?.data ?? [], isLoading, error };
}
