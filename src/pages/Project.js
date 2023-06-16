import { useEffect, useRef, useState} from "react";
import ReactFlow, {
    ReactFlowProvider,
  } from "reactflow";
import "reactflow/dist/style.css";
import { useLocation } from 'react-router-dom';
import CustomImageNode from "./Customnodes/CustomImageNode";
import CustomServiceNode from "./Customnodes/CustomServiceNode";
import CustomIngressNode from "./Customnodes/CustomIngressNode";
import CustomAuthNode from "./Customnodes/CustomAuthNode";
import CustomMessageBrokerNode from "./Customnodes/CustomMessageBrokerNode";
import CustomCloudNode from "./Customnodes/CustomCloudNode";
import CustomLoadNode from "./Customnodes/CustomLoadNode";
import CustomLocalenvironmentNode from "./Customnodes/CustomLocalenvironmentNode";

const readOnlyNodeStyle = {
    border: '1px solid #ccc',
    background: '#f0f0f0',
    color: '#555',
}

const readOnlyEdgeStyle = {
    stroke: '#ccc',
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
    const [metadata,setmetadata] = useState(location.state);
    const [nodes,setNodes] = useState([])
    const [edges,setEdges] = useState([])

    useEffect(()=>{ 
        const data  = location?.state
        if(!data){
            const data= JSON.parse(localStorage.metadata)
            setmetadata(data) 
            setNodes(Object.values(data?.nodes))
            setEdges(Object.values(data?.edges))
        }
        else{
            localStorage.metadata=JSON.stringify(metadata)
            setNodes(Object.values(metadata?.nodes))
            setEdges(Object.values(metadata?.edges))
        }
    },[])



    const reactFlowWrapper = useRef(null);
    const [tooltipData, setTooltipData] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const onElementClick = (event, element) => {
            event.preventDefault();
            setTooltipData(element.data.applicationName);
            setTooltipPosition({ x: element.position.x , y: +element.position.y});
    }
     
      const CustomTooltip = () => {
        const tooltipStyle = {
          position: 'absolute',
          left: tooltipPosition.x,
          top: tooltipPosition.y,
        };
    
        return tooltipData ? (
          <div className="tooltip" style={tooltipStyle}>
            {tooltipData}
          </div>
        ) : null;
      };

  return (
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
            onEdgeClick={onElementClick}
            onNodeClick={onElementClick}
            nodesConnectable={false}
            elementsSelectable={false}
            nodesDraggable={false}
            panOnDrag={false}
            fitView
            nodeTypes={{
                customReadOnlyNode: readOnlyNodeStyle,
                ...nodeTypes
              }}
              edgeTypes={{
                customReadOnlyEdge: readOnlyEdgeStyle,
              }}
        />
        <CustomTooltip />
        </div>
      </ReactFlowProvider>
    </div>
  )
}

export default Project
