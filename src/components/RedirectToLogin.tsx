import React, { useEffect, useContext } from 'react';
import { IonRouterContext } from '@ionic/react';

interface RedirectToLoginProps {
  setIsLoggedIn: Function;
  setHost: Function;
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setIsLoggedIn, setHost }) => {
  const ionRouterContext = useContext(IonRouterContext);
  useEffect(() => {
    setIsLoggedIn(false);
    setHost(undefined);
    ionRouterContext.push('/tabs/schedule')
  }, [setIsLoggedIn, setHost, ionRouterContext]);
  return null;
};

export default RedirectToLogin;
