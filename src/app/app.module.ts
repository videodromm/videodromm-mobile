import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { CardsPage } from '../pages/cards/cards';
import { ContentPage } from '../pages/content/content';
import { ShaderCreatePage } from '../pages/shader-create/shader-create';
import { ShaderDetailPage } from '../pages/shader-detail/shader-detail';
import { ListMasterPage } from '../pages/list-master/list-master';
import { MenuPage } from '../pages/menu/menu';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';

import { Api } from '../providers/api';
import { shaders } from '../mocks/providers/shaders';
import { Settings } from '../providers/settings';
import { WSClient } from '../providers/wsclient';

import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    showtutorial: true,
    wsserverhost: '127.0.0.1',
    wsserverport: '8088',
    wsserversecure: false,
    username: ''
  });
}

@NgModule({
  declarations: [
    MyApp,
    CardsPage,
    ContentPage,
    ShaderCreatePage,
    ShaderDetailPage,
    ListMasterPage,
    MenuPage,
    SearchPage,
    SettingsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CardsPage,
    ContentPage,
    ShaderCreatePage,
    ShaderDetailPage,
    ListMasterPage,
    MenuPage,
    SearchPage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    Api,
    shaders,
    WSClient,
    Camera,
    SplashScreen,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
