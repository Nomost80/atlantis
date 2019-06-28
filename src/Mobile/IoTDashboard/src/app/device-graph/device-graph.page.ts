import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-device-graph',
  templateUrl: './device-graph.page.html',
  styleUrls: ['./device-graph.page.scss'],
})
export class DeviceGraphPage implements OnInit {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;


  

  constructor(
    public navCtrl: NavController,
  ) { }


  ngOnInit() {
    this.lineChartMethod();
  }


  goBack() {
    this.navCtrl.navigateBack("/device-list");
  }


  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
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
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
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
  }
}

