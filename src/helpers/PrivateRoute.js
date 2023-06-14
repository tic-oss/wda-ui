import { useKeycloak } from "@react-keycloak/web";
import { useHistory } from "react-router-dom";
import { useToast, Box, Button } from "@chakra-ui/react";

const PrivateRoute = ({ children }) => {
  const { keycloak } = useKeycloak();
  const history = useHistory();
  const toast = useToast();
const isLoggedIn = keycloak.authenticated;
  const positions = [
    'top'
  ]
  if (!isLoggedIn) {
    toast({
      title: "Please login to continue.",
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: positions,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "400px",  
    });
history.replace("/");
    return null;
  }

  return children;
};

export default PrivateRoute;