import React, {useState} from "react";
import { IonContent, IonPage } from "@ionic/react";
import "./About.scss";
import ShadertoyReact from "shadertoy-react";

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

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  /*
 https://www.npmjs.com/package/shadertoy-react

 Device Orientation!
 const fragmentShader = `
#define PI 3.1415926535898
#define DEGTORAD PI / 180.

// from https://www.shadertoy.com/view/XlXBRn

// helper converting your euler values to a rotation matrix.
// code ported over to glsl from https://dev.opera.com/articles/w3c-device-orientation-usage/
mat3 getBaseRotationMatrix( vec3 euler ) {
  float _x = euler.y * DEGTORAD;
  float _y = euler.z * DEGTORAD;
  float _z = euler.x * DEGTORAD;

  float cX = cos( _x );
  float cY = cos( _y );
  float cZ = cos( _z );

  float sX = sin( _x );
  float sY = sin( _y );
  float sZ = sin( _z );

  float m11 = cZ * cY - sZ * sX * sY;
  float m12 = - cX * sZ;
  float m13 = cY * sZ * sX + cZ * sY;

  float m21 = cY * sZ + cZ * sX * sY;
  float m22 = cZ * cX;
  float m23 = sZ * sY - cZ * cY * sX;

  float m31 = - cX * sY;
  float m32 = sX;
  float m33 = cX * cY;

  return mat3(
    m11,    m12,    m13,
    m21,    m22,    m23,
    m31,    m32,    m33
  );
}

mat3 getScreenTransformationMatrix( float screenOrientation ) {
	float orientationAngle = screenOrientation * DEGTORAD;

	float cA = cos( orientationAngle );
	float sA = sin( orientationAngle );

	// Construct our screen transformation matrix
	return mat3(
		cA,    -sA,    0,
		sA,    cA,     0,
		0,     0,      1
	);
}

mat3 getWorldTransformationMatrix() {
	float x = 90. * DEGTORAD;

	float cA = cos( x );
	float sA = sin( x );

	return mat3 (
		1,     0,    0,
		0,     cA,   -sA,
		0,     sA,   cA
	);
}

float map(vec3 p)
{
  vec3 q = fract(p)*2.-1.;
  return length(q)-0.25;
}

float trace(vec3 origin, vec3 ray)
{
  float t=0.;
  for(int i=0; i<32; i++){
    vec3 p = origin + t*ray;
    float d=map(p);
    t += d*0.5;
  }
  return t;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;
  uv = uv*2. -1.;
  uv.x *= iResolution.x/iResolution.y;

  //code ported over to glsl from https://dev.opera.com/articles/w3c-device-orientation-usage/
  mat3 rotationMatrix = getBaseRotationMatrix(vec3(iDeviceOrientation.x, -iDeviceOrientation.y, -iDeviceOrientation.z)); // R
  //mat3 screenTransform = getScreenTransformationMatrix( iDeviceOrientation.w ); // r_s
  //mat3 screenAdjustedMatrix = rotationMatrix * screenTransform; // R_s
  mat3 screenAdjustedMatrix = rotationMatrix;
  mat3 worldTransform = getWorldTransformationMatrix(); // r_w
  mat3 finalMatrix = screenAdjustedMatrix * worldTransform; // R_w

  vec3 ray = normalize(vec3(uv,1.)) * finalMatrix; //Multiply the raydirection by our device rotation matrix.

  //vec3 ori = vec3(0.,0.,-3.);
  vec3 ori = vec3(0., 0., iTime * 2.);
  float t = trace(ori, ray);

  float fog = 1.0/(1.0+t*t*0.1);
  vec3 color = vec3(fog);

	fragColor = vec4(color,1.0);
}
`;

https://codesandbox.io/s/434qm4x4w0

*/
  const scrollY = 0.5;

  const uniforms = {
    uScrollY: { type: "1f", value: scrollY }, // float
    uTestArrayFloats: { type: "1fv", value: [0.2, 0.4, 0.5, 0.5, 0.6] }, // Array of float
    uTestArrayVecs2: { type: "2fv", value: [0.2, 0.4, 0.5, 0.5] }, // 2 vec2 passed as a flat array
    uTestMatrix: {
      type: "Matrix2fv",
      value: [0, 1, 2, 3], // 2x2 Matrix
    },
  };

  const [code, setCode] = useState(`
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;
  vec4 texture = texture(iChannel0, uv);
  vec3 col = texture.rgb *  0.5*cos(iTime+uv.xyx+vec3(0,2,4));
	fragColor = vec4(col,1.0);
}
`);
  return (
    <IonPage id="about-page">
      <IonContent>
        <ShadertoyReact
          uniforms={uniforms}
          fs={code}
          textures={[{ url: "/assets/textures/stingray1024.jpg" }]}
        />
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
            setCode(value);
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default React.memo(About);
