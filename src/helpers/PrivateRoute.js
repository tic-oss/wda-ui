import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useToast, Box, Text, Icon, Spinner, Flex } from "@chakra-ui/react";
import { MdWarning } from "react-icons/md";
import { Route, useLocation, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const { keycloak } = useKeycloak();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const isLoggedIn = keycloak.authenticated;
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (!isLoggedIn && location.pathname !== "/") {
          await keycloak.updateToken(5);

          if (keycloak.authenticated) {
            setIsLoading(false);
          } else {
            setError(true);
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
        setError(true);
      }
    };
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    setTimeoutId(timeout);

    checkAuthentication();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoggedIn, location, keycloak]);

  if (isLoading) {
    return <Flex
    position="fixed"
    top="0"
    left="0"
    right="0"
    bottom="0"
    alignItems="center"
    justifyContent="center"
    backgroundColor="rgba(240, 248, 255, 0.5)"
    zIndex="9999"
    display="flex"
    flexDirection="column"
  >
    <Spinner
      thickness="8px"
      speed="0.9s"
      emptyColor="gray.200"
      color="#3182CE"
      height="250px"
      width="250px"
    />
    <div
      style={{
        marginTop: "40px",
        color: "#3182CE",
        fontWeight: "bolder",
        fontSize: "20px",
      }}
    >
      Loading...
    </div>
  </Flex>;
  }

  if (isLoggedIn || location.pathname === "/") {
    return <Route {...rest}>{children}</Route>;
  }

  if (error) {
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
          <Text fontSize="lg">Login Required.</Text>
        </Box>
      ),
      duration: 19000,
      isClosable: true,
      position: "top-right",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
    });
    return <Redirect to="/" />;
  }

  return <Redirect to="/" />;
};

export default PrivateRoute;
