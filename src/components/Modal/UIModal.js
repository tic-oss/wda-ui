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

const UiDataModal = ({ isOpen, onClose, onSubmit,CurrentNode }) => {

  const IntialState ={
    'applicationName':'UI',
    'clientFramework':'reactjs',
    'packageName':'',
    'serverPort':'',
    'ApplicationType':'gateway',
    ...CurrentNode
  }

  const [UiData,setUiDataData] = useState(IntialState)

  const handleData = (column,value)=>{
    setUiDataData((prev)=>({...prev,[column]:value}))
  }

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>UI</ModalHeader>
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
                value={UiData.applicationName}
                onChange={(e)=>handleData('applicationName',e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>clientFramework</FormLabel>
              <Select mb={4} variant="outline" id="clientFramework" 
                borderColor={"black"}
                value={UiData.clientFramework}
                onChange={(e)=>handleData('clientFramework',e.target.value)}
              >
                <option value="reactjs">ReactJS</option>
                <option value="nodejs">NodeJS</option>
              </Select>
            </FormControl>
              
        
            <FormControl>
              <FormLabel>Package Name</FormLabel>
              <Input
                mb={4}
                variant="outline"
                id="packageName"
                placeholder="packageName"
                borderColor={"black"}
                value={UiData.packageName}
                onChange={(e)=>handleData('packageName',e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Server Port</FormLabel>
              <Input
                mb={4}
                variant="outline"
                id="serverPort"
                placeholder="serverPort"
                borderColor={"black"}
                value={UiData.serverPort}
                onChange={(e)=>handleData('serverPort',e.target.value)}
              />
            </FormControl>
            
          </div>
          <Button onClick={()=>onSubmit(UiData)}style={{ display: 'block', margin: '0 auto' }}>Submit</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UiDataModal;
