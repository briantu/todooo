import { useState, useEffect, useRef } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Container,
  Flex,
  VStack,
  Box,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import CategoryCard from "./category/CategoryCard";
import TaskRow from "./task/TaskRow";
import CreateTaskRow from "./task/CreateTaskRow";
import CreateTaskButton from "./task/CreateTaskButton";

import { db } from "../db/db";

const Todooo = () => {
  const [isCreatingTask, setIsCreatingTask] = useBoolean(false);
  const tasks = useLiveQuery(async () => {
    return await db.tasks.toArray();
  });

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
            <CategoryCard />
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
                    color: "#1f5ebe",
                  },
                }}
              />
            ))}
            <CreateTaskRow
              categories={[
                { id: 1, name: "Business", color: "#1f5ebe" },
                { id: 2, name: "Personal", color: "#da00e6" },
              ]}
              isCreating={isCreatingTask}
              setIsCreating={setIsCreatingTask}
            />
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
