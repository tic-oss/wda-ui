import { Handle, Position } from "reactflow";
import keycloak from "../../assets/keycloak.png"



const handleStyle = { left: 25 };

function CustomAuthNode({ data, isConnectable }) {

  const Auth_Type= data.Auth_Type

  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
       
          <img width='70px' name={Auth_Type} src={keycloak} /> 
         
        
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

export default CustomAuthNode;
