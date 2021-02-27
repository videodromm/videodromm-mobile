import React from 'react';
import { Shader } from '../models/Glsl';
import { Uniform } from '../models/Uniform';
import { IonCard, IonCardHeader, IonItem, IonLabel, IonCardContent } from '@ionic/react';
import {
  Dial,
  RadioButton,
  Slider
} from 'react-nexusui';


interface UniformItemProps {
  uniform: Uniform;
  shaders: Shader[];
}

const UniformItem: React.FC<UniformItemProps> = ({ uniform, shaders }) => {
  let dialRefs = React.useRef([] as any[]);
  const emitToSocket = (value: number, index: number) => {
    if (window.socket && window.socket.readyState === 1) {
      window.socket.send('{"params" :[{"name" : ' + index + ',"value" :' + value + '}]}');
      console.log(`UniformItem emitToSocket readyState val: ${value}, idx: ${index} `);
    } else {
      console.log(`UniformItem emitToSocket not ready val: ${value}, idx: ${index} `);
    }
  };
  const setAnim = (value: number, index: number) => {
    if (window.socket && window.socket.readyState === 1) {
      window.socket.send('{"anim" :[{"name" : ' + index + ',"value" :' + value + '}]}');
      console.log(`UniformItem setAnim readyState val: ${value}, idx: ${index} `);
    } else {
      console.log(`UniformItem setAnim not ready val: ${value}, idx: ${index} `);
    }
  };
  return (
    <>
      <IonCard className="uniform-card">
        <IonCardHeader>
          <IonItem detail={false} lines="none" className="uniform-item">
            {/* <IonAvatar slot="start"> */}

            <Dial
              interaction={"radial"}
              key={1}
              onReady={dialRef => {
                dialRefs.current.push(dialRef);
                dialRef.colorize("accent", uniform.color);
              }}
              onChange={value => {
                emitToSocket(value, uniform.id);
              }}
              value={1}
              min={0}
              max={1}
            />
            <RadioButton
              size={[40,40]}
              numberOfButtons={4}
              onChange={
                rbRef => {
                  setAnim(rbRef, uniform.id);
                }
              }
            />
            {/* </IonAvatar> */}
            <IonLabel>
              <h2>{uniform.id} - {uniform.name}</h2>
              <p>{uniform.title}</p>
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
        <Slider size={[120, 20]}
              onReady={dialRef => {
                dialRefs.current.push(dialRef);
                dialRef.colorize("accent", uniform.color);
              }}
              onChange={value => {
                emitToSocket(value, uniform.id);
              }} />
          {/* <IonList lines="none">
            {shaders.map(shader => (
              <IonItem detail={false} routerLink={`/tabs/uniforms/shaders/${shader.id}`} key={shader.name}>
                <IonLabel>
                  <h3>{shader.name}</h3>
                </IonLabel>
              </IonItem>
            ))}
            <IonItem detail={false} routerLink={`/tabs/uniforms/${uniform.id}`}>
              <IonLabel>
                <h3>About {uniform.name}</h3>
              </IonLabel>
            </IonItem>
          </IonList> */}
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default UniformItem;
