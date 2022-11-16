import Post from "../[id]";
import { getSinglePost } from "../../../redux/api";
import { wrapper } from "../../../redux/store";

export default Post;

export const getServerSideProps = wrapper.getServerSideProps(
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
