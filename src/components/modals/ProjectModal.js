import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Select,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import "./modals.css";

const ProjectModal = ({
  nodeType,
  serviceModal,
  handleContainerClose,
  applicationName,
  clientFramework,
  applicationFramework,
  packageName,
  serverPort,
  withExample,
}) => {
  return (
    <>
      <Modal
        isOpen={serviceModal}
        onClose={handleContainerClose}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent className="heading">
          {nodeType === "UI" ? (
            <ModalHeader>UI</ModalHeader>
          ) : (
            <ModalHeader>Service</ModalHeader>
          )}
          <ModalCloseButton mt={1.5}/>
          <ModalBody>
              <FormControl>
                <FormLabel>Application name</FormLabel>
                <Input
                  mb={4}
                  variant="outline"
                  id="applicationName"
                  placeholder="Name"
                  borderColor={"black"}
                  value={applicationName}
                  isDisabled={true}
                />
              </FormControl>
              {nodeType === "UI" ? (
                <FormControl>
                  <FormLabel>Client Framework</FormLabel>
                  <Select
                    mb={4}
                    variant="outline"
                    id="clientFramework"
                    borderColor={"black"}
                    value={clientFramework}
                    isDisabled={true}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="react">React</option>
                    <option value="angular">Angular</option>
                    <option value="vue">Vue</option>
                  </Select>
                </FormControl>
              ) : (
                <FormControl>
                  <FormLabel>Application Framework</FormLabel>
                  <Select
                    mb={4}
                    variant="outline"
                    id="applicationFramework"
                    borderColor={"black"}
                    value={applicationFramework}
                    isDisabled={true}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="java">Java</option>
                    <option value="gomicro">Go Micro</option>
                  </Select>
                </FormControl>
              )}

              <FormControl>
                <FormLabel>Package Name</FormLabel>
                <Input
                  mb={4}
                  variant="outline"
                  id="packageName"
                  placeholder="packageName"
                  borderColor={"black"}
                  value={packageName}
                  isDisabled={true}
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
                  value={serverPort}
                  isDisabled={true}
                />
              </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ProjectModal;