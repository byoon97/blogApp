import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Posts, SinglePost } from "../../typings";
import { GetStaticProps } from "next";

interface Props {
  data: Posts;
  post: SinglePost;
}

export const getStaticPaths = async () => {
  const { data }: Posts = await axios.get(
    "http://localhost:1337/api/posts?populate=*"
  );

  const paths = data.data.map((post: SinglePost) => ({
    params: {
      id: String(post.id),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await axios.get(
    `http://localhost:1337/api/posts/${params?.id}?populate=*`
  );

  if (!data.data) return { notFound: true };

  return {
    props: {
      post: data.data,
    },
  };
};

function Post({ post }: Props) {
  useEffect(() => {
    console.log(post);
  }, []);
  return <div>yoooo</div>;
}

export default Post;
