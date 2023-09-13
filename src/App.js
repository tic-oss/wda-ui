import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import DocHome from "./components/Docs/DocHome";
import Contact from "./components/Contact";
import Designer from "./components/Designer";
import Projects from "./components/Projects";
import Project from "./components/Project";
import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import PrivateRoute from "./helpers/PrivateRoute";
import SuccessPage from "./components/SuccessPage";

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
            <SuccessPage/>
          </Route>
          <Route exact path="/canvasToCode">
            {/* <PrivateRoute> */}
            <Designer update={false}/>
            {/* </PrivateRoute> */}
          </Route>
          <Route exact path="/edit/:id">
            <PrivateRoute>
             <Designer update={true}/>
            </PrivateRoute>
          </Route>
          <Route exact path="/projects">
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          </Route>
          <Route exact path="/projects/:id">
            {/* <PrivateRoute> */}
              <Project />
            {/* </PrivateRoute> */}
          </Route>
          <Route exact path="/docs">
            <DocHome />
          </Route>
          {/* <Route exact path="/about">
          <About />
        </Route> */}
          <Route exact path="/contact">
            <Contact />
          </Route>
        </Switch>
      </Router>
    </ReactKeycloakProvider>
  );
}

export default App;
