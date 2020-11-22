import React from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonBackButton, IonButton, IonIcon, IonText, IonList, IonItem, IonLabel } from '@ionic/react';
import { connect } from '../data/connect';
import { withRouter, RouteComponentProps } from 'react-router';
import * as selectors from '../data/selectors';
import { starOutline, star, share, cloudDownload } from 'ionicons/icons';
import './ShaderDetail.scss';
import { addFavorite, removeFavorite } from '../data/shaders/shaders.actions';
import { Shader } from '../models/Glsl';

interface OwnProps extends RouteComponentProps { };

interface StateProps {
  shader?: Shader;
  favoriteShaders: number[],
};

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

type ShaderDetailProps = OwnProps & StateProps & DispatchProps;

const ShaderDetail: React.FC<ShaderDetailProps> = ({ shader, addFavorite, removeFavorite, favoriteShaders }) => {

  if (!shader) {
    return <div>Shader not found</div>
  }

  const isFavorite = favoriteShaders.indexOf(shader.id) > -1;

  const toggleFavorite = () => {
    isFavorite ? removeFavorite(shader.id) : addFavorite(shader.id);
  };
  const shareShader = () => { };
  const shaderClick = (text: string) => {
    console.log(`Clicked ${text}`);
  };

  return (
    <IonPage id="shader-detail-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/glsl"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => toggleFavorite()}>
              {isFavorite ?
                <IonIcon slot="icon-only" icon={star}></IonIcon> :
                <IonIcon slot="icon-only" icon={starOutline}></IonIcon>
              }
            </IonButton>
            <IonButton onClick={() => shareShader}>
              <IonIcon slot="icon-only" icon={share}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <h1>{shader.name}</h1>
          {shader.tags.map(tag => (
            <span key={tag} className={`shader-tag-${tag.toLowerCase()}`}>{tag}</span>
          ))}
          <p>{shader.description}</p>
          <img src={process.env.PUBLIC_URL + shader.thumbnail} alt="thumbnail" />

          <IonText color="medium">
            {shader.timeStart} &ndash; {shader.timeEnd}
            <br />
            {shader.location}
          </IonText>
        </div>
        <IonList>
          <IonItem onClick={() => shaderClick('watch')} button>
            <IonLabel color="primary">Watch</IonLabel>
          </IonItem>
          <IonItem onClick={() => shaderClick('add to calendar')} button>
            <IonLabel color="primary">Add to Calendar</IonLabel>
          </IonItem>
          <IonItem onClick={() => shaderClick('mark as unwatched')} button>
            <IonLabel color="primary">Mark as Unwatched</IonLabel>
          </IonItem>
          <IonItem onClick={() => shaderClick('download video')} button>
            <IonLabel color="primary">Download Video</IonLabel>
            <IonIcon slot="end" color="primary" size="small" icon={cloudDownload}></IonIcon>
          </IonItem>
          <IonItem onClick={() => shaderClick('leave feedback')} button>
            <IonLabel color="primary">Leave Feedback</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    shader: selectors.getShader(state, OwnProps),
    favoriteShaders: state.data.favorites
  }),
  mapDispatchToProps: {
    addFavorite,
    removeFavorite
  },
  component: withRouter(ShaderDetail)
})
