import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/pages/Navbar";
import DocHome from "./components/pages/DocHome";
import Contact from "./components/pages/Contact";
import Designer from "./components/pages/Designer";
import Projects from "./components/pages/Projects";
import Project from "./components/pages/Project";
import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import PrivateRoute from "./helpers/PrivateRoute";
import SuccessPage from "./components/pages/SuccessPage";

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <Router className="flex h-screen">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/success">
            <SuccessPage />
          </Route>
          <Route exact path="/canvasToCode">
            <Designer update={false} />
          </Route>
          <Route exact path="/edit/:id">
            <PrivateRoute>
              <Designer update={true} />
            </PrivateRoute>
          </Route>
          <Route exact path="/projects">
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          </Route>
          <Route exact path="/projects/:id">
            <Project />
          </Route>
          <Route exact path="/docs">
            <DocHome />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
        </Switch>
      </Router>
    </ReactKeycloakProvider>
  );
}

export default App;
