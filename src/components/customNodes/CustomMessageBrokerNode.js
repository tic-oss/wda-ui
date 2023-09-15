import kafka from "../../assets/kafka.png";
import pulsar from "../../assets/pulsar.png";
import rabbitmq from "../../assets/rabbitmq.png";

function CustomMessageBrokerNode({ data, isConnectable }) {
  const messageBroker = data.messageBroker;

  return (
    <div>
      <div>
        {messageBroker === "Kafka" ? (
          <img width="50px" name={messageBroker} src={kafka} alt="kafka" />
        ) : messageBroker === "Pulsar" ? (
          <img width="50px" name={messageBroker} src={pulsar} alt="pulsar" />
        ) : (
          <img
            width="50px"
            name={messageBroker}
            src={rabbitmq}
            alt="rabbitmq"
          />
        )}
      </div>
    </div>
  );
}

export default CustomMessageBrokerNode;
