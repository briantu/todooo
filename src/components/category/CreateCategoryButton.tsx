import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { createCategory } from "../../db/service";

const CreateCategoryButton = () => {
  return (
    <Button
      variant="transparent"
      color="text.gray"
      p={0}
      borderRadius="full"
      onClick={() => {
        createCategory("New category", "Red");
      }}
    >
      <AddIcon boxSize="14px" />
    </Button>
  );
};

export default CreateCategoryButton;
