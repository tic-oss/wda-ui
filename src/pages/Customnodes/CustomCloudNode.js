import { Handle, Position } from "reactflow";
import azure from "../../assets/Azure.png"
import aws from "../../assets/aws.png"
const handleStyle = { left: 25 };

function CustomServiceNode({ data, isConnectable }) {

  const Cloud_Provider= data.Cloud_Provider

  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        {Cloud_Provider === 'Azure' ?
          <img width='50px' name={Cloud_Provider} src={azure} /> :
          <img width='50px' name={Cloud_Provider} src={aws} />
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