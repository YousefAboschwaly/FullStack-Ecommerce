import type { IProduct } from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookieService from "./cookieService";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<{data:IProduct[]}, { page: number }>({
      query: ({ page }) =>
        `/api/products?fields=title,description,price,stock&populate=*&pagination[pageSize]=12&pagination[page]=${page}`,
      providesTags: ["Products"],
    }),

    getProduct: builder.query<{data:IProduct}, string>({
      query: (id) =>
        `/api/products/${id}?populate=*&fields=title,description,price,stock`,
      providesTags: (_result, _error, id) => [
        { type: "Products", id },
      ],
    }),

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
