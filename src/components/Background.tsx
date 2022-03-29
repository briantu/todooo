import React, { useEffect } from "react";
import { Box, Image, HStack, VStack } from "@chakra-ui/react";
import styles from "../styles/Background.module.css";
import useWindowSize from "../utils/useWindowSize";

const Parallax = require("parallax-js");

const ROTATE_DEGREE = 25;
const ICON_WIDTH = 40;
const ICON_SPACING = 30;
const ICON_DISTANCE = ICON_WIDTH + ICON_SPACING;
const ICON_TOP_OFFSET =
  ICON_DISTANCE * Math.tan((ROTATE_DEGREE * Math.PI) / 180);

const icons = [
  ["among-us", "binoculars", "bitcoin", "bookmark"],
  ["calculator", "contacts", "discord", "fl-studio"],
  ["github", "home", "idea", "mcdonalds"],
  ["naruto", "search", "spotify", "zoom"],
];

const Background = () => {
  const size = useWindowSize();
  useEffect(() => {
    const scene = document.getElementById("scene");
    const parallaxInstance = new Parallax(scene, { relativeInput: true });
  });

  return (
    <Box id="scene" w="full" position="absolute">
      <Box data-depth="0.1">
        <HStack spacing={`${ICON_SPACING}px`}>
          {[...Array(Math.floor(size.width / ICON_DISTANCE / 4) + 1)].map(
            () => {
              return icons.map((iconList, i) => {
                return (
                  <VStack
                    spacing={`${ICON_SPACING}px`}
                    position="relative"
                    top={`-${i * ICON_TOP_OFFSET}px`}
                  >
                    {[
                      ...Array(Math.floor(size.height / ICON_DISTANCE / 4) + 1),
                    ].map(() => {
                      return iconList.map((icon) => (
                        <Image
                          src={`/icons/icons8-${icon}.svg`}
                          h={`${ICON_WIDTH}px`}
                          className={styles.unselectable}
                          transform={`rotate(-${ROTATE_DEGREE}deg)`}
                        />
                      ));
                    })}
                  </VStack>
                );
              });
            }
          )}
        </HStack>
      </Box>
    </Box>
  );
};

export default Background;
