import React, { useState } from 'react';
import { IonToast, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import './Connect.scss';
import { setIsLoggedIn, setHost } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setHost: typeof setHost;
}

interface ConnectProps extends OwnProps,  DispatchProps { }

const Connect: React.FC<ConnectProps> = ({setIsLoggedIn, history, setHost: setHostAction}) => {

  const [host, setHost] = useState('51.210.25.82');
  const [port, setPort] = useState('8088');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hostError, setHostError] = useState(false);
  const [portError, setPortError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const connect = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!host) {
      setHostError(true);
    }
    if(!port) {
      setPortError(true);
    }

    if(host && port) {
      //await setIsLoggedIn(true);
      await setHostAction(`ws://${host}:${port}`);
      setShowToast(true);
      history.push('/support', {direction: 'none'});
    }
  };
  const local = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    if(!port) {
      setPortError(true);
    }

    if(port) {
      //await setIsLoggedIn(true);
      await setHostAction(`ws://127.0.0.1:${port}`);
      setShowToast(true);
      history.push('/support', {direction: 'none'});
    }
  };

  return (
    <IonPage id="connect-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Websocket server</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="connect-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={connect}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Host</IonLabel>
              <IonInput name="host" type="text" value={host} spellCheck={false} autocapitalize="off" onIonChange={e => setHost(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && hostError && <IonText color="danger">
              <p className="ion-padding-start">
                Host is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Port</IonLabel>
              <IonInput name="port" type="text" value={port} onIonChange={e => setPort(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {formSubmitted && portError && <IonText color="danger">
              <p className="ion-padding-start">
                Port is required
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit">Connect</IonButton>
            </IonCol>
          </IonRow>
        </form>
        <form noValidate onSubmit={local}>
          <IonList>

            <IonItem>
              <IonLabel position="stacked" color="primary">Port</IonLabel>
              <IonInput name="port" type="text" value={port} onIonChange={e => setPort(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {formSubmitted && portError && <IonText color="danger">
              <p className="ion-padding-start">
                Port is required
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit">Local</IonButton>
            </IonCol>
          </IonRow>
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
  mapDispatchToProps: {
    setIsLoggedIn,
    setHost
  },
  component: Connect
})
