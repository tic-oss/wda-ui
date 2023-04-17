import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  // FormErrorMessage,
  // FormHelperText,
  Input,
  Select,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { deploymentPreFlightTemplate } from "./assert";

function Deployment({ id, application, deployment, setDeployment }) {
  const [inputs, setInputs] = useState(
    JSON.parse(localStorage.getItem("deployment")) || { deploymentPreFlightTemplate }
  );

  useEffect(() => {
    localStorage.getItem("deployment", JSON.stringify(inputs));
  }, [inputs]);

  const handleInputChange = (field, value) => {
    setInputs(() => ({
      ...inputs,
      [field]: value,
    }));
    setDeployment((app) => ({
      ...app,
      [field]: value,
    }));
    localStorage.setItem(
      "deployment",
      JSON.stringify({
        ...inputs,
        [field]: value,
      })
    );
  };

  return (
    <FormControl>
      <FormLabel>Deployment Type</FormLabel>
      <Select
        key="deploymentType"
        name="deploymentType"
        onChange={({ target }) =>
          handleInputChange("deploymentType", target.value)
        }
        marginBottom="10px"
        value={inputs.deploymentType}
      >
        <option value="kubernetes">Kubernetes</option>
        <option value="compose">Docker-Compose</option>
        <option value="openshift">Openshift</option>
      </Select>
      <FormLabel>Application Folders</FormLabel>
      {Object.keys(application).map((name, id) => {
        return (
          <Editable
            key={id}
            defaultValue={JSON.stringify(application[id].applicationName)}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        );
      })}
      <FormLabel>Docker Repository Name</FormLabel>
      <Input
        placeholder=""
        type="text"
        key="dockerRepositoryName"
        name="dockerRepositoryName"
        onChange={({ target }) =>
          handleInputChange("dockerRepositoryName", target.value)
        }
        marginBottom="10px"
        value={inputs.dockerRepositoryName}
      />
      <FormLabel>Kubernetes Namespace</FormLabel>
      <Input
        placeholder="Wdi"
        type="text"
        key="kubernetesNamespace"
        name="kubernetesNamespace"
        onChange={({ target }) =>
          handleInputChange("kubernetesNamespace", target.value)
        }
        marginBottom="10px"
        value={inputs.kubernetesNamespace}
      />
      {/* <FormLabel>Kubernetes Service Type</FormLabel>
      <Select
        key="kubernetesServiceType"
        name="kubernetesServiceType"
        onChange={({ target }) =>
          handleInputChange("kubernetesServiceType", target.value)
        }
        marginBottom="10px"
        value={inputs.kubernetesServiceType}
      >
        <option value="loadBalancer">LoadBalancer</option>
        <option value="nodePort">NodePort</option>
        <option value="ingress">Ingress</option>
      </Select> */}
      <FormLabel>Enable Kubernetes Dynamic Storage</FormLabel>
      <Select
        key="kubernetesUseDynamicStorage"
        name="kubernetesUseDynamicStorage"
        onChange={({ target }) =>
          handleInputChange("kubernetesUseDynamicStorage", target.value)
        }
        marginBottom="10px"
        value={inputs.kubernetesUseDynamicStorage}
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </Select>

      {inputs.kubernetesUseDynamicStorage === "true" &&(
      <><FormLabel>Enter Kubernetes Storage Class Name</FormLabel><Input
          placeholder="demoStorageClass"
          type="text"
          key="kubernetesStorageClassName"
          name="kubernetesStorageClassName"
          onChange={({ target }) => handleInputChange("kubernetesStorageClassName", target.value)}
          marginBottom="10px"
          value={inputs.kubernetesStorageClassName} /></>
      )}
      {/* <FormLabel>Kubernetes Storage Provisioner</FormLabel>
      <Input
        placeholder="demoStorageClass"
        type="text"
        key="kubernetesStorageClassName"
        name="kubernetesStorageClassName"
        onChange={({ target }) =>
          handleInputChange("kubernetesStorageClassName", target.value)
        }
        marginBottom="10px"
        value={inputs.kubernetesStorageClassName}
      /> */}
      <FormLabel>Ingress Domain</FormLabel>
      <Input
        placeholder=""
        type="text"
        key="ingressDomain"
        name="ingressDomain"
        onChange={({ target }) =>
          handleInputChange("ingressDomain", target.value)
        }
        marginBottom="10px"
        value={inputs.ingressDomain}
      />
      <FormLabel>Ingress Type</FormLabel>
      <Select
        key="ingressType"
        name="ingressType"
        onChange={({ target }) =>
          handleInputChange("ingressType", target.value)
        }
        marginBottom="10px"
        value={inputs.ingressType}
      >
        <option value="istio">ISTIO</option>
        <option value="nginx">Nginx</option>

      </Select>
      <FormLabel>Service Discovery Type</FormLabel>
      <Select
        key="serviceDiscoveryType"
        name="serviceDiscoveryType"
        onChange={({ target }) =>
          handleInputChange("serviceDiscoveryType", target.value)
        }
        marginBottom="10px"
        value={inputs.serviceDiscoveryType}
      >
        <option value="eureka">Eureka</option>
        <option value="consul">Consul</option>
        <option value="no">No</option>
      </Select>
      {/* <FormLabel>Monitoring</FormLabel>
      <Select
        key="monitoring"
        name="monitoring"
        onChange={({ target }) => handleInputChange("monitoring", target.value)}
        marginBottom="10px"
        value={inputs.monitoring}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </Select> */}
    </FormControl>
  );
}

export default Deployment;