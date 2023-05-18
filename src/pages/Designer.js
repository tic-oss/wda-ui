import React, { useState, useRef, useCallback,useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
updateEdge

} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './../components/Sidebar';
import ServiceModal from '../components/Modal/ServiceModal';
import UiDataModal from '../components/Modal/UIModal';
import DeployModal from '../components/Modal/DeployModal';
import CustomImageNode from "./Customnodes/CustomImageNode"
import CustomServiceNode from "./Customnodes/CustomServiceNode"
import CustomIngressNode from "./Customnodes/CustomIngressNode"
import CustomAuthNode from "./Customnodes/CustomAuthNode"
import CustomMessageBrokerNode from "./Customnodes/CustomMessageBrokerNode"

import "./../App.css"

let service_id = 2;
let database_id = 1;
let totalnodes = 1
const getId = (type='') =>{
      if( type === 'Service')
        return `Service_${service_id++}`
      else if ( type === 'Database')
        return `Database_${database_id++}`
      else if ( type === 'Authentication')
        return 'Authentication_1'
      else if ( type === 'Deployment')
        return 'Deployment_1'
    return 'Id'
}
const nodeTypes = {
  selectorNode: CustomImageNode,
  selectorNode1: CustomServiceNode,
  selectorNode2: CustomIngressNode,
  selectorNode3: CustomAuthNode,
  selectorNode4: CustomMessageBrokerNode
};


const Designer = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [nodeMap,setNodeMap] = useState(new Map())
  const [nodeType,setNodeType] = useState(null)
  console.log("Nodes",nodes)
  
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  console.log("Edges",edges)  
  console.log('NodeMap',nodeMap)
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [Isopen,setopen]=useState(false);
  const [CurrentNode,setCurrentNode]= useState({});
  const edgeUpdateSuccessful = useRef(true);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds))}
    , []);

    const onEdgeUpdateStart = useCallback(() => {
      edgeUpdateSuccessful.current = false;
    }, []);
  
    const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
      edgeUpdateSuccessful.current = true;
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    }, []);
  
    const onEdgeUpdateEnd = useCallback((_, edge) => {
      if (!edgeUpdateSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }
  
      edgeUpdateSuccessful.current = true;
    }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onclick = (e)=>{
    console.log(e)
    const Id= e.target.dataset.id || e.target.name
    console.log(Id)
    if(Id){
      const type=Id.split('_')[0]
      setNodeType(type)
      let index = nodeMap.get(Id)
      let CurrentNode = nodes[index]
      setCurrentNode(CurrentNode?.data)
      setopen(Id)
    }
    
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      console.log(event)
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const name = event.dataTransfer.getData('Name')

    
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      if(name.startsWith('Database')){
        const Database=name.split('_').splice(1)[0]
        console.log(Database)
        const newNode = {
          id: getId('Database'),
          type:'selectorNode',
          position,
          data: { Database: Database },
         style: { border: "1px solid", padding: "4px 4px" },
        };
        setNodeMap((prev)=>new Map(prev.set(newNode.id,totalnodes++)))
        setNodes((nds) => nds.concat(newNode))
      }
      else if(name.startsWith('Discovery')){
        const Service_Discovery=name.split('_').splice(1)[0]
        console.log(Service_Discovery)
        const newNode = {
          id: 'Service_Discovery',
          type:'selectorNode1',
          position,
          data: { Service_Discovery: Service_Discovery },
         style: { border: "1px solid", padding: "4px 4px" },
        };
        setNodeMap((prev)=>new Map(prev.set(newNode.id,totalnodes++)))
        setNodes((nds) => nds.concat(newNode))
      }
      else if(name.startsWith('Ingress')){
        const Ingress_Type=name.split('_').splice(1)[0]
        console.log(Ingress_Type)
        const newNode = {
          id: 'Ingress_Type',
          type:'selectorNode2',
          position,
          data: { Ingress_Type: Ingress_Type },
         style: { border: "1px solid", padding: "4px 4px" },
        };
        setNodeMap((prev)=>new Map(prev.set(newNode.id,totalnodes++)))
        setNodes((nds) => nds.concat(newNode))
      }
      else if(name.startsWith('Auth')){
        const Auth_Type=name.split('_').splice(1)[0]
        console.log(Auth_Type)
        const newNode = {
          id: 'Auth_Type',
          type:'selectorNode3',
          position,
          data: { Auth_Type: Auth_Type },
         style: { border: "1px solid", padding: "4px 4px" },
        };
        setNodeMap((prev)=>new Map(prev.set(newNode.id,totalnodes++)))
        setNodes((nds) => nds.concat(newNode))
      }
      else if(name.startsWith('MessageBroker')){
        const Message_Broker=name.split('_').splice(1)[0]
        console.log(Message_Broker)
        const newNode = {
          id: 'Message_Broker',
          type:'selectorNode4',
          position,
          data: { Message_Broker: Message_Broker },
         style: { border: "1px solid", padding: "4px 4px" },
        };
        setNodeMap((prev)=>new Map(prev.set(newNode.id,totalnodes++)))
        setNodes((nds) => nds.concat(newNode))
      }
      else {
        const newNode = {
          id: getId(name),
          type,
          position,
          data: { label: name },
         style: { border: "1px solid", padding: "4px 4px" },
        };
        setNodeMap((prev)=>new Map(prev.set(newNode.id,totalnodes++)))
        setNodes((nds) => nds.concat(newNode))
      }
      
  

    },
    [reactFlowInstance]
  );

  const onChange = (Data) => {
    
    let UpdatedNodes=[...nodes]
    let index = nodeMap.get(Isopen)
    console.log(index)
    let CurrentNode = UpdatedNodes[index]
    console.log(CurrentNode)
    CurrentNode.data=Data
    UpdatedNodes[index]=CurrentNode
    setNodes(UpdatedNodes)
    setopen(false)
  }

  useEffect(()=>{
    setNodes([
      {
            id: 'UI',
            type: 'default',
            data: { label: 'UI',onChange:onChange},
           style: { border: "1px solid", padding: "4px 4px" },
            position: { x: 250, y: 5 },
          },
         
    ])
    setNodeMap((prev)=>new Map(prev.set('UI',0)))
    
  },[])

  
    
  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onclick}
            fitView
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
          >

            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      
      {
      nodeType==='Service' && Isopen && <ServiceModal isOpen={Isopen} CurrentNode ={CurrentNode} onClose={setopen} onSubmit={onChange} />
      }
      {
          nodeType==='Deployment' && Isopen && <DeployModal isOpen={Isopen} CurrentNode ={CurrentNode} onClose={setopen} onSubmit={onChange} />
      }
      {
          nodeType==='UI' && Isopen && <UiDataModal isOpen={Isopen} CurrentNode ={CurrentNode} onClose={setopen} onSubmit={onChange} />
      }
      </ReactFlowProvider>


    </div>
  );
};

export default Designer;

