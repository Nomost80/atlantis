import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  private submitted = false;
  private buttonDisable = false;
  private registerForm: FormGroup;


  
  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
  ) { }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.pattern(environment.regmail)]],
      password: ['', [Validators.minLength(6)]],
    });
  }


  goBack() {
    this.navCtrl.back();
  }


  Validate() {
    if (this.onSubmit()) {
      this.buttonDisable = true;


      //this.navCtrl.navigateRoot("");
      this.buttonDisable = false;
    }
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
