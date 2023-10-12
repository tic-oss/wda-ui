import eureka from "../../assets/eureka.png";
import { NodeResizer } from "reactflow";

function CustomServiceNode({ data, isConnectable, selected }) {
  const serviceDiscoveryType = data.serviceDiscoveryType;

  return (
    <>
      <NodeResizer
        nodeId={data.id}
        isVisible={selected}
        minWidth={60}
        minHeight={60}
      />
      <div>
        <img
          width="50px"
          name={serviceDiscoveryType}
          src={eureka}
          alt="eureka"
          data-testid="eureka"
        />
      </div>
    </>
  );
}

export default CustomServiceNode;
