import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';

import './UniformDetail.scss';

import { ActionSheetButton } from '@ionic/core';
import { IonActionSheet, IonIcon, IonHeader, IonToolbar, IonButtons, IonContent, IonButton, IonBackButton, IonPage } from '@ionic/react'
import { callOutline, callSharp } from 'ionicons/icons';

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

  /*function openUniformShare(uniform: Uniform) {
    setActionSheetButtons([
      {
        text: 'Copy Link',
        handler: () => {
          console.log('Copy Link clicked');
        }
      }
    ]);
    setActionSheetHeader(`Share ${uniform.name}`);
    setShowActionSheet(true);
  }*/

  function openContact(uniform: Uniform) {
    setActionSheetButtons([
      {
        text: `color ( ${uniform.color} )`,
        handler: () => {
          window.open('mailto:' + uniform.color);
        }
      }
    ]);
    setActionSheetHeader(`Share ${uniform.name}`);
    setShowActionSheet(true);
  }

  /*function openExternalUrl(url: string) {
    window.open(url, '_blank');
  }*/

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

            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="uniform-background">
          <h2>{uniform.name}</h2>
        </div>

        <div className="ion-padding uniform-detail">
          <p>{uniform.about} Detail</p>

          <hr/>

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
