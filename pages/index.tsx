import axios from "axios";
import Link from "next/link";
import Banner from "../components/Banner";
import Header from "../components/Header";
import { Posts, SinglePost } from "../typings";

interface Props {
  data: Posts;
}

export const getServerSideProps = async () => {
  const { data }: Posts = await axios.get(
    "http://localhost:1337/api/posts?populate=*"
  );
  console.log(data);
  return {
    props: {
      data,
    },
  };
};

export default function Home(data: Props) {
  console.log(data.data.data);
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Banner />

      {/* Post */}
      <div>
        {data.data.data.map((post: SinglePost) => {
          return (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <div>
                <img
                  src={
                    "http://localhost:1337" +
                    post.attributes.coverPhoto.data.attributes.formats.medium
                      .url
                  }
                  alt="Banner"
                />
                <div>
                  <div>
                    <p>{post.attributes.title}</p>
                    <p>
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
  );
}
