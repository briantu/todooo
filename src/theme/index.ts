import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";
import { mode } from "@chakra-ui/theme-tools";
import textStyles from "./textStyles";
import colors from "./colors";
import Progress from "./progress";

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
      // rgb same as category colors
      red: "1px 1px 9px 2px rgba(213, 0, 0, 0.4)",
      yellow: "1px 1px 9px 2px rgba(246, 191, 38, 0.4)",
      green: "1px 1px 9px 2px rgba(41, 148, 56, 0.4)",
      blue: "1px 1px 9px 2px rgba(32, 107, 222, 0.4)",
      teal: "1px 1px 9px 2px rgba(51, 194, 204, 0.4)",
      pink: "1px 1px 9px 2px rgba(218, 0, 230, 0.4)",
    },
    components: {
      Progress,
      Button: {
        variants: {
          "no-bg": {
            _focus: { boxShadow: "none" },
          },
          transparent: {
            lineHeight: "150%",
            _hover: { bg: "hover.button" },
            // _expanded: { bg: "hover.button" },
            _focus: { boxShadow: "none" },
          },
          "new-task": {
            // h: "auto",
            // py: "7px",
            pr: "3px",
            pl: "9px",
            fontWeight: "medium",
            fontSize: "16px",
            lineHeight: "150%",
            bg: "hover.button",
            color: "rgba(55, 53, 47, 0.7)",
            _hover: { bg: "rgba(55, 53, 47, 0.13)" },
            _focus: { boxShadow: "none" },
          },
        },
      },
    },
  },

  withDefaultColorScheme({ colorScheme: "brand" })
);

export default theme;
