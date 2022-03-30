import { useState, useEffect, useRef } from "react";
import { HStack, Circle, Input, Box, useBoolean } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import styles from "../styles/Task.module.css";
import useIsomorphicLayoutEffect from "../utils/useIsomorphicLayoutEffect";

const defaultCircleDecor = {
  bg: "transparent",
  opacity: 1,
};

const Task = ({
  description,
  completed,
  color,
}: {
  description: string;
  completed: boolean;
  color: string;
}) => {
  const [strikethroughClassName, setStrikethroughClassName] = useState("");
  const [textWidth, setTextWidth] = useState(0);
  const [text, setText] = useState(description);
  const [circleDecor, setCircleDecor] = useState(defaultCircleDecor);
  const [isComplete, setIsComplete] = useBoolean(completed);

  const elemDiv = useRef<HTMLDivElement>(null);
  const elemInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isComplete) {
      setCircleDecor({ bg: color, opacity: 0.3 });
      setStrikethroughClassName(styles.strike);
    } else {
      setCircleDecor(defaultCircleDecor);
      setStrikethroughClassName("");
    }
  }, [isComplete]);

  useIsomorphicLayoutEffect(() => {
    if (elemDiv.current) {
      setTimeout(() => {
        if (elemDiv.current) {
          setTextWidth(elemDiv.current.clientWidth);
        }
      }, 1000);
    }
  }, []);

  const updateText = () => {
    if (elemDiv && elemDiv.current && elemInput && elemInput.current) {
      const inputValue = elemInput.current.value;
      elemDiv.current.innerHTML = inputValue.replaceAll(" ", "&nbsp;");
      console.log(inputValue);
      setText(inputValue);
      setTextWidth(elemDiv.current.clientWidth);
    }
  };

  return (
    <HStack
      w="full"
      h="70px"
      px={6}
      py={5}
      spacing={3}
      alignItems="center"
      bg="white"
      borderRadius={20}
    >
      <Circle
        size="30px"
        borderWidth="3px"
        borderColor={color}
        onClick={setIsComplete.toggle}
        sx={circleDecor}
      >
        {isComplete && <CheckIcon w="14px" h="14px" color="white" />}
      </Circle>
      <Box w="full" position="relative">
        <Input
          ref={elemInput}
          textStyle="body-regular"
          value={text}
          fontSize="18px"
          px={2}
          border="none"
          onInput={() => {
            updateText();
          }}
        />
        <Box
          className={strikethroughClassName}
          w={`${textWidth + 8}px`}
          maxW="full"
          ml={2}
        ></Box>
        <Box ref={elemDiv} className={styles.hidden} textStyle="body-regular">
          {description}
        </Box>
      </Box>
    </HStack>
  );
};

export default Task;
