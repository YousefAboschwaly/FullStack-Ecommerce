import type { IProduct } from "@/interfaces";
import { getProduct } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";

interface ProductsResponse {
  data: IProduct;
}
export default function useProduct(id: string) {
  const { data, isLoading, error } = useQuery<ProductsResponse>({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  return { data: data?.data ?? {}, isLoading, error };
}
