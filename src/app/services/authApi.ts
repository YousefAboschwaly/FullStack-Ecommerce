import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath:"authApi",
  baseQuery : fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints:(build)=>({
    login:build.mutation({
      query(body) {
        console.log(body)
          return{
            url:'/auth/local',
            method: "POST",
            
          }
      },
    })
  })
  
});

export const {useLoginMutation} = authApi