import React, { useEffect, useContext } from 'react';
import { IonRouterContext } from '@ionic/react';

interface RedirectToConnectProps {
  setIsLoggedIn: Function;
  setHost: Function;
}

const RedirectToConnect: React.FC<RedirectToConnectProps> = ({ setIsLoggedIn, setHost }) => {
  const ionRouterContext = useContext(IonRouterContext);
  useEffect(() => {
    setIsLoggedIn(false);
    setHost(undefined);
    ionRouterContext.push('/tabs/schedule')
  }, [setIsLoggedIn, setHost, ionRouterContext]);
  return null;
};

export default RedirectToConnect;
