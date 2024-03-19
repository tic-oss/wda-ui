import { useCallback } from "react";
const MarkerType = { ArrowClosed: "arrowclosed" };

const onclick = (
  e,
  node,
  setNodeType,
  setCurrentNode,
  setOpen,
  setNodeClick,
  nodes
) => {
  const Id = e.target.dataset.id || e.target.name || node.id;
  if (Id) {
    const type = Id.split("_")[0];
    setNodeType(type);
    if (type === "aws" || type === "azure") {
      setCurrentNode(nodes["cloudProvider"].data);
    } else setCurrentNode(nodes[Id].data);
    setOpen(Id);
  }
  setNodeClick(Id);
};
const addEdge = (edgeParams, edges) => {
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
const updateEdge = (
  oldEdge,
  newConnection,
  edges,
  Nodes,
  updated,
  setNodes,
  MarkerType
) => {
  updated=true;
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
const MergeData = (sourceId, targetId, Nodes, setNodes) => {
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
const useEdgeUpdate = () => {
  return useCallback(
    (
      Nodes,
      oldEdge,
      newConnection,
      updated,
      edgeUpdateSuccessful,
      setEdges,
      setNodes,
      MarkerType
    ) => {
      updated = true;
      edgeUpdateSuccessful.current = true;
      if (
        !(
          newConnection.target.startsWith("Database") &&
          Nodes[newConnection.source]?.data["prodDatabaseType"]
        )
      ) {
        setEdges((els) =>
          updateEdge(oldEdge, newConnection, els, Nodes, setNodes, MarkerType)
        );
        MergeData(newConnection.source, newConnection.target, Nodes, setNodes);
      }
    },
    []
  );
};
const useHandleNodesChange = () => {
  return useCallback(
    (
      setShowDiv,
      changes,
      setUpdated,
      setNodes,
      setUniqueApplicationNames,
      setUniquePortNumbers,
    ) => {
      setUpdated(true)
      setNodes((oldNodes) => {
        const updatedNodes = { ...oldNodes };
        const deletedApplicationNames = []; // Track deleted application names
        const deletedApplicationPorts = [];

        changes.forEach((change) => {
          switch (change.type) {
            case "dimensions":
              if (change.resizing)
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
              // Add your delete functionality here
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
    },
    []
  );
};

const Functions = {
  onclick: onclick,
  addEdge: addEdge,
  updateEdge: updateEdge,
  MergeData: MergeData,
  onEdgeUpdate: useEdgeUpdate,
  onNodesChange: useHandleNodesChange,
};

export default Functions;
