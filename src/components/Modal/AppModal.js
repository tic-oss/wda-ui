import React,{useState} from "react";
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
} from "@chakra-ui/react";

const AppModal = ({ isOpen, onClose, onSubmit }) => {
  let frameworkLabel = '';
  let frameworkOptions = [];
  if (isOpen && isOpen.includes('Service')) {
    frameworkLabel = 'Service Framework';
    frameworkOptions = ['Java', 'Go'];
  } else if (isOpen && isOpen.includes('UI')) {
    frameworkLabel = 'UI Framework';
    frameworkOptions = ['ReactJS', 'NodeJS'];
  }
  const [selectedFramework, setSelectedFramework] = useState('');

  const handleFrameworkChange = (event) => {
    setSelectedFramework(event.target.value);
  };
 console.log(frameworkLabel)
  console.log(isOpen)
  return (
    <Modal isOpen={isOpen} onClose={()=>onClose(false)} isCentered={true}>
      
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>AppModal</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
         
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "Left",
            }}
          >
            <lable>Application name</lable>
            <Input
              mb={4}
              variant="outline"
              id="appname"
              placeholder="Name"
              borderColor={"black"}
            />
           <label>{frameworkLabel}</label>
      <Select
        mb={4}
        id="framework"
        borderColor={"black"}
        placeholder="Select Framework"
        value={selectedFramework}
        onChange={handleFrameworkChange}
      >
        {frameworkOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
            <lable>Package Name</lable>
            <Input
              mb={4}
              variant="outline"
              id="packagename"
              placeholder="PackageName"
              borderColor={"black"}
            />
            <lable>Server Port</lable>
            <Input
              mb={4}
              variant="outline"
              id="serverport"
              placeholder="ServerPort"
              borderColor={"black"}
            />
          </div>
          <ModalFooter>
            <Button onClick={onSubmit} type="submit">Submit</Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AppModal;