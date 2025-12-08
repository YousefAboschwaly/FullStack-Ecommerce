import axiosInstance from "@/config/axios.config";

export async function getProducts() {
  const { data } = await axiosInstance.get("/products?populate=*");

  if (!data) {
    throw new Error("Failed to fetch products");
  }
  return data;
}
export async function getProduct(id: string) {
  const { data } = await axiosInstance.get(`/products/${id}?populate=*`);

  if (!data) {
    throw new Error("Failed to fetch product");
  }
  return data;
}
