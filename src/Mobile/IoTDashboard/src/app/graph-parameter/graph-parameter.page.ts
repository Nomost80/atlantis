import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-graph-parameter',
  templateUrl: './graph-parameter.page.html',
  styleUrls: ['./graph-parameter.page.scss'],
})
export class GraphParameterPage implements OnInit {

  sensor: any[] = [
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

  public test = " nom"

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
  ) { }


  ngOnInit() {
    this.getStorage();
  }
  private parametres = [
    {
      "namedevice": "test",
      "mode": "",
      "sensor": "",
      "startdate": "",
      "enddate": ""
    }
  ];

  getStorage() {
    Promise.all([this.storage.get('namedevice'), this.storage.get('mode'), this.storage.get('sensor'), this.storage.get('startdate'), this.storage.get('enddate')]).then(values => {

      if (values[0] && values[0] !== "") {

        this.parametres['namedevice'] = values[0];
        this.parametres['mode'] = values[1];
        this.parametres['sensor'] = values[2];
        this.parametres['startdate'] = values[3];
        this.parametres['enddate'] = values[4];

        console.log(values);
      }
    });
  }


  goBack() {
    this.navCtrl.navigateBack("/device-info");
  }


  Validate() {

    this.storage.set('namedevice', "");
    this.storage.set('mode', "");
    this.storage.set('sensor', "");
    this.storage.set('startdate', "");
    this.storage.set('enddate', "");

    this.navCtrl.navigateBack("/device-list");
  }


  async LoadParameters() {
    Promise.all([this.storage.get('mode'), this.storage.get('sensor'), this.storage.get('startdate'), this.storage.get('enddate')]).then(values => {

    });
  }
}
