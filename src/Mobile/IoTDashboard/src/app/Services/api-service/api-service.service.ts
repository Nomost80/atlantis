import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  //private headers = new HttpHeaders('Content-Type: application/x-www-form-urlencoded; charset=UTF-8');
 private headers;


  constructor(
    private httpClient: HttpClient,
  ) { }


  apiGetDevicesList(token) {

    this.headers = new HttpHeaders('Authorization: Bearer ' + token);

    return this.httpClient.get<any[]>(environment.apiurl + 'devices',
    {
      headers: this.headers
    });
  }


  apiGetDevice(token, devicename) {

    this.headers = new HttpHeaders('Authorization: Bearer ' + token);

    return this.httpClient.get<any[]>(environment.apiurl + 'sensors/'+ devicename +'/latest_metrics',
    {
      headers: this.headers
    });
  }


  apiSetLed(token, devicename, stateled) {

    this.headers = new HttpHeaders('Authorization: Bearer ' + token);

    return this.httpClient.post<any[]>(environment.apiurl + '', {
      macAddress: "B4:E6:2D:09:5B:A7",
      pin: 2,
      digital: true,
      value: stateled
    },
    {
      headers: this.headers
    });
  }


  apiGetGraph(token, devicename, mode, sensor, startdate, enddate) {

    this.headers = new HttpHeaders('Authorization: Bearer ' + token);

    return this.httpClient.get<any[]>(environment.apiurl + '',
    {
      headers: this.headers
    });
  }


  apiGetModes(token) {

    this.headers = new HttpHeaders('Authorization: Bearer ' + token);

    return this.httpClient.get<any[]>(environment.apiurl + 'api/calculations/calculation_types',
    {
      headers: this.headers
    });
  }
}
