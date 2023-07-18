import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/TIC_logo.png";
import { useKeycloak } from "@react-keycloak/web";

export default function Header({ children }) {
  const color = "#ffffff";
  const bg = "#3182CE";
  const { keycloak, initialized } = useKeycloak();
  const [action, setAction] = useState(null);
  const handleAction = (action) => {
    if (action === "docs") {
      window.open(process.env.REACT_APP_DOCS_URL);
    }
    setAction(action);
  };

  return (
    <Box bg={bg} py={4} px={6} shadow="md">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        maxW="7xl"
        mx="auto"
      >
        <Flex alignItems="center">
          <Link to="/" onClick={() => handleAction()}>
            <Image
              src={logo}
              alt="App Logo"
              style={{
                width: "18px",
                height: "15px",
                marginRight: "30px",
                transform: "scale(3.5)",
              }}
            />
          </Link>
          <Link to="/" onClick={() => handleAction()}>
            <Text fontSize="xl" fontWeight="bold" color={color}>
              TIC@coMakeIT
            </Text>
          </Link>
        </Flex>
        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          <Link to="/canvasToCode" onClick={() => handleAction("canvasToCode")}>
            <Text
              fontSize="md"
              color={color}
              fontWeight={action === "canvasToCode" ? "bold" : ""}
            >
              CanvasToCode
            </Text>
          </Link>
          <Link
            // to="/docs"
            onClick={() => handleAction("docs")}
          >
            <Text
              fontSize="md"
              color={color}
              // fontWeight={action === "docs" ? "bold" : ""}
            >
              Docs
            </Text>
          </Link>
          {initialized && keycloak.authenticated && (
            <Link to="/projects" onClick={() => handleAction("projects")}>
              <Text
                fontSize="md"
                color={color}
                fontWeight={action === "projects" ? "bold" : ""}
              >
                Projects
              </Text>
            </Link>
          )}
          {/* <Link to="/about" onClick={() => handleAction("about")}>
            <Text
              fontSize="md"
              color={color}
              fontWeight={action === "about" ? "bold" : ""}
            >
              About
            </Text>
          </Link> */}
          <Link to="/contact" onClick={() => handleAction("contact")}>
            <Text
              fontSize="md"
              color={color}
              fontWeight={action === "contact" ? "bold" : ""}
            >
              Contact
            </Text>
          </Link>
          {!keycloak.authenticated && (
            <Text
              fontSize="md"
              color={color}
              onClick={() =>
                keycloak.login({
                  redirectUri: process.env.REACT_APP_UI_BASE_URL + "projects",
                })
              }
              cursor="pointer"
            >
              Login
            </Text>
          )}

          {keycloak.authenticated && (
            <Text
              fontSize="md"
              color={color}
              cursor="pointer"
              onClick={() =>
                keycloak.logout({
                  redirectUri: process.env.REACT_APP_UI_BASE_URL,
                })
              }
            >
              Logout ({keycloak.tokenParsed.preferred_username})
            </Text>
          )}
        </HStack>
        <Box display={{ base: "block", md: "none" }}>
          <Button variant="ghost" colorScheme="blue" size="sm">
            Menu
          </Button>
        </Box>
      </Flex>
      {children}
    </Box>
  );
}
