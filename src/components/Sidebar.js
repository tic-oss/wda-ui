import React, { useState } from 'react';
import db1 from "../assets/pstgrc.jpeg"
import db2 from "../assets/mongo.png"
import eurkea from "../assets/Eureka.png"
import "./../App.css"

export default () => {
  const onDragStart = (event, nodeType, Name) => {
    event.dataTransfer.setData('Name', Name);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const [isDatabaseCollapsed, setDatabaseCollapsed] = useState(false);
  const [isServiceCollapsed, setServiceCollapsed] = useState(false);

  const toggleDatabase = () => {
    setDatabaseCollapsed(!isDatabaseCollapsed);
  };

  const toggleService = () => {
    setServiceCollapsed(!isServiceCollapsed);
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event,'default', 'Service')} draggable>
        Service
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'default', 'Deployment')} draggable>
        Deployment
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'default', 'Authentication')} draggable>
        Authentication
      </div>
      <h1>
        <span style={{ cursor: "pointer" }} onClick={toggleDatabase}>
          Databases {isDatabaseCollapsed ? <span>&#x25BC;</span> : <span>&#x25B2;</span>}
        </span>
      </h1>
      {!isDatabaseCollapsed && (
        <>
          <div className="selectorNode" onDragStart={(event) => onDragStart(event, 'default', 'Img_postgres')} draggable>
            <img width='130px' src={db1} alt="pstgrclogo"></img>
          </div>

          <div className="selectorNode" onDragStart={(event) => onDragStart(event, 'default', 'Img_mongo')} draggable>
            <img width='130px' src={db2} alt="mongologo"></img>
          </div>
      
        </>
      )}

      <h1>
        <span style={{ cursor: "pointer" }} onClick={toggleService}>
          Service Discovry {isServiceCollapsed ? <span>&#x25BC;</span> : <span>&#x25B2;</span>}
        </span>
      </h1>
      {!isServiceCollapsed && (
        <>
          <div className="selectorNode1" onDragStart={(event) => onDragStart(event, 'default', 'Eureka')} draggable>
            <img width='130px' src={eurkea} alt="eurekalogo"></img>
          </div>
        </>
      )}

    </aside>
  );
};
