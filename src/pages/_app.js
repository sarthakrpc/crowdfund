import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SSRProvider } from "@react-aria/ssr";
import HeaderNav from "../common/components/UI/Nav/HeaderNav";
import { GetConnection } from "../common/hooks/Web3Connect/GetConnection";
import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, easing: 'ease', speed: 500, trickleRate: 0.1, trickleSpeed: 800 });
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <GetConnection>
        <HeaderNav />
        <Component {...pageProps} />
      </GetConnection>
    </SSRProvider>
  );
}

export default MyApp;