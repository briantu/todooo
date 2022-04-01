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
      h="auto"
      px="12px"
      py="7px"
      color="text.gray"
      fontWeight="medium"
      leftIcon={
        isCreating ? <CloseIcon boxSize="14px" /> : <AddIcon boxSize="14px" />
      }
      onClick={() => {
        setIsCreating.toggle();
      }}
    >
      {isCreating ? "Cancel" : "Create task"}
    </Button>
  );
};

export default CreateTaskButton;
