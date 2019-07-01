import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController  } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AllServiceService {
  private spinner = true;
  private loading: any;



  constructor(
    private loadingController: LoadingController,
    public alertCtrl: AlertController,
    public toastController: ToastController,
  ) { }


  async Spinner(bool) {

    if (this.spinner) {
      this.loading = await this.loadingController.create({
        keyboardClose: true,
        translucent: true,
      });
      this.spinner = false;
    }

    if (bool) {
      await this.loading.present();
    }
    else {
      await this.loading.dismiss();
      this.spinner = true;
    }
  }

  async Alert(texte) {

    const alert = await this.alertCtrl.create({
      header: texte,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        }
      ]
    });
    await alert.present();
  }


  async Toast() {
    const toast = await this.toastController.create({
      message: 'Command to device successful',
      duration: 2000
    });
    toast.present();
  }
}
