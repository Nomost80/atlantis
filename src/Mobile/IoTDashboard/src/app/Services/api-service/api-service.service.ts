import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private headers = new HttpHeaders('Content-Type: application/x-www-form-urlencoded; charset=UTF-8');

  

  //PUBLIC
  public EmailRegex = environment.regmail;
  public LoginURL = environment.loginURL;




  constructor(
    private httpClient: HttpClient,
  ) { }

  test() {

    return this.httpClient.get<any[]>('https://api.jikan.moe/v3');
  }


  AuthToken(code) {

    return this.httpClient.get<any[]>('???url???'+ code)
  }


  apiGetDevicesList(token, refresh, iduser) {

    this.headers.set('Authorization', token);
    this.headers.set('Refresh', refresh);

    return this.httpClient.post<any[]>(environment.apiurl + '', {
      token: token,
      iduser: iduser
    },
      {
        headers: this.headers
        //+ Token
      })
  }

  apiGetDevice(token, refresh, iduser, devicename) {

    this.headers.set('Authorization', token);
    this.headers.set('Refresh', refresh);

    return this.httpClient.post<any[]>(environment.apiurl + '', {
      token: token,
      iduser: iduser,
      devicename: devicename
    },
      {
        headers: this.headers
        //+ Token
      })
  }

  apiGetGraph(token, refresh, iduser, devicename, mode, sensor, startdate, enddate) {

    this.headers.set('Authorization', token);
    this.headers.set('Refresh', refresh);

    return this.httpClient.post<any[]>(environment.apiurl + '', {
      token: token,
      iduser: iduser,
      devicename: devicename,
      mode: mode,
      sensor: sensor,
      startdate: startdate,
      enddate: enddate
    },
      {
        headers: this.headers
        //+ Token
      })
  }
}
