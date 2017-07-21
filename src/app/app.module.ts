import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { QuotePage } from '../pages/quote/quote';
import { ConnectionProvider } from '../providers/connection/connection';
import { TabsPage } from '../pages/tabs/tabs';
import { OrdersPage } from '../pages/orders/orders';
import { PartsPage } from '../pages/parts/parts';
import { OrderDetailsPage } from '../pages/order-details/order-details';

import{ CustomerForumPage} from '../pages/customer-forum/customer-forum';
import{ CustomerInfoPage} from '../pages/customer-info/customer-info';
import{ CustomerRequestPage} from '../pages/customer-request/customer-request';
import{ CustomerHomePage} from '../pages/customer-home/customer-home';

import { Toast } from '@ionic-native/toast';
import { EmailComposer } from '@ionic-native/email-composer';
import { HttpModule }      from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    QuotePage,
    TabsPage,
    OrdersPage,
    PartsPage,
    OrderDetailsPage,
    CustomerForumPage,
    CustomerInfoPage,
    CustomerRequestPage,
    CustomerHomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    QuotePage,
    TabsPage,
    OrdersPage,
    PartsPage,
    OrderDetailsPage,
    CustomerForumPage,
    CustomerInfoPage,
    CustomerRequestPage,
    CustomerHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectionProvider,
    Toast,
    EmailComposer
  ]
})
export class AppModule {}
