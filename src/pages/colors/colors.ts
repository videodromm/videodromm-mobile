import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WSClient } from '../../providers/wsclient';

@Component({
  selector: 'page-colors',
  templateUrl: 'colors.html'
})
export class ColorsPage {

  constructor(public wsClient: WSClient,
    public navCtrl: NavController) { 
      
    }

}
