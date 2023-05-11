import React from "react";
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

const MyModal = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={()=>onClose(false)} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal</ModalHeader>
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
            <lable>Framework</lable>
            <Input
              mb={4}
              id="framework"
              borderColor={"black"}
              placeholder="framework"
            />
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
            <lable>Application Type</lable>
            <Select mb={4} variant="outline" id="apptype" borderColor={"black"}>
              <option value="microservice">Microservice</option>
              <option value="gateway">UI + Gateway</option>
            </Select>
          </div>
          <Button onClick={onSubmit}>Submit</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MyModal;
