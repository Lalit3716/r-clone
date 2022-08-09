import { withTRPC } from "@trpc/next";
import { AppRouter } from "pages/api/trpc/[trpc]";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "../../styles/globals.css";
import { useState } from "react";
import { Themes } from "themes";
import Navbar from "components/Navbar";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const [theme, setTheme] = useState(Themes.dark);

  return (
    <SessionProvider session={session}>
      <div className={`theme-${theme} bg-primary h-screen`}>
        <Navbar />
        <Component {...pageProps} />
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
