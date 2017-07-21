import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';
import { Toast } from '@ionic-native/toast';

import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { ConnectionProvider } from '../../providers/connection/connection';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {  

  public email; 
  public password;  

  constructor(
    public navCtrl: NavController,      
    public http: Http,
    public connections: ConnectionProvider,
    public toastCtrl: Toast) {      

  }
  

  //If login is correct, then user is redirected to HomePage
  doLogin() {     
    try {      
      this.connections.login(/*this.email,this.password*/).then((result)=>{
        if(result){
          this.openPage();
        }else if (!result){
          this.presentToast();
          console.log('Wrong')
        }
      })               
    }catch (err) {
      console.log('Wrong Information');
    }
  }

  //these two openpages sets Root to either the customer or the agent version of the app
  openPage(){
    this.navCtrl.setRoot(TabsPage,{state:'agent'});
  }
  openCustomerPage(){       
    this.navCtrl.setRoot(TabsPage,{state:'customer'});
  }

  presentToast() {
    this.toastCtrl.showShortBottom('Incorrect Login Details').subscribe(
      toast=>{
        console.log(toast)
      }
    );    
  }
  
}
