import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "wda", //defined realm name as Tic
  clientId: "wda", // defined the rootURL(/3000) and client name in (clients->create)
});

export default keycloak;
