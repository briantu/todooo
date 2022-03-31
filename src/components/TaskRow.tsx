import { useState, useEffect, useRef } from "react";
import {
  Flex,
  Spacer,
  Box,
  Circle,
  Input,
  Image,
  useBoolean,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import styles from "../styles/TaskRow.module.css";
import useIsomorphicLayoutEffect from "../utils/useIsomorphicLayoutEffect";

const defaultCircleDecor = {
  bg: "transparent",
  opacity: 1,
};

const TaskRow = ({
  description,
  completed,
  color,
}: {
  description: string;
  completed: boolean;
  color: string;
}) => {
  const [isComplete, setIsComplete] = useBoolean(completed);
  const [isHover, setIsHover] = useBoolean(false);
  const [textWidth, setTextWidth] = useState(0);
  const [text, setText] = useState(description);
  const [circleDecor, setCircleDecor] = useState(defaultCircleDecor);
  const elemDiv = useRef<HTMLDivElement>(null);
  const elemInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isComplete) {
      setCircleDecor({ bg: color, opacity: 0.3 });
    } else {
      setCircleDecor(defaultCircleDecor);
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
      setText(inputValue);
      setTextWidth(elemDiv.current.clientWidth);
    }
  };

  return (
    <Flex
      w="full"
      h="68px"
      px={6}
      py={5}
      alignItems="center"
      bg="white"
      borderRadius={20}
      onMouseEnter={setIsHover.on}
      onMouseLeave={setIsHover.off}
    >
      <Circle
        size="28px"
        borderWidth="3px"
        borderColor={color}
        onClick={setIsComplete.toggle}
        mr={3}
        sx={circleDecor}
      >
        {isComplete && <CheckIcon w="14px" h="14px" color="white" />}
      </Circle>
      <Box position="relative" flexGrow={1}>
        <Input
          ref={elemInput}
          value={text}
          textStyle="body-regular"
          fontSize="18px"
          px={2}
          border="none"
          onInput={() => {
            updateText();
          }}
          _focus={{ outline: "none", boxShadow: "none" }}
        />
        <Box
          className={isComplete ? styles.strike : ""}
          w={`${!textWidth ? 0 : textWidth + 8}px`}
          maxW="calc(100% - 8px)"
          ml={2}
        ></Box>
        <Box ref={elemDiv} className={styles.hidden} textStyle="body-regular">
          {description}
        </Box>
      </Box>
      <Image
        src="/icons/icons8-trash-can.svg"
        h="22px"
        className={isHover ? styles.trashcanFadeIn : styles.trashcanFadeOut}
        ml="auto"
      />
    </Flex>
  );
};

export default TaskRow;
