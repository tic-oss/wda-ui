import { Handle, Position } from "reactflow";
import azure from "../../assets/Azure.png"
import aws from "../../assets/aws.png"
const handleStyle = { left: 25 };

function CustomServiceNode({ data, isConnectable }) {

  const cloudProvider= data.cloudProvider

  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        {cloudProvider === 'Azure' ?
          <img width='50px' name={cloudProvider} src={azure} /> :
          <img width='50px' name={cloudProvider} src={aws} />
        }
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