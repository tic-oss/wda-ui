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

const AlertModal = ({ isOpen, onClose ,name }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>You have already slected one from this category,please delete the first one if you wish to change your choice.</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "Left",
            }}
          >
            
            </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AlertModal;