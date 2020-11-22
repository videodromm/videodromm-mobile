import React from 'react';
import { Shader } from '../models/Glsl';
import { Uniform } from '../models/Uniform';
import { IonCard, IonCardHeader, IonItem, IonLabel, IonAvatar, IonCardContent, IonList } from '@ionic/react';
import {
  Dial,
  Slider
} from 'react-nexusui';


interface UniformItemProps {
  uniform: Uniform;
  shaders: Shader[];
}

const UniformItem: React.FC<UniformItemProps> = ({ uniform, shaders }) => {
  const dialColors = ['#a70', '#f00', '#0f0', '#00f', '#aaa', '#f00', '#0f0', '#00f', '#370', '#ff0', '#fff', '#a0f', '#a70', '#270', '#fff', '#a0f', '#370', '#ff0'];
  let dialRefs = React.useRef([] as any[]);
  const emitToSocket = (value: number, index: number) => {
    /*
    CONNECTING	0
    OPEN	1
    CLOSING	2
    CLOSED	3
    */
    if (window.socket && window.socket.readyState === 1) {
      window.socket.send('{"params" :[{"name" : ' + index + ',"value" :' + value + '}]}');
      console.log(`UniformItem emitToSocket readyState val: ${value}, idx: ${index} `);
    } else {
      console.log(`UniformItem not ready val: ${value}, idx: ${index} `);
      /* ko if (dialRefs[1]) {
        console.log(`emitToSocket dialRefs[0]: ${dialRefs[0]},  ${JSON.stringify(dialRefs[0])} `);
        dialRefs[1].value = 0.5;
      }*/
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
                dialRef.colorize("accent", dialColors[uniform.id]);
              }}
              onChange={value => {
                emitToSocket(value, uniform.id);
              }}
              value={1}
              min={0}
              max={1}
            />

            {/* </IonAvatar> */}
            <IonLabel>
              <h2>{uniform.id} - {uniform.name}</h2>
              <p>Item {uniform.title}</p>
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
        <Slider size={[120, 20]}
              onReady={dialRef => {
                dialRefs.current.push(dialRef);
                dialRef.colorize("accent", dialColors[uniform.id]);
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
