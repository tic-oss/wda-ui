import { Handle, Position } from "reactflow";
import { FaTrash } from 'react-icons/fa';

function CustomService({ id, data, isConnectable, onNodesChange }) {
  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "80px",
          justifyContent: "space-between",
          paddingLeft: "10px",
        }}
      >
        Service
        <div
          style={{
            cursor: "pointer",
            fontSize: "6px",
            fontWeight: "bolder",
            color: "grey",
          }}
          onClick={() => onNodesChange([{ type: 'remove', id: 'id' }])}
        >
          <FaTrash/>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default CustomService;
