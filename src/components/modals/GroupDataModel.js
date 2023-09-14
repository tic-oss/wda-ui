import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Button,
  FormLabel,
  FormControl,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import "./modals.css";

const GroupDataModal = ({
  isOpen,
  onClose,
  onSubmit,
  CurrentNode,
  handleColorClick,
}) => {
  const IntialState = {
    label: "Group",
    type: "Group",
    color: "#000000",
    ...CurrentNode,
  };
  const [groupData, setGroupData] = useState(IntialState);

  useEffect(() => {
    const handleDeleteKeyPress = (event) => {
      if (
        isOpen &&
        (event.key === "Backspace" || event.key === "Delete") &&
        event.target.tagName !== "INPUT"
      ) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleDeleteKeyPress);
    return () => {
      window.removeEventListener("keydown", handleDeleteKeyPress);
    };
  }, [isOpen, onClose]);

  const handleData = (column, value) => {
    if (column === "label") {
      setGroupData((prev) => ({
        ...prev,
        [column]: value,
        groupName: value,
      }));
    } else {
      setGroupData((prev) => ({
        ...prev,
        [column]: value,
      }));
    }
  };
  const groupNameCheck = !/^[a-zA-Z](?:[a-zA-Z0-9_]*[a-zA-Z0-9])?$/g.test(
    groupData.label
  );

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)}>
      <ModalContent
        style={{
          position: "absolute",
          top: "20px",
          right: "10px",
          width: "300px",
        }}
      >
        <ModalHeader className="heading">Group</ModalHeader>
        <ModalCloseButton mt={1.5} />
        <ModalBody>
          <FormControl>
            <FormLabel>Group name</FormLabel>
            <Input
              mb={3}
              variant="outline"
              id="groupName"
              placeholder="Name"
              borderColor={"black"}
              maxLength="32"
              value={groupData.label}
              onChange={(e) => handleData("label", e.target.value)}
            />
          </FormControl>
          {groupNameCheck && (
            <Alert
              status="error"
              padding="4px"
              fontSize="12px"
              borderRadius="3px"
              mb={2}
            >
              <AlertIcon className="alertIconStyle" />
              Enter valid group name
            </Alert>
          )}
          <FormLabel>Background Color</FormLabel>
          <div className="colorSelectBlock">
            <div
              className="colorSelection color1"
              onClick={() => handleColorClick("#ffc9c9")}
            ></div>
            <div
              className="colorSelection color2"
              onClick={() => handleColorClick("#b2f2bb")}
            ></div>
            <div
              className="colorSelection color3"
              onClick={() => handleColorClick("#a5d8ff")}
            ></div>
            <div
              className="colorSelection color4"
              onClick={() => handleColorClick("#ffec99")}
            ></div>
            <div
              className="colorSelection color5"
              onClick={() => handleColorClick("#fff")}
            ></div>
          </div>
          <Button
            onClick={() => onSubmit(groupData)}
            style={{ display: "block", margin: "0 auto" }}
            isDisabled={groupNameCheck}
          >
            Save
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default GroupDataModal;
