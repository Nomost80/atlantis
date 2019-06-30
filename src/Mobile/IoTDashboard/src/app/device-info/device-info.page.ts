import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { Storage } from '@ionic/storage';
import { ApiServiceService } from '../Services/api-service/api-service.service';
import { AllServiceService } from '../Services/all-service/all-service.service';



@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.page.html',
  styleUrls: ['./device-info.page.scss'],
})
export class DeviceInfoPage implements OnInit {
  @ViewChild('lineCanvas') lineCanvas;
  private lineChart: any;

  private infodevice: any = {
    macAddress: "",
    sensors: [
      {
        name: "",
        pin: "",
        digital: false,
        type: ""
      }
    ]
  };
  private ledvalue: any;

  private orderly = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'November',
    'December'];

  private abscissa = [
    65,
    59,
    80,
    81,
    56,
    55,
    40,
    10,
    5,
    50,
    10,
    15];




  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    private apiservice: ApiServiceService,
    private allservice: AllServiceService,
  ) { }


  ngOnInit() {
  }


  ionViewWillEnter() {
    this.infoDeviceGraph();
  }


  goBack() {
    this.navCtrl.navigateBack("/device-list");
  }


  goGraphParameter() {
    this.navCtrl.navigateForward("/graph-parameter");
  }


  async toggleChange($event) {
    await this.allservice.Spinner(true);
    Promise.all([this.storage.get('token'), this.storage.get('namedevice')]).then(values => {

      if (values[0] && values[0] !== "") {
        //Appel API

        //Ajouter ":" pour mac adresse

        if (this.ledvalue == true) {
          this.ledvalue = 1;
        }
        else {
          this.ledvalue = 0;
        }

        this.apiservice.apiSetLed(values[0], values[1], this.ledvalue)
          .subscribe(valRetour => {

            if (valRetour['']) {
              //OK
              //Traitement de la réponse

              this.allservice.Spinner(false);
            }
          }, error => {
            //Popup Erreur
            console.warn(error);
            this.allservice.Spinner(false);
          })
      }
      else {
        this.allservice.Spinner(false);
      }
    });
  }


  async infoDeviceGraph() {
    await this.allservice.Spinner(true);
    Promise.all([this.storage.get('token'), this.storage.get('namedevice'), this.storage.get('mode'), this.storage.get('sensor'), this.storage.get('startdate'), this.storage.get('enddate')]).then(values => {

      if (values[0] && values[0] !== "") {

        this.apiservice.apiGetDevice(values[0], values[1])
          .subscribe(valRetour => {
            console.log(valRetour);
            if (valRetour) {
              //OK
              this.infodevice = valRetour;
              console.log(this.infodevice)

              if (values[2] && values[2] !== "") {
                //Appel API                 token, devicename, mode, sensor, startdate, enddate
                this.apiservice.apiGetGraph(values[0], values[1], values[2], values[3], values[4], values[5])
                  .subscribe(valeurRetour => {
                    console.log(valeurRetour);
                    if (valeurRetour) {
                      //OK
                      //this.ledvalue = valeurRetour['']; //************/

                      //Création du graph
                      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
                        type: 'line',
                        data: {
                          //********************************************************************************//
                          labels: this.orderly,
                          //********************************************************************************//
                          datasets: [
                            {
                              label: 'Sensor measurement',
                              fill: false,
                              lineTension: 0.1,
                              backgroundColor: 'rgba(49, 113, 224,0.4)',
                              borderColor: 'rgba(49, 113, 224,1)',
                              borderCapStyle: 'butt',
                              borderDash: [],
                              borderDashOffset: 0.0,
                              borderJoinStyle: 'miter',
                              pointBorderColor: 'rgba(49, 113, 224,1)',
                              pointBackgroundColor: '#fff',
                              pointBorderWidth: 1,
                              pointHoverRadius: 5,
                              pointHoverBackgroundColor: 'rgba(49, 113, 224,1)',
                              pointHoverBorderColor: 'rgba(220,220,220,1)',
                              pointHoverBorderWidth: 2,
                              pointRadius: 1,
                              pointHitRadius: 10,
                              //********************************************************************************//
                              data: this.abscissa,
                              //********************************************************************************//
                              spanGaps: false,
                            }
                          ]
                        },
                        options: {
                          legend: {
                            display: false
                          }
                        },
                      });
                      this.allservice.Spinner(false);
                    }
                  }, error => {
                    //Popup Erreur
                    console.warn(error);
                    this.allservice.Spinner(false);
                  })
              } else {
                this.allservice.Spinner(false);
              }
            } else {
              this.allservice.Spinner(false);
            }
          }, error => {
            //Popup Erreur
            console.warn(error);
            this.allservice.Spinner(false);
          })
      }
      else {
        this.allservice.Spinner(false);
      }
    });
  }
}
