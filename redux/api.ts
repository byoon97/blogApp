import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../typings";

export const motiveApi = createApi({
  reducerPath: "motiveApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api" }),
  tagTypes: ["Posts", "Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post, undefined>({
      query: () => `/posts?populate=*`,
      providesTags: ["Posts"],
    }),
    getSinglePost: builder.query<Post, string>({
      query: (id) => `/posts/${id}?populate=*`,
      providesTags: ['Post']
    })
  }),
});

export const { useGetPostsQuery, useGetSinglePostQuery } = motiveApi;
