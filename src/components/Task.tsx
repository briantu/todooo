import { useState, useEffect } from "react";
import { HStack, Circle, Text, useBoolean } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import styles from "../styles/Task.module.css";

const defaultCircleDecor = {
  bg: "transparent",
  opacity: 1,
};

const Task = () => {
  const [textClassName, setTextClassName] = useState("");
  const [circleDecor, setCircleDecor] = useState(defaultCircleDecor);
  const [isComplete, setIsComplete] = useBoolean(false);
  useEffect(() => {
    if (isComplete) {
      setCircleDecor({ bg: "brand.600", opacity: 0.3 });
      setTextClassName(styles.strike);
    } else {
      setCircleDecor(defaultCircleDecor);
      setTextClassName("");
    }
  }, [isComplete]);

  return (
    <HStack
      w="full"
      px={6}
      py={5}
      spacing={4}
      alignItems="center"
      bg="white"
      borderRadius={20}
    >
      <Circle
        size="30px"
        borderWidth="3px"
        borderColor="#1f5ebe"
        onClick={setIsComplete.toggle}
        sx={circleDecor}
      >
        {isComplete && <CheckIcon w="14px" h="14px" color="white" />}
      </Circle>
      <Text textStyle="body-regular" className={textClassName}>
        Daily meeting with team
      </Text>
    </HStack>
  );
};

export default Task;
