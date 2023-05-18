import React, { useState } from 'react';
import db1 from "../assets/pstgrc.jpeg"
import db2 from "../assets/mongo.png"
import eurkea from "../assets/Eureka.jpg"
import keycloak from "../assets/keycloak.png"
import istio from "../assets/istio.png"
import kafka from "../assets/kafka.png"
import pulsar from "../assets/pulsar.png"
import rabbitmq from "../assets/rabbitmq.png"
import "./../App.css"

export default () => {
  const onDragStart = (event, nodeType, Name) => {
    event.dataTransfer.setData('Name', Name);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const [isDatabaseCollapsed, setDatabaseCollapsed] = useState(true);
  const [isServiceCollapsed, setServiceCollapsed] = useState(true);
  const [isIngressCollapsed, setIngressCollapsed] = useState(true);
  const [isAuthCollapsed, setAuthCollapsed] = useState(true);
  const [isMessageBrokerCollapsed, setMessageBrokerCollapsed] = useState(true);

  const toggleDatabase = () => {
    setDatabaseCollapsed(!isDatabaseCollapsed);
  };

  const toggleService = () => {
    setServiceCollapsed(!isServiceCollapsed);
  };

  const toggleIngress = () => {
    setIngressCollapsed(!isIngressCollapsed);
  };
  const toggleAuth = () => {
    setAuthCollapsed(!isAuthCollapsed);
  };

  const toggleMessageBroker = () => {
    setMessageBrokerCollapsed(!isMessageBrokerCollapsed);
  };

  return (
    <aside>
      <div className="description">
        <h2 style={{ cursor: "pointer",fontSize:'20px' }}>You can drag these nodes to the pane on the right.</h2></div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event,'default', 'Service')} draggable>
        Service
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'default', 'Deployment')} draggable>
        Deployment
      </div>
      <h1 style={{ cursor: "pointer",fontSize:'20px' }} onClick={toggleAuth}>
          Authentication {isAuthCollapsed ? <span>&#x25BC;</span> : <span>&#x25B2;</span>}
      </h1>
      {!isAuthCollapsed && (
        <>
          <div className="selectorNode3" onDragStart={(event) => onDragStart(event, 'default', 'Auth_keycloak')} draggable>
            <img width='145px' src={keycloak} alt="keycloaklogo"></img>
          </div>      
        </>
      )}
      <h1 style={{ cursor: "pointer",fontSize:'20px' }} onClick={toggleDatabase}>
          Databases {isDatabaseCollapsed ? <span>&#x25BC;</span> : <span>&#x25B2;</span>}
      </h1>
      {!isDatabaseCollapsed && (
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
        <span style={{ cursor: "pointer",fontSize:'20px' }} onClick={toggleService}>
          Service Discovery {isServiceCollapsed ? <span>&#x25BC;</span> : <span>&#x25B2;</span>}
        </span>
      </h1>
      {!isServiceCollapsed && (
        <>
          <div className="selectorNode1" onDragStart={(event) => onDragStart(event, 'default', 'Discovery_Eureka')} draggable>
            <img width='120px' src={eurkea} alt="eurekalogo"></img>
          </div>
          {/* <div className="selectorNode1" onDragStart={(event) => onDragStart(event, 'default', 'Discovery_Consol')} draggable>
            <img width='120px' src={consol} alt="consollogo"></img>
          </div> */}
        </>
      )}
      <h1>
        <span style={{ cursor: "pointer",fontSize:'20px' }} onClick={toggleIngress}>
         Ingress Type {isIngressCollapsed ? <span>&#x25BC;</span> : <span>&#x25B2;</span>}
        </span>
      </h1>
      {!isIngressCollapsed && (
        <>
          <div className="selectorNode2" onDragStart={(event) => onDragStart(event, 'default', 'Ingress_Istio')} draggable>
            <img width='120px' src={istio} alt="istiologo"></img>
          </div>
         
        </>
      )}

      
      <h1>
        <span style={{ cursor: "pointer",fontSize:'20px' }} onClick={toggleMessageBroker}>
         Message Broker{isMessageBrokerCollapsed ? <span>&#x25BC;</span> : <span>&#x25B2;</span>}
        </span>
      </h1>
      {!isMessageBrokerCollapsed && (
        <>
          <div className="selectorNode4" onDragStart={(event) => onDragStart(event, 'default', 'MessageBroker_RabbitMQ')} draggable>
            <img width='120px' src={rabbitmq} alt="rabbitmqlogo"></img>
          </div>

          <div className="selectorNode4" onDragStart={(event) => onDragStart(event, 'default', 'MessageBroker_Kafka')} draggable>
            <img width='120px' src={kafka} alt="kafkalogo"></img>
          </div>

          <div className="selectorNode4" onDragStart={(event) => onDragStart(event, 'default', 'MessageBroker_Pulsar')} draggable>
            <img width='120px' src={pulsar} alt="pulsarlogo"></img>
          </div>
         
        </>
      )}

    </aside>
  );
};
