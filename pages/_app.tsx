import "../styles/globals.css";
import React, { FC } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { motiveApi } from "../redux/api";
import { wrapper } from "../redux/store";
import Header from "../components/Header";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <div className="bg-stone-300">
        <Component {...props.pageProps} />
      </div>
    </Provider>
  );
};

export default MyApp;
