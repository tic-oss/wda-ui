import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  MarkerType,
  ConnectionLineType,
  Background,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import Sidebar from "../Sidebar/Sidebar";
import { saveAs } from "file-saver";
import ServiceModal from "../../modals/ServiceModal";
import UiDataModal from "../../modals/UIModal";
import GroupDataModal from "../../modals/GroupDataModel";
import CustomImageNode from "../../customNodes/CustomImageNode";
import CustomServiceNode from "../../customNodes/CustomServiceNode";
import CustomIngressNode from "../../customNodes/CustomIngressNode";
import CustomAuthNode from "../../customNodes/CustomAuthNode";
import CustomMessageBrokerNode from "../../customNodes/CustomMessageBrokerNode";
import CustomCloudNode from "../../customNodes/CustomCloudNode";
import CustomLoadNode from "../../customNodes/CustomLoadNode";
import CustomLocalenvironmentNode from "../../customNodes/CustomLocalenvironmentNode";
import AlertModal from "../../modals/AlertModal";
import resizeableNode from "../../customNodes/ResizeableNode";
import groupNode from "../../customNodes/GroupNode";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../../../App.css";
import EdgeModal from "../../modals/EdgeModal";
import { useKeycloak } from "@react-keycloak/web";
import { FiUploadCloud } from "react-icons/fi";
import ActionModal from "../../modals/ActionModal";
import "./Designer.css";

let service_id = 1;
let database_id = 1;
let group_id = 1;

const getId = (type = "") => {
  if (type === "Service") return `Service_${service_id++}`;
  else if (type === "Database") return `Database_${database_id++}`;
  else if (type === "Authentication") return "Authentication_1";
  else if (type === "UI+Gateway") return "UI";
  else if (type === "Group") return `group_${group_id++}`;
  return "Id";
};

const defaultViewport = { x: 0, y: 0, zoom: 10 };

const nodeTypes = {
  selectorNode: CustomImageNode,
  selectorNode1: CustomServiceNode,
  selectorNode2: CustomIngressNode,
  selectorNode3: CustomAuthNode,
  selectorNode4: CustomMessageBrokerNode,
  selectorNode5: CustomCloudNode,
  selectorNode6: CustomLoadNode,
  selectorNode7: CustomLocalenvironmentNode,
  ResizableNode: resizeableNode,
  GroupNode: groupNode,
};

