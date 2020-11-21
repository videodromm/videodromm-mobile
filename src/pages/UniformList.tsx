import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import UniformItem from '../components/UniformItem';
import { Uniform } from '../models/Uniform';
import { Session } from '../models/Schedule';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import './UniformList.scss';

interface OwnProps { };

interface StateProps {
  uniforms: Uniform[];
  uniformSessions: { [key: string]: Session[] };
};

interface DispatchProps { };

interface UniformListProps extends OwnProps, StateProps, DispatchProps { };

const UniformList: React.FC<UniformListProps> = ({ uniforms, uniformSessions }) => {

  return (
    <IonPage id="uniform-list">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Uniforms</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Uniforms</IonTitle>
          </IonToolbar>
        </IonHeader>

          <IonGrid fixed>
            <IonRow>
              {uniforms.map(uniform => (
                <IonCol size="12" size-md="6" key={uniform.id}>
                  <UniformItem
                    key={uniform.id}
                    uniform={uniform}
                    sessions={uniformSessions[uniform.name]}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    uniforms: selectors.getUniforms(state),
    uniformSessions: selectors.getUniformSessions(state)
  }),
  component: React.memo(UniformList)
});
