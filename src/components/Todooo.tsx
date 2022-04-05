import { useState, useEffect, useRef } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Container,
  Flex,
  VStack,
  HStack,
  Box,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import CategoryCard from "./category/CategoryCard";
import TaskRow from "./task/TaskRow";
import CreateTaskRow from "./task/CreateTaskRow";
import CreateTaskButton from "./task/CreateTaskButton";

import { db } from "../db/db";
import CreateCategoryButton from "./category/CreateCategoryButton";
import { createCategory } from "../db/service";

const Todooo = () => {
  const [isCreatingTask, setIsCreatingTask] = useBoolean(false);
  const tasks = useLiveQuery(async () => {
    return await db.tasks.toArray();
  });
  const categories = useLiveQuery(async () => {
    return await db.categories.toArray();
  });
  const [numCategories, setNumCategories] = useState(0);

  useEffect(() => {
    if (categories) {
      const n = categories.length;
      if (n === 0) createCategory("New category", "blue");
      setNumCategories(categories.length);
    }
  }, [categories]);

  return (
    <Container maxW="container.xl" p={0} position="absolute">
      <Flex h="100vh" py={10}>
        <VStack
          w="full"
          p={8}
          spacing={8}
          alignItems="flex-start"
          bg="brand.200"
          borderRadius={20}
          boxShadow="xl"
        >
          <Text textStyle="heading" mt={4}>
            Welcome Back!
          </Text>
          <VStack spacing="5px" alignItems="flex-start">
            <Text textStyle="body-heading" mb={2}>
              Categories
            </Text>
            <HStack spacing={2}>
              {categories?.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  numTasks={40}
                  numCategories={numCategories}
                />
              ))}
              <CreateCategoryButton />
            </HStack>
          </VStack>
          <VStack w="full" spacing="5px" alignItems="flex-start">
            <Text textStyle="body-heading" mb={2}>
              Today's tasks
            </Text>
            {tasks?.map((task) => (
              <TaskRow
                key={task.id}
                task={{
                  id: task.id,
                  description: task.description,
                  isComplete: task.isComplete,
                  category: {
                    id: 1,
                    name: "Business",
                    color: "red",
                  },
                }}
              />
            ))}
            {categories && (
              <CreateTaskRow
                categories={categories}
                isCreating={isCreatingTask}
                setIsCreating={setIsCreatingTask}
              />
            )}
            <Box px={2} py="2px">
              <CreateTaskButton
                isCreating={isCreatingTask}
                setIsCreating={setIsCreatingTask}
              />
            </Box>
          </VStack>
        </VStack>
      </Flex>
    </Container>
  );
};

export default Todooo;
