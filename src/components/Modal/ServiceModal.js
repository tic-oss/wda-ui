import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Select,
  Button,
  FormLabel,
  FormControl
} from "@chakra-ui/react";

const ServiceModal = ({ isOpen, onClose, onSubmit,CurrentNode }) => {
 const IntialState ={
    'label':'',
    'Framework':'java',
    'PackageName':'',
    'ServerPort':'',
    'ApplicationType':'microservice',
    ...CurrentNode
  }
  const [ApplicationData,setApplicationData] = useState(IntialState)

  const handleData = (column,value)=>{
    setApplicationData((prev)=>({...prev,[column]:value}))
  }

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Service</ModalHeader>
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
              <FormLabel>Application name</FormLabel>
              <Input
                mb={4}
                variant="outline"
                id="appname"
                placeholder="Name"
                borderColor={"black"}
                value={ApplicationData.label}
                onChange={(e)=>handleData('label',e.target.value)}
              />
            </FormControl>
            
       <FormControl>
              <FormLabel>Framework</FormLabel>
              <Select mb={4} variant="outline" id="framework" 
                borderColor={"black"}
                value={ApplicationData.Framework}
                onChange={(e)=>handleData('Framework',e.target.value)}
              >
                <option value="java">Java</option>
                <option value="go">Go</option>
              </Select>
            </FormControl>
              
         
            <FormControl>
              <FormLabel>Package Name</FormLabel>
              <Input
                mb={4}
                variant="outline"
                id="packagename"
                placeholder="PackageName"
                borderColor={"black"}
                value={ApplicationData.PackageName}
                onChange={(e)=>handleData('PackageName',e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Server Port</FormLabel>
              <Input
                mb={4}
                variant="outline"
                id="serverport"
                placeholder="ServerPort"
                borderColor={"black"}
                value={ApplicationData.ServerPort}
                onChange={(e)=>handleData('ServerPort',e.target.value)}
              />
            </FormControl>
          </div>
          <Button onClick={()=>onSubmit(ApplicationData)}>Submit</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ServiceModal;
