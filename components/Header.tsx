import Link from "next/link";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { authActions } from "../redux/reducers/auth-slice";

function Header() {
  const { isLoggedIn, user } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  console.log(isLoggedIn, user);

  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-44 object-contain cursor-pointer"
            src="/Motive.png"
            alt="Motive Logo"
          />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5">
          <h3>About</h3>
          <h3>Contact</h3>
          <Link href="/createPost">
            <h3 className="text-white bg-green-600 px-4 py-1 rounded-full">
              Create Post
            </h3>
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-green-600">
        {!isLoggedIn ? (
          <Link href="/login">
            <h3>Sign In</h3>
          </Link>
        ) : (
          <h3 onClick={() => dispatch(authActions.logout())}>Sign Out</h3>
        )}

        <h3 className="border px-4 py-1 rounded-full border-green-600">
          {!isLoggedIn ? "Get Started" : user.email}
        </h3>
      </div>
    </header>
  );
}

export default Header;
