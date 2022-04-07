import React, { useState, useRef, useEffect } from "react";
import {
  Flex,
  Box,
  HStack,
  Circle,
  Text,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBoolean,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

import { Category } from "../../db/db";
import { createTask } from "../../db/service";

type CreateTaskRowProps = {
  categories: Category[];
  isCreating: boolean;
  setIsCreating: {
    readonly on: () => void;
    readonly off: () => void;
    readonly toggle: () => void;
  };
};

const CreateTaskRow = ({
  categories,
  isCreating,
  setIsCreating,
}: CreateTaskRowProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [isCategoriesLoaded, setIsCategoriesLoaded] = useBoolean(false);
  const elemInput = useRef<HTMLInputElement>(null);
  const resetTask = () => {
    setSelectedCategory(categories[0]);
    elemInput.current!.value = "";
  };
  useEffect(() => {
    if (categories.length && !isCategoriesLoaded) {
      resetTask();
      setIsCategoriesLoaded.on();
    }
  }, [categories]);
  useEffect(() => {
    if (!isCreating) {
      resetTask();
    }
  }, [isCreating]);

  return (
    <Flex
      w="full"
      h="68px"
      px={6}
      py={5}
      alignItems="center"
      bg="white"
      borderRadius={20}
      display={isCreating ? "flex" : "none"}
    >
      <Menu>
        <MenuButton
          as={Button}
          py="0px"
          pl="6px"
          pr="2px"
          ml="-6px"
          mr="3px"
          variant="transparent"
        >
          <HStack spacing="1px" alignItems="center">
            <Circle
              size="28px"
              borderWidth="3px"
              borderColor={`category.${
                selectedCategory ? selectedCategory.color : "blue"
              }`}
            />
            <ChevronDownIcon color="rgba(55, 53, 47, 0.9)" w="14px" />
          </HStack>
        </MenuButton>
        <MenuList minW="175px">
          {categories.map((cat) => (
            <MenuItem
              key={cat.id}
              py={2}
              _hover={{ bg: "hover.button" }}
              _focus={{ bg: "hover.button" }}
              onClick={() => setSelectedCategory(cat)}
            >
              <HStack spacing={3}>
                <Circle
                  size="28px"
                  borderWidth="3px"
                  borderColor={`category.${cat.color}`}
                />
                <Text>{cat.name}</Text>
              </HStack>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Box flexGrow={1}>
        <Input
          ref={elemInput}
          textStyle="body-regular"
          fontSize="18px"
          px={0}
          border="none"
          placeholder="What needs to be done?"
          _focus={{ outline: "none", boxShadow: "none" }}
        />
      </Box>
      <Button
        ml="auto"
        variant="new-task"
        onClick={() => {
          createTask(elemInput.current!.value, selectedCategory!.id!, false);
          setIsCreating.off();
        }}
      >
        New Task
        <ChevronUpIcon boxSize={6} ml="1px" color="rgba(55, 53, 47, 0.7)" />
      </Button>
    </Flex>
  );
};
export default CreateTaskRow;
