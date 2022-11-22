import Post from "../[id]";
import { SinglePost } from "../../../types/typings";
import { getPosts, getSinglePost } from "../../../redux/api";
import { makeStore } from "../../../redux/store";

export async function getStaticPaths() {
  const store = makeStore();
  const { data } = await store.dispatch(getPosts.initiate());

  // const paths = result?.data?.results.map((post : SinglePost )=> ({

  // }))

  return {
    paths: data?.data.map((post: SinglePost) => `/post/ssg/${post.id}`),
    fallback: true,
  };
}

import { wrapper } from "../../../redux/store";

export default Post;

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const id = context.params?.id;
    if (typeof id === "string") {
      store.dispatch(getSinglePost.initiate(id));
    }

    return {
      props: {},
    };
  }
);
