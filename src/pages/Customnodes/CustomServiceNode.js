import { Handle, Position } from "reactflow";
import eureka from "../../assets/Eureka.jpg"
import consol from "../../assets/consol.png"

const handleStyle = { left: 25 };

function CustomServiceNode({ data, isConnectable }) {

  const Service_Discovery= data.Service_Discovery

  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        {Service_Discovery === 'Eureka' ?
          <img width='50px' name={Service_Discovery} src={eureka} /> :
          <img width='50px' name={Service_Discovery} src={consol} />
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