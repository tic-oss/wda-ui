import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  Button,
  FormLabel,
  FormControl
} from "@chakra-ui/react";

const EdgeModal = ({ isOpen, onClose }) => {
  const IntialState = {
    'EdgeType': '',
  }
  const [EdgeData, setEdgeData] = useState(IntialState)

  // const handleData = (column,value)=>{
  //   setEdgeData((prev)=>({...prev,[column]:value}))
  // }
  const [communicationType, setCommunicationType] = useState('asynchronous');
  const [selectedBroker, setSelectedBroker] = useState('rabbitmq');

  const handleCommunicationChange = (value) => {
    setCommunicationType(value);
  };

  const handleBrokerChange = (value) => {
    setSelectedBroker(value);
  };



  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} isCentered={true}>

      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edge</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "Left",
            }}
          >
            <FormControl>
              <FormLabel>Communication</FormLabel>
              <Select
                mb={4}
                variant="outline"
                id="framework"
                borderColor={"black"}
                value={EdgeData.Communication}
                onChange={(e) => handleCommunicationChange(e.target.value)}
              >
                <option value="asynchronous">Asynchronous</option>
                <option value="synchronous">Synchronous</option>
              </Select>
            </FormControl>

            {communicationType === 'synchronous' ? (
              <FormControl>
                <FormLabel>Protocol</FormLabel>
                <Select
                  mb={4}
                  variant="outline"
                  id="framework"
                  borderColor={"black"}
                  value={communicationType}
                  onChange={(e) => handleCommunicationChange(e.target.value)}
                >
                  <option value="rest">REST</option>
                </Select>
              </FormControl>
            ) : communicationType === 'asynchronous' ? (
              <FormControl>
                <FormLabel>Message Broker</FormLabel>
                <Select
                  mb={4}
                  variant="outline"
                  id="framework"
                  borderColor={"black"}
                  value={selectedBroker}
                  onChange={(e) => handleBrokerChange(e.target.value)}
                >
                  <option value="rabbitmq">Rabbit MQ</option>
                  <option value="kafka">Kafka</option>
                  <option value="pulsar">Pulsar</option>
                </Select>
              </FormControl>
            ) : null}


          </div>
          <ModalFooter>
            <Button type="submit" onClick={() => onClose(false)}>Submit</Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EdgeModal;