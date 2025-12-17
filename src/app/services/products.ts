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
    getProduct: builder.query<{ data: IProduct }, string>({
      query: (id) =>
        `/api/products/${id}?populate=*&fields=title,description,price,stock`,
      providesTags: (_result, _error, id) => [{ type: "Products", id }],
    }),

    // EDIT Product
    editAdminProduct: builder.mutation<undefined,{ id: string; body: ProductFormData }>({
      query: ({ id, body }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${cookieService.getCookie("jwt")}`,
        },
        body,
      }),

      async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
        // 1️⃣ Optimistic update for product list
        const patchList = dispatch(
          productsApi.util.updateQueryData(
            "getProducts",
            { page: 1 },
            (draft) => {
              const product = draft.data.find((p) => p.documentId === id);
              if (product) {
                Object.assign(product, body);
              }
            }
          )
        );

        // 2️⃣ Optimistic update for product details
        const patchSingle = dispatch(
          productsApi.util.updateQueryData("getProduct", id, (draft) => {
            Object.assign(draft.data, body);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          // ❌ rollback if failed
          patchList.undo();
          patchSingle.undo();
        }
      },

      invalidatesTags: (_result, _error, { id }) => [
        { type: "Products", id },
        { type: "Products", id: "LIST" },
      ],
    }),

    // DELETE Product
    deleteAdminProduct: builder.mutation<undefined, string>({
      query: (id) => {
        return {
          url: `/api/products/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${cookieService.getCookie("jwt")}`,
          },
        };
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Products", id },
        { type: "Products", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useDeleteAdminProductMutation,
} = productsApi;
