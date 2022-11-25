import "../styles/globals.css";
import React, { FC } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../redux/store";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <div className="bg-white">
        <Component {...props.pageProps} />
      </div>
    </Provider>
  );
};

export default MyApp;
