import React, { useEffect } from "react";
import { Box, Image, HStack, VStack } from "@chakra-ui/react";
import styles from "../styles/Background.module.css";
import useWindowSize from "../utils/useWindowSize";

const Parallax = require("parallax-js");

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
    <Box id="scene" position="absolute" left="-100px" top="-400px">
      <VStack data-depth="0.1" spacing="30px">
        {[...Array(Math.floor(size.height / 70 / 4) + 4)].map(() => {
          return icons.map((iconList) => {
            return (
              <HStack spacing="30px" transform="rotate(-25deg)">
                {[...Array(Math.floor(size.width / 70 / 4) + 2)].map(() => {
                  return iconList.map((icon) => (
                    <Image
                      src={`/icons/icons8-${icon}.svg`}
                      h="40px"
                      className={styles.unselectable}
                    />
                  ));
                })}
              </HStack>
            );
          });
        })}
      </VStack>
    </Box>
  );
};

export default Background;
