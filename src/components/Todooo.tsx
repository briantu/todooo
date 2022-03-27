import { Container, Flex, VStack, Heading } from "@chakra-ui/react";
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
          <Heading>Welcome Back!</Heading>
          <Task />
        </VStack>
      </Flex>
    </Container>
  );
};

export default Todooo;
