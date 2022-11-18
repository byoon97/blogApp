import axios from "axios";
import Link from "next/link";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Posts, SinglePost } from "../types/typings";

interface Props {
  data: Posts;
}

export const getServerSideProps = async () => {
  const { data }: Posts = await axios.get(
    "http://localhost:1337/api/posts?populate=*"
  );
  return {
    props: {
      data,
    },
  };
};

export default function Home(data: Props) {
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
                <div className="border rounded-lg group cusor-pointer overflow-hidden">
                  <img
                    className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                    src={
                      "http://localhost:1337" +
                      post.attributes.coverPhoto.data.attributes.formats.small
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
