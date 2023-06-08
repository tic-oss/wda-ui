import React, { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useHistory } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { keycloak } = useKeycloak();
  const history = useHistory();

  useEffect(() => {
    const loginIfUnauthorized = async () => {
      const authenticated = await keycloak.init({ onLoad: 'check-sso' });
      if (!authenticated) {
        // Store the current location before redirecting to login
        sessionStorage.setItem('redirectPathname', history.location.pathname);
        keycloak.login();
      }
    };

    // Check if the route requires authentication
    const isAuthenticationRequired = ['/wda', '/wdi', '/designer'].includes(
      history.location.pathname
    );

    if (isAuthenticationRequired) {
      loginIfUnauthorized();
    }
  }, [keycloak, history]);

  return <>{children}</>;
};

export default PrivateRoute;
