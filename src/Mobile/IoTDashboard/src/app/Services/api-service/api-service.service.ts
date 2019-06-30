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


  apiGetDevicesList(token) {

    this.headers = new HttpHeaders('Authorization: Bearer ' + token);

    return this.httpClient.get<any[]>(environment.apiurl + 'devices',
    {
      headers: this.headers
    });
  }


  apiGetDevice(token, devicename) {

    this.headers = new HttpHeaders('Authorization: Bearer ' + token);
    console.log(environment.apiurl + 'sensors/'+ devicename +'/latest_metrics')
    return this.httpClient.get<any[]>(environment.apiurl + 'sensors/'+ devicename +'/latest_metrics',
    {
      headers: this.headers
    });
  }


  apiSetLed(token, devicename) {

    this.headers = new HttpHeaders('Authorization: Bearer ' + token);

    return this.httpClient.post<any[]>(environment.apiurl + 'commands', {
      macAddress: devicename,
      pin: 2,
      digital: true,
      value: 1
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

    return this.httpClient.get<any[]>(environment.apiurl + 'calculations/calculation_types',
    {
      headers: this.headers
    });
  }
}
