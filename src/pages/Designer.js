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

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Select
} from '@chakra-ui/react'
import Sidebar from './../components/Sidebar';

import "./../App.css"

let application_id = 2;
let database_id=1;
const getId = (type='') =>{
      if( type === 'Application')
        return `Application_${application_id++}`
      else if ( type === 'Database')
        return `Database_${database_id++}`
      else if ( type === 'Authentication')
        return 'Authentication_1'
        else if ( type === 'Deployment')
        return 'Deployment_1'
      
    return 'Id'
}

const Designer = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  console.log("Nodes",nodes)
  
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  console.log("Edges",edges)  
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [Isopen,setopen]=useState(false);
  const edgeUpdateSuccessful = useRef(true);

  const onConnect = useCallback((params) => {
    console.log("Connect ",params)
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

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      console.log(event)
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const name = event.dataTransfer.getData('Name')

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(name),
        type,
        position,
        data: { label: name },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onclick = (e)=>{
    console.log(e.target.dataset.id)
    setopen(e.target.dataset.id)
  }

  const onChange = (e) => {
    console.log("object",e.target.dataset.id)
    const Name= document.getElementById("a1").value;
    const Framework= document.getElementById("a2").value;
    const PackageName= document.getElementById("a3").value;
    const ServerPort= document.getElementById("a4").value;
    const ApplicationType= document.getElementById("a5").value;
    console.log(Name,Framework,PackageName,ServerPort,ApplicationType)
    console.log("Nodes",nodes)
    console.log(Isopen)
    setNodes((nds)=>{
      return nds.map((node) => {
        console.log(node.id,Isopen,node.id!==Isopen)
        if (node.id !== Isopen) {
          console.log(node.id,Isopen)
          return node
        }
        return {
          ...node,
          data: {
            ...node.data,
            Framework:Framework,
            label:Name,
            PackageName:PackageName,
            ServerPort:ServerPort,
            ApplicationType:ApplicationType
          }
        }
      }
    )

   }
    )
    setopen(false)
  }

  useEffect(()=>{
    setNodes([
      {
            id: 'Application_1',
            type: 'input',
            data: { label: 'Application',onChange:onChange},
            position: { x: 250, y: 5 },
          },
    ])
    
  },[])


  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onClick={onclick}
            fitView
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      { Isopen &&  <>
    
        <Modal isOpen={Isopen} onClose={setopen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal  {Isopen} </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            
            <Input variant='outline' id='a1' placeholder='Name' />
            <Input variant='outline' id='a2' placeholder='Framework' />
            <Input variant='outline' id='a3' placeholder='PackageName' />
            <Input variant='outline' id='a4' placeholder='ServerPort' />
            <Select variant='outline' id='a5' placeholder='ApplicationType'>
              <option value="microservice">Microservice</option>
                  <option value="gateway">UI + Gateway</option>
                
            </Select>
              
            <Button onClick={onChange}>Submit</Button>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={()=>setopen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      }
      </ReactFlowProvider>


    </div>
  );
};

export default Designer;


// const CustomModal = ({Isopen,setopen})=>{

  
//     return (
//      <>
//      </>
//     )
//   }

