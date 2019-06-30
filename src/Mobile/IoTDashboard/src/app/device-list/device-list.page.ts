import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiServiceService } from '../Services/api-service/api-service.service';
import { AllServiceService } from '../Services/all-service/all-service.service';
import { LogServiceService } from '../Services/log-service/log-service.service';


@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.page.html',
  styleUrls: ['./device-list.page.scss'],
})
export class DeviceListPage implements OnInit {

  private listdevice: any;



  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public alertController: AlertController,
    private apiservice: ApiServiceService,
    private allservice: AllServiceService,
    private logService: LogServiceService,
  ) { }


  ngOnInit() {
    this.LoadDevice();
  }


  goGraph() {
    this.navCtrl.navigateForward("/device-graph");
  }


  goDevice(device) {

    this.storage.set('namedevice', device);
    this.navCtrl.navigateForward("/device-info");
  }


  async LoadDevice() {
    await this.allservice.Spinner(true);

    Promise.all([this.storage.get('token')]).then(values => {

      this.apiservice.apiGetDevicesList(values[0])
        .subscribe(valRetour => {

          if (valRetour) {

            this.listdevice = valRetour;
            console.log(this.listdevice);
          }
        }, error => {
          //Popup Erreur
          console.warn(error);
        })
      this.allservice.Spinner(false);
    });
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Do you want to disconnect ?',
      message: 'You will return to the login screen',
      buttons: [
        {
          text: 'No',
        }, {
          text: 'Yes',
          handler: () => {
            this.logService.logout();
          }
        }
      ]
    });
    await alert.present();
  }
}
