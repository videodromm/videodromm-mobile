import React from 'react';
import { Shader } from '../models/Glsl';
import { Uniform } from '../models/Uniform';
import { IonCard, IonCardHeader, IonItem, IonLabel, IonAvatar, IonCardContent, IonList } from '@ionic/react';


interface UniformItemProps {
  uniform: Uniform;
  shaders: Shader[];
}

const UniformItem: React.FC<UniformItemProps> = ({ uniform, shaders }) => {
  return (
    <>
      <IonCard className="uniform-card">
        <IonCardHeader>
          <IonItem button detail={false} lines="none" className="uniform-item" routerLink={`/tabs/uniforms/${uniform.id}`}>
            <IonAvatar slot="start">
              <img src={process.env.PUBLIC_URL + uniform.profilePic} alt="Uniform profile pic" />
            </IonAvatar>
            <IonLabel>
              <h2>{uniform.name}</h2>
              <p>{uniform.title}</p>
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          <IonList lines="none">
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
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default UniformItem;
