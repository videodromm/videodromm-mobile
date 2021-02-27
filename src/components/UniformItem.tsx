import React from 'react';
import { Shader } from '../models/Glsl';
import { Uniform } from '../models/Uniform';
import { IonCard, IonCardHeader, IonLabel, IonCardContent } from '@ionic/react';
import {
  Dial,
  RadioButton
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
      //console.log(`UniformItem emitToSocket not ready val: ${value}, idx: ${index} `);
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
            <IonLabel>
              {/* <h2>{uniform.id} - {uniform.name}</h2> */}
              <h6>{uniform.id} - {uniform.name} {uniform.title}</h6>
          {/* <Slider size={[120, 20]}
              onReady={sliderRef => {
                sliderRef.colorize("accent", uniform.color);
              }}
              onChange={value => {
                emitToSocket(value, uniform.id);
              }} /> */}
              <RadioButton
              size={[50,40]}
              numberOfButtons={6}
              active={0}
              onChange={
                rbRef => {
                  setAnim(rbRef, uniform.id);
                }
              }
              onReady={rbRef => {
                console.log(rbRef)
                rbRef.select(2);
              }}
              />
              </IonLabel>
        </IonCardHeader>

        <IonCardContent>
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



        </IonCardContent>
      </IonCard>
    </>
  );
};

export default UniformItem;
