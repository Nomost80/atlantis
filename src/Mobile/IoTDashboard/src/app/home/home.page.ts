import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Storage } from '@ionic/storage';
import { ApiServiceService } from '../Services/api-service/api-service.service';
import { AllServiceService } from '../Services/all-service/all-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {



  constructor(
    private apiservice: ApiServiceService,
    private allservice: AllServiceService,
    public navCtrl: NavController,

  ) { }


  ngOnInit() {

    //this.login();
  }


  async testest() {

    this.navCtrl.navigateForward("/device-list");
  }


  async test() {
    await this.allservice.Spinner(true);

    this.apiservice.authToken("eyJraWQiOiJjcGltY29yZV8wOTI1MjAxNSIsInZlciI6IjEuMCIsInppcCI6IkRlZmxhdGUiLCJzZXIiOiIxLjAifQ..6i9v4mkVo2nQ-NMS.f943-qLvbieFK1u5_AR58qnsbivBmjEdxfL3Kb2bMEj-mEHei8iTek9gIGvRA-PK_jNuuUBjHTe3jShYP85NnW9aaCQnht4lmNBUXiZa9wF9zzEPiw5zPe-4kCVt28RPcF4uGq_mqV5hJU_FHy3dGPCII7Oqgvso5IB_4n0m8oFFR0HykGW3nGw_sp_dRvKCYC2el4e2CEvyf2cVZorXHM2YuSlijFx2wy3Snyo-9UGkt6Rk1FF0W99yAdsxe-oMsq-PFDT1ylzd1vUDJp3dvwLypFpXFy53y_cBS_tjBgCLOpJEiyXBLmjp8EHSaH2tHfjleJutd8DaaVhh9ICY4kQwN3l1jWYjzouu0DcccM0x3H9Au6E7g7GT6Cf8LypAfuwZVW_0b2RS6C2N589LY9wm6RC68EgGc49ytn37yxukKuh0qu1RGw7_sq_--vy9FGTjwLWQ8KAmXzBvbkgfZbPx5iGe9U7GQuB9R3fRsORMgetunYOqIGOHkhd_Ek5OwAgdU60kiI-pf7eMsRHdgOknS_MzdKbP-6RYSyXQSg.uTG3sWQJzoqG6MCQbSvRew")
      .subscribe(valRetour => {

        if (valRetour['success']) {
          //OK

          console.log(valRetour);
          this.allservice.Spinner(false);
        }
      }, error => {
        //Popup Erreur
        console.warn(error);
        this.allservice.Spinner(false);
      })
  }


  login() {

    window.open(this.apiservice.LoginURL, '_system', 'location=no');
  }
}
