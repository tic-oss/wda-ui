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
  FormControl,
  Alert,
  AlertIcon
} from "@chakra-ui/react";

const DeployModal = ({ isOpen, onClose, onSubmit,CurrentNode}) => {
  console.log(CurrentNode,isOpen)
    const IntialState ={
        'cloudProvider':isOpen,
        'deploymentType':'kubernetes',
        'kubernetesNamespace':'',
        'kubernetesUseDynamicStorage':'yes',
        'kubernetesStorageClassName':'',
        'AzureAccount':'',
        'awsAccountId':'',
        'awsRegion':'',
        'ingress':'istio',
        ...CurrentNode
      }
      const handleKeyPress = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        if ((charCode >= 48 && charCode <= 57) || charCode === 8) {
          return true;
        } else {
          event.preventDefault();
          return false;
        }
      };
console.log(isOpen)
      const [DeploymentData,setDeploymentData] = useState(IntialState)

      const handleData = (column,value)=>{
        // validateInputValue(field, value);
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
              <Input mb={4} variant="outline"  
              type="text"
              placeholder="123456789"
              id="awsAccountId" 
              onKeyPress={handleKeyPress}
              maxLength="12"
                borderColor={"black"}
                value={DeploymentData.awsAccountId}
                onChange={(e)=>handleData('awsAccountId',e.target.value)}
              >  
              </Input>
            </FormControl>
            {DeploymentData.awsAccountId && DeploymentData.awsAccountId.length!=12 && (
              <Alert status="error" height="12px" fontSize="12px" borderRadius="3px" mb={2}>
                <AlertIcon style={{width:"14px" ,height:"14px"}}/>
                Input value must be at least 12 digits
              </Alert>
            )}
            <FormControl>
              <FormLabel>AWS Region</FormLabel>
              <Input mb={4} variant="outline" id="awsRegion" 
                borderColor={"black"}
                value={DeploymentData.awsRegion}
                onChange={(e)=>handleData('awsRegion',e.target.value)}
              >  
              </Input>
            </FormControl>
        </div>
      )}
            <FormControl>
              <FormLabel>Deployment Type</FormLabel>
              <Select mb={4} variant="outline" id="deploymentType" 
                borderColor={"black"}
                value={DeploymentData.deploymentType}
                onChange={(e)=>handleData('deploymentType',e.target.value)}
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
                value={DeploymentData.kubernetesNamespace}
                onChange={(e)=>handleData('kubernetesNamespace',e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Enable Dynamic Storage</FormLabel>
              <Select mb={4} variant="outline" id="kubernetesUseDynamicStorage" 
                borderColor={"black"}
                value={DeploymentData.kubernetesUseDynamicStorage}
                onChange={(e)=>handleData('kubernetesUseDynamicStorage',e.target.value)}
              >
                <option value="" disabled>Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Storage Class Name</FormLabel>
              <Input
                mb={4}
                variant="outline"
                id="kubernetesStorageClassName"
                placeholder="Kubernetes Storage Class Name"
                borderColor={"black"}
                value={DeploymentData.kubernetesStorageClassName}
                onChange={(e)=>handleData('kubernetesStorageClassName',e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Ingress Type</FormLabel>
              <Select mb={4} variant="outline" id="ingress" 
                borderColor={"black"}
                value={DeploymentData.ingress}
                onChange={(e)=>handleData('ingress',e.target.value)}
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