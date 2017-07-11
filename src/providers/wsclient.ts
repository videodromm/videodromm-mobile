import { Injectable } from '@angular/core';
import { Settings } from './settings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WSClient {
  ws: any;
  url:string;

  constructor(public settings: Settings) {
    this.settings.load().then(() => {
      this.connect();
    });
  }
 /** This function initiates the connection to the web socket server. */
  connect() {
    console.log('connect to '+this.settings.allSettings.wsserverhost + ' port' +this.settings.allSettings.wsserverport);
    let secure:string = (this.settings.allSettings.wsserversecure) ? 'wss://' : 'ws://';
    this.url = secure + this.settings.allSettings.wsserverhost + ':' + this.settings.allSettings.wsserverport; 
    console.log('url '+this.url);
    this.ws = new WebSocket(this.url, []);
    // Set the function to be called when a message is received.
    this.ws.onmessage = this.handleMessageReceived;
    // Set the function to be called when we have connected to the server.
    this.ws.onopen = this.handleConnected;
    // Set the function to be called when an error occurs.
    this.ws.onerror = this.handleError;
  }
  send(msg: string) {
    this.ws.send(msg);
  }
  /**
      This is the function that is called when the WebSocket receives
      a message.
  */
  handleMessageReceived(data) {
    // Simply call logMessage(), passing the received data.
    console.log('ws msg received:' + data.data);
  }

  /**
      This is the function that is called when the WebSocket connects
      to the server.
  */
  handleConnected(data) {
    // Create a log message which explains what has happened and includes
    // the url we have connected too.
    var logMsg = 'Connected to server: ' + data.target.url + ' ip ' + JSON.stringify(data);
    // Add the message to the log.
    console.log(logMsg);
  }

  /**
      This is the function that is called when an error occurs with our
      WebSocket.
  */
  handleError(err) {
    // Print the error to the console so we can debug it.
    console.log("Error: ", err);
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
  
  login(accountInfo: any) {
    let seq = this.api.post('login', accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        if (res.status == 'success') {
          this._loggedIn(res);
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

*/
}
