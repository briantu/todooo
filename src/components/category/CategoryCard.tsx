import { useState, useEffect } from "react";
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
import styles from "../../styles/CategoryCard.module.css";
import taskStyles from "../../styles/TaskRow.module.css";

import useOnPageLoad from "../../utils/useOnPageLoad";
import { Category } from "../../db/db";
import { updateCategory, deleteCategory } from "../../db/service";

const CategoryCard = ({
  category,
  numTasks,
  numCategories,
}: {
  category: Category;
  numTasks: number;
  numCategories: number;
}) => {
  const [isHover, setIsHover] = useBoolean(false);
  const [name, setName] = useState(category.name);
  const [progressClassName, setProgressClassName] = useState("");
  const [progressValue, setProgressValue] = useState(0);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useOnPageLoad(() => {
    setProgressClassName(styles.progress);
    setProgressValue(60);
  });

  if (!hasMounted) return null;
  return (
    <VStack
      w={48}
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
        <Text textStyle="caption">{numTasks} tasks</Text>
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
            w={!progressValue ? 0 : `calc(${progressValue}% - 4px)`}
            position="absolute"
            top="3px"
          >
            <Divider
              borderRadius="md"
              boxShadow={category.color}
              className={progressClassName}
            />
          </Box>
          <Box w="full" bg="gray.200" borderRadius="md" position="absolute">
            <Progress
              value={progressValue}
              w="full"
              size="xs"
              bg="gray.200"
              borderRadius="md"
              variant={category.color}
              className={progressClassName}
            />
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
