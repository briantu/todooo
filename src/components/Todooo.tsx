import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Container,
  Flex,
  VStack,
  HStack,
  Box,
  Text,
  Link,
  Image,
  useBoolean,
} from "@chakra-ui/react";
import { hexToCSSFilter } from "hex-to-css-filter";

import CategoryCard from "./category/CategoryCard";
import CreateCategoryButton from "./category/CreateCategoryButton";
import TaskRow from "./task/TaskRow";
import CreateTaskRow from "./task/CreateTaskRow";
import CreateTaskButton from "./task/CreateTaskButton";

import { db } from "../db/db";
import { createCategory } from "../db/service";

const Todooo = () => {
  const [isCreatingTask, setIsCreatingTask] = useBoolean(false);
  const [numCategories, setNumCategories] = useState(0);

  const tasks = useLiveQuery(async () => {
    return await db.tasks.toArray();
  });
  const categories = useLiveQuery(async () => {
    return await db.categories.toArray();
  });

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    // If first time user, populate db with new category
    const isFirstTime = localStorage.getItem("isFirstTime");
    if (!isFirstTime) {
      createCategory("New category", "blue");
      localStorage.setItem("isFirstTime", "true");
    }
  }, []);

  useEffect(() => {
    if (categories) setNumCategories(categories.length);
  }, [categories]);

  if (!hasMounted) return null;
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
          position="relative"
        >
          <Text textStyle="heading" mt={4}>
            Welcome Back!
          </Text>
          <VStack spacing="5px" alignItems="flex-start" w="full">
            <Text textStyle="body-heading" mb={2}>
              Categories
            </Text>
            <HStack spacing={2} w="full" overflow="auto">
              {categories?.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  tasks={
                    tasks?.filter((task) => task.categoryId === category.id) ||
                    []
                  }
                  numCategories={numCategories}
                />
              ))}
              <CreateCategoryButton />
            </HStack>
          </VStack>
          <VStack
            w="full"
            h="full"
            spacing="5px"
            alignItems="flex-start"
            overflow="auto"
          >
            <Text textStyle="body-heading" mb={2}>
              Today's tasks
            </Text>
            <VStack
              w="full"
              spacing="5px"
              alignItems="flex-start"
              overflow="auto"
            >
              {tasks?.map((task) => (
                <TaskRow
                  key={task.id}
                  task={{
                    ...task,
                    category: categories?.find((c) => c.id === task.categoryId),
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
          <HStack
            position="absolute"
            bottom={0}
            right={0}
            spacing="4px"
            pb="4px"
            pr="10px"
          >
            <Text textStyle="caption" fontSize="11px">
              Made by Brian Tu, on
            </Text>
            <Link
              href="https://github.com/briantu/todooo"
              _focus={{ outline: "none", boxShadow: "none" }}
              isExternal
            >
              <Image
                src="/GitHub-Mark-32px.png"
                h="14px"
                filter={hexToCSSFilter("#333").filter}
              />
            </Link>
          </HStack>
        </VStack>
      </Flex>
    </Container>
  );
};

export default Todooo;
