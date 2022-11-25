import axios from "axios";
import Link from "next/link";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getPosts, useGetPostsQuery } from "../redux/api";
import { makeStore } from "../redux/store";
import { Posts, SinglePost } from "../types/typings";

interface Props {
  data: Posts;
}

export const getServerSideProps = async () => {
  const store = makeStore();
  const { data } = await store.dispatch(getPosts.initiate());

  return {
    props: {
      data,
    },
  };
};

export default function Home(data: Props) {
  console.log(data);
  return (
    <>
      <div className="max-w-7xl mx-auto h-screen">
        <Header />
        <Banner />

        {/* Post */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
          {data.data.data.map((post: SinglePost) => {
            return (
              <Link key={post.id} href={`/posts/${post.id}`}>
                <div className="border rounded-lg group cusor-pointer overflow-hidden shadow-lg">
                  <img
                    className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                    src={
                      "https://motive-app.herokuapp.com" +
                      post.attributes.coverPhoto.data.attributes.formats.large
                        .url
                    }
                    alt="Banner"
                  />
                  <div className="flex justify-between p-5 bg-white">
                    <div>
                      <p className="text-lg font-bold">
                        {post.attributes.title}
                      </p>
                      <p className="text-xs">
                        by{" "}
                        {
                          post.attributes.users_permissions_user.data.attributes
                            .username
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
