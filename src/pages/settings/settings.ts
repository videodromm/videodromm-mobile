import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Settings } from '../../providers/settings';

import { TranslateService } from '@ngx-translate/core';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // Our local settings object
  options: any;

  settingsReady = false;

  form: FormGroup;

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;

  subSettings: any = SettingsPage;
  // This is a variable for our WebSocket.
  ws:any;

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService) {
  }

  _buildForm() {
    let group: any = {
      wsserverhost: [this.options.wsserverhost],
      wsserverport: [this.options.wsserverport],
      username: [this.options.username]
    };

    switch (this.page) {
      case 'main':
        break;
      case 'profile':
        group = {
          showtutorial: [this.options.showtutorial]
        };
        break;
    }
    this.form = this.formBuilder.group(group);

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.settings.merge(this.form.value);
    });
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    })

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      this._buildForm();
    });
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }
  // Send test message
  doSend() {
     this.ws.send(this.options.username);
  }
  // Attempt to connect to ws server
  doLogin() {
    
    this.connect();
    /*this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });*/
  }    
  /** This function initiates the connection to the web socket server. */
  connect() {
    console.log('connect');
        // Create a new WebSocket to the SERVER_URL (defined above). The empty
        // array ([]) is for the protocols, which we are not using for this
        // demo.
        this.ws = new WebSocket('ws://' + this.options.wsserverhost + ':' + this.options.wsserverport, []);
        // Set the function to be called when a message is received.
        this.ws.onmessage = this.handleMessageReceived;
        // Set the function to be called when we have connected to the server.
        this.ws.onopen = this.handleConnected;
        // Set the function to be called when an error occurs.
        this.ws.onerror = this.handleError;
    }

    /**
        This is the function that is called when the WebSocket receives
        a message.
    */
    handleMessageReceived(data) {
        // Simply call logMessage(), passing the received data.
        console.log(data.data);
    }

    /**
        This is the function that is called when the WebSocket connects
        to the server.
    */
    handleConnected(data) {
        // Create a log message which explains what has happened and includes
        // the url we have connected too.
        var logMsg = 'Connected to server: ' + data.target.url;
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

}
