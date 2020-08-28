import { Plugins } from '@capacitor/core';
import { Schedule, Session } from '../models/Schedule';
import { Speaker } from '../models/Speaker';
import { Location } from '../models/Location';

const { Storage } = Plugins;

const dataUrl = '/assets/data/data.json';
const locationsUrl = '/assets/data/locations.json';

const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const DARK_MODE = 'darkMode';
const HOST = 'host';

export const getConfData = async () => {
  const response = await Promise.all([
    fetch(dataUrl),
    fetch(locationsUrl)]);
  const responseData = await response[0].json();
  const schedule = responseData.schedule[0] as Schedule;
  const sessions = parseSessions(schedule);
  const speakers = responseData.speakers as Speaker[];
  const locations = await response[1].json() as Location[];
  const allTracks = sessions
    .reduce((all, session) => all.concat(session.tracks), [] as string[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort();

  const data = {
    schedule,
    sessions,
    locations,
    speakers,
    allTracks,
    filteredTracks: [...allTracks]
  }
  return data;
}

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: HOST })]);
  const isLoggedin = await response[0].value === 'true';
  const hasSeenTutorial = await response[1].value === 'true';
  const host = await response[2].value || undefined;
  const data = {
    isLoggedin,
    hasSeenTutorial,
    host
  }
  return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) });
}

export const setDarkModeData = async (darkMode: boolean) => {
  await Storage.set({ key: DARK_MODE, value: JSON.stringify(darkMode) });
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
      if (messageData.params[0]) {
        console.log(`ws rcvd name:${messageData.params[0].name} value:${messageData.params[0].value}`);

      }

    }

    /*var customEvt = new CustomEvent('msg');
    customEvt.data = messageData.params[0];
    dispatchEvent(customEvt);
    window.ws.dispatchEvent(customEvt);*/
  };
}

export const setHostData = async (host?: string) => {
  if (!host) {
    await Storage.remove({ key: HOST });
  } else {
    await Storage.set({ key: HOST, value: host });
    initWs(host);

  }
}

function parseSessions(schedule: Schedule) {
  const sessions: Session[] = [];
  schedule.groups.forEach(g => {
    g.sessions.forEach(s => sessions.push(s))
  });
  return sessions;
}
