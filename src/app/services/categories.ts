import type { ICategories, ICategory } from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  tagTypes: ["Categories", "Categories_with_Products"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    // GET All Categories
    getCategories: builder.query<ICategories, void>({
      query: () => `/api/categories`,
      providesTags: (result) =>
        result
          ? [
              { type: "Categories", id: "LIST" },
              ...result.data.map((cat: ICategory) => ({
                type: "Categories" as const,
                id: cat.id,
              })),
            ]
          : [{ type: "Categories", id: "LIST" }],
    }),

    // GET Categories with Products
    getCategoriesWithProducts: builder.query<ICategories, void>({
      query: () => `/api/categories?populate=products`,
      providesTags: (result) =>
        result
          ? [
              { type: "Categories_with_Products", id: "LIST" },
              ...result.data.map((cat: ICategory) => ({
                type: "Categories_with_Products" as const,
                id: cat.id,
              })),
            ]
          : [{ type: "Categories_with_Products", id: "LIST" }],
    }),

    // CREATE Category
    createCategory: builder.mutation<ICategory, Partial<ICategory>>({
      query: (newCategory) => ({
        url: `/api/categories`,
        method: "POST",
        body: {
          data: newCategory, // 🔴 مهم جدًا في Strapi v4
        },
      }),
      invalidatesTags: [
        { type: "Categories", id: "LIST" },
        { type: "Categories_with_Products", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesWithProductsQuery,
  useCreateCategoryMutation,
} = categoriesApi;
