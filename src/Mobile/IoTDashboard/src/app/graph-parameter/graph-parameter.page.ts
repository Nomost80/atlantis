import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiServiceService } from '../Services/api-service/api-service.service';
import { AllServiceService } from '../Services/all-service/all-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-graph-parameter',
  templateUrl: './graph-parameter.page.html',
  styleUrls: ['./graph-parameter.page.scss'],
})
export class GraphParameterPage implements OnInit {
  private namedevice: any;
  private mode: any;
  private group: any;
  private startdate: any;
  private enddate: any;

  private listmode: any[] = [
  ];

  private listgroup: any[] = [
    {
      id: 1,
      name: 'Hour',
      type: 'hour',
    },
    {
      id: 2,
      name: 'Month',
      type: 'month',
    },
    {
      id: 3,
      name: 'Year',
      type: 'year',
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
    Promise.all([this.storage.get('namedevice'), this.storage.get('mode'), this.storage.get('group'), this.storage.get('startdate'), this.storage.get('enddate'), this.storage.get('listsensor')]).then(values => {

      this.namedevice = values[0];
      this.mode = values[1];
      this.group = values[2];
      this.startdate = values[3];
      this.enddate = values[4];
      this.listgroup = values[5];
    });
  }


  goBack() {
    this.navCtrl.navigateBack("/device-info");
  }


  Validate() {
    this.storage.set('mode', this.mode);
    this.storage.set('group', this.group);
    this.storage.set('startdate', this.startdate);
    this.storage.set('enddate', this.enddate);

    this.navCtrl.navigateBack("/device-info");
  }


  async Modes() {

    await this.allservice.Spinner(true);

    Promise.all([this.storage.get('token')]).then(values => {

      this.apiservice.apiGetModes(values[0])
        .subscribe(valRetour => {

          if (valRetour) {
            this.listmode = valRetour;
            this.allservice.Spinner(false);
          } else {
            this.allservice.Spinner(false);
            this.allservice.Alert("Command Error");
          }
        }, error => {
          console.warn(error)
          this.allservice.Spinner(false);
          this.allservice.Alert("API Error");
        })
    });
  }
}
