import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router,
        public toastController: ToastController,
        private storage: Storage
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.storage.get('token').then(token => {
            console.log("token " + token)
            if (token) {
                console.log("if token")
                request = request.clone({
                    setHeaders: {
                        'Authorization': 'Bearer ' + token,
                        'content-type': 'application/json'
                    }
                });
                console.log("request ") 
                console.log(request)
            }
            console.log("return")
            console.log(next.handle(request))
            return next.handle(request);
        });
        return next.handle(request);
    }
}