const Designer = ({ update }) => {
  const reactFlowWrapper = useRef(null);
  const { keycloak, initialized } = useKeycloak();
  const [nodes, setNodes] = useState({});
  const [nodeType, setNodeType] = useState(null);
  const [ServiceDiscoveryCount, setServiceDiscoveryCount] = useState(0);
  const [MessageBrokerCount, setMessageBrokerCount] = useState(0);
  const [CloudProviderCount, setCloudProviderCount] = useState(0);
  const [LocalenvironmentCount, setLocalenvironmentCount] = useState(0);
  const [LogManagemntCount, setLogManagementCount] = useState(0);
  const [AuthProviderCount, setAuthProviderCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyUiSubmit, setIsEmptyUiSubmit] = useState(false);
  const [isEmptyServiceSubmit, setIsEmptyServiceSubmit] = useState(false);
  const location = useLocation();
  const [userData, setuserData] = useState({});
  const [serviceInputCheck, setServiceInputCheck] = useState({});

  const [updated, setUpdated] = useState(false);
  const [isVisibleDialog, setVisibleDialog] = useState(false);
  const history = useHistory();
  const [triggerExit, setTriggerExit] = useState({
    onOk: false,
    path: "",
  });

  const handleGoToIntendedPage = useCallback(
    (location) => history.push(location),
    [history]
  );

  const addEdge = (edgeParams, edges) => {
    setUpdated(true);
    const edgeId = `${edgeParams.source}-${edgeParams.target}`;
    const databaseEdge = edgeParams?.target.startsWith("Database");
    const groupEdge =
      edgeParams?.target.startsWith("group") ||
      edgeParams?.source.startsWith("group");
    if (!edges[edgeId] && !databaseEdge && !groupEdge) {
      edges[edgeId] = {
        id: edgeId,
        ...edgeParams,
        markerEnd: {
          color: "#ff0000",
          type: MarkerType.ArrowClosed,
        },
        style: { stroke: "#ff0000" },
      };
    }
    if (databaseEdge || groupEdge) {
      edges[edgeId] = {
        id: edgeId,
        ...edgeParams,
        markerEnd: {
          color: "black",
          type: MarkerType.ArrowClosed,
        },
        style: { stroke: "black" },
      };
    }
    return { ...edges };
  };

  const updateEdge = (oldEdge, newConnection, edges, Nodes) => {
    setUpdated(true);
    let newEdgeId = newConnection.source + "-" + newConnection.target;
    newConnection.markerEnd = { type: MarkerType.ArrowClosed };
    newConnection.type = "straight";
    newConnection.data = {};
    let updatedEdges = {
      ...edges,
      [newEdgeId]: { id: newEdgeId, ...newConnection },
    };
    if (oldEdge.id !== newEdgeId) delete updatedEdges[oldEdge.id];
    const oldSourceNode = Nodes[oldEdge.source];
    delete oldSourceNode?.data?.prodDatabaseType;
    setNodes((prev) => ({ ...prev, [oldSourceNode.id]: oldSourceNode }));
    return updatedEdges;
  };

  function handleCollision(node, nodes) {
    const updatedNodes = Object.values(nodes).map((element) => {
      if (element.id === node.id) {
        let collidesWithOtherNodes = false;
        for (const otherNode of Object.values(nodes)) {
          if (node.type === "GroupNode" && otherNode.type === "GroupNode")
            if (otherNode.id !== node.id) {
              const nodeBoundingBox = {
                left: node.position.x,
                right: node.position.x + parseInt(node.style.width),
                top: node.position.y,
                bottom: node.position.y + parseInt(node.style.height),
              };

              const otherNodeBoundingBox = {
                left: otherNode.position.x,
                right: otherNode.position.x + parseInt(otherNode.style.width),
                top: otherNode.position.y,
                bottom: otherNode.position.y + parseInt(otherNode.style.height),
              };

              if (
                nodeBoundingBox.right > otherNodeBoundingBox.left &&
                nodeBoundingBox.left < otherNodeBoundingBox.right &&
                nodeBoundingBox.bottom > otherNodeBoundingBox.top &&
                nodeBoundingBox.top < otherNodeBoundingBox.bottom
              ) {
                collidesWithOtherNodes = true;
                node.position.x = otherNodeBoundingBox.right + 10;
              }
            }
        }
        if (collidesWithOtherNodes) {
          return {
            ...element,
            position: node.position,
          };
        }
      }
      return element;
    });

    setNodes(
      updatedNodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {})
    );
  }

  const onNodesChange = useCallback((setShowDiv, edges, changes = []) => {
    setUpdated(true);
    setNodes((oldNodes) => {
      const updatedNodes = { ...oldNodes };
      const updatedEdges = { ...edges };
      const deletedApplicationNames = []; // Track deleted application names
      const deletedApplicationPorts = [];

      changes.forEach((change) => {
        switch (change.type) {
          case "dimensions":
            if (change.resizing) {
              const collidesWithOtherNodes = handleCollision(
                updatedNodes[change.id],
                updatedNodes
              );
              if (!collidesWithOtherNodes) {
                updatedNodes[change.id] = {
                  ...updatedNodes[change.id],
                  position: {
                    ...updatedNodes[change.id].position,
                  },
                  style: {
                    ...updatedNodes[change.id].style,
                    ...change.dimensions,
                  },
                };
              }
            }
            break;
          case "position":
            if (change?.position) {
              updatedNodes[change.id] = {
                ...updatedNodes[change.id],
                position: {
                  ...updatedNodes[change.id].position,
                  ...change.position,
                },
                positionAbsolute: {
                  x: 0,
                  y: 0,
                  ...updatedNodes[change.id].positionAbsolute,
                  ...change.positionAbsolute,
                },
                dragging: change.dragging,
              };
            }
            break;
          case "select":
            updatedNodes[change.id] = {
              ...updatedNodes[change.id],
              selected: change.selected,
            };
            break;
          case "remove": // Delete Functionality
            if (change.id === "messageBroker") {
              setIsMessageBroker(false);
              onCheckEdge(edges);
              setMessageBrokerCount(0);
            } else if (change.id === "UI") {
              setIsUINodeEnabled(false);
              setIsEmptyUiSubmit(false);
            } else if (change.id.startsWith("Service")) {
              setIsEmptyServiceSubmit(false);
            } else if (change.id === "serviceDiscoveryType") {
              setIsServiceDiscovery(false);
              setServiceDiscoveryCount(0);
              setIsServiceDiscovery(false);
              for (let key in updatedEdges) {
                let Edge = updatedEdges[key];
                if (Edge?.data?.framework === "rest-api") {
                  delete Edge?.data?.type;
                  delete Edge?.data?.framework;
                  delete Edge?.label;
                }
                setEdges(updatedEdges);
              }
            } else if (change.id === "cloudProvider") {
              setCloudProviderCount(0);
            } else if (change.id === "authenticationType") {
              setAuthProviderCount(0);
            } else if (change.id === "Localenvironment") {
              setLocalenvironmentCount(0);
            } else if (change.id === "logManagement") {
              setLogManagementCount(0);
            }
            // Remove the deleted node from updatedNodes
            delete updatedNodes[change.id];
            // Remove the applicationName from uniqueApplicationNames
            const deletedNode = oldNodes[change.id];
            if (deletedNode?.data?.applicationName) {
              deletedApplicationNames.push(
                deletedNode.data.applicationName.trim()
              );
            }
            if (deletedNode?.data?.serverPort) {
              deletedApplicationPorts.push(deletedNode.data.serverPort.trim());
            }
            break;
          default:
            break;
        }
      });
      if (Object.keys(updatedNodes).length === 0) setShowDiv(true);
      // Remove deleted application names from uniqueApplicationNames
      setUniquePortNumbers((prev) =>
        prev.filter(
          (portNumbers) => !deletedApplicationPorts.includes(portNumbers)
        )
      );
      setUniqueApplicationNames((prev) =>
        prev.filter((appName) => !deletedApplicationNames.includes(appName))
      );
      return updatedNodes;
    });
  }, []);

  const [edges, setEdges] = useState({});
  const onEdgesChange = useCallback((Nodes, changes = []) => {
    setUpdated(true);
    setEdges((oldEdges) => {
      const updatedEdges = { ...oldEdges };
      let UpdatedNodes = { ...Nodes };
      changes.forEach((change) => {
        switch (change.type) {
          case "add":
            // Handle add event
            break;
          case "remove":
            let [sourceId, targetId] = change.id.split("-");
            if (targetId.startsWith("Database")) {
              UpdatedNodes[targetId].data.isConnected = false;
              if (UpdatedNodes[targetId]?.style) {
                UpdatedNodes[targetId].style.border = "1px solid red";
              }
              if (sourceId.startsWith("Service") || sourceId.startsWith("UI"))
                delete UpdatedNodes[sourceId].data.prodDatabaseType;
              setNodes(UpdatedNodes);
            }
            delete updatedEdges[change.id];
            // Handle remove event
            break;
          case "update":
            // Handle update event
            break;
          case "select":
            updatedEdges[change.id] = {
              ...updatedEdges[change.id],
              selected: change.selected,
            };
            break;
          default:
            break;
        }
      });

      return updatedEdges;
    });
  }, []);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [Isopen, setopen] = useState(false);
  const [nodeClick, setNodeClick] = useState(false);
  const [IsEdgeopen, setEdgeopen] = useState(false);
  const [CurrentNode, setCurrentNode] = useState({});
  const [CurrentEdge, setCurrentEdge] = useState({});
  const edgeUpdateSuccessful = useRef(true);
  const [isUINodeEnabled, setIsUINodeEnabled] = useState(false);
  const [isMessageBroker, setIsMessageBroker] = useState(false);
  const [isServiceDiscovery, setIsServiceDiscovery] = useState(false);
  const [saveMetadata, setsaveMetadata] = useState(false);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((Nodes, oldEdge, newConnection) => {
    setUpdated(true);
    edgeUpdateSuccessful.current = true;
    if (
      !(
        newConnection.target.startsWith("Database") &&
        Nodes[newConnection.source]?.data["prodDatabaseType"]
      )
    ) {
      // Validation of service Node to check if it has database or not
      setEdges((els) => updateEdge(oldEdge, newConnection, els, Nodes));
      MergeData(newConnection.source, newConnection.target, Nodes);
    }
  }, []);

  const onEdgeUpdateEnd = useCallback((Nodes, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((edges) => {
        let AllEdges = { ...edges };
        if (edge.target.startsWith("Database")) {
          // If the edge is removed between Service and Database
          let UpdatedNodes = { ...Nodes };
          delete UpdatedNodes[edge.source].data.prodDatabaseType;
          UpdatedNodes[edge.target].data.isConnected = false;
          if (UpdatedNodes[edge.target]) {
            UpdatedNodes[edge.target].style.border = "1px solid red";
          }
          setNodes(UpdatedNodes);
        }
        delete AllEdges[edge.id];
        return AllEdges;
      });
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setShowDiv(false);
  }, []);

  const onclick = (e, node) => {
    const Id = e.target.dataset.id || e.target.name || node.id;
    if (Id) {
      const type = Id.split("_")[0];
      setNodeType(type);
      if (type === "aws" || type === "azure") {
        setCurrentNode(nodes["cloudProvider"].data);
      } else setCurrentNode(nodes[Id].data);
      setopen(Id);
    }
    setNodeClick(Id);
  };

  const onNodeDragStop = (event, node) => {
    console.log("pppp", node);
    const updatedNodes = Object.values(nodes).map((element) => {
      if (element.id === node.id) {
        let collidesWithOtherNodes = false;
        let parent_id = false;
        let copy_node;
        Object.values(nodes).forEach((otherNode) => {
          if (otherNode.id !== node.id) {
            const nodeBoundingBox = {
              left: node.position.x,
              right: node.position.x + node.width,
              top: node.position.y,
              bottom: node.position.y + node.height,
            };
            console.log(nodeBoundingBox, "nodeBoundingBox");
            const otherNodeBoundingBox = {
              left: otherNode.position.x,
              right: otherNode.position.x + parseInt(otherNode.style.width),
              top: otherNode.position.y,
              bottom: otherNode.position.y + parseInt(otherNode.style.height),
            };

            console.log(otherNodeBoundingBox, "otherNodeBoundingBox");
            console.log(node, otherNode, "ppppppp");
            if (node.type === "GroupNode" && otherNode.type === "GroupNode") {
              if (
                nodeBoundingBox.right > otherNodeBoundingBox.left &&
                nodeBoundingBox.left < otherNodeBoundingBox.right &&
                nodeBoundingBox.bottom > otherNodeBoundingBox.top &&
                nodeBoundingBox.top < otherNodeBoundingBox.bottom
              ) {
                collidesWithOtherNodes = true;
                node.position.x = otherNodeBoundingBox.right + 10;
              }
            } else if (
              node.type == "GroupNode" ||
              otherNode.type == "GroupNode"
            ) {
              console.log("oooooooooooooo");
              if (node.type === "GroupNode") {
                console.log("hhhhhh");
                if (
                  otherNodeBoundingBox.left >= nodeBoundingBox.left &&
                  otherNodeBoundingBox.right <= nodeBoundingBox.right &&
                  otherNodeBoundingBox.top >= nodeBoundingBox.top &&
                  otherNodeBoundingBox.bottom <= nodeBoundingBox.bottom
                ) {
                  parent_id = node;
                  copy_node = otherNode;
                }
              } else {
                console.log("hjhjhjhjh");
                if (
                  otherNodeBoundingBox.left < nodeBoundingBox.left &&
                  otherNodeBoundingBox.right > nodeBoundingBox.right &&
                  otherNodeBoundingBox.top < nodeBoundingBox.top &&
                  otherNodeBoundingBox.bottom > nodeBoundingBox.bottom
                ) {
                  parent_id = otherNode;
                  copy_node = node;
                }
              }
            }
          }
        });
        if (collidesWithOtherNodes) {
          return {
            ...element,
            position: node.position,
          };
        }

        // if (parent_id) {
        //   console.log(
        //     copy_node.position.x - parent_id.position.x,
        //     parent_id.position.y - copy_node.position.y,
        //     "xxxxxxxxxxyyyyyyyyyy"
        //   );
        //   return {
        //     ...copy_node,
        //     parentNode: parent_id.id,
        //     position: {
        //       x: copy_node.position.x - parent_id.position.x,
        //       y: parent_id.position.y - copy_node.position.y,
        //     },
        //   };
        // } else {
        //   // If no parent is found or child node is not inside a parent node,
        //   // set parent_id to null
        //   return {
        //     ...element,
        //     parentNode: null,
        //   };
        // }
        if (parent_id) {
          const relativePosition = {
            x: node.position.x - parent_id.position.x,
            y: node.position.y - parent_id.position.y,
          };
          console.log(relativePosition, "relarstivrrrr");
          return {
            ...node,
            parentNode: parent_id.id,
            position: relativePosition,
          };
        } else {
          const relativePosition = {
            x: node.position.x - parent_id.position.x,
            y: node.position.y - parent_id.position.y,
          };
          return {
            ...node,
            parentNode: null,
            position: relativePosition,
          };
        }
      }
      return element;
    });
    console.log(updatedNodes);
    setNodes(
      updatedNodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {})
    );
  };

  const clear = () => {
    setuserData({});
    setNodes({});
    setEdges({});
    setIsServiceDiscovery(false);
    setServiceDiscoveryCount(0);
    setUniqueApplicationNames([]);
    setUniquePortNumbers([]);
    setServiceInputCheck([]);
    database_id = 1;
    group_id = 1;
    service_id = 1;
    setAuthProviderCount(0);
    setIsMessageBroker(false);
    setMessageBrokerCount(0);
    setLogManagementCount(0);
    setLocalenvironmentCount(0);
    setIsUINodeEnabled(false);
    setUpdated(false);
    setTriggerExit({
      onOk: false,
      path: "",
    });
  };

  const onDrop = useCallback(
    (
      event,
      servicecount,
      messagecount,
      loadcount,
      authcount,
      Localenvcount
    ) => {
      setUpdated(true);
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const name = event.dataTransfer.getData("Name");
      if (typeof type === "undefined" || !type) {
        setShowDiv(true);
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      if (name === "Service") {
        const newNode = {
          id: getId("Service"),
          type: "ResizableNode",
          position,
          data: { label: "Service" },
          style: {
            border: "1px solid #ff0000",
            width: "120px",
            height: "40px",
            borderRadius: "15px",
          },
        };
        setNodes((nds) => ({ ...nds, [newNode.id]: newNode }));
        setIsEmptyServiceSubmit(true);
        setServiceInputCheck((prev) => ({
          ...prev,
          [newNode.id]: true,
        }));
      } else if (name.startsWith("Database")) {
        const prodDatabaseType = name.split("_").splice(1)[0];
        const newNode = {
          id: getId("Database"),
          type: "selectorNode",
          position,
          data: { prodDatabaseType: prodDatabaseType, isConnected: false },
          style: {
            border: "1px solid red",
            padding: "4px 4px",
            height: "60px",
          },
        };
        setNodes((nds) => ({ ...nds, [newNode.id]: newNode }));
      } else if (name.startsWith("Discovery") && servicecount === 0) {
        const serviceDiscoveryType = name.split("_").splice(1)[0];
        const newNode = {
          id: "serviceDiscoveryType",
          type: "selectorNode1",
          position,
          data: { serviceDiscoveryType: serviceDiscoveryType },
          style: { border: "1px solid", padding: "4px 4px" },
        };
        setNodes((nds) => ({ ...nds, [newNode.id]: newNode }));
        setIsServiceDiscovery(true);
        setServiceDiscoveryCount(1);
      } else if (name.startsWith("Discovery") && servicecount >= 1) {
        setServiceDiscoveryCount(2);
      } else if (name.startsWith("Auth") && authcount === 0) {
        const authenticationType = name.split("_").splice(1)[0];
        const newNode = {
          id: "authenticationType",
          type: "selectorNode3",
          position,
          data: { authenticationType: authenticationType },
          style: { border: "1px solid", padding: "4px 4px" },
        };
        setNodes((nds) => ({ ...nds, [newNode.id]: newNode }));
        setAuthProviderCount(1);
      } else if (name.startsWith("Auth") && authcount >= 1) {
        setAuthProviderCount(2);
      } else if (name.startsWith("MessageBroker") && messagecount === 0) {
        const messageBroker = name.split("_").splice(1)[0];
        const newNode = {
          id: "messageBroker",
          type: "selectorNode4",
          position,
          data: { messageBroker: messageBroker },
          style: { border: "1px solid", padding: "4px 4px" },
        };
        setNodes((nds) => ({ ...nds, [newNode.id]: newNode }));
        setIsMessageBroker(true);
        setMessageBrokerCount(1);
      } else if (name.startsWith("Group")) {
        const newNode = {
          id: getId(name),
          type: "GroupNode",
          position,
          data: { label: name },
          style: {
            border: "1px dashed",
            borderRadius: "15px",
            width: "120px",
            height: "40px",
            zIndex: -1,
          },
        };
        setNodes((nds) => ({ ...nds, [newNode.id]: newNode }));
      } else if (name.startsWith("MessageBroker") && messagecount >= 1) {
        setMessageBrokerCount(2);
      } else if (name.startsWith("Load") && loadcount === 0) {
        const logManagementType = name.split("_").splice(1)[0];
        const newNode = {
          id: "logManagement",
          type: "selectorNode6",
          position,
          data: { logManagementType: logManagementType },
          style: { border: "1px solid", padding: "4px 4px" },
        };
        setNodes((nds) => ({ ...nds, [newNode.id]: newNode }));
        setLogManagementCount(1);
      } else if (name.startsWith("Load") && loadcount >= 1) {
        setLogManagementCount(2);
      } else if (name.startsWith("Localenvironment") && Localenvcount === 0) {
        const Localenvironment = name.split("_").splice(1)[0];
        const newNode = {
          id: "Localenvironment",
          type: "selectorNode7",
          position,
          data: { Localenvironment: Localenvironment },
          style: { border: "1px solid", padding: "4px 4px" },
        };
        setNodes((nds) => ({ ...nds, [newNode.id]: newNode }));
        setLocalenvironmentCount(1);
      } else if (name.startsWith("Localenvironment") && Localenvcount >= 1) {
        setLocalenvironmentCount(2);
      } else {
        const newNode = {
          id: getId("UI+Gateway"),
          type: "ResizableNode",
          position,
          data: { label: "UI+Gateway" },
          style: {
            border: "1px solid #ff0000",
            width: "120px",
            height: "40px",
            borderRadius: "15px",
          },
        };
        setNodes((nds) => ({ ...nds, [newNode.id]: newNode }));
        setIsUINodeEnabled(true);
        setIsEmptyUiSubmit(true);
      }
    },
    [reactFlowInstance]
  );

  useEffect(() => {
    document.title = "WDA";
    setShowDiv(true);
    let data = location?.state;
    if (!data) {
      if (
        localStorage?.data !== undefined &&
        localStorage.data !== null &&
        localStorage.data?.metadata?.nodes !== ""
      ) {
        data = JSON.parse(localStorage.data);
        setuserData(data);
        if (data?.metadata?.nodes) {
          const nodee = data?.metadata?.nodes;
          if (!(Object.keys(nodee).length === 0)) {
            setShowDiv(false);
            setNodes(data?.metadata.nodes);
          }
        }
        if (data.metadata?.edges) {
          setEdges(data?.metadata.edges);
        }
        if (data?.updated) {
          setUpdated(data.updated);
        }
      }
    } else {
      setuserData(data);
      if (data?.metadata?.nodes) {
        setShowDiv(false);
        setNodes(data?.metadata.nodes);
      }
      if (data.metadata?.edges) {
        setEdges(data?.metadata.edges);
      }
    }
    if (
      data != null &&
      !(Object.keys(data).length === 0) &&
      data?.metadata?.nodes
    ) {
      const nodes = data?.metadata?.nodes;
      if (!(Object.keys(nodes).length === 0)) setShowDiv(false);
      for (const key in nodes) {
        if (key.toLowerCase().includes("servicediscovery")) {
          setIsServiceDiscovery(true);
          setServiceDiscoveryCount(1);
        } else if (key.toLowerCase().includes("service")) {
          service_id++;
          setUniqueApplicationNames((prev) => [
            ...prev,
            data.metadata.nodes[key].data.label,
          ]);
          setUniquePortNumbers((prev) => [
            ...prev,
            data.metadata.nodes[key].data.serverPort,
          ]);
          setServiceInputCheck((prev) => ({
            ...prev,
            [key.id]: false,
          }));
        } else if (key.toLowerCase().includes("database")) {
          database_id++;
        } else if (key.toLowerCase().includes("group")) {
          group_id++;
        } else if (key.toLowerCase().includes("auth")) {
          setAuthProviderCount(1);
        } else if (key.toLowerCase().includes("messagebroker")) {
          setIsMessageBroker(true);
          setMessageBrokerCount(1);
        } else if (key.toLowerCase().includes("logmanagement")) {
          setLogManagementCount(1);
        } else if (key.toLowerCase().includes("localenvironment")) {
          setLocalenvironmentCount(1);
        } else if (key.toLowerCase().includes("ui")) {
          setUniquePortNumbers((prev) => [
            ...prev,
            data.metadata.nodes[key].data.serverPort,
          ]);
          setIsUINodeEnabled(true);
        }
      }
    }
    return () => {
      localStorage.clear();
      service_id = 1;
      database_id = 1;
      group_id = 1;
      setUpdated(false);
    };
  }, []);
  useEffect(() => {
    if (update && userData.project_id) {
      var data = { ...userData };
      data.metadata.nodes = nodes;
      (data.metadata ??= {}).edges = edges;
      data.updated = updated;
      setuserData(data);
      if (!(Object.keys(data).length === 0)) {
        localStorage.data = JSON.stringify(data);
      }
    }
    if (!update) {
      if (localStorage.data && JSON.parse(localStorage.data).projectName) {
        userData.projectName = JSON.parse(localStorage.data).projectName;
      }
      if (localStorage.data && JSON.parse(localStorage.data).updated) {
        userData.updated = JSON.parse(localStorage.data).updated;
      }
      var udata = { ...userData };
      (udata.metadata ??= {}).nodes = nodes;
      udata.metadata.edges = edges;
      if (
        localStorage.data &&
        JSON.parse(localStorage.data)?.metadata?.deployment
      ) {
        udata.metadata.deployment = JSON.parse(
          localStorage.data
        ).metadata.deployment;
      }
      setuserData(udata);
      if (!(Object.keys(udata).length === 0)) {
        localStorage.data = JSON.stringify(udata);
      }
    }
  }, [nodes, edges]);

  useEffect(() => {
    if (triggerExit.onOk) {
      handleGoToIntendedPage(triggerExit.path);
      localStorage.clear();
      clear();
      setShowDiv(true);
    }
    let unblock;
    if (updated) {
      unblock = history.block((location) => {
        setVisibleDialog(true);
        setTriggerExit((obj) => ({ ...obj, path: location.pathname }));
        if (triggerExit.onOk) {
          return true;
        }
        return false;
      });
    }
    return () => {
      if (unblock) {
        unblock();
      }
    };
  }, [
    handleGoToIntendedPage,
    history,
    triggerExit.onOk,
    triggerExit.path,
    updated,
  ]);

  const onChange = (Data) => {
    setUpdated(true);
    if (Data.applicationType === "gateway") {
      setIsEmptyUiSubmit(false);
      let updatedNodes = { ...nodes };
      if (updatedNodes["UI"]?.style) {
        updatedNodes["UI"].style.border = "1px solid black";
      }
      setNodes(updatedNodes);
    } else {
      let flag = false;
      for (let key in serviceInputCheck) {
        if (key !== Isopen && serviceInputCheck[key] === true) {
          flag = true;
          setIsEmptyServiceSubmit(true);
        }
        if (key.startsWith("Service") && Isopen === key) {
          const styleData = serviceInputCheck[key];
          if (styleData) {
            let updatedNodes = { ...nodes };
            updatedNodes[key].style.border = "1px solid black";
            setNodes(updatedNodes);
          }
        }
      }

      if (!flag) {
        setIsEmptyServiceSubmit(false);
      }
      setServiceInputCheck((prev) => ({
        ...prev,
        [Isopen]: false,
      }));
    }

    let UpdatedNodes = { ...nodes };
    if (Data.applicationName) {
      Data.applicationName = Data.applicationName.trim();
      Data.label = Data.label.trim();
    }
    if (Isopen === "aws" || Isopen === "azure") {
      UpdatedNodes["cloudProvider"].data = {
        ...UpdatedNodes["cloudProvider"].data,
        ...Data,
      };
      if (
        UpdatedNodes["cloudProvider"].data.kubernetesUseDynamicStorage ===
        "false"
      )
        delete UpdatedNodes["cloudProvider"].data.kubernetesStorageClassName;
    } else if (Data?.type === "Group") {
      UpdatedNodes[Isopen].data = { ...UpdatedNodes[Isopen].data, ...Data };
    } else {
      if (CurrentNode?.applicationName) {
        setUniqueApplicationNames((prev) =>
          prev.filter((appName) => CurrentNode.applicationName !== appName)
        );
      }
      setUniqueApplicationNames((prev) => [...prev, Data.applicationName]);

      if (CurrentNode?.serverPort) {
        setUniquePortNumbers((prev) =>
          prev.filter((port) => CurrentNode.serverPort !== port)
        );
      }

      setUniquePortNumbers((prev) => [...prev, Data.serverPort]);

      UpdatedNodes[Isopen].data = { ...UpdatedNodes[Isopen].data, ...Data };
      UpdatedNodes[Isopen].selected = false;
    }
    setNodes(UpdatedNodes);
    setopen(false);
  };

  const [showDiv, setShowDiv] = useState(false);

  const MergeData = (sourceId, targetId, Nodes) => {
    const sourceType = sourceId.split("_")[0];
    const targetType = targetId.split("_")[0];

    if (sourceType !== targetType) {
      if (
        (sourceType === "Service" && targetType === "Database") ||
        (sourceType === "UI" && targetType === "Database")
      ) {
        let AllNodes = { ...Nodes };
        let sourceNode = AllNodes[sourceId];
        let targetNode = AllNodes[targetId];
        AllNodes[sourceId].data = {
          ...sourceNode.data,
          prodDatabaseType: targetNode.data.prodDatabaseType,
        };
        setNodes({ ...AllNodes });
      }
    }
  };

  const onsubmit = (Data) => {
    setUpdated(false);
    const NewNodes = { ...nodes };
    const NewEdges = { ...edges };
    let Service_Discovery_Data = nodes["serviceDiscoveryType"]?.data;
    let authenticationData = nodes["authenticationType"]?.data;
    let logManagementData = nodes["logManagement"]?.data;
    if (logManagementData && Data?.deployment)
      Data.deployment.enableECK = "true";
    if (Data.deployment && Service_Discovery_Data?.serviceDiscoveryType)
      Data.deployment = { ...Data.deployment, ...Service_Discovery_Data };
    for (const key in NewNodes) {
      const Node = NewNodes[key];
      delete Node.data?.color;
      if (Node.id.startsWith("Service") || Node.id === "UI")
        Node.data = {
          ...Node.data,
          ...Service_Discovery_Data,
          ...authenticationData,
          ...logManagementData,
        };
    }
    if (Object.values(NewNodes).some((node) => node.data)) {
      Data["services"] = {};
      let serviceIndex = 0;
      for (const nodeInfo in NewNodes) {
        const Node = NewNodes[nodeInfo];
        if (Node.data) {
          if (Node.id.startsWith("Service") || Node.id === "UI") {
            Data["services"][serviceIndex++] = Node.data;
          }
        }
      }
    }
    if (
      Object.values(NewEdges).some(
        (edge) => edge.data && JSON.stringify(edge.data) !== "{}"
      )
    ) {
      Data["communications"] = {};
      let communicationIndex = 0;
      for (const edgeInfo in NewEdges) {
        const Edge = NewEdges[edgeInfo];
        if (!Edge.target.startsWith("Database")) {
          Edge.data.client = nodes[Edge.source].data.applicationName;
          Edge.data.server = nodes[Edge.target].data.applicationName;
          if (
            Edge.data &&
            Object.keys(Edge.data).length !== 0 &&
            !Edge.target.startsWith("Database")
          )
            Data["communications"][communicationIndex++] = Edge.data;
        }
      }
    }
    if (saveMetadata || userData?.project_id) {
      Data["metadata"] = {
        nodes: nodes,
        edges: edges,
        deployment: Data?.deployment,
      };
    } else delete Data?.metadata;
    if (userData?.project_id) {
      Data.projectId = userData?.project_id;
    }
    setNodes(NewNodes);

    setIsLoading(true);
    fetch(process.env.REACT_APP_API_BASE_URL + "/generate", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: initialized ? `Bearer ${keycloak?.token}` : undefined,
      },
      body: JSON.stringify(Data),
    })
      .then((response) => response.blob())
      .then((blob) => {
        setIsLoading(false);
        history.push("/success");
        saveAs(blob, `${Data.projectName}.zip`); // Edit the name or ask the user for the project Name
      })
      .catch((error) => console.error(error))
      .finally(() => {
        localStorage.clear();
        history.push("/success");
      });
  };

  const onCheckEdge = (edges) => {
    let NewEdges = { ...edges };
    for (const key in NewEdges) {
      const Edge = NewEdges[key];
      if (Edge.id.startsWith("UI")) {
        if (
          Edge.data.type === "synchronous" &&
          Edge.data.framework === "rest-api"
        ) {
          delete Edge.data.type;
          delete Edge.data.framework;
        }
      }
    }
  };

  const onEdgeClick = (e, edge) => {
    const sourceType = edge.source.split("_")[0];
    const targetType = edge.target.split("_")[0];
    if (
      (sourceType === "UI" && targetType === "Service") ||
      (sourceType === "Service" && targetType === "Service")
    ) {
      setEdgeopen(edge.id);
      setCurrentEdge(edges[edge.id].data);
    }
  };

  const handleEdgeData = (Data) => {
    let UpdatedEdges = { ...edges };

    if (Data.framework === "rest-api" && isServiceDiscovery) {
      UpdatedEdges[IsEdgeopen].label = "Rest";
    } else {
      UpdatedEdges[IsEdgeopen].label = "RabbitMQ";
    }

    if (Data.type === "synchronous") {
      UpdatedEdges[IsEdgeopen].markerEnd = {
        color: "black",
        type: MarkerType.ArrowClosed,
      };
      UpdatedEdges[IsEdgeopen].style = { stroke: "black" };
    } else {
      UpdatedEdges[IsEdgeopen].markerEnd = {
        color: "#bcbaba",
        type: MarkerType.ArrowClosed,
      };
      UpdatedEdges[IsEdgeopen].style = { stroke: "#bcbaba" };
    }

    UpdatedEdges[IsEdgeopen].data = {
      client: UpdatedEdges[IsEdgeopen].source,
      server: UpdatedEdges[IsEdgeopen].target,
      ...UpdatedEdges[IsEdgeopen].data,
      ...Data,
    };

    setEdges(UpdatedEdges);
    setEdgeopen(false);
  };

  const onConnect = useCallback((params, Nodes) => {
    setUpdated(true);
    params.markerEnd = { type: MarkerType.ArrowClosed };
    params.type = "smoothstep";
    params.data = {};
    const targetNode = Nodes[params.target];
    const sourceNode = Nodes[params.source];
    if (targetNode.id.startsWith("Database")) {
      let isServiceConnected = Nodes[params.source]?.data["prodDatabaseType"];
      if (!isServiceConnected && !targetNode.data.isConnected) {
        targetNode.data.isConnected = true;
        setEdges((eds) => addEdge(params, eds, Nodes));
        MergeData(params.source, params.target, Nodes);
      }
      if (!isServiceConnected) {
        let updatedNodes = { ...Nodes };
        if (updatedNodes[targetNode?.id]?.style) {
          updatedNodes[targetNode?.id].style.border = "1px solid black";
        }
        setNodes(updatedNodes);
      }
    } else if (
      !(targetNode.id.startsWith("UI") && sourceNode.id.startsWith("Service"))
    ) {
      setEdges((eds) => addEdge(params, eds, Nodes));
    }
  }, []);

  const UpdateSave = () => {
    setsaveMetadata((prev) => !prev);
  };

  const [uniqueApplicationNames, setUniqueApplicationNames] = useState([]);
  const [uniquePortNumbers, setUniquePortNumbers] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorClick = (color) => {
    let UpdatedNodes = { ...nodes };
    setSelectedColor(color);
    (UpdatedNodes[nodeClick].style ??= {}).backgroundColor = color;
    setNodes(UpdatedNodes);
  };

  return (
    <div className="dndflow homePage">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          {showDiv && (
            <div className="contentBlock">
              <div className="iconBlock">
                <FiUploadCloud className="iconStyle" />
              </div>
              <div className="designText">
                Design your application architecture here
              </div>
              <div className="subText">
                Click next to auto generate code and setup infrastructure
              </div>
              <Button
                mt={4}
                border="2px"
                borderColor="#3182CE"
                alignContent="center"
                color="#3182CE"
                className="dragDropStyle"
              >
                Drag & Drop <ArrowRightIcon className="arrowIconStyle" />
              </Button>
            </div>
          )}
          <ReactFlow
            nodes={Object.values(nodes)}
            edges={Object.values(edges)}
            nodeTypes={nodeTypes}
            snapToGrid
            connectionLineType={ConnectionLineType.Step}
            snapGrid={[10, 10]}
            onNodesChange={(changes) =>
              onNodesChange(setShowDiv, edges, changes)
            }
            onEdgesChange={(changes) => onEdgesChange(nodes, changes)}
            onConnect={(params) => onConnect(params, nodes)}
            onInit={setReactFlowInstance}
            onNodeDrag={onclick}
            onNodeDragStop={onNodeDragStop}
            onDrop={(e) =>
              onDrop(
                e,
                ServiceDiscoveryCount,
                MessageBrokerCount,
                LogManagemntCount,
                AuthProviderCount,
                LocalenvironmentCount
              )
            }
            onDragOver={onDragOver}
            onDragLeave={() => setShowDiv(Object.keys(nodes).length === 0)}
            onNodeClick={onclick}
            deleteKeyCode={["Backspace", "Delete"]}
            fitView
            onEdgeUpdate={(oldEdge, newConnection) =>
              onEdgeUpdate(nodes, oldEdge, newConnection)
            }
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={(_, edge) => onEdgeUpdateEnd(nodes, edge)}
            onEdgeClick={onEdgeClick}
            nodesFocusable={true}
            defaultViewport={defaultViewport}
          >
            <Controls />
            <Background
              gap={10}
              color="#f2f2f2"
              variant={BackgroundVariant.Lines}
            />
          </ReactFlow>
        </div>
        <Sidebar
          isUINodeEnabled={isUINodeEnabled}
          Service_Discovery_Data={nodes["serviceDiscoveryType"]?.data}
          authenticationData={nodes["authenticationType"]?.data}
          nodes={nodes}
          onSubmit={onsubmit}
          saveMetadata={saveMetadata}
          Togglesave={UpdateSave}
          isLoading={isLoading}
          isEmptyUiSubmit={isEmptyUiSubmit}
          isEmptyServiceSubmit={isEmptyServiceSubmit}
          selectedColor={selectedColor}
          nodeClick={nodeClick}
          edges={edges}
          update={update}
          updated={updated}
          setUpdated={setUpdated}
          triggerExit={triggerExit}
        />

        {nodeType === "UI" && Isopen && (
          <UiDataModal
            isOpen={Isopen}
            CurrentNode={CurrentNode}
            onClose={setopen}
            onSubmit={onChange}
            handleColorClick={handleColorClick}
            uniqueApplicationNames={uniqueApplicationNames}
            uniquePortNumbers={uniquePortNumbers}
          />
        )}
        {nodeType === "Service" && Isopen && (
          <ServiceModal
            isOpen={Isopen}
            CurrentNode={CurrentNode}
            onClose={setopen}
            onSubmit={onChange}
            handleColorClick={handleColorClick}
            uniqueApplicationNames={uniqueApplicationNames}
            uniquePortNumbers={uniquePortNumbers}
          />
        )}
        {nodeType === "group" && Isopen && (
          <GroupDataModal
            isOpen={Isopen}
            CurrentNode={CurrentNode}
            onClose={setopen}
            onSubmit={onChange}
            handleColorClick={handleColorClick}
          />
        )}

        {isVisibleDialog && (
          <ActionModal
            isOpen={isVisibleDialog}
            onClose={() => setVisibleDialog(false)}
            onSubmit={() => {
              setTriggerExit((obj) => ({
                ...obj,
                onOk: true,
              }));
              setVisibleDialog(false);
            }}
            actionType="clear"
          />
        )}

        {IsEdgeopen && (
          <EdgeModal
            isOpen={IsEdgeopen}
            CurrentEdge={CurrentEdge}
            onClose={setEdgeopen}
            handleEdgeData={handleEdgeData}
            isServiceDiscovery={isServiceDiscovery}
            isMessageBroker={isMessageBroker}
          />
        )}

        {ServiceDiscoveryCount === 2 && (
          <AlertModal
            isOpen={true}
            onClose={() => setServiceDiscoveryCount(1)}
          />
        )}

        {MessageBrokerCount === 2 && (
          <AlertModal isOpen={true} onClose={() => setMessageBrokerCount(1)} />
        )}

        {CloudProviderCount === 2 && (
          <AlertModal isOpen={true} onClose={() => setCloudProviderCount(1)} />
        )}
        {LogManagemntCount === 2 && (
          <AlertModal isOpen={true} onClose={() => setLogManagementCount(1)} />
        )}
        {LocalenvironmentCount === 2 && (
          <AlertModal
            isOpen={true}
            onClose={() => setLocalenvironmentCount(1)}
          />
        )}
        {AuthProviderCount === 2 && (
          <AlertModal isOpen={true} onClose={() => setAuthProviderCount(1)} />
        )}
      </ReactFlowProvider>
    </div>
  );
};

export default Designer;
