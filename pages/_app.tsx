import "../styles/globals.css";
import React, { FC } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../redux/store";
import { SessionProvider } from "next-auth/react";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <SessionProvider session={props.pageProps.session}>
      <Provider store={store}>
        <div className="bg-stone-300">
          <Component {...props.pageProps} />
        </div>
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
