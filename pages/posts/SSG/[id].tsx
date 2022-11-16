import Post from "../[id]";
import { getPosts, getSinglePost } from "../../../redux/api";
import { makeStore } from "../../../redux/store";

export async function getStaticPaths() {
  const store = makeStore();
  const result = await store.dispatch(getPosts.initiate());

  return {
    paths: result.data?.results.map((p) => `/post/ssg/${p.id}`).slice(0, 10),
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
