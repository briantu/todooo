import { useEffect, useState } from "react";
import { VStack, Text, Progress, Box, Divider } from "@chakra-ui/react";
import styles from "../styles/Category.module.css";
import useOnPageLoad from "../utils/useOnPageLoad";

const Category = () => {
  const [progressClassName, setProgressClassName] = useState("");
  const [progressValue, setProgressValue] = useState(0);

  useOnPageLoad(() => {
    setProgressClassName(styles.progress);
    setProgressValue(60);
  });

  return (
    <VStack
      minW={48}
      px={5}
      pt={5}
      pb="20px"
      spacing="2px"
      alignItems="flex-start"
      bg="white"
      borderRadius={20}
      boxShadow="category"
      border="none"
    >
      <Text textStyle="caption">40 tasks</Text>
      <Text textStyle="subheading" pb="12px">
        Business
      </Text>
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
    </VStack>
  );
};

export default Category;
