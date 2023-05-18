import React, { useState, useRef, useCallback,useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
updateEdge,
MarkerType

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

import AlertModal from '../components/Modal/AlertModal';
import "./../App.css"
import { Button } from '@chakra-ui/react';

let service_id = 1;
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
  const [ServiceDiscoveryCount,setServiceDiscoveryCount] = useState(0)
  console.log("Nodes",nodes)
  
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  console.log("Edges",edges)  
  console.log('NodeMap',nodeMap)
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [Isopen,setopen]=useState(false);
  const [CurrentNode,setCurrentNode]= useState({});
  const edgeUpdateSuccessful = useRef(true);

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
    (event,servicecount) => {
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
      else if(name.startsWith('Discovery') && servicecount==0){
        console.log(servicecount)
        const Service_Discovery=name.split('_').splice(1)[0]
        const newNode = {
          id: 'Service_Discovery',
          type:'selectorNode1',
          position,
          data: { Service_Discovery: Service_Discovery },
         style: { border: "1px solid", padding: "4px 4px" },
        };
        setNodeMap((prev)=>new Map(prev.set(newNode.id,totalnodes++)))
        setNodes((nds) => nds.concat(newNode))
        setServiceDiscoveryCount(1)
      }
      else if(name.startsWith('Discovery') && servicecount>=1){
        console.log("else",servicecount)
        setServiceDiscoveryCount(2)
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
  const MergeData = (sourceId,targetId,Nodes,NodeMap) =>{

    const sourceType = sourceId.split('_')[0]
    const targetType = targetId.split('_')[0]
    
    console.log(sourceType, targetType,NodeMap)
    
    if(sourceType !== targetId){
      if(sourceType === 'Service' && targetType === 'Database'){
          console.log("source  target",nodeMap)
          let sourceindex = NodeMap.get(sourceId)
          let targetindex = NodeMap.get(targetId)
          console.log('Index.',sourceindex,targetindex)
          let AllNodes=[...Nodes]
          let sourceNode = AllNodes[sourceindex]
          let targetNode = AllNodes[targetindex]
          console.log('Nodes',sourceNode,targetNode)
          AllNodes[sourceindex].data={...sourceNode.data,...targetNode.data}
          setNodes([...AllNodes])
        }
    }
  }
  const onsubmit = () =>{

    let NewNodes = [...nodes]
    let Service_Discovery_index = nodeMap.get('Service_Discovery')
    let Service_Discovery_Data= nodes[Service_Discovery_index].data
    for(let i=0;i<NewNodes.length;i++){
      const Node = NewNodes[i];
      if(Node.id.startsWith('Service')|| Node.id === 'UI'){
        Node.data={...Node.data,...Service_Discovery_Data}
      }
    }
    setNodes(NewNodes)

  } 

  const onEdgeClick = (e,edge) =>{
    console.log(e,edge)
  }
  const onConnect = useCallback((params,Nodes,nodesMap) => {
    params.markerEnd= {type: MarkerType.ArrowClosed}
    setEdges((eds) => addEdge(params, eds))
    MergeData(params.source,params.target,Nodes,nodesMap)
  }
    , []);
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
            onConnect={(params)=>onConnect(params,nodes,nodeMap)}
            onInit={setReactFlowInstance}
            onDrop={(e)=>onDrop(e,ServiceDiscoveryCount)}
            onDragOver={onDragOver}
            onNodeClick={onclick}
            fitView
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            onEdgeClick={onEdgeClick}
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
      {/* <Button onClick={()=>onsubmit()}>Submit</Button> */}
      </ReactFlowProvider>


    </div>
  );
};

export default Designer;

