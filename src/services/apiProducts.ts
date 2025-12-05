import axiosInstance from "@/config/axios.config";

export async function getProducts(){
  const {data} = await axiosInstance.get('/products?populate=*')
  console.log(data)
  if(!data){
    throw new Error('Failed to fetch products')
  }
  return data;
}