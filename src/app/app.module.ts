import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { Insomnia } from '@ionic-native/insomnia';
import { IonicModule, IonicErrorHandler, IonicApp } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppComponent } from './app.component';

import { GameCountComponent } from '../pages/game-count/game-count.component';
import { SettingsComponent } from '../pages/settings/settings.component';
import { HistoryComponent } from '../pages/history/history.component';

import { StorageManagement } from '../providers/storage-management'

@NgModule({
  declarations: [
    AppComponent,
    GameCountComponent,
    SettingsComponent,
    HistoryComponent
  ],
  entryComponents: [
    AppComponent,
    GameCountComponent,
    SettingsComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent, {
      preloadModules: true
    }),
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StorageManagement,
    Insomnia,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
  bootstrap: [IonicApp]
})
export class AppModule { }
