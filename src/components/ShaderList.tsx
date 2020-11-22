import { IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader, IonAlert, AlertButton } from '@ionic/react';
import React, { useState, useCallback } from 'react';
import { Glsl, Shader } from '../models/Glsl';
import ShaderListItem from './ShaderListItem';
import { connect } from '../data/connect';
import { addFavorite, removeFavorite } from '../data/shaders/shaders.actions';

interface OwnProps {
  glsl: Glsl;
  listType: 'all' | 'favorites';
  hide: boolean;
}

interface StateProps {
  favoriteShaders: number[];
}

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

interface ShaderListProps extends OwnProps, StateProps, DispatchProps { };

const ShaderList: React.FC<ShaderListProps> = ({ addFavorite, removeFavorite, favoriteShaders, hide, glsl, listType }) => {

  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>([]);

  const handleShowAlert = useCallback((header: string, buttons: AlertButton[]) => {
    setAlertHeader(header);
    setAlertButtons(buttons);
    setShowAlert(true);
  }, []);

  if (glsl.groups.length === 0 && !hide) {
    return (
      <IonList>
        <IonListHeader>
          No Shaders Found
        </IonListHeader>
      </IonList>
    );
  }

  return (
    <>
      <IonList style={hide ? { display: 'none' } : {}}>
        {glsl.groups.map((group, index: number) => (
          <IonItemGroup key={`group-${index}`}>
            <IonItemDivider sticky>
              <IonLabel>
                {group.time}
              </IonLabel>
            </IonItemDivider>
            {group.shaders.map((shader: Shader, shaderIndex: number) => (
              <ShaderListItem
                onShowAlert={handleShowAlert}
                isFavorite={favoriteShaders.indexOf(shader.id) > -1}
                onAddFavorite={addFavorite}
                onRemoveFavorite={removeFavorite}
                key={`group-${index}-${shaderIndex}`}
                shader={shader}
                listType={listType}
              />
            ))}
          </IonItemGroup>
        ))}
      </IonList>
      <IonAlert
        isOpen={showAlert}
        header={alertHeader}
        buttons={alertButtons}
        onDidDismiss={() => setShowAlert(false)}
      ></IonAlert>
    </>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    favoriteShaders: state.data.favorites
  }),
  mapDispatchToProps: ({
    addFavorite,
    removeFavorite
  }),
  component: ShaderList
});
