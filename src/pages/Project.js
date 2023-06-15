import { useEffect, useRef, useState } from "react";
import ReactFlow, { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { useLocation } from "react-router-dom";
import CustomImageNode from "./Customnodes/CustomImageNode";
import CustomServiceNode from "./Customnodes/CustomServiceNode";
import CustomIngressNode from "./Customnodes/CustomIngressNode";
import CustomAuthNode from "./Customnodes/CustomAuthNode";
import CustomMessageBrokerNode from "./Customnodes/CustomMessageBrokerNode";
import CustomCloudNode from "./Customnodes/CustomCloudNode";
import CustomLoadNode from "./Customnodes/CustomLoadNode";
import CustomLocalenvironmentNode from "./Customnodes/CustomLocalenvironmentNode";
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

const readOnlyNodeStyle = {
  border: "1px solid #ccc",
  background: "#f0f0f0",
  color: "#555",
};

const readOnlyEdgeStyle = {
  stroke: "#ccc",
};

const nodeTypes = {
  selectorNode: CustomImageNode,
  selectorNode1: CustomServiceNode,
  selectorNode2: CustomIngressNode,
  selectorNode3: CustomAuthNode,
  selectorNode4: CustomMessageBrokerNode,
  selectorNode5: CustomCloudNode,
  selectorNode6: CustomLoadNode,
  selectorNode7: CustomLocalenvironmentNode,
};

const Project = () => {
  const location = useLocation();
  const [metadata, setmetadata] = useState(location.state);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const data = location?.state;
    if (!data) {
      const data = JSON.parse(localStorage.metadata);
      setmetadata(data);
      setNodes(Object.values(data?.nodes));
      setEdges(Object.values(data?.edges));
    } else {
      localStorage.metadata = JSON.stringify(metadata);
      setNodes(Object.values(metadata?.nodes));
      setEdges(Object.values(metadata?.edges));
    }
  }, []);

  const reactFlowWrapper = useRef(null);
  const [serviceModal, setserviceModal] = useState(false);
  const [nodeType, setNodeType] = useState("");
  const [applicationName, setApplicationName] = useState("");
  const [clientFramework, setClientFramework] = useState("");
  const [packageName, setPackageName] = useState("");
  const [serverPort, setServerPort] = useState("");
  const [withExample, setWithExample] = useState("");
  const [applicationFramework, setApplicationFrameWork] = useState("");

  const [edgeModal, setEdgeModal] = useState(false);
  const [type, setType] = useState("");
  const [typeName, setTypeName] = useState("");
  const [framework, setFramework] = useState("");

  const onNodeClick = (event, element) => {
    event.preventDefault();
    setserviceModal(true);
    if (element.data.applicationType === "gateway") {
      setNodeType("UI");
      setClientFramework(element.data.clientFramework);
      setWithExample(element.data.withExample);
    } else {
      setNodeType("Service");
      setApplicationFrameWork(element.data.applicationFramework);
    }
    setApplicationName(element.data.applicationName);
    setPackageName(element.data.packageName);
    setServerPort(element.data.serverPort);
  };

  const onEdgeClick = (event, element) => {
    console.log(element.data, "data");
    event.preventDefault();
    setEdgeModal(true);
    if (element.data.type === "synchronous") {
      setTypeName("synchronous");
    } else setTypeName("asynchronous");
    setType(element.data.type);
    setFramework(element.data.framework);
  };
  const handleContainerClose = () => {
    setserviceModal(false) || setEdgeModal(false);
  };

  return (
    <>
      <Modal
        isOpen={serviceModal}
        onClose={handleContainerClose}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent>
          {nodeType === "UI" ? (
            <ModalHeader>UI</ModalHeader>
          ) : (
            <ModalHeader>Service</ModalHeader>
          )}
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
                    <option value="go">Go</option>
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
              {nodeType === "UI" && (
                <FormControl>
                  <FormLabel>Want to have an Example</FormLabel>
                  <Select
                    mb={4}
                    variant="outline"
                    id="withExample"
                    borderColor={"black"}
                    value={withExample}
                    isDisabled={true}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Select>
                </FormControl>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={edgeModal}
        onClose={handleContainerClose}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Communication</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Select
                  mb={4}
                  variant="outline"
                  id="type"
                  borderColor={"black"}
                  value={type}
                  isDisabled={true}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="asynchronous">Asynchronous</option>
                  <option value="synchronous">Synchronous</option>
                </Select>
              </FormControl>

              {typeName === "synchronous" && (
                <FormControl>
                  <FormLabel>Framework</FormLabel>
                  <Select
                    mb={4}
                    variant="outline"
                    id="framework"
                    borderColor={"black"}
                    value={framework}
                    isDisabled={true}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="rest">REST</option>
                  </Select>
                </FormControl>
              )}
              {typeName === "asynchronous" && (
                <FormControl>
                  <FormLabel>Framework</FormLabel>
                  <Select
                    mb={4}
                    variant="outline"
                    id="framework"
                    borderColor={"black"}
                    value={framework}
                    isDisabled={true}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="rabbitmq">Rabbit MQ</option>
                  </Select>
                </FormControl>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className="dndflow">
        <ReactFlowProvider>
          <div
            className="reactflow-wrapper"
            ref={reactFlowWrapper}
            style={{ width: "100%", height: "90%" }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onEdgeClick={onEdgeClick}
              onNodeClick={onNodeClick}
              nodesConnectable={false}
              elementsSelectable={false}
              nodesDraggable={false}
              panOnDrag={false}
              fitView
              nodeTypes={{
                customReadOnlyNode: readOnlyNodeStyle,
                ...nodeTypes,
              }}
              edgeTypes={{
                customReadOnlyEdge: readOnlyEdgeStyle,
              }}
            />
          </div>
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default Project;
