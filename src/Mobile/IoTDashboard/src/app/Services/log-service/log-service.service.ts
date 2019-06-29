import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import * as qs from 'query-string';
import * as jwtDecode from 'jwt-decode';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AllServiceService } from '../all-service/all-service.service';
import { ApiServiceService } from '../api-service/api-service.service';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LogServiceService {

  constructor(
    private apiservice: ApiServiceService,
    private allservice: AllServiceService,
    public navCtrl: NavController,
    private inAppBrowser: InAppBrowser,
    private storage: Storage,
  ) { }


  async login() {
    await this.allservice.Spinner(true);
    const browser = this.inAppBrowser.create(environment.loginURL);

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

  async logout() {
    await this.allservice.Spinner(true);
    const browser = this.inAppBrowser.create(environment.logoutURL);

    browser.on('loadstart').subscribe(value => {

      this.storage.clear();
      this.navCtrl.navigateBack("/home");

      this.allservice.Spinner(false);
      browser.close();
    });
  }
}
