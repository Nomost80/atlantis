import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiServiceService } from '../Services/api-service/api-service.service';

@Component({
  selector: 'app-graph-parameter',
  templateUrl: './graph-parameter.page.html',
  styleUrls: ['./graph-parameter.page.scss'],
})
export class GraphParameterPage implements OnInit {



  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    private apiservice: ApiServiceService,
  ) { }


  ngOnInit() {
  }


  goBack() {
    this.navCtrl.navigateBack("/device-info");
  }


  Validate() {

    this.storage.set('mode', "");
    this.storage.set('sensor', "");
    this.storage.set('startdate', "");
    this.storage.set('enddate', "");

    //API
/*
    this.apiservice.apiGetGraph("login", "pass", "mode", "sensor", "startdate", "enddate")
      .subscribe(valRetour => {

        if (valRetour['success']) {
          //OK

          this.navCtrl.navigateBack("/device-list");
        }
      }, error => {
        //Popup Erreur
      })
*/
  }


  async LoadParameters() {
    Promise.all([this.storage.get('mode'), this.storage.get('sensor'), this.storage.get('startdate'), this.storage.get('enddate')]).then(values => {

    });
  }
}
