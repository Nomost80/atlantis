import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiServiceService } from '../Services/api-service/api-service.service';


@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.page.html',
  styleUrls: ['./device-list.page.scss'],
})
export class DeviceListPage implements OnInit {

  public array1: any = [1, 2, 3, 4, 5];



  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public alertController: AlertController,
    private apiservice: ApiServiceService,
  ) { }


  ngOnInit() {
    this.LoadDevice();
  }


  goGraph() {
    this.navCtrl.navigateForward("/device-graph");
  }


  goDevice() {

    //stock le nom du device
    this.navCtrl.navigateForward("/device-info");
  }

  Disconnect() {


    this.navCtrl.navigateBack("/home");
  }


  async LoadDevice() {
    Promise.all([this.storage.get('token'), this.storage.get('iduser')]).then(values => {

      if (values[0] && values[0] !== "") {

      }
    });
    //Appel API
/*
    this.apiservice.apiGetDevicesList("token", "iduser")
      .subscribe(valRetour => {

        if (valRetour['success']) {
          //OK
        }
      }, error => {
        //Popup Erreur
      })
*/
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
