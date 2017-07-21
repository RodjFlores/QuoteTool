import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
/**
 * Generated class for the CustomerHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-home',
  templateUrl: 'customer-home.html',
})
export class CustomerHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  doLogout(){
    this.navCtrl.setRoot(LoginPage)
    location.reload();
  }

}
