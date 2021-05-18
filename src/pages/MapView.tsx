import React, { useEffect, useState } from "react";
import Map from "../components/Map";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonPage,
} from "@ionic/react";
import { Location } from "../models/Location";
import { connect } from "../data/connect";
import * as selectors from "../data/selectors";
import "./MapView.scss";
import { Shaders, Node, GLSL } from "gl-react";
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

interface OwnProps {}

interface StateProps {
  locations: Location[];
  mapCenter: Location;
}

interface DispatchProps {}

interface MapViewProps extends OwnProps, StateProps, DispatchProps {}

const MapView: React.FC<MapViewProps> = ({ locations, mapCenter }) => {
  const shaders = Shaders.create({
    helloBlue: {
      frag: GLSL`
        precision highp float;
        varying vec2 uv;
        void main() {
          gl_FragColor = vec4(uv.x, uv.y, 0.1, 1.0);
        }`,
    },
    smoke: {
      frag: GLSL`
        precision mediump float;

        uniform vec2      resolution;
        uniform float     time;
        uniform float     alpha;
        uniform vec2      speed;
        uniform float     shift;

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(6.9898, 1.1414))) * 4.0);
        }

        float noise(vec2 n) {
          const vec2 d = vec2(0.0, 1.0);
          vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
          return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
        }

        float fbm(vec2 n) {
          float total = 0.0, amplitude = 1.0;
          for (int i = 0; i < 4; i++) {
            total += noise(n) * amplitude;
            n += n;
            amplitude *= 0.5;
          }
          return total;
        }

        void main() {

          const vec3 c1 = vec3(1.0/255.0, 0.0/255.0, 97.0/255.0);
          const vec3 c2 = vec3(150.0/255.0, 0.0/255.0, 161.4/255.0);
          const vec3 c3 = vec3(0.0, 0.0, 0.8);
          const vec3 c4 = vec3(164.0/255.0, 1.0/255.0, 214.4/255.0);
          const vec3 c5 = vec3(0.0);
          const vec3 c6 = vec3(0.6);

          vec2 p = gl_FragCoord.xy * 8.0 / resolution.xx;
          float q = fbm(p - time * 0.5);
          vec2 r = vec2(fbm(p + q + time * speed.x - p.x - p.y), fbm(p + q - time * speed.y));
          vec3 c = mix(c1, c2, fbm(p + r)) + mix(c3, c4, r.x) - mix(c5, c6, r.y);
          float grad = gl_FragCoord.x / resolution.x;
          gl_FragColor = vec4(c * sin(shift * gl_FragCoord.y / resolution.y), 1.0);
          gl_FragColor.xyz *= 1.0;
        }
      `,
    },
  });

  const [time, setTime] = useState(0.0);
  const [code, setCode] = React.useState("balh");
  //KO console.log(shaders.smoke.frag);
  useEffect(() => {
    console.log("useEffect init time");
    const interval = setInterval(() => {
      setTime((time) => time + 0.1);
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <IonPage id="map-view">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="map-page">
        <p>MapView</p>
        <Surface width={200} height={200}>
          <Node
            shader={shaders.smoke}
            uniforms={{
              shift: 1.6,
              time: time,
              speed: [1.0, 1.0],
              resolution: [200, 200],
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
          onChange={(editor, data, value) => {}}
        />

        {/*
 ok <Node
          shader={shaders.helloBlue}
        />
 onMouseMove={this.handleMouseMove}uniforms={{
            shift: 1.6,
            time: time / 1000,
            speed: [1.0, 1.0],
            resolution: [this.width, this.height]
          }}
      <Node
      shader={shaders.helloBlue}

    />
      <Map locations={locations} mapCenter={mapCenter} /> */}
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    locations: state.data.locations,
    mapCenter: selectors.mapCenter(state),
  }),
  component: MapView,
});
