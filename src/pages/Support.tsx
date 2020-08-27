
import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonText, IonTextarea, IonToast } from '@ionic/react';
import './Login.scss';
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
const dialColors = ['#a70', '#f00', '#0f0', '#00f', '#aaa', '#f00', '#0f0', '#00f', '#370', '#ff0', '#fff', '#a0f', '#a70', '#270', '#fff', '#a0f', '#370', '#ff0'];
const dialNames = ['time', 'red', 'green', 'blue', 'alpha', 'red*', 'green*', 'blue*', 'sobel', 'badtv', 'steps', 'ratio', 'zoom', 'audio*', 'expo', 'pixel8', 'trixel', 'chroma'];

declare global {
  interface Window { socket: any; ws: any; }
}
function initWs() {
  window.ws = (function (uri: string) {
    console.log('ws init')
    window.ws = new WebSocket(uri);
    /*window.ws.onmessage = function (evt) {
      var messageData = JSON.parse(evt.data);
      var customEvt = new CustomEvent('msg');
      customEvt.data = messageData.params[0];
      console.log(`ws rcvd name:${messageData.params[0].name} value:${messageData.params[0].value}`);
      dispatchEvent(customEvt);
      window.ws.dispatchEvent(customEvt);
    };*/
    this.emit = function (evt, data) {
      window.ws.send(JSON.stringify({ event: evt, message: data }));
    };
    this.send = function (data) {
      window.ws.send(data);
    };
    this.on = function (evt, func) {
      console.log(`ws on ${evt.data} `);
      window.ws.addEventListener(evt, func);
    };
    window.ws.onerror = function (e) { console.log('error: ' + JSON.stringify(e)) };
    window.ws.onopen = function (evt) { console.log('Socket opened') };
    window.ws.onclose = function (evt) { console.log('Socket closed') };
  });

  //window.socket = new ws('ws://127.0.0.1:8088');
  //window.socket = new WebSocket('ws://192.168.0.24:8088');
  window.socket = new WebSocket('ws://51.210.25.82:8088');
}
initWs();
const emitToSocket = (value: number, index: number) => {
  console.log(value);
  /*
  CONNECTING	0
  OPEN	1
  CLOSING	2
  CLOSED	3
  */
  if (window.socket && window.socket.readyState === 1) {
    window.socket.send('{"params" :[{"name" : ' + index + ',"value" :' + value + '}]}');
    //console.log(`emitToSocket readyState ${window.ws.readyState}, val: ${value}, idx: ${index} `);
    console.log(`emitToSocket readyStateval: ${value}, idx: ${index} `);

  } else {
    //console.log(`not ready, state ${window.ws.readyState}`);
    console.log(`not ready`);
  }

};

/*
function TitleAndChildren({ children, title }) {
  return (
    <div style={{ margin: 10 }}>
      <h2 className={"subtitle"} style={{ textAlign: "center" }}>{title}</h2>
      {children}
    </div>
  );
}

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

  const [message, setMessage] = useState('ws://51.210.25.82:8088');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!message) {
      setMessageError(true);
    }
    if (message) {
      setMessage('');
      setShowToast(true);
    }
  };
  let dials = [] as React.ReactElement[];
  let dialRefs = React.useRef([] as any[]);

  return (
    <IonPage id="support-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Videodromm Websocket Controller</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
                console.log(value)
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
                  console.log(value)
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
                  console.log(value)
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
                  console.log(value)
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
                  console.log(value)
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
                  console.log(value)
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
                  console.log(value)
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
                  console.log(value)
                  emitToSocket(value, 8);
                }}
                value={1}
                min={0}
                max={1}
              />
            </IonCol>
          </IonRow>
        {/* <div className="login-logo">
          <TextButton text="Connect" onChange={console.log} />
        </div>

        <div className="login-logo">
          <Dial
            interaction={"radial"}
            key={0}
            onReady={dialRef => {
              dialRefs.current.push(dialRef);
              dialRef.colorize("accent", dialColors[0]);
            }}
            onChange={value => {
              console.log(value)
              emitToSocket(value, 0);
            }}
            value={1}
            min={0}
            max={1}
          />


        </div> */}
        <form noValidate onSubmit={send}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Enter your websocket server (example: ws://192.168.0.47:8088)</IonLabel>
              <IonTextarea name="message" value={message} spellCheck={false} autocapitalize="off" rows={1} onIonChange={e => setMessage(e.detail.value!)}
                required>
              </IonTextarea>
            </IonItem>

            {formSubmitted && messageError && <IonText color="danger">
              <p className="ion-padding-start">
                WS server is required
              </p>
            </IonText>}
          </IonList>

          
          <IonRow>
            {/* expand="block" */}
            <IonCol>
              <IonButton type="submit" >Connect</IonButton>
            </IonCol></IonRow>
        </form>

      </IonContent>

      <IonToast
        isOpen={showToast}
        duration={3000}
        message="You are connected"
        onDidDismiss={() => setShowToast(false)} />
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  component: Support
})
