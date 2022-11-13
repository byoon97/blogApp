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
  return (
    <main>
      <img
        className="w-full h-42 object-cover"
        src={
          "http://localhost:1337" +
          post.attributes.coverPhoto.data.attributes.formats.large.url
        }
        alt="hello"
      />
      <article className="max-w-3xl mx-auto md:p-10 lg:p-30 font-serif">
        <h1 className="text-3xl mt-10 mb-3">{post.attributes.title}</h1>
        <p className="font-extralight text-sm">
          Blog post by{" "}
          <span className="text-green-600">
            {post.attributes.users_permissions_user.data.attributes.username}
          </span>{" "}
          Published at - {new Date(post.attributes.createdAt).toLocaleString()}
        </p>
      </article>

      <div className="font-serif md:p-10 lg:p-30">{post.attributes.body}</div>
    </main>
  );
}

export default Post;
