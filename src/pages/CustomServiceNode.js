import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import eureka from "./../assets/Eureka.png"

const handleStyle = { left: 25 };

function CustomServiceNode({isConnectable }) {
  //console.log(data)


  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
      <img width='50px' src={eureka}/>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={handleStyle}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default CustomServiceNode;
