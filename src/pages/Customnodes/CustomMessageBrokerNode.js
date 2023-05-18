import { Handle, Position } from "reactflow";
import kafka from "../../assets/kafka.png"
import pulsar from "../../assets/pulsar.png"
import rabbitmq from "../../assets/rabbitmq.png"


const handleStyle = { left: 25 };

function CustomMessageBrokerNode({ data, isConnectable }) {

  const Message_Broker = data.Message_Broker
  console.log(Message_Broker)

  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
      {Message_Broker === 'Kafka' ? (
            <img width='50px' name={Message_Broker} src={kafka} />) : 
            Message_Broker === 'Pulsar' ? (<img width='50px' name={Message_Broker} src={pulsar} />) : 
            (<img width='50px' name={Message_Broker} src={rabbitmq} />)}    
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

export default CustomMessageBrokerNode;
