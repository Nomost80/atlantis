import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiServiceService } from '../Services/api-service/api-service.service';
import { AllServiceService } from '../Services/all-service/all-service.service';

@Component({
  selector: 'app-sensor-last',
  templateUrl: './sensor-last.page.html',
  styleUrls: ['./sensor-last.page.scss'],
})
export class SensorLastPage implements OnInit {

  public sensorlastmetrics: any;



  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    private apiservice: ApiServiceService,
    private allservice: AllServiceService,
  ) { }


  ngOnInit() {
    this.lastmetrics();
  }


  goBack() {
    this.navCtrl.navigateBack("/device-info");
  }


  async lastmetrics() {
    await this.allservice.Spinner(true);
    Promise.all([this.storage.get('token'), this.storage.get('namesensor')]).then(values => {

      if (values[0] && values[0] !== "") {
        //Appel API
        this.apiservice.apiGetLatestMetrics(values[0], values[1])
          .subscribe(valRetour => {

            if (valRetour) {

              this.sensorlastmetrics = valRetour;
              this.allservice.Spinner(false);
            }
          }, error => {
            this.allservice.Spinner(false);
            this.allservice.Alert("API Error");
          })
      }
      else {
        this.allservice.Spinner(false);
        this.allservice.Alert("Storage Error");
      }
    });
  }
}
