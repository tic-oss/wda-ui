import React, { useState, useEffect } from 'react';
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
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('formData', JSON.stringify(formData));
    onSubmit(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "Left",
              }}
            >
              <label>Application name</label>
              <Input
                mb={4}
                variant="outline"
                id="appname"
                name="appname"
                placeholder="Name"
                borderColor={"black"}
                value={formData.appname || ""}
                onChange={handleChange}
              />
              <label>Framework</label>
              <Input
                mb={4}
                id="framework"
                borderColor={"black"}
                placeholder="framework"
                name="framework"
                value={formData.framework || ""}
                onChange={handleChange}
              />
              <label>Package Name</label>
              <Input
                mb={4}
                variant="outline"
                id="packagename"
                placeholder="PackageName"
                borderColor={"black"}
                name="packagename"
                value={formData.packagename || ""}
                onChange={handleChange}
              />
              <label>Server Port</label>
              <Input
                mb={4}
                variant="outline"
                id="serverport"
                placeholder="ServerPort"
                borderColor={"black"}
                name="serverport"
                value={formData.serverport || ""}
                onChange={handleChange}
              />
              <label>Application Type</label>
              <Select
                mb={4}
                variant="outline"
                id="apptype"
                borderColor={"black"}
                name="apptype"
                value={formData.apptype || ""}
                onChange={handleChange}
              >
                <option value="microservice">Microservice</option>
                <option value="gateway">UI + Gateway</option>
              </Select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onSubmit} type="submit">Submit</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default MyModal;
