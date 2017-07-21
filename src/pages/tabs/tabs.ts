import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { LoginPage } from '../login/login';// FIELD AGENT PAGE IMPORTS
import { QuotePage } from '../quote/quote';
import { HomePage } from '../home/home';
import { OrdersPage } from '../orders/orders';
import { PartsPage } from '../parts/parts';

import{ CustomerHomePage } from '../customer-home/customer-home';//Customer page imports
import{ CustomerInfoPage} from '../customer-info/customer-info';
import{ CustomerRequestPage } from '../customer-request/customer-request';
import{ CustomerForumPage} from '../customer-forum/customer-forum'
@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  userIsCustomer;
  
  tab1Root;title1;icon1;
  tab2Root;title2;icon2;
  tab3Root;title3;icon3;
  tab4Root;
    

  constructor(public navParams: NavParams) {

    this.userIsCustomer = this.navParams.get('state')  
    //should use a for loop if pages is unknown. to iterate
    if(this.userIsCustomer=='customer'){
      this.tab1Root = CustomerForumPage;
      this.tab2Root = CustomerInfoPage;
      this.tab3Root = CustomerRequestPage;
      this.tab4Root = CustomerHomePage;

      this.icon1 = 'paper'
      this.icon2 = 'information'
      this.icon3 = 'create'
      
      this.title1 = 'Forums'
      this.title2 = 'Info'
      this.title3 = 'Request'
      
      console.log('logged in as customer')  
    }else if(this.userIsCustomer=='agent'){
      this.tab1Root = QuotePage;
      this.tab2Root = OrdersPage;
      this.tab3Root = PartsPage;
      this.tab4Root = HomePage;

      this.icon1 = 'pricetags'
      this.icon2 = 'clipboard'
      this.icon3 = 'hammer'
      
      this.title1 = 'Quote'
      this.title2 = 'Orders'
      this.title3 = 'Parts'
      console.log('logged in as agent')
    } 
    
  }
  
  
}