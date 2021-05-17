import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonDatetime, IonSelectOption, IonList, IonItem, IonLabel, IonSelect, IonPopover } from '@ionic/react';
import './About.scss';
import ShadertoyReact from 'shadertoy-react';


interface AboutProps { }

const About: React.FC<AboutProps> = () => {
  const fragmentShader = `
  void main(void) {
     vec2 uv = gl_FragCoord.xy/iResolution.xy;
     vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
     gl_FragColor = vec4(col ,1.0);
  }
`;

  return (
    <IonPage id="about-page">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton>jjj</IonMenuButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton >
                <IonIcon slot="icon-only" ></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>



         <ShadertoyReact fs={fragmentShader}/>

      </IonContent>


    </IonPage>
  );
};

export default React.memo(About);
