import React from 'react';

export default () => {
  const onDragStart = (event, nodeType,Name) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('Name',Name);;
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
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'default','Database')} draggable>
        Database
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'default','Authentication')} draggable>
        Authentication
      </div>
    </aside>
  );
};
