import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import * as qs from 'query-string';
import * as jwtDecode from 'jwt-decode';
import { Storage } from '@ionic/storage';
import { ApiServiceService } from '../Services/api-service/api-service.service';
import { AllServiceService } from '../Services/all-service/all-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private apiservice: ApiServiceService,
    private allservice: AllServiceService,
    public navCtrl: NavController,
    private inAppBrowser: InAppBrowser,
    private storage: Storage,
  ) { }


  ngOnInit() {
    
    this.login();
  }


  testest() {

    this.navCtrl.navigateForward("/device-list");
  }


  async login() {

    await this.allservice.Spinner(true);
    const browser = this.inAppBrowser.create(this.apiservice.LoginURL);

    browser.on('loadstart').subscribe(value => {
      const parsedHash = qs.parse(value.url);

      if (parsedHash['access_token'] && parsedHash['expires_in']) {
        browser.close();

        this.storage.set('token', parsedHash['access_token']);
        this.storage.set('expires', parsedHash['expires_in']);

        var decoded = jwtDecode(parsedHash['access_token']);
        this.storage.set('oid', decoded.oid);

        this.navCtrl.navigateForward("/device-list");
        this.allservice.Spinner(false);
      }
    });
  }
}
