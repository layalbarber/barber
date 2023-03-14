import { Component, OnInit } from '@angular/core';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {
  data: any;
  token: string;

  constructor(
    private util: UtilserviceService,
    private api: ApiService,
    private navCtrl: NavController

  ) {
    this.token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }

  back() {
    this.navCtrl.back();
  }

  ngOnInit() {
    this.util.startLoad();
    this.api.getDataWithToken('settings').subscribe((success: any) => {
      if (success.success) {
        this.data = success.data.privacy_policy;
        this.util.dismissLoader();
      }
    }, err => {
      this.util.dismissLoader();
    })
  }
}
