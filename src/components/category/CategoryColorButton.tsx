import { useEffect } from "react";
import {
  HStack,
  Button,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useBoolean,
} from "@chakra-ui/react";
import { hexToCSSFilter } from "hex-to-css-filter";

import { Category } from "../../db/db";
import { updateCategory } from "../../db/service";

const CategoryColorButton = ({
  category,
  isHover,
}: {
  category: Category;
  isHover: boolean;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useBoolean(false);
  useEffect(() => {
    if (!isHover) setIsPopoverOpen.off();
  }, [isHover]);

  return (
    <Popover isOpen={isPopoverOpen}>
      <PopoverTrigger>
        <Button
          variant="transparent"
          _hover={{ bg: "transparent" }}
          p={0}
          size="0px"
          onClick={setIsPopoverOpen.toggle}
        >
          <Image
            src="/icons/color-picker-svgrepo.svg"
            h="15px"
            cursor="pointer"
            filter={hexToCSSFilter("#a5aec0").filter}
            transition="filter 0.3s"
            _hover={{ filter: hexToCSSFilter("#7985a0").filter }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        w="fit-content"
        _focus={{ outline: "none", boxShadow: "none" }}
      >
        <PopoverBody p={1}>
          <HStack h="full" w="full" spacing={1}>
            {["red", "yellow", "green", "blue", "teal", "pink"].map(
              (color, i) => (
                <Button
                  key={i}
                  size="xs"
                  w="30px"
                  h="30px"
                  bg={`category.${color}`}
                  borderRadius={4}
                  cursor="pointer"
                  transition="transform .2s"
                  value={color}
                  _hover={{ transform: "scale(1.06)" }}
                  variant="no-bg"
                  onClick={(e) => {
                    updateCategory(
                      category.id!,
                      category.name,
                      (e.target as HTMLButtonElement).value
                    );
                    setIsPopoverOpen.off();
                  }}
                />
              )
            )}
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryColorButton;
