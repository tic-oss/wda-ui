import React,{useState} from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  Button,
  FormLabel,
  FormControl
} from "@chakra-ui/react";

const EdgeModal = ({ isOpen, onClose, onSubmit,CurrentNode}) => {
    const IntialState ={
        'EdgeType':'',
        
        ...CurrentNode
      }
      const type = isOpen?.split('_')[0] || null;
      const [EdgeData,setEdgeData] = useState(IntialState)

      const handleData = (column,value)=>{
        setEdgeData((prev)=>({...prev,[column]:value}))
      }

  return (
    <Modal isOpen={isOpen} onClose={()=>onClose(false)} isCentered={true}>
      
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{type}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
        <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "Left",
            }}
          >
            <FormControl>
              <FormLabel>Edge Type</FormLabel>
              <Input mb={4} variant="outline" id="edgetype" 
                borderColor={"black"}
                value={EdgeData.EdgeType}
                onChange={(e)=>handleData('EdgeType',e.target.value)}
              >  
              </Input>
            </FormControl>

           


             </div>
          <ModalFooter>
            <Button onClick={onSubmit} type="submit">Submit</Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EdgeModal;