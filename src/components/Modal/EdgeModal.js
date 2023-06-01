import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  Button,
  FormLabel,
  FormControl
} from "@chakra-ui/react";

const EdgeModal = ({ isOpen, CurrentEdge, onClose, handleEdgeData }) => {
  console.log(CurrentEdge, 'edgeeeeee');
  const initialState = {
    type: "",
    framework: "",
    ...CurrentEdge
  };
  const [edgeData, setEdgeData] = useState(initialState);

  const handleData = (column, value) => {
   
    if (column === "type") {
      setEdgeData((prev) => ({
        ...prev,
        [column]: value,
        framework: ""
      }));
    } else {
      setEdgeData((prev) => ({
        ...prev,
        [column]: value
      }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Communication</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <FormControl>
              <FormLabel>Type</FormLabel>
              <Select
                mb={4}
                variant="outline"
                id="type"
                borderColor={"black"}
                value={edgeData.type}
                onChange={(e) => handleData("type", e.target.value)}
              >
                <option value="" disabled>Select an option</option>
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
                  borderColor={"black"}
                  value={edgeData.framework}
                  onChange={(e) => handleData("framework", e.target.value)}
                >
                  <option value="" disabled>Select an option</option>
                  <option value="rest">REST</option>
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
                  borderColor={"black"}
                  value={edgeData.framework}
                  onChange={(e) => handleData("framework", e.target.value)}
                >
                   <option value="" disabled>Select an option</option>
                  <option value="rabbitmq">Rabbit MQ</option>
                  {/* <option value="kafka">Kafka</option>
                  <option value="pulsar">Pulsar</option> */}
                </Select>
              </FormControl>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => handleEdgeData(edgeData)}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EdgeModal;
