import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';


/**
 * Generated class for the CustomerRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-request',
  templateUrl: 'customer-request.html',
})
export class CustomerRequestPage {

  siteName;
  contactName;
  phone;
  email;
  siteId;
  serial;
  tickerNum;
  comment;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }
  
  send(){
    let alert = this.alertCtrl.create({
      title: 'Should send to techinicalcallcenter@mi.konicaminolta.us',
      subTitle: this.siteName + " request for " + this.serial+" - "+this.tickerNum +" - "+this.siteId + "Comments: " + this.comment,
      buttons: ['OK']
    })
    alert.present();
  } 

}
