import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';

import './UniformDetail.scss';

import { ActionSheetButton } from '@ionic/core';
import { IonActionSheet, IonChip, IonIcon, IonHeader, IonLabel, IonToolbar, IonButtons, IonContent, IonButton, IonBackButton, IonPage } from '@ionic/react'
import { callOutline, callSharp, logoGithub, shareOutline, shareSharp } from 'ionicons/icons';

import { connect } from '../data/connect';
import * as selectors from '../data/selectors';

import { Uniform } from '../models/Uniform';


interface OwnProps extends RouteComponentProps {
  uniform?: Uniform;
};

interface StateProps {};

interface DispatchProps {};

interface UniformDetailProps extends OwnProps, StateProps, DispatchProps {};

const UniformDetail: React.FC<UniformDetailProps> = ({ uniform }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons, setActionSheetButtons] = useState<ActionSheetButton[]>([]);
  const [actionSheetHeader, setActionSheetHeader] = useState('');

  function openUniformShare(uniform: Uniform) {
    setActionSheetButtons([
      {
        text: 'Copy Link',
        handler: () => {
          console.log('Copy Link clicked');
        }
      },
      {
        text: 'Share via ...',
        handler: () => {
          console.log('Share via clicked');
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]);
    setActionSheetHeader(`Share ${uniform.name}`);
    setShowActionSheet(true);
  }

  function openContact(uniform: Uniform) {
    setActionSheetButtons([
      {
        text: `Email ( ${uniform.email} )`,
        handler: () => {
          window.open('mailto:' + uniform.email);
        }
      },
      {
        text: `Call ( ${uniform.phone} )`,
        handler: () => {
          window.open('tel:' + uniform.phone);
        }
      }
    ]);
    setActionSheetHeader(`Share ${uniform.name}`);
    setShowActionSheet(true);
  }

  function openExternalUrl(url: string) {
    window.open(url, '_blank');
  }

  if (!uniform) {
    return <div>Uniform not found</div>
  }

  return (
    <IonPage id="uniform-detail">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/uniforms" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={() => openContact(uniform)}>
                <IonIcon slot="icon-only" ios={callOutline} md={callSharp}></IonIcon>
              </IonButton>
              <IonButton onClick={() => openUniformShare(uniform)}>
                <IonIcon slot="icon-only" ios={shareOutline} md={shareSharp}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="uniform-background">
          <img src={uniform.thumbnail} alt={uniform.name}/>
          <h2>{uniform.name}</h2>
        </div>

        <div className="ion-padding uniform-detail">
          <p>{uniform.about} Say hello on social media!</p>

          <hr/>



          <IonChip color="dark" onClick={() => openExternalUrl('https://github.com/ionic-team/ionic')}>
            <IonIcon icon={logoGithub}></IonIcon>
            <IonLabel>GitHub</IonLabel>
          </IonChip>

        </div>
      </IonContent>
      <IonActionSheet
        isOpen={showActionSheet}
        header={actionSheetHeader}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={actionSheetButtons}
      />
    </IonPage>
  );
};


export default connect({
  mapStateToProps: (state, ownProps) => ({
    uniform: selectors.getUniform(state, ownProps)
  }),
  component: UniformDetail
});
