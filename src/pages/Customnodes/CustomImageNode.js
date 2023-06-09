import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import postgres from "../../assets/pstgrc.jpeg"
import sql from "../../assets/mongo.png"

const handleStyle = { left: 25 };

function CustomImageNode({ data, isConnectable }) {
  console.log(data)


  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
      <img width='60px' src={data.prodDatabaseType=='postgresql'?postgres:sql}/>
      </div>
    </div>
  );
}

export default CustomImageNode;
