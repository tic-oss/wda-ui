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

const EdgeModal = ({ isOpen, CurrentEdge,onClose, handleEdgeData }) => {
  console.log(CurrentEdge,'edgeeeeee')
  const IntialState = {
    'communicationType': 'asynchronous',
    'protocol':'rest',
    'selectedBroker':'rabbitmq',
    ...CurrentEdge
  }
  const [EdgeData, setEdgeData] = useState(IntialState)

  const handleData = (column,value)=>{
    setEdgeData((prev)=>({...prev,[column]:value}))
  }



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
                value={EdgeData.communicationType}
                onChange={(e)=>handleData('communicationType',e.target.value)}
              >
                <option value="asynchronous">Asynchronous</option>
                <option value="synchronous">Synchronous</option>
              </Select>
            </FormControl>

            {EdgeData.communicationType === 'synchronous' ? (
              <FormControl>
                <FormLabel>Protocol</FormLabel>
                <Select
                  mb={4}
                  variant="outline"
                  id="framework"
                  borderColor={"black"}
                  value={EdgeData.protocol}
                  onChange={(e)=>handleData('protocol',e.target.value)}
                >
                  <option value="rest">REST</option>
                </Select>
              </FormControl>
            ) : EdgeData.communicationType === 'asynchronous' ? (
              <FormControl>
                <FormLabel>Message Broker</FormLabel>
                <Select
                  mb={4}
                  variant="outline"
                  id="framework"
                  borderColor={"black"}
                  value={EdgeData.selectedBroker}
                  onChange={(e)=>handleData('selectedBroker',e.target.value)}
                >
                  <option value="rabbitmq">Rabbit MQ</option>
                  <option value="kafka">Kafka</option>
                  <option value="pulsar">Pulsar</option>
                </Select>
              </FormControl>
            ) : null}


          </div>
          <ModalFooter>
            <Button type="submit" onClick={()=>handleEdgeData(EdgeData)}>Submit</Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EdgeModal;