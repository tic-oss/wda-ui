import React, { useState } from 'react';
import db1 from "../assets/pstgrc.jpeg"
import db2 from "../assets/mongo.png"
import eurkea from "../assets/eureka.jpg"
import keycloak from "../assets/keycloak.png"
import istio from "../assets/istio.png"
import kafka from "../assets/kafka.png"
import pulsar from "../assets/pulsar.png"
import rabbitmq from "../assets/rabbitmq.png"
import azure from "../assets/Azure.png"
import aws from "../assets/aws.png"
import eck from "../assets/eck.png"
import "./../App.css"
import {
  Input,
  FormLabel,
  Button
} from "@chakra-ui/react";

export default ({ isUINodeEnabled, setIsUINodeEnabled, onSubmit }) => {
  const onDragStart = (event, nodeType, Name) => {
    if(Name === 'UI'){
      setIsUINodeEnabled(true)
    }
    event.dataTransfer.setData('Name', Name);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const toggleOption = (option) => {
    setSelectedOption((prevOption) => (prevOption === option ? null : option));
  };
   const IntialState ={
        'projectName':'',
    }
    
  const [projectData,setprojectData] = useState(IntialState)

  const handleData = (column,value)=>{
    setprojectData((prev)=>({...prev,[column]:value}))
  }

  return (
    <aside>
      <FormLabel fontWeight="bold">Project Name</FormLabel>
              <Input mb={4} variant="outline" id="projectName" 
                borderColor={"black"}
                value={projectData.projectName}
                onChange={(e)=>handleData('projectName',e.target.value)}
              >  
              </Input>
      
      <div className="description">
        <h2 style={{ cursor: "pointer", fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>You can drag these nodes to the pane on the right.</h2></div>
      
      <div 
        className={`dndnode output ${isUINodeEnabled ? 'disabled' : ''}`}
        onDragStart={(event) => onDragStart(event, 'default', 'UI')}
        draggable={!isUINodeEnabled}
        style={{backgroundColor: isUINodeEnabled ? '#CFCFCF': '',cursor: isUINodeEnabled ? 'not-allowed' : ''}}
      >
        UI+Gateway
      </div>

      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'default', 'Service')} draggable>
        Service
      </div>
      <h1 style={{ cursor: "pointer", fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => toggleOption('Authentication')}>
        Authentication {selectedOption === 'Authentication' ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
      </h1>
      {selectedOption === 'Authentication' && (
        <>
          <div className="selectorNode3" onDragStart={(event) => onDragStart(event, 'default', 'Auth_keycloak')} draggable>
            <img width='145px' src={keycloak} alt="keycloaklogo"></img>
          </div>
        </>
      )}
      <h1 style={{ cursor: "pointer", fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => toggleOption('Databases')}>
        Databases {selectedOption === 'Databases' ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
      </h1>
      {selectedOption === 'Databases' && (
        <>
          <div className="selectorNode" onDragStart={(event) => onDragStart(event, 'default', 'Database_postgres')} draggable>
            <img width='120px' src={db1} alt="postgreslogo"></img>
          </div>

          <div className="selectorNode" onDragStart={(event) => onDragStart(event, 'default', 'Database_mongo')} draggable>
            <img width='120px' src={db2} alt="mongologo"></img>
          </div>

        </>
      )}

      <h1>
        <span style={{ cursor: "pointer", fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }} onClick={() => toggleOption('serviceDiscovery')}>
          Service Discovery {selectedOption === 'serviceDiscovery' ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
        </span>
      </h1>
      {selectedOption === 'serviceDiscovery' && (
        <>
          <div className="selectorNode1" onDragStart={(event) => onDragStart(event, 'default', 'Discovery_Eureka')} draggable>
            <img width='120px' src={eurkea} alt="eurekalogo"></img>
          </div>
        </>
      )}
      <h1>
        <span style={{ cursor: "pointer", fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => toggleOption('messageBroker')}>
          Message Broker {selectedOption === 'messageBroker' ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
        </span>
      </h1>
      {selectedOption === 'messageBroker' && (
        <>
          <div className="selectorNode4" onDragStart={(event) => onDragStart(event, 'default', 'MessageBroker_RabbitMQ')} draggable>
            <img width='120px' src={rabbitmq} alt="rabbitmqlogo" />
          </div>

          <div className="selectorNode4" onDragStart={(event) => onDragStart(event, 'default', 'MessageBroker_Kafka')} draggable>
            <img width='120px' src={kafka} alt="kafkalogo" />
          </div>

          <div className="selectorNode4" onDragStart={(event) => onDragStart(event, 'default', 'MessageBroker_Pulsar')} draggable>
            <img width='120px' src={pulsar} alt="pulsarlogo" />
          </div>
        </>
      )}

      <h1>
        <span style={{ cursor: "pointer", fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => toggleOption('cloudProvider')}>
          Cloud Provider {selectedOption === 'cloudProvider' ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
        </span>
      </h1>
      {selectedOption === 'cloudProvider' && (
        <>
          <div className="selectorNode5" onDragStart={(event) => onDragStart(event, 'default', 'Cloud_Azure')} draggable>
            <img width='120px' src={azure} alt="azurelogo" />
          </div>

          <div className="selectorNode5" onDragStart={(event) => onDragStart(event, 'default', 'Cloud_AWS')} draggable>
            <img width='120px' src={aws} alt="awslogo" />
          </div>
        </>
      )}
       <h1>
        <span style={{ cursor: "pointer", fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => toggleOption('loadManagement')}>
          Log Management {selectedOption === 'loadManagement' ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
        </span>
      </h1>
      {selectedOption === 'loadManagement' && (
        <>
          <div className="selectorNode6" onDragStart={(event) => onDragStart(event, 'default', 'Load_eck')} draggable>
            <img width='120px' src={eck} alt="ecklogo" />
          </div>
        </>
      )}
      <div>
       <Button  onClick={() => onSubmit(projectData)} type="submit"style={{ display: 'block', margin: '0 auto' }}>
           Submit
          </Button>
      </div>

    </aside>
  );
};
