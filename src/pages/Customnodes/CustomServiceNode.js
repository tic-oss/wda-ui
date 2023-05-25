import eureka from "../../assets/Eureka.jpg"


// const handleStyle = { left: 25 };

function CustomServiceNode({ data, isConnectable }) {

  const serviceDiscoveryType= data.serviceDiscoveryType

  return (
    
      <div>
          <img width='60px' name={serviceDiscoveryType} src={eureka} /> 
      </div>
  );
}

export default CustomServiceNode;