import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { shaders } from '../../providers/providers';

@Component({
  selector: 'page-shader-detail',
  templateUrl: 'shader-detail.html'
})
export class ShaderDetailPage {
  shader: any;

  constructor(public navCtrl: NavController, navParams: NavParams, shaders: shaders) {
    this.shader = navParams.get('shader') || shaders.defaultItem;
  }

}
