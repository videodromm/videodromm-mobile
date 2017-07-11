import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';

import { ContentPage } from '../content/content';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  // A reference to the ion-nav in our component
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ContentPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public navCtrl: NavController) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Connect', component: SettingsPage }
    ];
  }

  ionViewDidLoad() {
    console.log('Hello MenuPage Page');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
