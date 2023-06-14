import React, { useState } from "react";
import db1 from "../assets/pstgrc.jpeg";
import db2 from "../assets/mongo.png";
import eurkea from "../assets/eureka.jpg";
import keycloak from "../assets/keycloak.png";
import azure from "../assets/Azure.png";
import aws from "../assets/aws.png";
import eck from "../assets/eck.png";
import mini from "../assets/mini.jpeg";
import docker from "../assets/docker.png";
import "./../App.css";
import {
  Input,
  FormLabel,
  Button,
  Flex,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  Select,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

export default ({
  isUINodeEnabled,
  setIsUINodeEnabled,
  onSubmit,
  Service_Discovery_Data,
  authenticationData,
  isLoading,
}) => {
  const onDragStart = (event, nodeType, Name) => {
    if (Name === "UI") {
      setIsUINodeEnabled(true);
    }
    event.dataTransfer.setData("Name", Name);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOption = (option) => {
    setSelectedOption((prevOption) => (prevOption === option ? null : option));
  };
  const IntialState = {
    projectName: "",
  };
  const handleContainerClose = () => {
    setIsOpen(false);
  };

  const [projectData, setprojectData] = useState(IntialState);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleProjectData = (column, value) => {
    setIsEmpty(value === "");
    setprojectData((prev) => ({ ...prev, [column]: value }));
  };
  const handleData = (column, value) => {
    if (column === "awsAccountId") validateInputValue(value);
    setDeploymentData((prev) => ({ ...prev, [column]: value }));
  };
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setDeploymentData((prevState) => ({
      ...prevState,
      cloudProvider: image,
    }));
  };
  const deploymentIntialState = {
    deploymentType: "",
    ...(selectedImage === "azure"
      ? {
          location: "",
          acrRegistry: "",
          resourcegroupname: "",
          subscriptionId: "",
          tenantId: "",
        }
      : {}),
    ...(selectedImage === "aws"
      ? {
          awsAccountId: "",
          awsRegion: "",
          kubernetesStorageClassName: "",
        }
      : {}),
    clusterName: "",
    kubernetesUseDynamicStorage: "true",
    kubernetesNamespace: "",
    ingressType: "istio",
    monitoring: "",
    ingressDomain: "",
    k8sWebUI: "",
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
  console.log(isOpen);
  const [DeploymentData, setDeploymentData] = useState(deploymentIntialState);

  const [checkLength, setCheckLength] = useState(false);
  const validateInputValue = (value) => {
    if (value.length < 12) {
      setCheckLength(true);
    } else setCheckLength(false);
  };
  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <h2 style={{ display: "inline-block" }}>
              Deployment Infrastructure
            </h2>
          </ModalHeader>
          <ModalBody
            style={{
              maxHeight: "calc(100vh - 200px)",
              overflowY: "auto",
              maxHeight: "600px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <img
                width="120px"
                src={azure}
                alt="azurelogo"
                onClick={() => handleImageClick("azure")}
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  width: "120px",
                  cursor: "pointer",
                  border:
                    selectedImage === "azure"
                      ? "2px solid #3182CE"
                      : "2px solid transparent",
                }}
              />
              <img
                width="120px"
                src={aws}
                alt="awslogo"
                onClick={() => handleImageClick("aws")}
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  width: "120px",
                  cursor: "pointer",
                  border:
                    selectedImage === "aws"
                      ? "2px solid #3182CE"
                      : "2px solid transparent",
                }}
              />
            </div>
            {selectedImage === "azure" && (
              <div>
                <FormControl>
                  <FormLabel>Azure Registry</FormLabel>
                  <Input
                    mb={4}
                    variant="outline"
                    id="acrRegistry"
                    borderColor={"black"}
                    value={DeploymentData.acrRegistry}
                    onChange={(e) => handleData("acrRegistry", e.target.value)}
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>Subscription Id</FormLabel>
                  <Input
                    mb={4}
                    variant="outline"
                    id="subscriptionId"
                    borderColor={"black"}
                    value={DeploymentData.subscriptionId}
                    onChange={(e) =>
                      handleData("subscriptionId", e.target.value)
                    }
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>Tenant ID</FormLabel>
                  <Input
                    mb={4}
                    variant="outline"
                    id="tenantId"
                    borderColor={"black"}
                    value={DeploymentData.tenantId}
                    onChange={(e) => handleData("tenantId", e.target.value)}
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>Resource Group Name</FormLabel>
                  <Input
                    mb={4}
                    variant="outline"
                    id="resourcegroupname"
                    borderColor={"black"}
                    value={DeploymentData.resourcegroupname}
                    onChange={(e) =>
                      handleData("resourcegroupname", e.target.value)
                    }
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Select
                    mb={4}
                    variant="outline"
                    id="location"
                    borderColor={"black"}
                    value={DeploymentData.location}
                    onChange={(e) => handleData("location", e.target.value)}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="canadacentral">Canada Central</option>
                  </Select>
                </FormControl>
              </div>
            )}
            {selectedImage === "aws" && (
              <div>
                <FormControl>
                  <FormLabel>AWS Account ID</FormLabel>
                  <Input
                    mb={4}
                    variant="outline"
                    type="text"
                    placeholder="123456789"
                    id="awsAccountId"
                    onKeyPress={handleKeyPress}
                    maxLength="12"
                    borderColor={"black"}
                    value={DeploymentData.awsAccountId}
                    onChange={(e) => handleData("awsAccountId", e.target.value)}
                  ></Input>
                </FormControl>
                {DeploymentData.awsAccountId &&
                  DeploymentData.awsAccountId.length != 12 && (
                    <Alert
                      status="error"
                      height="12px"
                      fontSize="12px"
                      borderRadius="3px"
                      mb={2}
                    >
                      <AlertIcon style={{ width: "14px", height: "14px" }} />
                      Input value must be at least 12 digits
                    </Alert>
                  )}
                <FormControl>
                  <FormLabel>AWS Region</FormLabel>
                  <Select
                    mb={4}
                    variant="outline"
                    id="awsRegion"
                    borderColor={"black"}
                    value={DeploymentData.awsRegion || ""}
                    onChange={(e) => handleData("awsRegion", e.target.value)}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="us-east-2">US East (Ohio)</option>
                    <option value="us-east-1">US East (N. Virginia)</option>
                    <option value="ap-south-1">Asia Pacific (Mumbai)</option>
                  </Select>
                </FormControl>
              </div>
            )}
            {selectedImage && (
              <FormControl>
                <FormLabel>Deployment Type</FormLabel>
                <Select
                  mb={4}
                  variant="outline"
                  id="deploymentType"
                  borderColor={"black"}
                  value={DeploymentData.deploymentType}
                  onChange={(e) => handleData("deploymentType", e.target.value)}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="kubernetes">Kubernetes</option>
                </Select>
              </FormControl>
            )}

            {DeploymentData.deploymentType === "kubernetes" && (
              <div>
                <FormControl>
                  <FormLabel>Cluster Name</FormLabel>
                  <Input
                    mb={4}
                    variant="outline"
                    id="clusterName"
                    borderColor={"black"}
                    value={DeploymentData.clusterName}
                    onChange={(e) => handleData("clusterName", e.target.value)}
                  ></Input>
                </FormControl>

                <FormControl>
                  <FormLabel>Enable Dynamic Storage</FormLabel>
                  <Select
                    mb={4}
                    variant="outline"
                    id="kubernetesUseDynamicStorage"
                    borderColor={"black"}
                    value={DeploymentData.kubernetesUseDynamicStorage}
                    onChange={(e) =>
                      handleData("kubernetesUseDynamicStorage", e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Select>
                </FormControl>
                {DeploymentData.kubernetesUseDynamicStorage === "true" && (
                  <FormControl>
                    <FormLabel>Storage Class Name</FormLabel>
                    <Input
                      mb={4}
                      variant="outline"
                      id="kubernetesStorageClassName"
                      placeholder="Kubernetes Storage Class Name"
                      borderColor={"black"}
                      value={DeploymentData.kubernetesStorageClassName}
                      onChange={(e) =>
                        handleData("kubernetesStorageClassName", e.target.value)
                      }
                    />
                  </FormControl>
                )}

                <FormControl>
                  <FormLabel>Namespace</FormLabel>
                  <Input
                    mb={4}
                    variant="outline"
                    id="kubernetesnamespace"
                    placeholder="Kubernetes Namespace"
                    borderColor={"black"}
                    value={DeploymentData.kubernetesNamespace}
                    onChange={(e) =>
                      handleData("kubernetesNamespace", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Ingress Type</FormLabel>
                  <Select
                    mb={4}
                    variant="outline"
                    id="ingressType"
                    borderColor={"black"}
                    value={DeploymentData.ingressType}
                    onChange={(e) => handleData("ingress", e.target.value)}
                  >
                    <option value="istio">Istio</option>
                  </Select>
                </FormControl>
                {DeploymentData.ingressType == "istio" && (
                  <FormControl>
                    <FormLabel>Ingress Domain Name</FormLabel>
                    <Input
                      mb={4}
                      variant="outline"
                      id="ingressDomain"
                      placeholder="Ingress Domain Name"
                      borderColor={"black"}
                      value={DeploymentData.ingressDomain}
                      onChange={(e) =>
                        handleData("ingressDomain", e.target.value)
                      }
                    />
                  </FormControl>
                )}
                <FormControl>
                  <FormLabel>Enable Monitoring</FormLabel>
                  <Select
                    mb={4}
                    variant="outline"
                    id="monitoring"
                    borderColor={"black"}
                    value={DeploymentData.monitoring}
                    onChange={(e) => handleData("monitoring", e.target.value)}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Enable Web UI</FormLabel>
                  <Select
                    mb={4}
                    variant="outline"
                    id="k8sWebUI"
                    borderColor={"black"}
                    value={DeploymentData.k8sWebUI}
                    onChange={(e) => handleData("k8sWebUI", e.target.value)}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Select>
                </FormControl>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                onSubmit(projectData) || isLoading(true);
              }}
              mt={4}
              border="2px"
              borderColor="black.500"
              width="100px"
              type="submit"
              marginRight="5px"
            >
              Skip
            </Button>
            <Button
              onClick={() => {
                onSubmit({ ...projectData, deployment: DeploymentData }) ||
                  isLoading(true);
              }}
              mt={4}
              border="2px"
              borderColor="green.500"
              width="100px"
              type="submit"
            >
              Submit
            </Button>
            {isLoading && (
              <Flex
                position="fixed"
                top="0"
                left="0"
                right="0"
                bottom="0"
                alignItems="center"
                justifyContent="center"
                backgroundColor="rgba(240, 248, 255, 0.5)"
                zIndex="9999"
                display="flex"
                flexDirection="column"
              >
                <Spinner
                  thickness="8px"
                  speed="0.9s"
                  emptyColor="gray.200"
                  color="#3182CE"
                  height="250px"
                  width="250px"
                />
                <div
                  style={{
                    marginTop: "40px",
                    color: "#3182CE",
                    fontWeight: "bolder",
                    fontSize: "20px",
                  }}
                >
                  Please wait while we generate your project
                </div>
              </Flex>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <aside
        style={{ position: "relative", overflow: "hidden", height: "88vh" }}
      >
        <FormLabel fontWeight="bold">Project Name</FormLabel>
        <Input
          mb={4}
          variant="outline"
          id="projectName"
          borderColor={"#CFCFCF"}
          value={projectData.projectName}
          onChange={(e) => handleProjectData("projectName", e.target.value)}
        ></Input>

        <div className="description">
          <h2
            style={{
              cursor: "pointer",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            You can drag these nodes to the pane on the right.
          </h2>
        </div>

        <div
          className={`dndnode output ${isUINodeEnabled ? "disabled" : ""}`}
          onDragStart={(event) => onDragStart(event, "default", "UI+Gateway")}
          draggable={!isUINodeEnabled}
          style={{
            backgroundColor: isUINodeEnabled ? "#CFCFCF" : "",
            cursor: isUINodeEnabled ? "not-allowed" : "",
          }}
        >
          UI+Gateway
        </div>

        <div
          className="dndnode output"
          onDragStart={(event) => onDragStart(event, "default", "Service")}
          draggable
        >
          Service
        </div>
        <h1
          style={{
            cursor: "pointer",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onClick={() => toggleOption("Authentication")}
        >
          Authentication{" "}
          {selectedOption === "Authentication" ? (
            <span>&#x25B2;</span>
          ) : (
            <span>&#x25BC;</span>
          )}
        </h1>
        {selectedOption === "Authentication" && (
          <>
            <div
              className="selectorNode3"
              onDragStart={(event) =>
                onDragStart(event, "default", "Auth_oauth2")
              }
              draggable
            >
              <img width="145px" src={keycloak} alt="keycloaklogo"></img>
            </div>
          </>
        )}
        <h1
          style={{
            cursor: "pointer",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onClick={() => toggleOption("Databases")}
        >
          Databases{" "}
          {selectedOption === "Databases" ? (
            <span>&#x25B2;</span>
          ) : (
            <span>&#x25BC;</span>
          )}
        </h1>
        {selectedOption === "Databases" && (
          <>
            <div
              className="selectorNode"
              onDragStart={(event) =>
                onDragStart(event, "default", "Database_postgresql")
              }
              draggable
            >
              <img width="120px" src={db1} alt="postgreslogo"></img>
            </div>
            <div
              className="selectorNode"
              onDragStart={(event) =>
                onDragStart(event, "default", "Database_mongodb")
              }
              draggable
            >
              <img width="120px" src={db2} alt="mongologo"></img>
            </div>
          </>
        )}

        <h1>
          <span
            style={{
              cursor: "pointer",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => toggleOption("serviceDiscovery")}
          >
            Service Discovery{" "}
            {selectedOption === "serviceDiscovery" ? (
              <span>&#x25B2;</span>
            ) : (
              <span>&#x25BC;</span>
            )}
          </span>
        </h1>
        {selectedOption === "serviceDiscovery" && (
          <>
            <div
              className="selectorNode1"
              onDragStart={(event) =>
                onDragStart(event, "default", "Discovery_eureka")
              }
              draggable
            >
              <img width="120px" src={eurkea} alt="eurekalogo"></img>
            </div>
          </>
        )}
        <h1>
          <span
            style={{
              cursor: "pointer",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onClick={() => toggleOption("loadManagement")}
          >
            Log Management{" "}
            {selectedOption === "loadManagement" ? (
              <span>&#x25B2;</span>
            ) : (
              <span>&#x25BC;</span>
            )}
          </span>
        </h1>
        {selectedOption === "loadManagement" && (
          <>
            <div
              className="selectorNode6"
              onDragStart={(event) => onDragStart(event, "default", "Load_eck")}
              draggable
            >
              <img width="120px" src={eck} alt="ecklogo" />
            </div>
          </>
        )}
        <h1>
          <span
            style={{
              cursor: "pointer",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onClick={() => toggleOption("Localenvironment")}
          >
            Localenvironment{" "}
            {selectedOption === "Localenvironment" ? (
              <span>&#x25B2;</span>
            ) : (
              <span>&#x25BC;</span>
            )}
          </span>
        </h1>
        {selectedOption === "Localenvironment" && (
          <>
            <div
              className="selectorNode7"
              onDragStart={(event) =>
                onDragStart(event, "default", "Localenvironment_minikube")
              }
              draggable
            >
              <img width="120px" src={mini} alt="minikubelogo" />
            </div>

            <div
              className="selectorNode7"
              onDragStart={(event) =>
                onDragStart(event, "default", "Localenvironment_docker")
              }
              draggable
            >
              <img width="120px" src={docker} alt="dockerlogo" />
            </div>
          </>
        )}
        <div
          style={{
            position: "absolute",
            marginTop: "auto",
            marginBottom: "10px",
            bottom: "0",
          }}
        >
          {/* <div style={{ display:'flex', justifyContent:'center'}}> */}
          <Button
            onClick={() => setIsOpen(true)}
            mt={4}
            border="2px"
            borderColor="green.500"
            width="100px"
            type="submit"
            isDisabled={
              !Service_Discovery_Data ||
              !authenticationData ||
              isEmpty ||
              projectData.projectName === ""
            }
          >
            Next
          </Button>
          <br />

          {isEmpty || projectData.projectName === "" ? (
            <p
              style={{
                fontSize: "10px",
                color: "red",
                marginTop: "5px",
              }}
            >
              Please enter Project Name
            </p>
          ) : (
            <p style={{ marginBottom: "5px" }}></p>
          )}
          {!authenticationData ? (
            <p
              style={{
                fontSize: "10px",
                color: "red",
                marginTop: "5px",
              }}
            >
              Please select Authentication type
            </p>
          ) : (
            <p style={{ marginBottom: "5px" }}></p>
          )}
          {!Service_Discovery_Data ? (
            <p
              style={{
                fontSize: "10px",
                color: "red",
                marginTop: "5px",
              }}
            >
              Please select Service Discovery type
            </p>
          ) : (
            <></>
          )}
        </div>
      </aside>
    </>
  );
};
