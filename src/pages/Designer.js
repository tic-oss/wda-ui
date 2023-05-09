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
  Input
} from '@chakra-ui/react'
import Sidebar from './../components/Sidebar';

import "./../App.css"

let id = 2;
const getId = () => `${id++}`;

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

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
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
    const phone= document.getElementById("a2").value;
    const address= document.getElementById("a3").value;
    console.log(Name,phone,address)
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
            phone:phone,
            Name:Name,
            address:address
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
            id: '1',
            type: 'input',
            data: { label: 'input node',onChange:onChange},
            position: { x: 250, y: 5 },
          },
    ])
    
  },[])


// const initialNodes = [
//   {
//     id: '1',
//     type: 'input',
//     onChange:UpdateNodeData,
//     data: { label: 'input node' },
//     position: { x: 250, y: 5 },
//   },
// ];

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
            <Input variant='outline' id='a2' placeholder='phone' />
            <Input variant='outline' id='a3' placeholder='address' />
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

