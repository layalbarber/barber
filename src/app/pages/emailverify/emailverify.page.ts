import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { UtilserviceService } from 'src/app/services/utilservice.service';

@Component({
  selector: 'app-emailverify',
  templateUrl: './emailverify.page.html',
  styleUrls: ['./emailverify.page.scss'],
})
export class EmailverifyPage implements OnInit {
  email: string = '';
  errr: any;
  constructor(
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilserviceService
  ) {

  }

  back() {
    this.navCtrl.back();
  }

  otp() {
    this.util.startLoad();
    let data = {
      email: this.email
    }
    this.api.postDataWithToken('forgetpassword', data).subscribe((success: any) => {
      if (success.success) {
        this.util.presentToast('Password Changed Successfully');
        this.util.dismissLoader();
        this.navCtrl.navigateForward('/passwordchanged')
      }
      else {
        this.util.presentToast('Invalid Email ID');
        this.util.dismissLoader();
      }
    }, (err: any) => {
      console.log("err", err.error.errors.email);
      this.errr = err.error.errors.email ? err.error.errors.email : ''
      this.util.presentToast(this.errr);
    })
  }

  ngOnInit() {
  }

}
