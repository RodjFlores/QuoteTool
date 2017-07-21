import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';
import { ConnectionProvider } from '../../providers/connection/connection';

/**
 * Generated class for the QuotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html',
})
export class QuotePage {  
  
  company:string = "--";
  street:string = "--";
  city:string = "--";
  customerInfo; servicesInfo; productsInfo; contactName; contactEmail; contactPhone;
  
  
  itemList:any = [];// IMPORTANT array that hold the item names,code, quantity, and price 
  total;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public connections: ConnectionProvider, 
    public http: Http, 
    public alertCtrl: AlertController) {

    this.http.get('assets/services.json')//Get LOCAL json file of services
      .map(res => res.json())
      .subscribe(data => {
        this.servicesInfo = data;
        console.log(this.servicesInfo)
    });            
  }
  /***************************************************
   * *************************************************
   * (SECTION 1) is about customers and their information
   * 
   *  Includes:
   *  -customerFind( connects to DB and finds the customer by ID)
   *  -quoteSend ( Send email with the inputted information from the input forms)    
   ***************************************************   
   ***************************************************/  
  customerFind(id) {
    this.connections.customerGet(id)
    .then(result=>{
      this.company = result['CompanyName']
      this.street = result['Street']
      this.city = result['City']
    })
  }
  //****As of right now, email function is hard to debug and test on a non mobile devive. Even using Ionic View gives fake results.
  quoteSend(){
    this.connections.postOrder()
    let alert = this.alertCtrl.create({
            title: 'Quote Sent: ',
            subTitle: this.contactName + " at " + this.contactEmail,
            buttons: ['OK']
        });
        alert.present();
    /*try{     
            if (this.emailComposer.isAvailable()) {
                this.toast.show('Sent: ' + this.contactName + " @ " + this.email, '3000', 'center')
                    .subscribe(toast => {
                        console.log(toast);
                    });
                let email = {
                    app: 'com.google.android.gm',
                    to: 'rod.flores@konicaminolta.com',

                    subject: 'My Cool Image',
                    body: 'Hey Simon, what do you thing about this image?',
                    isHtml: true
                };
                this.emailComposer.open(email);
            }
            else {
                this.toast.show('Email FAIL', '3000', 'center')
                    .subscribe(toast => {
                        console.log(toast);
                    });
            }    
        }
        catch(err){
            console.log('Email Function Unavailable on non-mobile enviroments')
        }
        */
  }
  /***************************************************
   * *************************************************
   * (SECTION 2) is about the variable 'itemList' and all its manipulations
   * 
   * Includes:
   *  -addServices && addProduct/findProducts (from local JSON & DB)  
   *  -getTotal( gets total price of all current items)
   *  -deleteItem(deletes selected item with a slide)
   * *************************************************
   ***************************************************/
  addServices() {
    let code = 'PRODUCT CODE';
    let alert = this.alertCtrl.create();
    alert.setTitle("Pick Services");

    for (let service of this.servicesInfo) {// Goes through each service from the JSON data and adds it as an option
      alert.addInput({
        type: 'checkbox',
        label: service.DESCRIPTION,
        value: this.servicesInfo.indexOf(service)
      });
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Add',
      handler: data => {
        console.log(data);

        for (let d of data) { // For each service selected, the selection is pushed up to the array 'itemList'
          this.itemList.push({
            name: this.servicesInfo[d].DESCRIPTION,
            pcode: this.servicesInfo[d]['PRODUCT CODE'],
            price: this.servicesInfo[d].PRICE,
            qty: 1
          });
          this.getTotal();
        }
      }
    })
    alert.present();
  }
  //addProducts, addItem, findProduct work together to find find an item from the DB, then add it to 'itemList'
  addProducts() {
    let alert = this.alertCtrl.create(
      {
        title: 'Product Search',
        message: 'Enter a product code',
        inputs: [{
          name: 'ID',
          placeholder: 'ID'
        }],
        buttons: [{
          text: 'Top Items',
          handler: data => {
            console.log('Popular Products')
          }
        },{
            text: 'Add',
            handler: data => {              
              this.findProduct(data.ID);//2nd step to addProduct function chain           
            }
          }]
      }
    );
    alert.present();
  }  
  findProduct(id){
    this.http.get(this.connections.partsUrl + id, {headers:this.connections.headers})//Connects to the DB and returns parts object
    .map(result => result.json())
    .subscribe(data =>{
           
        this.productsInfo = data.part;
        this.pushProduct();//3rd step to addProduct function chain
        console.log(this.productsInfo.PRODUCT_NM);
      },(err) => {
        console.log('Invalid Part ID')
      }) 
  }
  pushProduct() { // Pushes the selected item to the array 'itemList'
    this.itemList.push({
      name: this.productsInfo.PRODUCT_NM,
      pcode: this.productsInfo.ID,
      price: 100,
      qty: 1
    });
    this.getTotal();
  }
  //recaculates the total price
  getTotal() {
    this.total = 0;
    for (let item of this.itemList) {
      this.total += (item.price) * (item.qty);
    }
    this.total.toFixed(2);
  }
  //Deletes item using swipe
  deleteItem(item){        
    let index = this.itemList.indexOf(item);
    this.itemList.splice(index, 1);
    this.getTotal();
  }
  /**************************************************
  * 
  ***************************************************/
  

  
}
