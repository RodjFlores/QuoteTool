import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { QuotePage } from '../pages/quote/quote';
import { TabsPage } from '../pages/tabs/tabs';
import { OrdersPage } from '../pages/orders/orders';
import { PartsPage } from '../pages/parts/parts';
import { OrderDetailsPage } from '../pages/order-details/order-details';

import{ CustomerForumPage} from '../pages/customer-forum/customer-forum';
import{ CustomerInfoPage} from '../pages/customer-info/customer-info';
import{ CustomerRequestPage} from '../pages/customer-request/customer-request';
import{ CustomerHomePage} from '../pages/customer-home/customer-home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

