import { withTRPC } from "@trpc/next";
import { AppRouter } from "pages/api/trpc/[trpc]";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "../../styles/globals.css";
import { useState } from "react";
import { Themes } from "themes";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const [theme, setTheme] = useState<string>(Themes.Dark);

  return (
    <SessionProvider session={session}>
      <div className={`theme-${theme} bg-primary flex flex-col min-h-screen`}>
        <Navbar theme={theme} setTheme={(theme) => setTheme(theme)} />
        <Component {...pageProps} />
        <Footer />
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
