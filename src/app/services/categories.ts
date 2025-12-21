import type { ICategories } from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  tagTypes: ["Categories"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    // GET All Categories
    getCategories: builder.query<ICategories, void>({
      query: () => `/api/categories`,
      providesTags: ["Categories"],
    }),

      // Get Categories with Product 
    getCategoriesWithProducts: builder.query({
      query: () => `/api/categories?populate=products`,
    }),
  }),
});

export const { useGetCategoriesQuery , useGetCategoriesWithProductsQuery } = categoriesApi;
