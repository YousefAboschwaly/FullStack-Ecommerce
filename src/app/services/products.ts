import type { IProduct, IResponse, ProductFormData } from "@/interfaces";
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
    getProducts: builder.query<IResponse, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) =>
        `/api/products?fields=title,description,price,stock&populate=*&sort=createdAt:Desc&pagination[pageSize]=${pageSize}&pagination[page]=${page}`,
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

    // Get Products of Category
    getProductsByCategory: builder.query({
      query: ({ categoryId, page, pageSize }) =>
        `/api/products?fields=title,description,price,stock&populate=*&sort=createdAt:Desc&pagination[pageSize]=${pageSize}&pagination[page]=${page}&filters[category][id][$eq]=${categoryId}`,
    }),

    // GET Product Details
    getProduct: builder.query<{ data: IProduct }, string>({
      query: (id) =>
        `/api/products/${id}?populate=*&fields=title,description,price,stock`,
      providesTags: (_result, _error, id) => [{ type: "Products", id }],
    }),

    // CREATE Product
    createAdminProduct: builder.mutation<
      { data: IProduct },
      { data: Partial<ProductFormData> }
    >({
      query: (body) => ({
        url: "/api/products",
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookieService.getCookie("jwt")}`,
          "Content-Type": "application/json",
        },
        body,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    // UPLOAD Image
    uploadProductImage: builder.mutation<
      Partial<IProduct>,
      { productId: string; file: File }
    >({
      query: ({ productId, file }) => {
        const formData = new FormData();

        formData.append("files", file);
        formData.append("ref", "api::product.product");
        formData.append("refId", productId);
        formData.append("field", "thumbnail");

        return {
          url: "/api/upload",
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookieService.getCookie("jwt")}`,
          },
          body: formData,
        };
      },

      invalidatesTags: (_r, _e, { productId }) => [
        { type: "Products", id: productId },
        { type: "Products", id: "LIST" },
      ],
    }),

    // EDIT Product
    editAdminProduct: builder.mutation<
      { data: IProduct },
      { id: string; body: { data: Partial<ProductFormData> } }
    >({
      query: ({ id, body }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${cookieService.getCookie("jwt")}`,
          "Content-Type": "application/json",
        },
        body,
      }),

      invalidatesTags: (_res, _err, { id }) => [
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
      invalidatesTags: (_result, _error, id) => [
        { type: "Products", id },
        { type: "Products", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  usePrefetch: useProductsPrefetch,
  useGetProductQuery,
  useCreateAdminProductMutation,
  useUploadProductImageMutation,
  useEditAdminProductMutation,
  useDeleteAdminProductMutation,
} = productsApi;
