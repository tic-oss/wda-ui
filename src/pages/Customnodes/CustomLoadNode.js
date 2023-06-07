import eck from "../../assets/eck.png"

function CustomLoadNode({ data}) {

  const logManagementType= data.logManagementType

  return (
    <div>
        <img width='60px' name={logManagementType} src={eck} /> 
    </div>
  );
}

export default CustomLoadNode;