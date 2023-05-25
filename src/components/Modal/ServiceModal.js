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
  FormControl,
} from "@chakra-ui/react";

const ServiceModal = ({ isOpen, onClose, onSubmit,CurrentNode }) => {
 const IntialState ={
    'label':'',
    'applicationFramework':'java',
    'packageName':'',
    'serverPort':'',
    'applicationType':'microservice',
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
                id="applicationName"
                placeholder="Name"
                borderColor={"black"}
                value={ApplicationData.applicationName}
                onChange={(e)=>handleData('label',e.target.value)}
              />
            </FormControl>
            
       <FormControl>
              <FormLabel>applicationFramework</FormLabel>
              <Select mb={4} variant="outline" id="applicationFramework" 
                borderColor={"black"}
                value={ApplicationData.applicationFramework}
                onChange={(e)=>handleData('applicationFramework',e.target.value)}
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
                placeholder="packageName"
                borderColor={"black"}
                value={ApplicationData.packageName}
                onChange={(e)=>handleData('packageName',e.target.value)}
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
                value={ApplicationData.serverPort}
                onChange={(e)=>handleData('serverPort',e.target.value)}
              />
            </FormControl>
          </div>
          <Button onClick={()=>onSubmit(ApplicationData)}style={{ display: 'block', margin: '0 auto' }}>Submit</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ServiceModal;
