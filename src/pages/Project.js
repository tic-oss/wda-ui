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
import DeploymentModal from "../components/Modal/DeploymentModal";
import ReadOnlyEdgeModal from "../components/Modal/ReadOnlyEdgeModal";

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
      } else {
        setEdges([]);
      }
    } else {
      localStorage.metadata = JSON.stringify(metadata);
      if (metadata?.nodes) {
        setNodes(Object.values(metadata?.nodes));
      } else if (metadata?.edges) {
        setEdges(Object.values(data?.edges));
      } else {
        setNodes([getDeploymentNode(metadata)]);
      }
      if (metadata?.edges) {
        setEdges(Object.values(metadata?.edges));
      } else {
        setEdges([]);
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

  const [cloudModal, setCloudModal] = useState(false);
  const [cloudName, setCloudName] = useState("");
  const [awsAccountId, setAwsAccountId] = useState("");
  const [awsRegion, setAwsRegion] = useState("");
  const [kubernetesStorageClassName, setKubernetesStorageClassName] =
    useState("");

  const [clusterName, setClusterName] = useState("");
  const [deploymentType, setDeploymentType] = useState("");
  const [ingressDomain, setIngressDomain] = useState("");
  const [ingressType, setIngressType] = useState("");
  const [k8sWebUI, setk8sWebUI] = useState("");
  const [kubernetesNamespace, setKubernetesNamespace] = useState("");
  const [kubernetesUseDynamicStorage, setKubernetesUseDynamicStorage] =
    useState("");
  const [monitoring, setMonitoring] = useState("");

  const [azureLocation, setAzureLocation] = useState("");
  const [acrRegistry, setAcrRegistry] = useState("");
  const [resourcegroupname, setResourcegroupname] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
  const [tenantId, setTenantId] = useState("");

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
    if (element.data.applicationType === "gateway") {
      setNodeType("UI");
      setserviceModal(true);
      setClientFramework(element.data.clientFramework);
      setWithExample(element.data.withExample);
    } else if (element.data.applicationType === "microservice") {
      setNodeType("Service");
      setserviceModal(true);
      setApplicationFrameWork(element.data.applicationFramework);
    } else if (element.data?.data?.cloudProvider === "aws") {
      setNodeType("Cloud");
      setCloudName("aws");
      setCloudModal(true);
      setAwsAccountId(element.data?.data?.awsAccountId);
      setAwsRegion(element.data?.data?.awsRegion);
      setKubernetesStorageClassName(
        element.data?.data?.kubernetesStorageClassName
      );
    } else if (element.data?.data?.cloudProvider === "azure") {
      setNodeType("Cloud");
      setCloudName("azure");
      setCloudModal(true);
      setAzureLocation(element.data?.data?.azureLocation);
      setAcrRegistry(element.data?.data?.acrRegistry);
      setResourcegroupname(element.data?.data?.resourcegroupname);
      setSubscriptionId(element.data?.data?.subscriptionId);
      setTenantId(element.data?.data?.tenantId);
    } else {
      setNodeType("other");
    }

    setApplicationName(element.data.applicationName);
    setPackageName(element.data.packageName);
    setServerPort(element.data.serverPort);

    setClusterName(element.data?.data?.clusterName);
    setDeploymentType(element.data?.data?.deploymentType);
    setIngressDomain(element.data?.data?.ingressDomain);
    setIngressType(element.data?.data?.ingressType);
    setk8sWebUI(element.data?.data?.k8sWebUI);
    setKubernetesNamespace(element.data?.data?.kubernetesNamespace);
    setKubernetesUseDynamicStorage(
      element.data?.data?.kubernetesUseDynamicStorage
    );
    setMonitoring(element.data?.data?.monitoring);
  };

  const onEdgeClick = (event, element) => {
    console.log(element.data, "data");
    const EdgeData = element.data
    if(EdgeData){
    event.preventDefault();
    setEdgeModal(true);
    if (EdgeData.type === "synchronous") {
      setTypeName("synchronous");
    } else setTypeName("asynchronous");
    setType(EdgeData.type);
    setFramework(EdgeData.framework);
  }
  };
  const handleContainerClose = () => {
    setserviceModal(false) || setEdgeModal(false) || setCloudModal(false);
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
      {edgeModal && 
        <ReadOnlyEdgeModal 
          edgeModal={edgeModal}
          type={type}
          typeName={typeName}
          framework={framework}
          handleContainerClose={handleContainerClose}
          />
      }
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
        />
      ) : (
        <></>
      )}
      {nodeType === "Cloud" && (
        <DeploymentModal
          cloudModal={cloudModal}
          cloudName={cloudName}
          handleContainerClose={handleContainerClose}
          awsAccountId={awsAccountId}
          awsRegion={awsRegion}
          kubernetesStorageClassName={kubernetesStorageClassName}
          azureLocation={azureLocation}
          acrRegistry={acrRegistry}
          resourcegroupname={resourcegroupname}
          subscriptionId={subscriptionId}
          tenantId={tenantId}
          clusterName={clusterName}
          deploymentType={deploymentType}
          ingressDomain={ingressDomain}
          ingressType={ingressType}
          k8sWebUI={k8sWebUI}
          kubernetesNamespace={kubernetesNamespace}
          kubernetesUseDynamicStorage={kubernetesUseDynamicStorage}
          monitoring={monitoring}
        />
      )}
    </>
  );
};

export default Project;
