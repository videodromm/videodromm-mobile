import React from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';

interface AboutPopoverProps {
  dismiss: () => void;
};

const AboutPopover: React.FC<AboutPopoverProps> = ({dismiss}) => {

  const close = (url: string) => {
    window.open(url, '_blank');
    dismiss();
  };

  return (
    <IonList>
      <IonItem button onClick={() => close('https://videodromm.com')}>
        <IonLabel>Videodromm website</IonLabel>
      </IonItem>
      <IonItem button onClick={dismiss}>
        <IonLabel>Close</IonLabel>
      </IonItem>
    </IonList >
  )
}

export default AboutPopover;
