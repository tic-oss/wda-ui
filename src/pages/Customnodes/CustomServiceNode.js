import { Handle, Position } from "reactflow";
import eureka from "../../assets/Eureka.jpg"
import consol from "../../assets/consol.png"

const handleStyle = { left: 25 };

function CustomServiceNode({ data, isConnectable }) {

  const serviceDiscoveryType= data.serviceDiscoveryType

  return (
    <div>
     
      <div>       
          <img width='50px' name={serviceDiscoveryType} src={eureka} /> 
      </div>
     
    </div>
  );
}

export default CustomServiceNode;