
import { Component } from '@angular/core';


@Component({
  templateUrl: `<ion-content padding>
    <ion-grid style="height: 100%">
        <ion-row justify-content-center align-items-center style="height: 100%">
            <b>Welcome!</b>
        </ion-row>        
    </ion-grid>  
</ion-content>`
})
export class TabsPage {  

  constructor() {
    console.log("Welcome Page!!")
  }
}