import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import { AppRouter } from "pages/api/trpc/[trpc]";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/globals.css";

import { Themes } from "themes";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import useLocalStorage from "hooks/useLocalStorage";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const [theme, setTheme] = useLocalStorage<string>("theme", Themes.Light);

  return (
    <SessionProvider session={session}>
      <div className={`theme-${theme} bg-primary flex flex-col min-h-screen`}>
        <ToastContainer position="bottom-left" />
        <Navbar theme={theme} setTheme={(theme) => setTheme(theme)} />
        <Component {...pageProps} />
        <Footer />
        {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
      </div>
    </SessionProvider>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      /**
       * @link https://react-query-v3.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
