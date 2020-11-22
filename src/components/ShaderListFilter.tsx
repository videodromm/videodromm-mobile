import React from 'react';

import { getMode } from '@ionic/core';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonLabel, IonCheckbox, IonFooter, IonIcon } from '@ionic/react';
import { logoAngular, call, document, logoIonic, hammer, restaurant, cog, colorPalette, construct, compass } from 'ionicons/icons';

import './ShaderListFilter.css'

import { connect } from '../data/connect';
import { updateFilteredTags } from '../data/shaders/shaders.actions';

interface OwnProps {
  onDismissModal: () => void;
}

interface StateProps {
  allTags: string[],
  filteredTags: string[]
}

interface DispatchProps {
  updateFilteredTags: typeof updateFilteredTags;
}

type ShaderListFilterProps = OwnProps & StateProps & DispatchProps;

const ShaderListFilter: React.FC<ShaderListFilterProps> = ({ allTags, filteredTags, onDismissModal, updateFilteredTags }) => {
  const ios = getMode() === 'ios';

  const toggleTagFilter = (tag: string) => {
    if (filteredTags.indexOf(tag) > -1) {
      updateFilteredTags(filteredTags.filter(x => x !== tag));
    } else {
      updateFilteredTags([...filteredTags, tag]);
    }
  };

  const handleDeselectAll = () => {
    updateFilteredTags([]);
  };

  const handleSelectAll = () => {
    updateFilteredTags([...allTags]);
  };

  const iconMap: { [key: string]: any } = {
    'Angular': logoAngular,
    'Documentation': document,
    'Food': restaurant,
    'Ionic': logoIonic,
    'Tooling': hammer,
    'Design': colorPalette,
    'Services': cog,
    'Workshop': construct,
    'Navigation': compass,
    'Communication': call
  }

  return (
    <>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            { ios &&
              <IonButton onClick={onDismissModal}>Cancel</IonButton>
            }
            { !ios &&
              <IonButton onClick={handleDeselectAll}>Reset</IonButton>
            }
          </IonButtons>

          <IonTitle>
            Filter Shaders
          </IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={onDismissModal} strong>Done</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList lines={ ios ? 'inset' : 'full'}>
          <IonListHeader>Tags</IonListHeader>

          {allTags.map((tag, index) => (
            <IonItem key={tag}>
              { ios &&
                <IonIcon slot="start" icon={iconMap[tag]} color="medium" />
              }
              <IonLabel>{tag}</IonLabel>
              <IonCheckbox
                onClick={() => toggleTagFilter(tag)}
                checked={filteredTags.indexOf(tag) !== -1}
                color="primary"
                value={tag}
              ></IonCheckbox>
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      { ios &&
        <IonFooter>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={handleDeselectAll}>Deselect All</IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={handleSelectAll}>Select All</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      }
    </>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    allTags: state.data.allTags,
    filteredTags: state.data.filteredTags
  }),
  mapDispatchToProps: {
    updateFilteredTags
  },
  component: ShaderListFilter
})
