import { useState } from "react";
import {
  VStack,
  HStack,
  Box,
  Input,
  Image,
  Text,
  Progress,
  Divider,
  useBoolean,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import styles from "../../styles/CategoryCard.module.css";
import taskStyles from "../../styles/TaskRow.module.css";

import useOnPageLoad from "../../utils/useOnPageLoad";
import { hexToCSSFilter } from "hex-to-css-filter";

const Category = () => {
  const [isHover, setIsHover] = useBoolean(false);
  const [name, setName] = useState("Business");
  const [progressClassName, setProgressClassName] = useState("");
  const [progressValue, setProgressValue] = useState(0);

  useOnPageLoad(() => {
    setProgressClassName(styles.progress);
    setProgressValue(60);
  });

  return (
    <VStack
      w={48}
      px={5}
      pt={5}
      pb="20px"
      spacing="2px"
      alignItems="flex-start"
      bg="white"
      borderRadius={20}
      boxShadow="category"
      border="none"
      position="relative"
      onMouseEnter={setIsHover.on}
      onMouseLeave={setIsHover.off}
    >
      <Box w="full">
        <Text textStyle="caption">40 tasks</Text>
        <Input
          w="full"
          size="sm"
          value={name}
          textStyle="subheading"
          fontSize="21px"
          p={0}
          mb="11px"
          border="none"
          _focus={{ outline: "none", boxShadow: "none" }}
          onInput={(e) => {
            setName((e.target as HTMLInputElement).value);
          }}
          // onBlur={() => {
          //   updateTask(task.id!, text, isComplete);
          // }}
        />
        <Box w="full" position="relative">
          <Box
            w={!progressValue ? 0 : `calc(${progressValue}% - 4px)`}
            position="absolute"
            top="3px"
          >
            <Divider
              borderRadius="md"
              boxShadow="1px 1px 9px 2px rgba(218, 0, 230, 0.4)"
              className={progressClassName}
            />
          </Box>
          <Box w="full" bg="gray.200" borderRadius="md" position="absolute">
            <Progress
              value={progressValue}
              w="full"
              size="xs"
              bg="gray.200"
              borderRadius="md"
              variant="pink"
              className={progressClassName}
            />
          </Box>
        </Box>
      </Box>
      <HStack
        position="absolute"
        top={0}
        right={0}
        px={3}
        py={2}
        spacing="8px"
        className={isHover ? taskStyles.iconFadeIn : taskStyles.iconFadeOut}
      >
        <Image
          src="/icons/color-picker-svgrepo.svg"
          h="15px"
          cursor="pointer"
          filter={hexToCSSFilter("#a5aec0").filter}
          transition="filter 0.3s"
          _hover={{ filter: hexToCSSFilter("#7985a0").filter }}
        />
        <CloseIcon
          boxSize="11px"
          cursor="pointer"
          color="#a5aec0"
          transition="filter 0.3s"
          _hover={{ filter: hexToCSSFilter("#7985a0").filter }}
        />
      </HStack>
    </VStack>
  );
};

export default Category;
