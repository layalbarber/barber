import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { NavigationExtras } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  email: string = '';
  id: any;
  projectnum: any;
  appId: any;
  constructor(
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilserviceService,
    private oneSignal: OneSignal,
  ) { }

  ngOnInit() {
    this.util.startLoad();
    this.api.getDataWithToken('settings').subscribe((success: any) => {
      if (success.success) {
        console.log('successdata', success.data)
        this.appId = success.data.app_id;
        this.projectnum = success.data.project_no;
        this.util.dismissLoader();
      }
    }, error => {
      this.util.dismissLoader();
    });
    this.oneSignal.startInit(this.appId, this.projectnum);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.handleNotificationReceived().subscribe(() => {
    });
    this.oneSignal.handleNotificationOpened().subscribe(() => {
    });
    this.oneSignal.endInit();
  }

  back() {
    this.navCtrl.back();
  }

  otp() {
    this.util.startLoad();
    let data = {
      email: this.email
    }
    this.api.postDataWithToken('sendotp', data).subscribe((success: any) => {
      if (success.success == true) {
        this.util.presentToast('Otp is Sended ');
        this.id = success.data.id;
        this.util.dismissLoader();
        let navigationExtra: NavigationExtras = {
          state: {
            id: this.id
          }
        }
        this.navCtrl.navigateForward(['verify'], navigationExtra);
      }
      else {
        this.util.presentToast('email is wrong');;
        this.util.dismissLoader();
      }
    }, error => {

      this.util.dismissLoader();
    })
  }

}
