import type { NextPage } from "next";
import Banner from "../components/Banner";
import Header from "../components/Header";
import PostsContainer from "../components/PostsContainer";

const Home: NextPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Banner />
      <PostsContainer />
    </div>
  );
};

export default Home;
