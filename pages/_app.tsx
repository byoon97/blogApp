import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { motiveApi } from "../redux/api";
import { store } from "../redux/store";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
