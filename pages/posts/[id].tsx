import React, { useEffect, useRef } from "react";
import { Posts, SinglePost, ID, SingleComment } from "../../types/typings";
import {
  useGetSinglePostQuery,
  useCreateCommentMutation,
  getPosts,
} from "../../redux/api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "next/dist/client/router";
import Header from "../../components/Header";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { authActions } from "../../redux/reducers/auth-slice";

function Post() {
  const { isLoggedIn, user } = useAppSelector((state) => state.authSlice);
  const router = useRouter();
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const id = router.query.id;
  const { data, isSuccess, error, isLoading } = useGetSinglePostQuery(
    typeof id === "string" ? id : skipToken,
    {
      // If the page is not yet generated, router.isFallback will be true
      // initially until getStaticProps() finishes running
      skip: router.isFallback,
    }
  );
  const [createComment] = useCreateCommentMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authActions.setUser());
  }, [dispatch]);

  const createCommentHandler = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    try {
      const data = await createComment({
        body: commentRef?.current?.value,
        post: Number(id),
        users_permissions_user: user?.id,
        user: user.username,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        {isSuccess ? (
          <main>
            <img
              className="w-full h-42 object-cover"
              src={
                "https://motive-app.herokuapp.com" +
                data.data.attributes.coverPhoto.data.attributes.formats.small
                  .url
              }
              // src={
              //   "https://localhost:1337" +
              //   data.data.attributes.coverPhoto.data.attributes.formats.small
              //     .url
              // }
              alt="hello"
            />
            <article className="max-w-3xl mx-auto font-serif">
              <h1 className="text-3xl mt-10 mb-3">
                {data.data.attributes.title}
              </h1>
              <p className="font-extralight text-sm">
                Blog post by{" "}
                <span className="text-green-600">
                  {
                    data.data.attributes.users_permissions_user.data.attributes
                      .username
                  }
                </span>{" "}
                Published at -{" "}
                {new Date(data.data.attributes.createdAt).toLocaleString()}
              </p>
              <div className="font-serif mt-5">{data.data.attributes.body}</div>
            </article>
          </main>
        ) : null}
        <div className="antialiased mx-auto max-w-screen-sm w-2/3">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 pt-5 text-center">
            Comments
          </h3>
          <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          {isSuccess
            ? data.data.attributes.comments.data.map(
                (comment: SingleComment) => (
                  <div key={comment.id} className="space-y-4 pt-5">
                    <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                      <strong>{comment.attributes.user}</strong>{" "}
                      <span className="text-xs text-gray-400">
                        {comment.attributes.createdAt.toLocaleString()}
                      </span>
                      <p className="text-sm">{comment.attributes.body}</p>
                      <div className="mt-4 flex items-center">
                        <div className="flex -space-x-2 mr-2"></div>
                        {/* <div className="text-sm text-gray-500 font-semibold">
                        5 Replies
                      </div> */}
                      </div>
                    </div>
                  </div>
                )
              )
            : null}

          {/* <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700 w-2/3" /> */}
        </div>

        <div className="flex mx-auto items-center justify-center shadow-lg mt-10 max-w-lg mb-10">
          <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2 ">
            <div className="flex flex-wrap -mx-3 mb-6">
              <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                {isLoggedIn ? "create a comment" : "please sign in to comment"}
              </h2>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <textarea
                  className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  name="body"
                  placeholder="Type Your Comment"
                  ref={commentRef}
                  required
                ></textarea>
              </div>
              <div className="w-full md:w-full flex items-start px-3">
                <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                  <svg
                    fill="none"
                    className="w-5 h-5 text-gray-600 mr-1"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="flex justify-between">
                    <p className="text-xs md:text-sm pt-px">Dont be Rude.</p>
                    {isLoggedIn ? (
                      <button
                        onClick={(e) => createCommentHandler(e)}
                        className="block uppercase mx-auto shadow bg-indigo-700 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-11 rounded"
                      >
                        Submit
                      </button>
                    ) : (
                      <Link href="/login">
                        <button className="block uppercase mx-auto shadow bg-indigo-700 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-11 rounded">
                          SignIn
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="-mr-1"></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Post;
