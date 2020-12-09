import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import UniformItem from '../components/UniformItem';
import { Uniform } from '../models/Uniform';
import { Shader } from '../models/Glsl';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import './UniformList.scss';

interface OwnProps { };

interface StateProps {
  uniforms: Uniform[];
  uniformShaders: { [key: string]: Shader[] };
};

interface DispatchProps { };

interface UniformListProps extends OwnProps, StateProps, DispatchProps { };

const UniformList: React.FC<UniformListProps> = ({ uniforms, uniformShaders }) => {

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
                <IonCol size="12" size-md="3" key={uniform.id}>
                  <UniformItem
                    key={uniform.id}
                    uniform={uniform}
                    shaders={uniformShaders[uniform.name]}
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
    uniformShaders: selectors.getUniformShaders(state)
  }),
  component: React.memo(UniformList)
});
