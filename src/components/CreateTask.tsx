import { useState, useEffect, useRef } from "react";
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
import { ChevronDownIcon } from "@chakra-ui/icons";

import { Category } from "../db/db";
import { createTask } from "../db/service";

const CreateTask = ({ categories }: { categories: Category[] }) => {
  const [isHover, setIsHover] = useBoolean(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const elemInput = useRef<HTMLInputElement>(null);

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
      <Menu>
        <MenuButton
          as={Button}
          bg="transparent"
          py="0px"
          pl="6px"
          pr="4px"
          ml="-6px"
          mr="4px"
          variant="dropdown"
        >
          <HStack spacing="1px" alignItems="center">
            <Circle
              size="28px"
              borderWidth="3px"
              borderColor={selectedCategory.color}
            />
            <ChevronDownIcon color="gray.600" w="14px" />
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
                <Circle size="28px" borderWidth="3px" borderColor={cat.color} />
                <Text>{cat.name}</Text>
              </HStack>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Box w="full" position="relative">
        <Input
          ref={elemInput}
          textStyle="body-regular"
          fontSize="18px"
          px={0}
          border="none"
          placeholder="Create a task"
          _focus={{ outline: "none", boxShadow: "none" }}
          onBlur={() => {
            createTask(elemInput.current!.value, selectedCategory.id!, false);
            elemInput.current!.value = "";
          }}
        />
      </Box>
    </Flex>
  );
};

export default CreateTask;
