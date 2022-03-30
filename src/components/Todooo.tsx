import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Container, Flex, VStack, Text } from "@chakra-ui/react";
import Category from "./Category";
import Task from "./Task";
import { db, Task as TaskDTO } from "../db/db";
import { createTask } from "../db/service";

const Todooo = () => {
  useEffect(() => {
    // createTask("test task", 1, true);
  }, []);
  const tasks = useLiveQuery(async () => {
    const t = await db.tasks.toArray();
    return t;
  });
  console.log(tasks);
  return (
    <Container maxW="container.xl" p={0} position="absolute">
      <Flex h="100vh" py={10}>
        <VStack
          w="full"
          p={8}
          alignItems="flex-start"
          bg="brand.200"
          borderRadius={20}
          boxShadow="xl"
        >
          <Text textStyle="heading">Welcome Back!</Text>
          <Text textStyle="body-heading">Categories</Text>
          <Category />
          <Text textStyle="body-heading">Today's tasks</Text>

          <Task
            description="Daily meeting with the team"
            completed={false}
            color="#1f5ebe"
          />
          {tasks?.map((task) => (
            <Task
              key={task.id}
              description={task.description}
              completed={task.isComplete}
              color="#1f5ebe"
            />
          ))}
        </VStack>
      </Flex>
    </Container>
  );
};

export default Todooo;
