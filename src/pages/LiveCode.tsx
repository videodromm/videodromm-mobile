import React, { useState, useEffect } from "react";
import { isPlatform  } from '@ionic/core';
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

import "./LiveCode.scss";

import { connect } from "../data/connect";
import { withRouter, RouteComponentProps } from "react-router";
import * as selectors from "../data/selectors";
import { share } from "ionicons/icons";

import { updateUniform } from "../data/shaders/shaders.actions";
import { Shader } from "../models/Glsl";
import { Uniform } from "../models/Uniform";

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
import { Dial } from "react-nexusui";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  shader?: Shader;
  uniforms: Uniform[];
}
interface DispatchProps {
  updateUniform: typeof updateUniform;
}
type ProjectionProps = OwnProps & StateProps & DispatchProps;

const LiveCode: React.FC<ProjectionProps> = ({
  shader,
  uniforms,
  updateUniform,
}) => {
  const [time, setTime] = useState(0.0);
  useEffect(() => {
    console.log(`useEffect init time and signalR mode: ${isPlatform('android')}`);

    if (isPlatform('android')) {
      window.socket = new WebSocket(`ws://51.210.25.82:8088`);
    } else {
      window.socket = new WebSocket(`ws://127.0.0.1:8088`);
    }
    const interval = setInterval(() => {
      setTime((time) => time + 0.1);
    }, 100);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    //console.log("useEffect uniforms");

    // eslint-disable-next-line
  }, [uniforms]);

  const [code, setCode] = useState(`
    precision highp float;
    varying vec2 uv;
    uniform vec2      resolution;
    uniform float     time;
    uniform float     rouge, vert, bleu, chrm;
    void main() {
      gl_FragColor = vec4(rouge, vert*chrm, sin(time)*uv.y*resolution.x*bleu, 1.0);
    }
  `);

  const [frag, setFrag] = useState({ frag: `${code}` });
  useEffect(() => {
    //console.log("useEffect frag");
    setFrag({ frag: `${code}` });
    // eslint-disable-next-line
  }, [code]);
  useIonViewWillEnter(async () => {
    if (shader) {
      const file = shader.frag;
      console.log(`file: ${file}`);
      //console.log(`${JSON.stringify(uniforms[0])}`);
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
    }
  });

  const emitFragToSocket = () => {
    let msg = code.replace(/uniform vec2 resolution/, 'uniform vec3 iResolution');
    msg = msg.replace(/resolution/g, 'iResolution');
    msg = msg.replace(/uniform float time/, 'uniform float iTime');
    msg = msg.replace(/time/g, 'iTime');
    msg = msg.replace(/void main\(\)/, 'vec4 glreact(vec2 uv)');
    msg = msg.replace(/gl_FragColor =/, 'return ');
    msg += 'void main(){vec2 uv = gl_FragCoord.xy / iResolution.xy;gl_FragColor = glreact(uv);}';
    console.log(`emitFragToSocket ${msg}`);
    let cleanMsg = `{"event":"frag","message":"${msg}"}`;
    //cleanMsg = cleanMsg.replace(/\"/gi, '"');
    cleanMsg = cleanMsg.replace(/\t/gi, " ");
    cleanMsg = cleanMsg.replace(/\n/gi, "");
    if (window.socket && window.socket.readyState === 1) {
      window.socket.send(cleanMsg);
      console.log(`emitFragToSocket readyState`);
    } else {
      console.log(`emitFragToSocket not ready`);
    }
  };
  const shareShader = () => {
    console.log("shareShader");
    emitFragToSocket();
  };

  const saveFile = async () => {
    const file = shader.frag ? shader.frag : shader.name;
    await Filesystem.writeFile({
      path: `shaders/${file}`,
      data: code,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  };
  // ws

  if (window.socket && window.socket.readyState === 1) {

    window.socket.onmessage = function (evt:any) {
      //console.log(`ws rcvd name:${evt.data} value:${JSON.stringify(evt.data)}`);
      if (evt.data) {
        var messageData = JSON.parse(evt.data);
        if (messageData.params && messageData.params[0]) {
          console.log(`ws rcvd name:${messageData.params[0].name} value:${messageData.params[0].value}`);
          uniforms[messageData.params[0].name].value = messageData.params[0].value;
        }
      }
    };
  }
  // nexusui
  let dialRefs = React.useRef([] as any[]);

  const emitToSocket = async (value: number, index: number) => {
    //console.log(`emitToSocket index: ${index}`);
    uniforms[index].value = value;
    updateUniform(uniforms[index]);
  };
  return (
    <IonPage id="projection-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <Dial
              interaction={"radial"}
              key={5}
              onReady={(dialRef) => {
                dialRefs.current.push(dialRef);
                dialRef.colorize("accent", uniforms[5].color);
                dialRef.value = uniforms[5].value;
              }}
              onChange={(value) => {
                emitToSocket(value, 5);
              }}
              value={uniforms[5].value}
              min={0}
              max={1}
            />
            <Dial
              interaction={"radial"}
              key={6}
              onReady={(dialRef) => {
                dialRefs.current.push(dialRef);
                dialRef.colorize("accent", uniforms[6].color);
                dialRef.value = uniforms[6].value;
              }}
              onChange={(value) => {
                emitToSocket(value, 6);
              }}
              value={uniforms[6].value}
              min={0}
              max={1}
            />
            <Dial
              interaction={"radial"}
              key={7}
              onReady={(dialRef) => {
                dialRefs.current.push(dialRef);
                dialRef.colorize("accent", uniforms[7].color);
                dialRef.value = uniforms[7].value;
              }}
              onChange={(value) => {
                emitToSocket(value, 7);
              }}
              value={uniforms[7].value}
              min={0}
              max={1}
            />
            <Dial
              interaction={"radial"}
              key={14}
              onReady={(dialRef) => {
                dialRefs.current.push(dialRef);
                dialRef.colorize("accent", uniforms[14].color);
                dialRef.value = uniforms[14].value;
              }}
              onChange={(value) => {
                emitToSocket(value, 14);
              }}
              value={uniforms[14].value}
              min={0}
              max={1}
            />
          </IonButtons>
          <IonButtons slot="end">
            <IonBackButton defaultHref="/accueil"></IonBackButton>

            <IonButton onClick={() => saveFile()}>
              <IonIcon icon={save} />
            </IonButton>

            <IonButton onClick={() => shareShader()}>
              <IonIcon slot="icon-only" icon={share}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Surface width="1440" height="900">
          <Node
            shader={frag}
            uniforms={{
              resolution: [1440, 900],
              time: time,
              rouge: uniforms[5].value,
              vert: uniforms[6].value,
              bleu: uniforms[7].value,
              chrm: uniforms[14].value,
            }}
          />
        </Surface>
        <div className="cm">
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
          onChange={(editor, data, value) => {}}
        />
        </div>
      </IonContent>
    </IonPage>
  );
};
/*
<IonPage id="glsl-page">
      <IonContent fullscreen={true}>
        <ProjectionList
          glsl={glsl}
        />
        */
export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    shader: selectors.getProjectionShader(state),
    uniforms: selectors.getUniforms(state),
  }),
  mapDispatchToProps: {
    updateUniform,
  },
  component: withRouter(LiveCode),
});
