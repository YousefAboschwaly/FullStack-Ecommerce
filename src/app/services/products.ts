import type { IProduct, ProductFormData } from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookieService from "./cookieService";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    // GET All Products
getProducts: builder.query<{ data: IProduct[] }, { page: number }>({
  query: ({ page }) =>
    `/api/products?fields=title,description,price,stock&populate=*&pagination[pageSize]=12&pagination[page]=${page}`,
  providesTags: (result) =>
    result
      ? [
          { type: "Products", id: "LIST" },
          ...result.data.map((product) => ({
            type: "Products" as const,
            id: product.documentId,
          })),
        ]
      : [{ type: "Products", id: "LIST" }],
}),


    // GET Product Details 
    getProduct: builder.query<{data:IProduct}, string>({
      query: (id) =>
        `/api/products/${id}?populate=*&fields=title,description,price,stock`,
      providesTags: (_result, _error, id) => [
        { type: "Products", id },
      ],
    }),
    

    // DELETE Product 
    deleteAdminProduct: builder.mutation<undefined, string>({
      query: (id) =>{
        return{
          url:`/api/products/${id}`,
          method:"DELETE",
          headers:{
            Authorization:`Bearer ${cookieService.getCookie("jwt")}`
          }
        }
      },
       invalidatesTags:["Products"]

    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useDeleteAdminProductMutation
} = productsApi;
