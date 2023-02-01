import { FC, useState } from "react";
import Editor from "../components/editor/Editor";
import Header from "../components/Header";

const newStory: FC = () => {
  return (
    <div>
      <Header />
      <Editor />
    </div>
  );
};

export default newStory;
