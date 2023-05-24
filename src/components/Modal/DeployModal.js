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
  console.log(CurrentNode,isOpen)
    const IntialState ={
        'Cloud_Provider':isOpen,
        'DeploymentType':'kubernetes',
        'KubernetsNamespace':'',
        'EnableKubernetesDynamicStorage':'yes',
        'KubernetesStorageClassName':'',
        'AzureAccount':'',
        'AWSAccountID':'',
        'AWSRegion':'',
        'IngressType':'istio',
        ...CurrentNode
      }
     
console.log(isOpen)
      const [DeploymentData,setDeploymentData] = useState(IntialState)

      const handleData = (column,value)=>{
        setDeploymentData((prev)=>({...prev,[column]:value}))
      }

  return (
    <Modal isOpen={isOpen} onClose={()=>onClose(false)} isCentered={true}>
      
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Deployment</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
        <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "Left",
            }}
          >
             {isOpen === 'Azure' && (
        <div>
          <FormControl>
              <FormLabel>Azure Account ID</FormLabel>
              <Input mb={4} variant="outline" id="azureaccount" 
                borderColor={"black"}
                value={DeploymentData.AzureAccount}
                onChange={(e)=>handleData('AzureAccount',e.target.value)}
              >  
              </Input>
            </FormControl>
        </div>
      )}

      {isOpen === 'AWS' && (
        <div>
         <FormControl>
              <FormLabel>AWS Account ID</FormLabel>
              <Input mb={4} variant="outline" id="awsaccountid" 
                borderColor={"black"}
                value={DeploymentData.AWSAccountID}
                onChange={(e)=>handleData('AWSAccountID',e.target.value)}
              >  
              </Input>
            </FormControl>
            <FormControl>
              <FormLabel>AWS Region</FormLabel>
              <Input mb={4} variant="outline" id="awsaccount" 
                borderColor={"black"}
                value={DeploymentData.AWSRegion}
                onChange={(e)=>handleData('AWSRegion',e.target.value)}
              >  
              </Input>
            </FormControl>
        </div>
      )}
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
              <FormLabel>Namespace</FormLabel>
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
              <FormLabel>Enable Dynamic Storage</FormLabel>
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
              <FormLabel>Storage Class Name</FormLabel>
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
            <FormControl>
              <FormLabel>Ingress Type</FormLabel>
              <Select mb={4} variant="outline" id="ingresstype" 
                borderColor={"black"}
                value={DeploymentData.IngressType}
                onChange={(e)=>handleData('IngressType',e.target.value)}
              >
                <option value="istio">Istio</option>
              
                </Select>
            </FormControl>



             </div>
          <ModalFooter>
          <Button onClick={() => onSubmit(DeploymentData)}  type="submit"style={{ display: 'block', margin: '0 auto' }}>
           Submit
          </Button>


          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeployModal;