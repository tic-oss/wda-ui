import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import DocHome from "./pages/Docs/DocHome";
import Contact from "./pages/Contact";
import Designer from "./pages/Designer";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import PrivateRoute from "./helpers/PrivateRoute";
import SuccessPage from "./pages/SuccessPage";

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
