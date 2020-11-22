import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { calendar, location, informationCircle, people } from 'ionicons/icons';
import GlslPage from './GlslPage';
import UniformList from './UniformList';
import UniformDetail from './UniformDetail';
import ShaderDetail from './ShaderDetail';
import MapView from './MapView';
import About from './About';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/glsl" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/glsl" render={() => <GlslPage />} exact={true} />
        <Route path="/tabs/uniforms" render={() => <UniformList />} exact={true} />
        <Route path="/tabs/uniforms/:id" component={UniformDetail} exact={true} />
        <Route path="/tabs/glsl/:id" component={ShaderDetail} />
        <Route path="/tabs/uniforms/shaders/:id" component={ShaderDetail} />
        <Route path="/tabs/map" render={() => <MapView />} exact={true} />
        <Route path="/tabs/about" render={() => <About />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="glsl" href="/tabs/glsl">
          <IonIcon icon={calendar} />
          <IonLabel>Glsl</IonLabel>
        </IonTabButton>
        <IonTabButton tab="uniforms" href="/tabs/uniforms">
          <IonIcon icon={people} />
          <IonLabel>Uniforms</IonLabel>
        </IonTabButton>
        <IonTabButton tab="map" href="/tabs/map">
          <IonIcon icon={location} />
          <IonLabel>Map</IonLabel>
        </IonTabButton>
        <IonTabButton tab="about" href="/tabs/about">
          <IonIcon icon={informationCircle} />
          <IonLabel>About</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
