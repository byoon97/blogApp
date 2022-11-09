import React, { useEffect } from "react";
import { useGetPostsQuery } from "../redux/api";
import { Post } from "../typings";

export default function PostsContainer() {
  const { data, isLoading, isSuccess, error } = useGetPostsQuery(undefined);

  useEffect(() => {
    isSuccess ? console.log(data.data) : console.log(error);
  }, []);

  return (
    <div>
      {isSuccess
        ? Post.map((post) => <div key={post.id}>{post.attributes.title}</div>)
        : null}
    </div>
  );
}
