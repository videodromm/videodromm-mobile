import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import MainTabs from './pages/MainTabs';
import { connect } from './data/connect';
import { AppContextProvider } from './data/AppContext';
import { loadGlslData } from './data/shaders/shaders.actions';
import { setIsLoggedIn, setHost, loadUserData } from './data/user/user.actions';
import Account from './pages/Account';
import Connect from './pages/Connect';
import Support from './pages/Support';
import Tutorial from './pages/Tutorial';
import HomeOrTutorial from './components/HomeOrTutorial';
import { Glsl } from "./models/Glsl";
import RedirectToConnect from './components/RedirectToConnect';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface StateProps {
  darkMode: boolean;
  glsl: Glsl;
}

interface DispatchProps {
  loadGlslData: typeof loadGlslData;
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setHost: typeof setHost;
}

interface IonicAppProps extends StateProps, DispatchProps { }

const IonicApp: React.FC<IonicAppProps> = ({ darkMode, glsl, setIsLoggedIn, setHost, loadGlslData, loadUserData }) => {

  useEffect(() => {
    loadUserData();
    loadGlslData();
    // eslint-disable-next-line
  }, []);

  return (
    glsl.groups.length === 0 ? (
      <div></div>
    ) : (
        <IonApp className={`${darkMode ? 'dark-theme' : ''}`}>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                {/*
                We use IonRoute here to keep the tabs state intact,
                which makes transitions between tabs and non tab pages smooth
                */}
                <Route path="/tabs" render={() => <MainTabs />} />
                <Route path="/account" component={Account} />
                <Route path="/connect" component={Connect} />
                <Route path="/support" component={Support} />
                <Route path="/tutorial" component={Tutorial} />
                <Route path="/logout" render={() => {
                  return <RedirectToConnect
                    setIsLoggedIn={setIsLoggedIn}
                    setHost={setHost}
                  />;
                }} />
                <Route path="/" component={HomeOrTutorial} exact />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      )
  )
}

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    glsl: state.data.glsl
  }),
  mapDispatchToProps: { loadGlslData, loadUserData, setIsLoggedIn, setHost },
  component: IonicApp
});
