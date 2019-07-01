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
  private sensorname = "";

  public infodevice: any = {
    macAddress: "",
    sensors: [
      {
        name: "",
        pin: "",
        digital: false,
        type: "",
        last: ""
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
    console.log("infoDeviceGraph")
    this.infoDeviceGraph();
  }


  goBack() {
    this.navCtrl.navigateBack("/device-list");
  }


  goGraphParameter() {
    this.navCtrl.navigateForward("/graph-parameter");
  }


  goSensorLast(namesensor) {

    this.storage.set('namesensor', namesensor);
    this.navCtrl.navigateForward("sensor-last");
  }

  infoDeviceGraphEvent($event){
    this.infoDeviceGraph();
  }


  async toggleChange($event) {
    await this.allservice.Spinner(true);
    Promise.all([this.storage.get('token'), this.storage.get('namedevice')]).then(values => {

      if (values[0] && values[0] !== "") {
        //Appel API
        var ledint;
        if (this.ledvalue == true) {
          ledint = 0;
        }
        else {
          ledint = 1;
        }

        this.infodevice["macAddress"] = values[1];

        this.apiservice.apiSetLed(values[0], values[1], ledint)
          .subscribe(valRetour => {

            if (valRetour['reasonCode'] == 0) {
              this.allservice.Toast();
            } else {
              this.ledvalue = false;
              this.allservice.Alert("Command Error - Return " + valRetour['reasonCode']);
            }
            console.log(valRetour);
            console.log(valRetour['reasonCode'])

            this.allservice.Spinner(false);
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


  async infoDeviceGraph() {
    await this.allservice.Spinner(true);
    Promise.all([this.storage.get('token'), this.storage.get('namedevice'), this.storage.get('mode'), this.storage.get('group'), this.storage.get('startdate'), this.storage.get('enddate')]).then(values => {
console.log("-1")
      if (values[0] && values[0] !== "") {
        console.log(0)
        this.apiservice.apiGetDeviceSensors(values[0], values[1])
          .subscribe(vRetour => {
            console.log(1)
            if (vRetour) {
              //OK
              this.infodevice = vRetour;
              console.log(2)
              if (values[2] && values[2] !== "" && this.sensorname && this.sensorname !== "") {
                console.log(3)
                this.getgraph(values[0], values[2].toLowerCase(), values[3], values[4], values[5])
                console.log(4)
              } else {
                console.log(5)
                this.allservice.Spinner(false);
              }
            } else {
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


  getgraph(token, mode, group, startdate, enddate) {
    var datestart = startdate.split('T')[0]
    var datefin = enddate.split('T')[0]

    console.log(token + "" + mode + "" + group + "" + startdate + "" + enddate)

    //Appel API                       token,    devicename,   mode, group, startdate, enddate
    this.apiservice.apiGetCalculation(token, this.sensorname, mode, group, datestart, datefin)
      .subscribe(valRetour => {
        if (valRetour) {
          //OK

          this.orderly = valRetour.map(c => c['key'])
          this.abscissa = valRetour.map(c => c['value']);

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
        } else {
          this.allservice.Spinner(false);
        }
      }, error => {
        this.allservice.Spinner(false);
        this.allservice.Alert("API Error Graph");
      })
  }
}
