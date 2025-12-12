interface LoginRequest {
  identifier: string;
  password: string;
}



import type { LoginResponse } from "@/interfaces";
import { saveAuth } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/api/auth/local",
        method: "POST",
        body,
      }),

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Login successful:", data);
          saveAuth(data.jwt);
          
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
