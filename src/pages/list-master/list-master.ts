import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ShaderCreatePage } from '../shader-create/shader-create';
import { ShaderDetailPage } from '../shader-detail/shader-detail';

import { shaders } from '../../providers/providers';

import { Shader } from '../../models/shader';

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Shader[];

  constructor(public navCtrl: NavController, public shaders: shaders, public modalCtrl: ModalController) {
    this.currentItems = this.shaders.query();
  }

  /**
   * The view loaded, let's query our shaders for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new shader. This shows our ShaderCreatePage in a
   * modal and then adds the new shader to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create(ShaderCreatePage);
    addModal.onDidDismiss(shader => {
      if (shader) {
        this.shaders.add(shader);
      }
    })
    addModal.present();
  }

  /**
   * Delete an shader from the list of shaders.
   */
  deleteItem(shader) {
    this.shaders.delete(shader);
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
