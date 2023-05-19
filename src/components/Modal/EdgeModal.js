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

const EdgeModal = ({ isOpen, onClose}) => {
    const IntialState ={
        'EdgeType':'',
    }
      const [EdgeData,setEdgeData] = useState(IntialState)

      // const handleData = (column,value)=>{
      //   setEdgeData((prev)=>({...prev,[column]:value}))
      // }

  return (
    <Modal isOpen={isOpen} onClose={()=>onClose(false)} isCentered={true}>
      
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edge</ModalHeader>
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
              >  
              </Input>
            </FormControl>
             </div>
          <ModalFooter>
            <Button  type="submit" onClick={()=>onClose(false)}>Submit</Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EdgeModal;