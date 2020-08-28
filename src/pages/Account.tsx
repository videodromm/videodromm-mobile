import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList, IonItem, IonAlert } from '@ionic/react';
import './Account.scss';
import { setHost } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps { }

interface StateProps {
  host?: string;
}

interface DispatchProps {
  setHost: typeof setHost;
}

interface AccountProps extends OwnProps, StateProps, DispatchProps { }

const Account: React.FC<AccountProps> = ({ setHost, host }) => {

  const [showAlert, setShowAlert] = useState(false);

  const clicked = (text: string) => {
    console.log(`Clicked ${text}`);
  }

  return (
    <IonPage id="account-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {host &&
          (<div className="ion-padding-top ion-text-center">
            <img src="https://www.gravatar.com/avatar?d=mm&s=140" alt="avatar" />
            <h2>{ host }</h2>
            <IonList inset>
              <IonItem onClick={() => clicked('Update Picture')}>Update Picture</IonItem>
              <IonItem onClick={() => setShowAlert(true)}>Change Host</IonItem>
              <IonItem onClick={() => clicked('Change Port')}>Change Port</IonItem>
              <IonItem routerLink="/support" routerDirection="none">Support</IonItem>
              <IonItem routerLink="/logout" routerDirection="none">Logout</IonItem>
            </IonList>
          </div>)
        }
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        header="Change Host"
        buttons={[
          'Cancel',
          {
            text: 'Ok',
            handler: (data) => {
              setHost(data.host);
            }
          }
        ]}
        inputs={[
          {
            type: 'text',
            name: 'host',
            value: host,
            placeholder: 'host'
          }
        ]}
        onDidDismiss={() => setShowAlert(false)}
      />
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    host: state.user.host
  }),
  mapDispatchToProps: {
    setHost,
  },
  component: Account
})