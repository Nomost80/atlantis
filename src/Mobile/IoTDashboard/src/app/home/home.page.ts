import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LogServiceService } from '../Services/log-service/log-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public navCtrl: NavController,
    private logService: LogServiceService,
  ) { }


  ngOnInit() {
    
    this.login();
  }


  testest() {

    this.navCtrl.navigateForward("/device-list");
  }


  async login() {

    this.logService.login();

  }
}
