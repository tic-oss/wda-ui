import React from 'react';
import db1 from "../assets/pstgrc.jpeg"
import db2 from "../assets/sql.png"
import "./../App.css"

export default () => {
  const onDragStart = (event, nodeType,Name,data, isConnectable) => {
    event.dataTransfer.setData('Name',Name);;
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'default','Application')} draggable>
        Application
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'default','Deployment')} draggable>
        Deployment
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'default','Authentication')} draggable>
        Authentication
      </div>
      <div >
        Database
      </div>
      <div>
       Choose your DB:
      </div>
      <div className="selectorNode" onDragStart={(event) => onDragStart(event, 'default',{db1})} draggable> 
        <img src={db1} alt="pstgrclogo"></img>
      </div>
        
      <div className="selectorNode" onDragStart={(event) => onDragStart(event, 'default','')} draggable>  
        <img src={db2} alt="pstgrclogo"></img>
      </div>
    </aside>
  );
};
