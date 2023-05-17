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

const DeployModal = ({ isOpen, onClose, onSubmit,CurrentNode}) => {
    const IntialState ={
        'DeploymentType':'',
        'KubernetsNamespace':'',
        'EnableKubernetesDynamicStorage':'',
        'KubernetesStorageClassName':'',
        ...CurrentNode
      }
      const type = isOpen?.split('_')[0] || null;
      const [DeploymentData,setDeploymentData] = useState(IntialState)

      const handleData = (column,value)=>{
        setDeploymentData((prev)=>({...prev,[column]:value}))
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
              <FormLabel>Deployment Type</FormLabel>
              <Select mb={4} variant="outline" id="deploymenttype" 
                borderColor={"black"}
                value={DeploymentData.DeploymentType}
                onChange={(e)=>handleData('DeploymentType',e.target.value)}
              >
                <option value="kubernetes">Kubernetes</option>
                
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Kubernetes Namespace</FormLabel>
              <Input
                mb={4}
                variant="outline"
                id="kubernetesnamespace"
                placeholder="Kubernetes Namespace"
                borderColor={"black"}
                value={DeploymentData.KubernetsNamespace}
                onChange={(e)=>handleData('KubernetsNamespace',e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Enable Kubernetes Dynamic Storage</FormLabel>
              <Select mb={4} variant="outline" id="enablekubernetesdynamicstorage" 
                borderColor={"black"}
                value={DeploymentData.EnableKubernetesDynamicStorage}
                onChange={(e)=>handleData('EnableKubernetesDynamicStorage',e.target.value)}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Kubernetes Storage Class Name</FormLabel>
              <Input
                mb={4}
                variant="outline"
                id="kubernetesstorageclassname"
                placeholder="Kubernetes Storage Class Name"
                borderColor={"black"}
                value={DeploymentData.KubernetesStorageClassName}
                onChange={(e)=>handleData('KubernetesStorageClassName',e.target.value)}
              />
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

export default DeployModal;