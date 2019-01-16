import { Component } from '@angular/core';

import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GameCountComponent } from '../pages/game-count/game-count.component';
import { SettingsComponent } from '../pages/settings/settings.component';
import { HistoryComponent } from '../pages/history/history.component';

@Component({
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menu: MenuController
  ) {
    

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.hideSplashScreen();
      menu.enable(true);
    this.rootPage = GameCountComponent;
    });
  }

  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
     }
    }

  openPage(page: any) {
    this.menu.close();
    if (page === 'Settings') {
      this.rootPage = SettingsComponent;
    } else if (page === 'History') {
      this.rootPage = HistoryComponent;
    } else {
      this.rootPage = GameCountComponent;
    }

  }
}
