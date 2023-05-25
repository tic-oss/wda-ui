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
    'type': 'asynchronous',
    'framework':'rest',
    'framework':'rabbitmq',
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
        <ModalHeader>Communication</ModalHeader>
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
              <FormLabel>Type</FormLabel>
              <Select
                mb={4}
                variant="outline"
                id="framework"
                borderColor={"black"}
                value={EdgeData.type}
                onChange={(e)=>handleData('type',e.target.value)}
              >
                <option value="asynchronous">Asynchronous</option>
                <option value="synchronous">Synchronous</option>
              </Select>
            </FormControl>

            {EdgeData.type === 'synchronous' ? (
              <FormControl>
                <FormLabel>Framework</FormLabel>
                <Select
                  mb={4}
                  variant="outline"
                  id="framework"
                  borderColor={"black"}
                  value={EdgeData.framework}
                  onChange={(e)=>handleData('framework',e.target.value)}
                >
                  <option value="rest">REST</option>
                </Select>
              </FormControl>
            ) : EdgeData.type === 'asynchronous' ? (
              <FormControl>
                <FormLabel>Framework</FormLabel>
                <Select
                  mb={4}
                  variant="outline"
                  id="framework"
                  borderColor={"black"}
                  value={EdgeData.framework}
                  onChange={(e)=>handleData('framework',e.target.value)}
                >
                  <option value="rabbitmq">Rabbit MQ</option>
                  <option value="kafka">Kafka</option>
                  <option value="pulsar">Pulsar</option>
                </Select>
              </FormControl>
            ) : null}


          </div>
          <ModalFooter>
            <Button type="submit" onClick={()=>handleEdgeData(EdgeData)}style={{ display: 'block', margin: '0 auto' }}>Submit</Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EdgeModal;