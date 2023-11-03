import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  Button,
  FormLabel,
  FormControl,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import "./modals.css";

const EdgeModal = ({
  isOpen,
  CurrentEdge,
  onClose,
  handleEdgeData,
  isServiceDiscovery,
}) => {
  const initialState = {
    type: "",
    framework: "",
    ...CurrentEdge,
  };
  const [edgeData, setEdgeData] = useState(initialState);

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

  const isEmpty = edgeData.type === "" || edgeData.framework === "";

  const handleData = (column, value) => {
    if (column === "type") {
      setEdgeData((prev) => ({
        ...prev,
        [column]: value,
        framework: "",
      }));
    } else {
      setEdgeData((prev) => ({
        ...prev,
        [column]: value,
      }));
    }
  };

  function handleSubmit(edgeData) {
    if (edgeData.type === "asynchronous") {
      handleEdgeData(edgeData);
    } else if (edgeData.type === "synchronous") {
      isServiceDiscovery && handleEdgeData(edgeData);
    }
  }

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
        <ModalHeader className="heading">Communication</ModalHeader>
        <ModalCloseButton mt={1.5} />
        <ModalBody>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Select
              mb={4}
              variant="outline"
              id="type"
              data-testid="type"
              borderColor={"black"}
              value={edgeData.type}
              onChange={(e) => handleData("type", e.target.value)}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="asynchronous">Asynchronous</option>
              <option value="synchronous">Synchronous</option>
            </Select>
          </FormControl>

          {edgeData.type === "synchronous" && (
            <FormControl>
              <FormLabel>Framework</FormLabel>
              <Select
                mb={4}
                variant="outline"
                id="framework"
                data-testid="synchronousfw"
                borderColor={"black"}
                value={edgeData.framework}
                onChange={(e) => handleData("framework", e.target.value)}
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="rest-api">REST</option>
              </Select>
            </FormControl>
          )}
          {edgeData.type === "asynchronous" && (
            <FormControl>
              <FormLabel>Framework</FormLabel>
              <Select
                mb={4}
                variant="outline"
                id="framework"
                data-testid="asynchronousfw"
                borderColor={"black"}
                value={edgeData.framework}
                onChange={(e) => handleData("framework", e.target.value)}
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="rabbitmq">Rabbit MQ</option>
              </Select>
            </FormControl>
          )}
          {edgeData.type === "synchronous" &&
            edgeData.framework === "rest-api" &&
            !isServiceDiscovery && (
              <Alert
                status="error"
                fontSize="12px"
                borderRadius="3px"
                padding="4px"
                mb={2}
              >
                <AlertIcon data-testid='errorMsg' className="alertIconStyle" />
                Please select a service discovery to establish communication
              </Alert>
            )}
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ display: "block", margin: "0 auto" }}
            isDisabled={isEmpty}
            onClick={() => handleSubmit(edgeData)}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EdgeModal;
