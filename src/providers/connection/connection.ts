import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';
import { Toast } from '@ionic-native/toast';

import { HomePage } from '../../pages/home/home';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConnectionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ConnectionProvider {

  
  public loginUrl = 'http://10.227.6.20:5000/api/v1/users/login';
  public logoutUrl = 'http://10.227.6.20:5000/api/v1/users/'
  public loginUrlCheck = 'http://10.227.6.20:5000/api/v1/users/me';
  public customersUrl ="http://10.227.6.20:5000/api/v1/customers/";
  public partsUrl = "http://10.227.6.20:5000/api/v1/parts/";
  public ordersUrl = "http://10.227.6.20:5000/api/v1/orders";
  public equipmentUrl = "http://10.227.6.20:5000/api/v1/equipment/";
  public headers = new Headers()
  public currentUser;

  
  

  constructor( public http: Http ) {    
  }
  /************************************ 
   * Login and Logout functions
   ************************************/
  
  // This is the initial login check, must have correct user/pass.
  login(/*email,password*/) {
    let loginInfo = {
      'email': 'mpi5@gmail.com',
      'password': '123456!'
    }
    return new Promise((resolve, reject) => {
      try {
        this.headers.append('Content-Type', 'application/json; charset=utf-8');
        this.http.post(this.loginUrl, JSON.stringify(loginInfo), { headers: this.headers })
          .subscribe(response => {

            let token = response.headers.get('x-auth');
            this.headers.append('x-auth', token);
            localStorage.setItem('x-auth', token);
            resolve(true);
            this.loginCheck(this.loginUrlCheck, { headers: this.headers });
          }, (err) => {
            resolve(false)  
          })
      } catch (err) {
        reject(false);
        console.log("Error: Caught");
      }
    });
  }
  //// This is the secondary login check, in case something goes wrong in between token value exhanges( OPTIONAL? )
  loginCheck(url, header) {
    return new Promise((resolve, reject) => {
      this.http.get(url, header)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)          
        }, (err) => {
          console.log('GET failed')
          console.log(err)
        })
    })
  }        
  // Deletes the token and logs user out
  logout(){    
    console.log(localStorage.getItem('x-auth'))//the token is correctly placed here

    this.http.delete(this.logoutUrl+localStorage.getItem('x-auth'), {headers:this.headers})
    .subscribe(result => {
      
      console.log(this.logoutUrl+localStorage.getItem('x-auth')+" ----TOKEN DELETED, logout")  
    },(err)=>{console.log('Logout Failed')})
  }/************************************ 
   * Get Customer info and returns values
   ************************************/
  customerGet(id) {
    return new Promise((resolve)=>{
    this.http.get(this.customersUrl + id, {headers:this.headers})
    .map(res => res.json())
    .subscribe(data => {      
      try { 
        let customerInfo = {
        CompanyName:data.customer.CompanyName,
        Street:data.customer.Address,
        City:data.customer.City + ", " + data.customer.StateCode + ", " + data.customer.Zip
      }      
      resolve(customerInfo)
           
      } catch (err) {
        let customerInfo = {
          CompanyName: '--',
          Street: '--',
          City: '--'
        }
        resolve(customerInfo)
        console.log('Invalid Customer ID')
      }
    },(err) => {        
        console.log(err)
      })
      })
  }
  /************************************ 
   * Methods for posting orders, get, edit and delete
   ************************************/
  postOrder(){
    let order = {
      CompanyId: '2003635',
      contact_name: 'Rod Flores 5',
      contact_email: 'rod.flores5@konicaminolta.com ',
      products: [{quantity:'alot more',product_code:'code 12'}]
    }
    console.log(localStorage.getItem('x-auth'));
    this.http.post(this.ordersUrl,JSON.stringify(order),{headers:this.headers})
    .subscribe(response =>{
      console.log(response);
    })
  }
  getOrder() {
    return new Promise((resolve) => {
      this.http.get(this.ordersUrl, { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },(err)=>{ console.log('Failed to get Orders')})
    })
  }
  deleteOrder(id){
    this.headers.append('Access-Control-Allow-Methods','DELETE');    
    this.http.delete(this.ordersUrl + '/'+id, {headers:this.headers})
      .subscribe(result => {console.log(result)},(err)=>{console.log('error id')})  
  }   


}
