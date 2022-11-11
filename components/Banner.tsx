import React from "react";

function Banner() {
  return (
    <div className="flex justify-between items-center bg-yellow-400 border-y border-x border-black py-10 lg:py-10">
      <div className="px-10 space-y-5">
        <h1 className="text-6xl max-w-xl font-serif">
          <span className="underline decoration-blac decoration-w-4">
            Motive
          </span>{" "}
          is a place to give or recieve motivation
        </h1>
        <h2>
          Simply write about any topic or any thoughts you are having and share
          it to the world!
        </h2>
      </div>
      <img
        className="hidden:md-inline-flex h-32 lg:h-full"
        src="Motive.png"
        alt=""
      />
    </div>
  );
}

export default Banner;
