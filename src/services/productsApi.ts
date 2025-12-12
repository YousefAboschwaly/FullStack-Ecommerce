import axiosInstance from "@/config/axios.config";

export async function getProducts() {
  const { data } = await axiosInstance.get("/products?fields=title,description,price,stock&populate=*");

  if (!data) {
    throw new Error("Failed to fetch products");
  }
  return data;
}
export async function getProduct(id: string) {
  const { data } = await axiosInstance.get(`/products/${id}?populate=*&fields=title,description,price,stock`);

  if (!data) {
    throw new Error("Failed to fetch product");
  }
  return data;
}
