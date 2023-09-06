import React, { useEffect, useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonRow,
  IonCol,
  IonLabel,
} from "@ionic/react";
import "./Connect.css";
import { connect } from "../data/connect";

interface OwnProps {}

interface DispatchProps {}

interface SupportProps extends OwnProps, DispatchProps {}

const Support: React.FC<SupportProps> = () => {
  const [posts, setPosts] = useState<any>();
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://api.sophiaantipolis.xyz/articles"
      );
      setPosts(await response.json());
    })();
  });
  return (
    <IonPage id="support-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Videodromm Controller</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          {posts &&
            posts?.map((post: any) => {
              return <IonCol><IonLabel>
                <h2>{post.title}</h2>
                </IonLabel></IonCol>;
            })}
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  component: Support,
});
