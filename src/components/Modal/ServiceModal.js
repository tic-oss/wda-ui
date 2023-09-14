import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Select,
  Button,
  FormLabel,
  FormControl,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import "./modals.css";

const ServiceModal = ({
  isOpen,
  onClose,
  onSubmit,
  CurrentNode,
  handleColorClick,
  uniqueApplicationNames,
  uniquePortNumbers,
}) => {
  const IntialState = {
    label: "Service",
    applicationName: "",
    applicationFramework: "java",
    packageName: "",
    serverPort: "",
    applicationType: "microservice",
    ...CurrentNode,
  };
  const [ApplicationData, setApplicationData] = useState(IntialState);

  useEffect(() => {
    const handleDeleteKeyPress = (event) => {
      if (
        isOpen &&
        (event.key === "Backspace" || event.key === "Delete") &&
        event.target.tagName !== "INPUT"
      ) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleDeleteKeyPress);
    return () => {
      window.removeEventListener("keydown", handleDeleteKeyPress);
    };
  }, [isOpen, onClose]);

  const [duplicateApplicationNameError, setDuplicateApplicationNameError] =
    useState(false);

  const [PortNumberError, setPortNumberError] = useState(false);

  const ValidateName = (value) => {
    const currentApplicationName = CurrentNode?.applicationName;
    const isDuplicateName =
      uniqueApplicationNames.includes(value) &&
      value !== currentApplicationName;
    if (isDuplicateName && value !== "") {
      setDuplicateApplicationNameError(true);
      return false;
    } else {
      setDuplicateApplicationNameError(false);
      return true;
    }
  };

  //check whether port number is unique and lies within the range
  const ValidatePortNumber = (value) => {
    const currentServerPort = CurrentNode?.serverPort;
    const isDuplicatePort =
      uniquePortNumbers.includes(value) && value !== currentServerPort;
    if (isDuplicatePort && value !== "") {
      setPortNumberError(true);
      return false;
    } else {
      setPortNumberError(false);
      return true;
    }
  };

  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if ((charCode >= 48 && charCode <= 57) || charCode === 8) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  };

  const handleData = (column, value) => {
    if (column === "label") {
      ValidateName(value);
      setApplicationData((prev) => ({
        ...prev,
        [column]: value,
        applicationName: value,
      }));
    } else if (column === "serverPort") {
      ValidatePortNumber(value);
      setApplicationData((prev) => ({
        ...prev,
        [column]: value,
        serverPort: value,
      }));
    } else {
      setApplicationData((prev) => ({
        ...prev,
        [column]: value,
      }));
    }
    if (column === "serverPort" && ApplicationData.serverPort === "9000") {
      // Update serverPort only if it has not been edited by the user
      setApplicationData((prev) => ({ ...prev, [column]: value }));
    } else {
      setApplicationData((prev) => ({ ...prev, [column]: value }));
    }
  };

  const isSubmitDisabled =
    ApplicationData.applicationName === "" ||
    ApplicationData.packageName === "" ||
    ApplicationData.serverPort === "";

  const reservedPorts = ["5601", "9200", "15021", "20001", "3000", "8080"];
  const serverPortCheck =
    ApplicationData.serverPort &&
    reservedPorts.includes(ApplicationData.serverPort);

  const PortNumberRangeCheck =
    ApplicationData.serverPort &&
    (Number(ApplicationData.serverPort) < 1024 ||
      Number(ApplicationData.serverPort) > 65535);

  const appNameCheck =
    ApplicationData.applicationName &&
    !/^[a-zA-Z](?:[a-zA-Z0-9]*[a-zA-Z0-9])?$/g.test(
      ApplicationData.applicationName
    );

  const packageNameCheck =
    ApplicationData.packageName &&
    !/^[a-zA-Z](?:[a-zA-Z0-9_.-]*[a-zA-Z0-9])?$/g.test(
      ApplicationData.packageName
    );

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)}>
      <ModalContent
        style={{
          position: "absolute",
          top: "20px",
          right: "10px",
          width: "300px",
        }}
      >
        <ModalHeader className="heading">Service</ModalHeader>
        <ModalCloseButton mt={1.5} />
        <ModalBody>
          <FormControl>
            <FormLabel>Application name</FormLabel>
            <Input
              mb={4}
              variant="outline"
              id="applicationName"
              placeholder="Name"
              borderColor={
                duplicateApplicationNameError ||
                !ApplicationData.applicationName
                  ? "red"
                  : "black"
              }
              maxLength="32"
              value={ApplicationData.applicationName}
              onChange={(e) => handleData("label", e.target.value)}
            />
          </FormControl>
          {appNameCheck && (
            <Alert
              status="error"
              fontSize="12px"
              padding="4px"
              borderRadius="3px"
              mb={2}
            >
              <AlertIcon style={{ width: "14px", height: "14px" }} />
              Application Name should not contain special characters.
            </Alert>
          )}
          {duplicateApplicationNameError && (
            <Alert
              status="error"
              padding="4px"
              fontSize="12px"
              borderRadius="3px"
              mb={2}
            >
              <AlertIcon style={{ width: "14px", height: "14px" }} />
              Application name already exists. Please choose a unique name.
            </Alert>
          )}
          <FormControl>
            <FormLabel>Application Framework</FormLabel>
            <Select
              mb={4}
              variant="outline"
              id="applicationFramework"
              borderColor={"black"}
              value={ApplicationData.applicationFramework}
              onChange={(e) =>
                handleData("applicationFramework", e.target.value)
              }
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="java">Spring Boot</option>
              <option value="gomicro">Go Micro</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Package Name</FormLabel>
            <Input
              mb={4}
              variant="outline"
              id="packagename"
              placeholder="packageName"
              borderColor={!ApplicationData.packageName ? "red" : "black"}
              maxLength="32"
              value={ApplicationData.packageName}
              onChange={(e) => handleData("packageName", e.target.value)}
            />
          </FormControl>
          {packageNameCheck && (
            <Alert
              status="error"
              padding="4px"
              fontSize="12px"
              borderRadius="3px"
              mb={2}
            >
              <AlertIcon style={{ width: "14px", height: "14px" }} />
              Enter a valid package name
            </Alert>
          )}
          <FormControl>
            <FormLabel>Server Port</FormLabel>
            <Input
              mb={4}
              defaultValue={9000}
              variant="outline"
              id="serverport"
              placeholder="Port number"
              borderColor={
                PortNumberError || serverPortCheck || PortNumberRangeCheck
                  ? "red"
                  : "black"
              }
              value={ApplicationData.serverPort}
              maxLength="5"
              onKeyPress={handleKeyPress}
              onChange={(e) => handleData("serverPort", e.target.value)}
            />
          </FormControl>
          {serverPortCheck && (
            <Alert
              status="error"
              padding="4px"
              fontSize="12px"
              borderRadius="3px"
              mb={2}
            >
              <AlertIcon style={{ width: "14px", height: "14px" }} />
              The input cannot contain reserved port number.
            </Alert>
          )}
          {PortNumberError && (
            <Alert
              status="error"
              padding="4px"
              fontSize="12px"
              borderRadius="3px"
              mb={2}
            >
              <AlertIcon style={{ width: "14px", height: "14px" }} />
              Port Number already exists. Please choose a unique Number.
            </Alert>
          )}
          {PortNumberRangeCheck && (
            <Alert
              status="error"
              padding="4px"
              fontSize="12px"
              borderRadius="3px"
              mb={2}
            >
              <AlertIcon style={{ width: "14px", height: "14px" }} />
              Port Number is out of the valid range.
            </Alert>
          )}
          <FormLabel>Background Color</FormLabel>
          <div className="colorSelectBlock">
            <div
              className="colorSelection"
              style={{ backgroundColor: "#ffc9c9" }}
              onClick={() => handleColorClick("#ffc9c9")}
            ></div>
            <div
              className="colorSelection"
              style={{ backgroundColor: "#b2f2bb" }}
              onClick={() => handleColorClick("#b2f2bb")}
            ></div>
            <div
              className="colorSelection"
              style={{ backgroundColor: "#a5d8ff" }}
              onClick={() => handleColorClick("#a5d8ff")}
            ></div>
            <div
              className="colorSelection"
              style={{ backgroundColor: "#ffec99" }}
              onClick={() => handleColorClick("#ffec99")}
            ></div>
            <div
              className="colorSelection"
              style={{ border: "1px solid #cfcfcf", backgroundColor: "#fff" }}
              onClick={() => handleColorClick("#fff")}
            ></div>
          </div>
          <Button
            onClick={() =>
              !duplicateApplicationNameError && onSubmit(ApplicationData)
            }
            style={{ display: "block", margin: "0 auto" }}
            isDisabled={
              isSubmitDisabled ||
              appNameCheck ||
              serverPortCheck ||
              PortNumberError ||
              PortNumberRangeCheck
            }
          >
            Save
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ServiceModal;
