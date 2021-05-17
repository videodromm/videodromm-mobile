import React from 'react';
import Map from '../components/Map';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonPage } from '@ionic/react';
import { Location } from '../models/Location';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import './MapView.scss';
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";

interface OwnProps { }

interface StateProps {
  locations: Location[];
  mapCenter: Location;
}

interface DispatchProps { }

interface MapViewProps extends OwnProps, StateProps, DispatchProps { };


const MapView: React.FC<MapViewProps> = ({ locations, mapCenter }) => {

  const shaders = Shaders.create({
    helloBlue: {
      frag: GLSL`
  precision highp float;
  varying vec2 uv;
  void main() {
    gl_FragColor = vec4(uv.x, uv.y, 0.1, 1.0);
  }`
    }
  });
  const blue = 0.5;
  return (
  <IonPage id="map-view">
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>Map</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="map-page">
      <p>MapView</p>
      <Surface width={100} height={100} >
        <Node
          shader={shaders.helloBlue}

        />
      </Surface>
 {/* onMouseMove={this.handleMouseMove}uniforms={{
            shift: 1.6,
            time: time / 1000,
            speed: [1.0, 1.0],
            resolution: [this.width, this.height]
          }}
      <Node
      shader={shaders.helloBlue}

    />
      <Map locations={locations} mapCenter={mapCenter} /> */}
    </IonContent>
  </IonPage>
)};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    locations: state.data.locations,
    mapCenter: selectors.mapCenter(state)
  }),
  component: MapView
});
