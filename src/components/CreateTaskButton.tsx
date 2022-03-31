import { Button } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

const CreateTaskButton = ({
  isCreating,
  setIsCreating,
}: {
  isCreating: boolean;
  setIsCreating: {
    readonly on: () => void;
    readonly off: () => void;
    readonly toggle: () => void;
  };
}) => {
  return (
    <Button
      variant="transparent"
      leftIcon={
        isCreating ? <CloseIcon boxSize="14px" /> : <AddIcon boxSize="14px" />
      }
      h="auto"
      px="12px"
      py="7px"
      color="text.gray"
      fontWeight="medium"
      onClick={() => {
        setIsCreating.toggle();
      }}
    >
      {isCreating ? "Cancel" : "Create task"}
    </Button>
  );
};

export default CreateTaskButton;
