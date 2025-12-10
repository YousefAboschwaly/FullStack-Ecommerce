import type { IProduct } from "@/interfaces";
import { getProducts } from "@/services/productsApi";
import { useQuery } from "@tanstack/react-query";

interface ProductsResponse {
  data: IProduct[];
}
export default function useProducts() {
  const { data, isLoading, error } = useQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: getProducts,
    throwOnError: true,
  });

  return { data: data?.data ?? [], isLoading, error };
}
