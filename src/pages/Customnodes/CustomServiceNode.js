import eureka from "../../assets/Eureka.jpg"


// const handleStyle = { left: 25 };

function CustomServiceNode({ data, isConnectable }) {

  const serviceDiscoveryType= data.serviceDiscoveryType

  return (
    <div>
      {/* <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      /> */}
      <div>
      
          <img width='50px' name={serviceDiscoveryType} src={eureka} /> 
          
        
      </div>
      {/* <Handle
        type="source"
        position={Position.Bottom}
        style={handleStyle}
        isConnectable={isConnectable}
      /> */}
    </div>
  );
}

export default CustomServiceNode;