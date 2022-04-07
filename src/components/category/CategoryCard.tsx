import { useState, useEffect, useRef } from "react";
import {
  VStack,
  HStack,
  Box,
  Input,
  Image,
  Text,
  Progress,
  Divider,
  useBoolean,
} from "@chakra-ui/react";
import CategoryColorButton from "./CategoryColorButton";

import { hexToCSSFilter } from "hex-to-css-filter";
import taskStyles from "../../styles/TaskRow.module.css";

import { Category, Task } from "../../db/db";
import { updateCategory, deleteCategory } from "../../db/service";

const CategoryCard = ({
  category,
  tasks,
  numCategories,
}: {
  category: Category;
  tasks: Task[];
  numCategories: number;
}) => {
  const [isHover, setIsHover] = useBoolean(false);
  const [name, setName] = useState(category.name);
  const [progressValue, setProgressValue] = useState(0);
  const didProgressMount = useRef(false);
  const [hasMounted, setHasMounted] = useState(false);

  const updateProgressValue = () => {
    const numCompleteTasks = tasks.filter((task) => task.isComplete).length;
    setProgressValue(
      !numCompleteTasks
        ? 3
        : Math.floor(
            (tasks.filter((task) => task.isComplete).length / tasks.length) *
              100
          )
    );
  };

  useEffect(() => {
    setHasMounted(true);
    setTimeout(() => {
      updateProgressValue();
      didProgressMount.current = true;
    }, 100);
  }, []);

  useEffect(() => {
    if (didProgressMount.current) updateProgressValue();
  }, [tasks]);

  if (!hasMounted) return null;
  return (
    <VStack
      w={48}
      minW={48}
      px={5}
      pt={5}
      pb="20px"
      spacing="2px"
      alignItems="flex-start"
      bg="white"
      borderRadius={20}
      boxShadow="category"
      border="none"
      position="relative"
      onMouseEnter={setIsHover.on}
      onMouseLeave={setIsHover.off}
    >
      <Box w="full">
        <Text textStyle="caption">{tasks.length} tasks</Text>
        <Input
          w="full"
          size="sm"
          value={name}
          textStyle="subheading"
          fontSize="21px"
          p={0}
          mb="11px"
          border="none"
          _focus={{ outline: "none", boxShadow: "none" }}
          onInput={(e) => {
            setName((e.target as HTMLInputElement).value);
          }}
          onBlur={() => updateCategory(category.id!, name, category.color)}
        />
        <Box w="full" position="relative">
          <Box
            position="absolute"
            top="3px"
            w={!progressValue ? 0 : `calc(${progressValue}% - 4px)`}
            transition="width 0.8s"
            transitionTimingFunction="ease-in-out"
          >
            <Divider borderRadius="md" boxShadow={category.color} />
          </Box>
          <Box w="full" bg="gray.200" borderRadius="md" position="absolute">
            <Box
              w={`${progressValue}%`}
              borderRadius="md"
              transition="width 0.8s"
              transitionTimingFunction="ease-in-out"
            >
              <Progress
                value={100}
                size="xs"
                bg="gray.200"
                borderRadius="md"
                variant={category.color}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <HStack
        position="absolute"
        top={0}
        right={0}
        px={3}
        py={2}
        spacing="6px"
        className={isHover ? taskStyles.iconFadeIn : taskStyles.iconFadeOut}
      >
        <CategoryColorButton category={category} isHover={isHover} />
        <Image
          src="/icons/icons8-trash-can.svg"
          h="17px"
          cursor="pointer"
          display={numCategories <= 1 ? "none" : "inline-block"}
          filter={hexToCSSFilter("#a5aec0").filter}
          transition="filter 0.3s"
          _hover={{ filter: hexToCSSFilter("#7985a0").filter }}
          onClick={() => deleteCategory(category.id!)}
        />
      </HStack>
    </VStack>
  );
};

export default CategoryCard;
