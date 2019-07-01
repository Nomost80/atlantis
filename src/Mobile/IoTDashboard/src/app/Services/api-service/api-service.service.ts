import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private headers;


  constructor(
    private httpClient: HttpClient,
  ) { }

  //Get User Devices
  apiGetDevicesList(token) {

    this.headers = new HttpHeaders('Authorization: Bearer ' + token);

    return this.httpClient.get<any[]>(environment.apiurl + 'devices',
      {
        headers: this.headers
      });
  }

  //Get Device Sensors
  apiGetDeviceSensors(token, devicename) {

    this.headers = new HttpHeaders('Authorization: Bearer ' + token);

    return this.httpClient.get<any[]>(environment.apiurl + 'devices/' + devicename + '/sensors',
      {
        headers: this.headers
      });
  }


  //Get Sensor Latest Metrics
  apiGetLatestMetrics(token, sensorname) {

    this.headers = new HttpHeaders('Authorization: Bearer ' + token);

    return this.httpClient.get<any[]>(environment.apiurl + 'sensors/' + sensorname + '/latest_metrics',
      {
        headers: this.headers
      });
  }

  //Send Command via Mobile
  apiSetLed(token, devicename, value) {

    this.headers = new HttpHeaders('Authorization: Bearer ' + token);

    return this.httpClient.post<any[]>(environment.apiurl + 'commands', {
      macAddress: devicename,
      pin: 2,
      digital: true,
      value: value
    },
      {
        headers: this.headers
      });
  }

  //Get Calculation
  apiGetCalculation(token, sensorname, mode, group, startdate, enddate) {

    this.headers = new HttpHeaders('Authorization: Bearer ' + token);

    console.info(environment.apiurl + 'sensors/' + sensorname + '/calculations?aggregationType=' + mode + '&groupBy=' + group + '&startAt=' + startdate + '&endAt='+ enddate)

    return this.httpClient.get<any[]>(environment.apiurl + 'sensors/' + sensorname + '/calculations?aggregationType=' + mode + '&groupBy=' + group + '&startAt=' + startdate + '&endAt='+ enddate,
      {
        headers: this.headers
      });
  }

  //Calculation Types
  apiGetModes(token) {

    this.headers = new HttpHeaders('Authorization: Bearer ' + token);

    return this.httpClient.get<any[]>(environment.apiurl + 'calculations/types',
      {
        headers: this.headers
      });
  }
}
