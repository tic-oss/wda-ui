import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  Button,
  FormLabel,
  FormControl,
  Alert,
  AlertIcon,
  Flex,
  Spinner
} from "@chakra-ui/react";
import azure from "../../../src/assets/Azure.png";
import aws from "../../../src/assets/aws.png";

const DeployModal = ({ onSubmit, isLoading, projectData }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [checkLength, setCheckLength] = useState(false);
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setDeploymentData((prevState) => ({
      ...prevState,
      cloudProvider: image,
    }));
  };
  const IntialState = {
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
  const [DeploymentData, setDeploymentData] = useState(IntialState);
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
    if (column === "awsAccountId") validateInputValue(value);
    setDeploymentData((prev) => ({ ...prev, [column]: value }));
  };

  const validateInputValue = (value) => {
    if (value.length < 12) {
      setCheckLength(true);
    } else setCheckLength(false);
  };
  function handleSubmit(DeploymentData) {
    if (selectedImage === "aws") {
      !checkLength && onSubmit({...projectData, deployment: DeploymentData});
    } else if (selectedImage === "azure") {
      onSubmit({...projectData, deployment: DeploymentData});
    }
  }
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <h2 style={{ display: "inline-block" }}>Deployment Infrastructure</h2>
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
                  onChange={(e) => handleData("subscriptionId", e.target.value)}
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
              handleSubmit(DeploymentData) ||
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
  );
};

export default DeployModal;
