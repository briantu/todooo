import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme(
  {
    styles: {
      global: (props: { colorMode: string; theme: Dict }) => ({
        body: {
          bg: mode("#adbaeb", "#1A202C")(props),
        },
      }),
    },
    fonts: {
      heading: `Raleway, ${base.fonts?.heading}`,
      body: `Inter, ${base.fonts?.body}`,
    },
    config: {
      initialColorMode: "light",
      useSystemColorMode: false,
    },
    colors: {
      brand: {
        100: "#adbaeb",
        200: "#f4f6fd",
        300: "#020417",
        400: "#9d9ab4",
        500: "#373b5e",
        600: "#2643c4",
        700: "#a056c5",
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "brand" })
);

export default theme;
