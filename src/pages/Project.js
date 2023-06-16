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
import ProjectModal from "../components/Modal/ProjectModal";

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
    console.log(data, metadata, "data");
    if (!data) {
      const data = JSON.parse(localStorage.metadata);
      setmetadata(data);
      setNodes(Object.values(data?.nodes));
      if (data?.edges) {
        setEdges(Object.values(data?.edges));
      }
    } else {
      localStorage.metadata = JSON.stringify(metadata);
      if (metadata?.nodes) {
        setNodes(Object.values(metadata?.nodes));
      } else if (metadata?.edges) {
        setEdges(Object.values(data?.edges));
      } else {
        setNodes([getDeploymentNode(metadata)])
      }
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

  const getDeploymentNode = (data) => {
    return {
      id: "Deployment",
      type: "selectorNode5",
      data: { data },
      style: { border: "1px solid #8c8d8f", padding: "4px 4px" },
      position: { x: 250, y: 5 },
    };
  };

  const onNodeClick = (event, element) => {
    event.preventDefault();
    setserviceModal(true);
    if (element.data.applicationType === "gateway") {
      setNodeType("UI");
      setClientFramework(element.data.clientFramework);
      setWithExample(element.data.withExample);
    } else if (element.data.applicationType === "microservice") {
      setNodeType("Service");
      setApplicationFrameWork(element.data.applicationFramework);
    } else {
      setNodeType("other");
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
      {nodeType === "UI" || nodeType === "Service" ? (
        <ProjectModal
          nodeType={nodeType}
          serviceModal={serviceModal}
          handleContainerClose={handleContainerClose}
          applicationName={applicationName}
          clientFramework={clientFramework}
          applicationFramework={applicationFramework}
          packageName={packageName}
          serverPort={serverPort}
          withExample={withExample}
          edgeModal={edgeModal}
          type={type}
          typeName={typeName}
          framework={framework}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Project;
