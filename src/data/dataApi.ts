
import { Glsl, Shader } from '../models/Glsl';
import { Uniform } from '../models/Uniform';

//import { Storage } from '@capacitor/storage';

import axios from "axios";
import { config } from '../env';
//import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { changeUniform } from './shaders/shaders.actions';


const dataUrl = '/assets/data/data.json';
const signalRUrl = config.signalRUrl;


const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const DARK_MODE = 'darkMode';
const HOST = 'host';

/*
Type '{ Accept: string; 'Content-Type': string;
'Access-Control-Allow-Origin': string; 'Content-Length': number; }'
has no properties in common with type 'AxiosRequestConfig'.ts(2559)

const headers: AxiosRequestConfig = {
  headers: {
    'accept': 'text/plain',
    'Content-Type': 'application/json; charset=UTF-8'
  }
};*/

let uniforms = [] as Uniform[];
export const getGlslData = async () => {
  const response = await Promise.all([
    fetch(dataUrl)]);
  const responseData = await response[0].json();
  const glsl = responseData.glsl[0] as Glsl;
  const shaders = parseShaders(glsl);
  uniforms = responseData.uniforms as Uniform[];
  const allTags = shaders
    .reduce((all, shader) => all.concat(shader.tags), [] as string[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort();

  const data = {
    glsl,
    shaders,
    uniforms,
    allTags,
    filteredTags: [...allTags]
  }
  return data;
}

export const getUserData = async () => {
  /*const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: HOST })]);
  const isLoggedin = await response[0].value === 'true';
  const hasSeenTutorial = await response[1].value === 'true';
  const host = await response[2].value || undefined; */
  const data = {
    isLoggedin: false,
    hasSeenTutorial:true,
    host:'127.0.0.1'
  }
  return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
 // await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  //await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) });
}

export const setDarkModeData = async (darkMode: boolean) => {
  //await Storage.set({ key: DARK_MODE, value: JSON.stringify(darkMode) });
}
declare global {
  interface Window { socket: any; ws: any; }
}
function initWs(host: string) {
  /*window.ws = (function () {
    console.log(`ws init ${host}`);
    window.ws = new WebSocket(host);

    this.emit = function (evt, data) {
      window.ws.send(JSON.stringify({ event: evt, message: data }));
    };
    this.send = function (data) {
      window.ws.send(data);
    };
    this.on = function (evt, func) {
      console.log(`ws on ${evt.data} `);
      window.ws.addEventListener(evt, func);
    };
    window.ws.onerror = function (e) { console.log('error: ' + JSON.stringify(e)) };
    window.ws.onopen = function (evt) { console.log('Socket opened') };
    window.ws.onclose = function (evt) { console.log('Socket closed') };
  });*/

  //window.socket = new ws('ws://127.0.0.1:8088');
  //window.socket = new WebSocket('ws://51.210.25.82:8088');
  window.socket = new WebSocket(host);
  window.socket.onmessage = function (evt) {
    console.log(`ws rcvd name:${evt.data} value:${JSON.stringify(evt.data)}`);
    //console.log(`ws rcvd p:${evt.data.params} value:${evt.data.params}`);
    //console.log(`ws rcvd p0:${evt.data.params[0]} value:${evt.data.params[0]}`);
    //console.log(`ws rcvd name:${evt.data.params[0].name} value:${evt.data.params[0].value}`);
    if (evt.data) {
      var messageData = JSON.parse(evt.data);
      if (messageData.params && messageData.params[0]) {
        console.log(`ws rcvd name:${messageData.params[0].name} value:${messageData.params[0].value}`);

      }

    }

    /*var customEvt = new CustomEvent('msg');
    customEvt.data = messageData.params[0];
    dispatchEvent(customEvt);
    window.ws.dispatchEvent(customEvt);*/
  };
}
/*
let connexion: HubConnection;
function initSignalR(signalr: string) {
  connexion = new HubConnectionBuilder()
    .withUrl(signalr)
    .withAutomaticReconnect()
    .build();
  connexion
    .start()
    .then(() => {
      //console.log("SignalR listen");
      connexion.on("newMessage", (msg) => {
        //console.log(`SignalR newMessage: ${JSON.stringify(msg)}`);
        if (msg.sender === 'api') {
          if (msg.text ) {
            uniforms[msg.text.id].value = msg.text.value;
            changeUniform(uniforms[msg.text.id]);
            //console.log(`SignalR api id: ${msg.text.id} name: ${msg.text.name} value: ${msg.text.value} uniform: ${uniforms[msg.text.id].value}`);
            if (window.socket && window.socket.readyState === 1) {
              //if (msg.text.id < 4) msg.text.id += 4;
              window.socket.send(
                '{"params" :[{"name" : ' + msg.text.id + ',"value" :' + msg.text.value + "}]}"
              );
              console.log( `signalR emitToSocket readyState val: ${msg.text.value}, idx: ${msg.text.id} ` );
            } else {
              //console.log(`UniformItem emitToSocket not ready val: ${value}, idx: ${index} `);
            }
          }
        }

      });
    })
    .catch((error) => console.log(error));
}*/
/*
{
  "sender":"api",
  "text":"{\"name\":\"r\",\"about\":\"(foreground)\",\"title\":\"Red\",\"color\":\"#f00\",\"value\":0.17783191032722478,\"id\":1}"}

initSignalR(signalRUrl);*/

export const sendUniform = async (u: Uniform) => {
  if (window.socket && window.socket.readyState === 1) {
    window.socket.send('{"params" :[{"name" : ' + u.id + ',"value" :' + u.value + '}]}');
    console.log(`UniformItem emitToSocket readyState val: ${u.value}, idx: ${u.id} `);
  } else {
    //console.log(`UniformItem emitToSocket not ready val: ${value}, idx: ${index} `);
  }
  /*if (connexion) {
    //console.log(`sendUniform ${u.name} :  ${JSON.stringify(u)}`);
    await connexion.send("messages", JSON.stringify(u));
    axios.post(`${signalRUrl}/messages`, {
      sender: "api",
      text: u,
    });
  }*/
}

export const setHostData = async (host?: string) => {
  /*if (!host) {
    await Storage.remove({ key: HOST });
  } else {
    await Storage.set({ key: HOST, value: host });
    initWs(host);

  }*/
}

function parseShaders(glsl: Glsl) {
  const shaders: Shader[] = [];
  glsl.groups.forEach(g => {
    g.shaders.forEach(s => shaders.push(s))
  });
  return shaders;
}
