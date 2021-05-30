import React, { useState, useEffect } from "react";
import {
  useIonViewWillEnter,
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { connect } from "../data/connect";
import { withRouter, RouteComponentProps } from "react-router";
import * as selectors from "../data/selectors";
import { starOutline, star, share } from "ionicons/icons";
import "./ShaderDetail.scss";
import { addFavorite, removeFavorite } from "../data/shaders/shaders.actions";
import { Shader } from "../models/Glsl";

import { Node } from "gl-react";
import { Surface } from "gl-react-dom";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/keymap/sublime";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/foldgutter.css";
import { save } from "ionicons/icons";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  shader?: Shader;
  favoriteShaders: number[];
}

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

type ShaderDetailProps = OwnProps & StateProps & DispatchProps;

const ShaderDetail: React.FC<ShaderDetailProps> = ({
  shader,
  addFavorite,
  removeFavorite,
  favoriteShaders,
}) => {
  const [time, setTime] = useState(0.0);
  useEffect(() => {
    console.log("useEffect init time");
    const interval = setInterval(() => {
      setTime((time) => time + 0.1);
    }, 100);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  const [code, setCode] = useState(`
    precision highp float;
    varying vec2 uv;
    uniform vec2      resolution;
    uniform float     time;
    void main() {
      gl_FragColor = vec4(uv.x, uv.y, sin(time), 1.0);
    }
  `);

  const [frag, setFrag] = useState({ frag: `${code}` });
  useEffect(() => {
    console.log("useEffect frag");
    setFrag({ frag: `${code}` });
    // eslint-disable-next-line
  }, [code]);
  useIonViewWillEnter(async () => {
    const file = shader.frag;
    console.log(`${file}`);
    if (file) {
      try {
        const { data } = await Filesystem.readFile({
          path: `shaders/${file}`,
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });
        setCode(data);
      } catch (error) {
        setCode(shader.fragtext);
      }
    }
  });
  /* check on azure if (!shader) {
    return <div>Shader introuvable</div>;
  }*/
  const isFavorite = favoriteShaders.indexOf(shader.id) > -1;

  const toggleFavorite = () => {
    isFavorite ? removeFavorite(shader.id) : addFavorite(shader.id);
  };
  const shareShader = () => {};

  const saveFile = async () => {
    const file = shader.frag ? shader.frag : shader.name;
    await Filesystem.writeFile({
      path: `shaders/${file}`,
      data: code,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  };
  return (
    <IonPage id="shader-detail-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/glsl"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={saveFile}>
              <IonIcon icon={save} />
            </IonButton>
            <IonButton onClick={() => toggleFavorite()}>
              {isFavorite ? (
                <IonIcon slot="icon-only" icon={star}></IonIcon>
              ) : (
                <IonIcon slot="icon-only" icon={starOutline}></IonIcon>
              )}
            </IonButton>
            <IonButton onClick={() => shareShader}>
              <IonIcon slot="icon-only" icon={share}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Surface width="100%" height="70%">
          <Node
            shader={frag}
            uniforms={{
              time: time,
            }}
          />
        </Surface>

        <CodeMirror
          value={code}
          options={{
            mode: "javascript",
            theme: "tomorrow-night-eighties",
            lineWrapping: true,
            smartIndent: true,
            lineNumbers: true,
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            autoCloseTags: true,
            keyMap: "sublime",
            matchBrackets: true,
            autoCloseBrackets: true,
            extraKeys: {
              "Ctrl-Space": "autocomplete",
            },
          }}
          onBeforeChange={(editor, data, value) => {
            setCode(value);
          }}
          onChange={(editor, data, value) => {

          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    shader: selectors.getShader(state, OwnProps),
    favoriteShaders: state.data.favorites,
  }),
  mapDispatchToProps: {
    addFavorite,
    removeFavorite,
  },
  component: withRouter(ShaderDetail),
});
