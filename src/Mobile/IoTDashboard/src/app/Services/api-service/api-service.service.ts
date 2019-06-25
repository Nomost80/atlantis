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



  constructor(
    private httpClient: HttpClient,
  ) { }


  apiLogin(login, pass) {

    return this.httpClient.post<any[]>(environment.apiurl + '', {
      login: login,
      pass: pass
    },
      {
        headers: this.headers
      })
  }


  apiSignIn(login, pass) {

    return this.httpClient.post<any[]>(environment.apiurl + '', {
      login: login,
      pass: pass
    },
      {
        headers: this.headers
      })
  }


  apiGetDevicesList(token, iduser) {

    return this.httpClient.post<any[]>(environment.apiurl + '',{
      token: token,
      iduser: iduser
    },
      {
        headers: this.headers
        //Token
      })
  }

  apiGetDevice(token, iduser, devicename) {

    return this.httpClient.post<any[]>(environment.apiurl + '',{
      token: token,
      iduser: iduser,
      devicename: devicename
    },
      {
        headers: this.headers
        //Token
      })
  }

  apiGetGraph(token, iduser, devicename, sensor, startdate, enddate) {

    return this.httpClient.post<any[]>(environment.apiurl + '',{
      token: token,
      iduser: iduser,
      devicename: devicename,
      sensor: sensor,
      startdate: startdate,
      enddate: enddate
    },
      {
        headers: this.headers
        //Token
      })
  }
}
