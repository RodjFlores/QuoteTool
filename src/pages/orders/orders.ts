import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrderDetailsPage } from '../order-details/order-details';

import { ConnectionProvider } from '../../providers/connection/connection';

/**
 * Generated class for the OrdersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  public orders= [];
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public connections: ConnectionProvider) {
    this.displayOrder();    
  }
  //REFRESHES PAGE AND CHANGES THE ORDERS
  doRefresh(refresher) {
    this.orders = []
    this.displayOrder();
    setTimeout(() => {      
      refresher.complete();
    }, 400);
         
  }

  /************************************ 
   * Displays order details, using connections's getOrder and customerGet to get info
   ************************************/
  displayOrder(){
    this.connections.getOrder()
    .then(result =>{
      for(let order of result['orders']){
        console.log(order.CompanyId)       
        this.connections.customerGet(order.CompanyId)
          .then(result=>{
            let orderDetails = {
            company: result['CompanyName'],
            contactName: order.contact_name,
            email: order.contact_email,
            products: order.products,
            subtotal: order.subtotal,
            total: order.total,
            comments: order.comments,
            id: order._id,
            date: new Date(order.addedOn).toDateString()
            }
            this.orders.push(orderDetails)            
          })
      }
      console.log(this.orders)
          
    },(err)=>{
      console.log('Failed');
    })    
  }
  //info is sent in the parameters to orderdetails pages.
  displayDetails(event, order){
    let info = this.orders[this.orders.indexOf(order)];
    this.navCtrl.push(OrderDetailsPage,{info:info})
  }

  deleteOrder(id){
    this.connections.deleteOrder(id);
  }
}
