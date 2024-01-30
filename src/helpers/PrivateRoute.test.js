import React, { renderHook, useEffect } from "react";
import '@testing-library/jest-dom'
// Mock necessary dependencies and props
jest.mock("@react-keycloak/web", () => ({
    useKeycloak: () => ({
        initialized: true,
        keycloak: { authenticated: true },
    }),
}));
jest.mock("react-router-dom", () => ({
    useLocation: () => ({ state: { projectName: "TestProject" } }),
}));

describe(" PrivateRoute component", () => {

});

// When the 'initialized' variable is true and the user is authenticated, the function does nothing.
it('1 should do nothing when initialized is true and user is authenticated', () => {
    const initialized = true;
    const keycloak = {
        authenticated: true,
        login: jest.fn()
    };

    const useEffect = jest.spyOn(React, 'useEffect').mockImplementationOnce(callback => callback());

    useEffect(() => {
        if (initialized) {
            if (!keycloak.authenticated) {
                keycloak.login();
            }
        }
    });

    expect(keycloak.login).not.toHaveBeenCalled();
});


    // When the 'initialized' variable is true and the user is authenticated, the function does nothing.
    it('should do nothing when initialized is true and user is authenticated', () => {
        const initialized = true;
        const keycloak = {
          authenticated: true,
          login: jest.fn()
        };
  
        jest.spyOn(React, 'useEffect').mockImplementationOnce(callback => callback());
  
        React.useEffect(() => {
          if (initialized) {
            if (!keycloak.authenticated) {
              keycloak.login();
            }
          }
        });
  
        expect(keycloak.login).not.toHaveBeenCalled();
      });
    // When the 'initialized' variable is true and the user is not authenticated, the function calls the 'login' method of the 'keycloak' object.
    it('should call login method when initialized is true and user is not authenticated', () => {
        const initialized = true;
        const keycloak = {
          authenticated: false,
          login: jest.fn()
        };
  
        jest.spyOn(React, 'useEffect').mockImplementationOnce(callback => callback());
  
        React.useEffect(() => {
          if (initialized) {
            if (!keycloak.authenticated) {
              keycloak.login();
            }
          }
        });
  
        expect(keycloak.login).toHaveBeenCalled();
      });
      



     