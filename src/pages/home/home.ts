import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { QuotePage } from '../quote/quote';
import { ConnectionProvider } from '../../providers/connection/connection';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {  
  
  userInfo;
  name;

  constructor(
    public navCtrl: NavController,
    public connections: ConnectionProvider) {    
      this.welcome();
  }
  
  welcome(){
    this.connections.loginCheck(this.connections.loginUrlCheck,{headers:this.connections.headers})
    .then(result=>{
      this.userInfo = result;
      this.name = this.userInfo.first_name + " " + this.userInfo.last_name      
    })
  }
  doLogout(){
    this.navCtrl.setRoot(LoginPage);
    location.reload();//logout using connections.logout currently not working.

    //this.connections.logout()
  }

}
