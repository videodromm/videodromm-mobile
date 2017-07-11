import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WSClient } from '../../providers/wsclient';

@Component({
  selector: 'page-colors',
  templateUrl: 'colors.html'
})
export class ColorsPage {
  red:any = 0.1;
  green:any = 0.1;
  blue:any = 0.1;
  saturation:number = 0.1;
  exposure:number = 0.2;
  constructor(public wsClient: WSClient,
    public navCtrl: NavController) { 
      
    }
  sliderChange(event, sliderName) {
    // value is event._valA
    this.wsClient.send('{"params" :[{"name" : ' + sliderName + ',"value" :' + (event._valA/100) + '}]}');
  }

}
