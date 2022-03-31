import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";
import { mode } from "@chakra-ui/theme-tools";
import textStyles from "./textStyles";
import colors from "./colors";

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
    textStyles,
    colors,
    shadows: {
      category: "0 12px 15px -3px rgba(169, 184, 2397, 0.12)",
    },
    components: {
      Progress: {
        variants: {
          pink: {
            filledTrack: {
              bg: "#da00e6",
            },
          },
        },
      },
      Button: {
        variants: {
          dropdown: {
            _hover: { bg: "hover.button" },
            // _expanded: { bg: "hover.button" },
            _focus: { boxShadow: "none" },
          },
        },
      },
    },
  },

  withDefaultColorScheme({ colorScheme: "brand" })
);

export default theme;
