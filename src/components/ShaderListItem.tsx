import React, { useRef } from 'react';
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, AlertButton } from '@ionic/react';
import { Shader } from '../models/Glsl';

interface ShaderListItemProps {
  shader: Shader;
  listType: "all" | "favorites";
  onAddFavorite: (id: number) => void;
  onRemoveFavorite: (id: number) => void;
  onShowAlert: (header: string, buttons: AlertButton[]) => void;
  isFavorite: boolean;
}

const ShaderListItem: React.FC<ShaderListItemProps> = ({ isFavorite, onAddFavorite, onRemoveFavorite, onShowAlert, shader, listType }) => {
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)

  const dismissAlert = () => {
    ionItemSlidingRef.current && ionItemSlidingRef.current.close();
  }

  const removeFavoriteShader = () => {
    onAddFavorite(shader.id);
    onShowAlert('Favorite already added', [
      {
        text: 'Cancel',
        handler: dismissAlert
      },
      {
        text: 'Remove',
        handler: () => {
          onRemoveFavorite(shader.id);
          dismissAlert();
        }
      }
    ]);
  }

  const addFavoriteShader = () => {
    if (isFavorite) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      removeFavoriteShader();
    } else {
      // remember this shader as a user favorite
      onAddFavorite(shader.id);
      onShowAlert('Favorite Added', [
        {
          text: 'OK',
          handler: dismissAlert
        }
      ]);
    }
  };

  return (
    <IonItemSliding ref={ionItemSlidingRef} class={'track-' + shader.tracks[0].toLowerCase()}>
      <IonItem routerLink={`/tabs/glsl/${shader.id}`}>
        <IonLabel>
          <h3>{shader.name}</h3>
          <p>
            {shader.timeStart}&mdash;&nbsp;
            {shader.timeStart}&mdash;&nbsp;
            {shader.location}
          </p>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        {listType === "favorites" ?
          <IonItemOption color="danger" onClick={() => removeFavoriteShader()}>
            Remove
          </IonItemOption>
          :
          <IonItemOption color="favorite" onClick={addFavoriteShader}>
            Favorite
          </IonItemOption>
        }
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default React.memo(ShaderListItem);
