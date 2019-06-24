import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.page.html',
  styleUrls: ['./device-list.page.scss'],
})
export class DeviceListPage implements OnInit {

  public array1: any = [1, 2, 3, 4, 5];


  constructor(
    public navCtrl: NavController,
  ) { }


  ngOnInit() {
  }


  goGraph() {
    this.navCtrl.navigateForward("device-graph");
  }


  goDevice() {
    this.navCtrl.navigateForward("/device-info");
  }

  Disconnect() {


    this.navCtrl.navigateBack("/home");
  }
}
