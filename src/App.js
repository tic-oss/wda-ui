import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Pages/home/Home";
import Navbar from "./components/Pages/navbar/Navbar";
import DocHome from "./components/Pages/docs/DocHome";
import Contact from "./components/Pages/contact/Contact";
import Designer from "./components/Pages/designer/Designer";
import Projects from "./components/Pages/projects/Projects";
import Project from "./components/Pages/project/Project";
import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import PrivateRoute from "./helpers/PrivateRoute";
import SuccessPage from "./components/Pages/successPage/SuccessPage";

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
