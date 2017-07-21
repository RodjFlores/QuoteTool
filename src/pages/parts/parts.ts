import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConnectionProvider } from '../../providers/connection/connection';

/**
 * Generated class for the PartsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-parts',
  templateUrl: 'parts.html',
})
export class PartsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public connections: ConnectionProvider) {
  }

}
