import { getProducts } from "@/services/apiProducts"
import { useQuery } from "@tanstack/react-query"

export default function useProducts() {

const {data,isLoading} = useQuery({
  queryKey: ['products'],
  queryFn:getProducts
})

  return {data,isLoading}
}
