import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from 'next-redux-wrapper'
import { Posts, SinglePost } from "../typings";

export const motiveApi = createApi({
  reducerPath: "motiveApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api" }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ["Posts", "Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<{ results: Array<{ id: string }> }, void>({
      query: () => `/posts?populate=*`,
      providesTags: ["Posts"],
    }),
    getSinglePost: builder.query<SinglePost, string>({
      query: (id) => `/posts/${id}?populate=*`,
      providesTags: ['Post']
    })
  }),
});

// For Functional Components
export const { useGetPostsQuery, useGetSinglePostQuery, } = motiveApi;

// For SSR Rendering
export const {getPosts, getSinglePost} = motiveApi.endpoints
