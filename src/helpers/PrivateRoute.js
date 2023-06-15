import React, { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useToast, Box, Text, Icon } from "@chakra-ui/react";
import { MdWarning } from "react-icons/md";
import { Route, useHistory, useLocation, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const { keycloak } = useKeycloak();
  const toast = useToast();
  const isLoggedIn = keycloak.authenticated;
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/") {
      toast({
        render: () => (
          <Box
            backgroundColor="orange"
            color="white"
            p={4}
            borderRadius="md"
            boxShadow="md"
            display="flex"
            alignItems="center"
          >
            <Icon as={MdWarning} boxSize={6} mr={2} />
            <Text fontSize="lg">Please log in to access this route.</Text>
          </Box>
        ),
        duration: 3000,
        isClosable: true,
        position: "top-right",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "400px",
      });

      return; // Prevent rendering the private route content
    }
  }, [isLoggedIn, toast, location]);

  if (isLoggedIn || location.pathname === "/") {
    return <Route {...rest}>{children}</Route>;
  }

  return <Redirect to="/" />;
};

export default PrivateRoute;
