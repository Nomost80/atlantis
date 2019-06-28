import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiServiceService } from '../Services/api-service/api-service.service';
import { AllServiceService } from '../Services/all-service/all-service.service';



@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.page.html',
  styleUrls: ['./device-list.page.scss'],
})
export class DeviceListPage implements OnInit {

  private listdevice: any = ["AL244308", "AAP130138", "EVE117013", "XV258133", "YHB274494"];



  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public alertController: AlertController,
    private apiservice: ApiServiceService,
    private allservice: AllServiceService,
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

  Disconnect() {

    this.storage.clear();
    this.navCtrl.navigateBack("/home");
  }


  async LoadDevice() {
    await this.allservice.Spinner(true);

    Promise.all([this.storage.get('token'), this.storage.get('oid')]).then(values => {

      if (values[0] && values[0] !== "") {

        this.apiservice.apiGetDevicesList(values[0], values[1])
          .subscribe(valRetour => {

            if (valRetour['success']) {
              //OK
            }
          }, error => {
            //Popup Erreur
          })
      }
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
            this.Disconnect();
          }
        }
      ]
    });
    await alert.present();
  }
}