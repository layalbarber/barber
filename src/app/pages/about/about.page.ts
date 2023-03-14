import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { ApiService } from 'src/app/services/api.service';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  imagePath: any;
  imagee: any;
  app_version: any;
  footer1: any;
  footer2: any;
  netType: string;
  constructor(
    private navCtrl: NavController,
    private util: UtilserviceService,
    private api: ApiService,
    private network: Network
  ) {
    this.netType = this.network.type;
  }

  ngOnInit() {
    this.util.startLoad();
    this.api.getData('settings').subscribe((success: any) => {
      if (success.success == true) {
        this.imagePath = success.data.imagePath;
        this.imagee = success.data.black_logo;
        this.app_version = success.data.app_version;
        this.footer1 = success.data.footer1;
        this.footer2 = success.data.footer2;
        this.util.dismissLoader();
      }
    }, err => {
      this.util.dismissLoader();
    })
  }

  search() {
    this.navCtrl.navigateForward('tabs/home/search')
  }

  appoint() {
    this.navCtrl.navigateForward('tabs/appointment')
  }

}
