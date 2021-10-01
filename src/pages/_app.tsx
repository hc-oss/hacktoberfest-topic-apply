import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import { apptitle } from "@static/constants";
import Head from "next/head";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <title>{apptitle}</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
