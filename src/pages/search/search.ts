import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ShaderDetailPage } from '../shader-detail/shader-detail';

import { Shader } from '../../models/shader';

import { shaders } from '../../providers/providers';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  
  currentItems: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public shaders: shaders) { }

  /**
   * Perform a service for the proper shaders.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.shaders.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this shader.
   */
  openItem(shader: Shader) {
    this.navCtrl.push(ShaderDetailPage, {
      shader: shader
    });
  }

}
