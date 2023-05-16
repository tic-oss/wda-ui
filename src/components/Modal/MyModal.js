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

const MyModal = ({ isOpen, onClose, onSubmit,CurrentNode }) => {

  const type = isOpen?.split('_')[0] || null;

  const IntialState ={
    'label':'',
    'Framework':'',
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
        <ModalHeader>{type}</ModalHeader>
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
              <Input
                mb={4}
                id="framework"
                borderColor={"black"}
                placeholder="framework"
                value={ApplicationData.Framework}
                onChange={(e)=>handleData('Framework',e.target.value)}
              />
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
            <FormControl>
              <FormLabel>Application Type</FormLabel>
              <Select mb={4} variant="outline" id="apptype" 
                borderColor={"black"}
                value={ApplicationData.ApplicationType}
                onChange={(e)=>handleData('ApplicationType',e.target.value)}
              >
                <option value="microservice">Microservice</option>
                <option value="gateway">UI + Gateway</option>
              </Select>
            </FormControl>
          </div>
          <Button onClick={()=>onSubmit(ApplicationData)}>Submit</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MyModal;
