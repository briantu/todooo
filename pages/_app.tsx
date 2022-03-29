import "@fontsource/raleway/400.css";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/theme";

import "../src/styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
