import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AllServiceService {
  private spinner = true;
  private loading: any;



  constructor(
    private loadingController: LoadingController,
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
}
