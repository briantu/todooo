import { useState, useEffect } from "react";
import { HStack, Circle, Text, useBoolean } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const Task = () => {
  const defaultTextDecor = {
    textDecoration: "none",
    textDecorationThickness: "2px",
  };
  const [textDecor, setTextDecor] = useState(defaultTextDecor);
  const [circleBg, setCircleBg] = useState("transparent");
  const [isComplete, setIsComplete] = useBoolean(false);
  useEffect(() => {
    if (isComplete) {
      setTextDecor({
        ...defaultTextDecor,
        textDecoration: "line-through",
      });
      setCircleBg("brand.600");
    } else {
      setTextDecor(defaultTextDecor);
      setCircleBg("transparent");
    }
  }, [isComplete]);

  return (
    <HStack
      w="full"
      px={6}
      py={5}
      alignItems="center"
      spacing={4}
      bg="white"
      borderRadius={20}
    >
      <Circle
        size="30px"
        bg={circleBg}
        borderWidth="3px"
        borderColor="brand.600"
        onClick={setIsComplete.toggle}
      >
        {isComplete && <CheckIcon w="14px" h="14px" color="white" />}
      </Circle>
      <Text
        textStyle="body-regular"
        sx={textDecor}
        _before={{ content: '"\u00a0"' }}
        _after={{ content: '"\u00a0"' }}
      >
        Pay for rent
      </Text>
    </HStack>
  );
};

export default Task;
