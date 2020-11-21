import React from 'react';
import { Session } from '../models/Schedule';
import { Uniform } from '../models/Uniform';
import { IonCard, IonCardHeader, IonItem, IonLabel, IonAvatar, IonCardContent, IonList } from '@ionic/react';


interface UniformItemProps {
  uniform: Uniform;
  sessions: Session[];
}

const UniformItem: React.FC<UniformItemProps> = ({ uniform, sessions }) => {
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
            {sessions.map(session => (
              <IonItem detail={false} routerLink={`/tabs/uniforms/sessions/${session.id}`} key={session.name}>
                <IonLabel>
                  <h3>{session.name}</h3>
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
