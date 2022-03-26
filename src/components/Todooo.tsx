import { Container, Flex, Stack, Heading } from "@chakra-ui/react";

const Todooo = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <Flex h="100vh" py={10}>
        <Stack
          w="full"
          p={8}
          // alignItems="flex-start"
          bg="brand.200"
          borderRadius={20}
        >
          <Heading>Welcome Back!</Heading>
        </Stack>
      </Flex>
    </Container>
  );
};

export default Todooo;
