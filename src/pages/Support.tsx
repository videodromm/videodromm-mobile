
import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonText, IonTextarea, IonToast } from '@ionic/react';
import './Connect.scss';
import { connect } from '../data/connect';
import {
  Button,
  Toggle,
  Dial,
  Number,
  Position,
  Slider,
  Envelope,
  Multislider,
  Piano,
  RadioButton,
  Select,
  Sequencer,
  TextButton,
  Tilt,
  Pan,
  Pan2D
} from 'react-nexusui';

/*
const mouseChange = (pos) => {
  console.log(`mouseChange ${pos.x} ${pos.y} `);
  if (window.socket && window.ws.readyState === 1) {
    window.socket.send('{"params" :[{"name" : 42,"value" :' + pos.x + '},{"name" : 43,"value" :' + pos.y + '}]}');
  }
}
const xFadeChange = (val: number) => {
  console.log(`mouseChange ${val} `);
  emitToSocket(val, 18);
}
const mixChange = (valuesArray) => {
  console.log(`mixChange ${JSON.stringify(valuesArray)} } `);// 31 to 39
  valuesArray.map((item, index) => {

    console.log(`mixChange ${item} ${index} `);
    emitToSocket(item, 31 + index);
  });
}*/

interface OwnProps { }

interface DispatchProps { }

interface SupportProps extends OwnProps, DispatchProps { }

const Support: React.FC<SupportProps> = () => {

  const dialColors = ['#a70', '#f00', '#0f0', '#00f', '#aaa', '#f00', '#0f0', '#00f', '#370', '#ff0', '#fff', '#a0f', '#a70', '#270', '#fff', '#a0f', '#370', '#ff0'];
  //const dialNames = ['time', 'red', 'green', 'blue', 'alpha', 'red*', 'green*', 'blue*', 'sobel', 'badtv', 'steps', 'ratio', 'zoom', 'audio*', 'expo', 'pixel8', 'trixel', 'chroma'];
  //let dials = [] as React.ReactElement[];
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
      console.log(`emitToSocket readyState val: ${value}, idx: ${index} `);
    } else {
      console.log(`not ready val: ${value}, idx: ${index} `);
      /* ko if (dialRefs[1]) {
        console.log(`emitToSocket dialRefs[0]: ${dialRefs[0]},  ${JSON.stringify(dialRefs[0])} `);
        dialRefs[1].value = 0.5;
      }*/
    }

  };


  function TitleAndChildren({ children, title }) {
    return (
      <div style={{ margin: 10 }}>
        <h5 className={"subtitle"} style={{ textAlign: "center" }}>{title}</h5>
        {children}
      </div>
    );
  }
  function Mobile() {
    return (
      <section className="section">
        <div className="container">

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <TitleAndChildren title={"Tilt"}>
              <Tilt
                size={[200, 100]}
                active={true}
                onChange={tilt => {
                  console.log("Tilt changed ", tilt.x," ", JSON.stringify(tilt));
                }}
              />
            </TitleAndChildren>
          </div>
        </div>
      </section>
    );
  }
  return (
    <IonPage id="support-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Videodromm Controller</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonRow>
        <IonCol>
          <Mobile />
          </IonCol>
        <IonCol>
          <TitleAndChildren title="Slider">
            <Slider size={[120, 20]} onChange={console.log} />
          </TitleAndChildren>
        </IonCol>
        <IonCol>
          <TitleAndChildren title="Slider">
            <Slider size={[120, 20]} onChange={console.log} />
          </TitleAndChildren>
          </IonCol>
        <IonCol>
          <TitleAndChildren title="Slider">
            <Slider size={[120, 20]} onChange={console.log} />
          </TitleAndChildren>
        </IonCol>
      </IonRow>
      <IonRow>
          <IonCol>
            <Dial
              interaction={"radial"}
              key={1}
              onReady={dialRef => {
                dialRefs.current.push(dialRef);
                dialRef.colorize("accent", dialColors[1]);
              }}
              onChange={value => {
                emitToSocket(value, 1);
              }}
              value={1}
              min={0}
              max={1}
            />
          </IonCol>
           <IonCol>
              <Dial
                interaction={"radial"}
                key={2}
                onReady={dialRef => {
                  dialRefs.current.push(dialRef);
                  dialRef.colorize("accent", dialColors[2]);
                }}
                onChange={value => {
                  emitToSocket(value, 2);
                }}
                value={1}
                min={0}
                max={1}
              />
            </IonCol>
            <IonCol>
              <Dial
                interaction={"radial"}
                key={3}
                onReady={dialRef => {
                  dialRefs.current.push(dialRef);
                  dialRef.colorize("accent", dialColors[3]);
                }}
                onChange={value => {
                  emitToSocket(value, 3);
                }}
                value={1}
                min={0}
                max={1}
              />
            </IonCol>
            <IonCol>
              <Dial
                interaction={"radial"}
                key={4}
                onReady={dialRef => {
                  dialRefs.current.push(dialRef);
                  dialRef.colorize("accent", dialColors[4]);
                }}
                onChange={value => {
                  emitToSocket(value, 4);
                }}
                value={1}
                min={0}
                max={1}
              />
            </IonCol>
            <IonCol>
              <Dial
                interaction={"radial"}
                key={5}
                onReady={dialRef => {
                  dialRefs.current.push(dialRef);
                  dialRef.colorize("accent", dialColors[5]);
                }}
                onChange={value => {
                  emitToSocket(value, 5);
                }}
                value={1}
                min={0}
                max={1}
              />
            </IonCol>
            <IonCol>
              <Dial
                interaction={"radial"}
                key={6}
                onReady={dialRef => {
                  dialRefs.current.push(dialRef);
                  dialRef.colorize("accent", dialColors[6]);
                }}
                onChange={value => {
                  emitToSocket(value, 6);
                }}
                value={1}
                min={0}
                max={1}
              />
            </IonCol>
            <IonCol>
              <Dial
                interaction={"radial"}
                key={7}
                onReady={dialRef => {
                  dialRefs.current.push(dialRef);
                  dialRef.colorize("accent", dialColors[7]);
                }}
                onChange={value => {
                  emitToSocket(value, 7);
                }}
                value={1}
                min={0}
                max={1}
              />
            </IonCol>
            <IonCol>
              <Dial
                interaction={"radial"}
                key={8}
                onReady={dialRef => {
                  dialRefs.current.push(dialRef);
                  dialRef.colorize("accent", dialColors[8]);
                }}
                onChange={value => {
                  emitToSocket(value, 8);
                }}
                value={1}
                min={0}
                max={1}
              />
            </IonCol>
          </IonRow>

      </IonContent>


    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  component: Support
})
