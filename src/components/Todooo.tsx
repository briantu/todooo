import { Container, Flex, VStack, Heading, Text } from "@chakra-ui/react";
import Category from "./Category";
import Task from "./Task";

const Todooo = () => {
  return (
    <Container maxW="container.xl" p={0}>
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
          <Task />
        </VStack>
      </Flex>
    </Container>
  );
};

export default Todooo;
