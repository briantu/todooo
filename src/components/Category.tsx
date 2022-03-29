import { VStack, Text, Progress, Box, Divider } from "@chakra-ui/react";
import styles from "../styles/Category.module.css";

const Category = () => {
  return (
    <VStack
      px={5}
      pt={5}
      pb={4}
      minW={48}
      spacing="2px"
      alignItems="flex-start"
      bg="white"
      borderRadius={20}
    >
      <Text textStyle="caption">40 tasks</Text>
      <Text textStyle="subheading" pb="12px">
        Business
      </Text>
      <Box w="full" bg="transparent">
        <Box w="full" bg="gray.200" borderRadius="md">
          <Progress
            value={60}
            w="full"
            size="xs"
            bg="gray.200"
            borderRadius="md"
            variant="pink"
            className={styles.progress}
          />
        </Box>
        <Box w="calc(60% - 4px)" bg="transparent">
          <Divider
            h={0}
            bg="transparent"
            borderRadius="md"
            boxShadow="2px 0px 10px 2px rgba(218, 0, 230, 0.5)"
            className={styles.progress}
          />
        </Box>
      </Box>
    </VStack>
  );
};

export default Category;
