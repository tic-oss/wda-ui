import { Handle, Position } from "reactflow";
import azure from "../../assets/Azure.png";
import aws from "../../assets/aws.png";
const handleStyle = { left: 25 };

function CustomServiceNode({ data, isConnectable }) {
  const cloudProvider = data.cloudProvider;

  return (
    <div>
      {cloudProvider === "Azure" ? (
        <img width="60px" name={cloudProvider} src={azure} />
      ) : (
        <img width="60px" name={cloudProvider} src={aws} />
      )}
    </div>
  );
}

export default CustomServiceNode;
