import { Flex } from "@chakra-ui/react";
import Todooo from "../src/components/Todooo";
import Background from "../src/components/Background";

const IndexPage = () => {
  return (
    <Flex position="relative" justifyContent="center">
      <Background />
      <Todooo />
    </Flex>
  );
};

export default IndexPage;
