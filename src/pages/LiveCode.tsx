import React, { useState, useEffect } from "react";

import { IonContent, IonPage } from "@ionic/react";

import "./LiveCode.scss";

import { Node, Visitor } from "gl-react";
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

const LiveCode: React.FC = () => {
  const [error, setError] = useState(null);
  const visitor = new Visitor();

  visitor.onSurfaceDrawError = (err: Error) => {
    setError({ err });
    return true;
  };
  visitor.onSurfaceDrawEnd = () => setError(null);

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
    varying vec2  uv;
    uniform vec2  resolution;
    uniform float time;
    void main() {
      gl_FragColor = vec4(uv.x, uv.y, sin(time), 1.0);
    }
  `);

  const [frag, setFrag] = useState({ frag: `${code}` });
  useEffect(() => {
    setFrag({ frag: `${code}` });
    // eslint-disable-next-line
  }, [code]);
  return (
    <IonPage id="gl-view">
      <IonContent>
        <Surface
          width={window.innerWidth}
          height={window.innerHeight}
          visitor={visitor}
        >
          <Node
            shader={frag}
            uniforms={{
              time: time,

            }}
          />
        </Surface>
        {/*
        shift: 1.6,
    speed: [1.0, 1.0],
    resolution: [200, 200],

 foldGutter: true,gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
       */}
        <div className="cm">
          <CodeMirror
            value={code}
            options={{
              mode: "javascript",
              theme: "tomorrow-night-eighties",
              lineWrapping: true,
              smartIndent: true,
              lineNumbers: true,

              gutters: ["CodeMirror-linenumbers"],
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
              setCode(value);
            }}
          />
          {error ? (
            <div className="compile error">{error.err.rawError}</div>
          ) : (
            <div className="compile success">Compilation success!</div>
          )}
        </div>
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
       */}
      </IonContent>
    </IonPage>
  );
};

export default LiveCode;
