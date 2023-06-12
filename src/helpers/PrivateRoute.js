import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        await keycloak.init({
          onLoad: "login-required" // Redirect to login if not authenticated
        });
      } catch (error) {
        console.error("Keycloak initialization error:", error);
      }
    };

    initKeycloak();
  }, [keycloak]);

  return <>{children}</>; // Render the children directly
};

export default PrivateRoute;
