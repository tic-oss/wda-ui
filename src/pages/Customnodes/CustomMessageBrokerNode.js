import { Handle, Position } from "reactflow";
import kafka from "../../assets/kafka.png"
import pulsar from "../../assets/pulsar.png"
import rabbitmq from "../../assets/rabbitmq.png"


const handleStyle = { left: 25 };

function CustomMessageBrokerNode({ data, isConnectable }) {

  const messageBroker = data.messageBroker


  return (
    <div>
      {messageBroker === 'Kafka' ? (
            <img width='60px' name={messageBroker} src={kafka} />) : 
            messageBroker === 'Pulsar' ? (<img width='60px' name={messageBroker} src={pulsar} />) : 
            (<img width='60px' name={messageBroker} src={rabbitmq} />)}    
    </div>
  );
}

export default CustomMessageBrokerNode;
