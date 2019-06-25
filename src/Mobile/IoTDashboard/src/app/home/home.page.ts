import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ApiServiceService } from '../Services/api-service/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private submitted = false;
  private buttonDisable = false;
  private registerForm: FormGroup;



  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    private storage: Storage,
    private apiservice: ApiServiceService,
  ) { }


  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.pattern(this.apiservice.EmailRegex)]],
      password: ['', [Validators.minLength(6)]],
    });
  }


  goSignIn() {
    this.navCtrl.navigateForward("/sign-in")
  }


  Login() {

    if (this.onSubmit()) {
      this.buttonDisable = true;

      //Appel API
/*
      this.apiservice.apiLogin("login", "pass")
        .subscribe(valRetour => {

          if (valRetour['success']) {
            //OK

            this.navCtrl.navigateRoot("/device-list");
          }
        }, error => {
          //Popup Erreur
        })
*/
      this.buttonDisable = false;
    }
    //TEST
    this.navCtrl.navigateRoot("/device-list");
  }


  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    return true;
  }
}
