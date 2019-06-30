import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiServiceService } from '../Services/api-service/api-service.service';
import { AllServiceService } from '../Services/all-service/all-service.service';

@Component({
  selector: 'app-graph-parameter',
  templateUrl: './graph-parameter.page.html',
  styleUrls: ['./graph-parameter.page.scss'],
})
export class GraphParameterPage implements OnInit {
  private namedevice: any;
  private mode: any;
  private sensor: any;
  private startdate: any;
  private enddate: any;

  private listmode: any[] = [
    {
      id: 1,
      type: 'Heat',
    },
    {
      id: 2,
      type: 'Light',
    },
    {
      id: 3,
      type: 'Humidity',
    }
  ];

  private listsensor: any[] = [
    {
      id: 1,
      type: 'Heat',
    },
    {
      id: 2,
      type: 'Light',
    },
    {
      id: 3,
      type: 'Humidity',
    }
  ];



  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    private apiservice: ApiServiceService,
    private allservice: AllServiceService,
  ) { }


  ngOnInit() {
    this.Modes();
  }


  ionViewWillEnter() {
    this.getStorage();
  }


  getStorage() {
    Promise.all([this.storage.get('namedevice'), this.storage.get('mode'), this.storage.get('sensor'), this.storage.get('startdate'), this.storage.get('enddate'), this.storage.get('listsensor')]).then(values => {

      this.namedevice = values[0];
      this.mode = values[1];
      this.sensor = values[2];
      this.startdate = values[3];
      this.enddate = values[4];
      this.listsensor = values[5];
    });
  }


  goBack() {
    this.navCtrl.navigateBack("/device-info");
  }


  Validate() {
    this.storage.set('mode', this.mode);
    this.storage.set('sensor', this.sensor);
    this.storage.set('startdate', this.startdate);
    this.storage.set('enddate', this.enddate);

    this.navCtrl.navigateBack("/device-info");
  }


  async Modes() {

    await this.allservice.Spinner(true);

    Promise.all([this.storage.get('token')]).then(values => {

      this.apiservice.apiGetModes(values[0])
        .subscribe(valRetour => {

          console.log("MIDDLE");

          if (valRetour['success']) {
            //OK
            //Ajout des mods à la liste
          }
        }, error => {
          //Popup Erreur
          //Affiche erreur
          console.warn(error)
        })
      this.allservice.Spinner(false);
    });
  }
}
