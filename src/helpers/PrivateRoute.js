import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;
  const history = useHistory();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     keycloak.login();
  //   }
  // }, [isLoggedIn, keycloak]);

  if (isLoggedIn) {
    return children;
  } else {
    return keycloak.login();
  }
};

export default PrivateRoute;
