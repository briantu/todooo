import { useState, useEffect, useRef } from "react";
import { Flex, Box, Circle, Input, Image, useBoolean } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { hexToCSSFilter } from "hex-to-css-filter";

import styles from "../../styles/TaskRow.module.css";

import { TaskWithCategory } from "../../db/db";
import { updateTask, deleteTask } from "../../db/service";

const defaultCircleDecor = {
  bg: "transparent",
  opacity: 1,
};

const TaskRow = ({ task }: { task: TaskWithCategory }) => {
  const [isComplete, setIsComplete] = useBoolean(task.isComplete);
  const [isHover, setIsHover] = useBoolean(false);
  const [textWidth, setTextWidth] = useState(0);
  const [text, setText] = useState(task.description);
  const [circleDecor, setCircleDecor] = useState(defaultCircleDecor);
  const elemDiv = useRef<HTMLDivElement>(null);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      updateText(task.description);
    }, 1000);
  }, [elemDiv]);

  useEffect(() => {
    if (isComplete) {
      setCircleDecor({ bg: task.category.color, opacity: 0.3 });
    } else {
      setCircleDecor(defaultCircleDecor);
    }
    updateTask(task.id!, text, isComplete);
  }, [isComplete]);

  const updateText = (text: string) => {
    if (elemDiv.current) {
      elemDiv.current.innerHTML = text.replaceAll(" ", "&nbsp;");
      setText(text);
      setTextWidth(elemDiv.current.clientWidth);
    }
  };
  // workaround to fix this error https://github.com/vercel/next.js/issues/7322
  if (!hasMounted) return null;
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
        borderColor={task.category.color}
        mr={3}
        sx={circleDecor}
        onClick={setIsComplete.toggle}
      >
        {isComplete && <CheckIcon w="14px" h="14px" color="white" />}
      </Circle>
      <Box position="relative" flexGrow={1}>
        <Input
          value={text}
          textStyle="body-regular"
          fontSize="18px"
          px={2}
          border="none"
          _focus={{ outline: "none", boxShadow: "none" }}
          onInput={(e) => {
            updateText((e.target as HTMLInputElement).value);
          }}
          onBlur={() => {
            updateTask(task.id!, text, isComplete);
          }}
        />
        <Box
          className={isComplete ? styles.strike : ""}
          w={`${!textWidth ? 0 : textWidth + 8}px`}
          maxW="calc(100% - 8px)"
          ml={2}
        ></Box>
        <Box ref={elemDiv} className={styles.hidden} textStyle="body-regular">
          {task.description}
        </Box>
      </Box>
      <Image
        src="/icons/icons8-trash-can.svg"
        className={isHover ? styles.trashcanFadeIn : styles.trashcanFadeOut}
        h="22px"
        ml="auto"
        filter={hexToCSSFilter("#a5aec0").filter}
        transition="filter 0.3s"
        _hover={{ filter: hexToCSSFilter("#7985a0").filter }}
        onClick={() => deleteTask(task.id!)}
      />
    </Flex>
  );
};

export default TaskRow;
