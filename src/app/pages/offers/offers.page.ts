import { Component, OnInit } from '@angular/core';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  coupon: any = [];
  slider: any = [];
  currency: any;
  constructor(
    private util: UtilserviceService,
    private navCtrl: NavController,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.util.startLoad();
    this.api.getData('offers').subscribe((success: any) => {
      if (success.success) {
        console.log('success', success);

        this.slider = success.data;
      }
    }, err => {
      console.log('err', err)
    })
    this.api.getData('coupon').subscribe((success: any) => {
      if (success.success) {
        this.coupon = success.data;
        console.log(success.data);

        this.util.dismissLoader();
      }
    });
    this.api.getDataWithToken("settings").subscribe((data: any) => {
      ;
      this.currency = data.data.currency_symbol;

    }, (err: any) => {
      console.log(err);

    });
  }

  ionViewWillEnter() {
    this.util.startLoad();
    this.api.getData('offers').subscribe((success: any) => {
      if (success.success) {
        console.log('success', success);

        this.slider = success.data;
      }
    }, err => {
      console.log('err', err)
    })
    this.api.getData('coupon').subscribe((success: any) => {
      if (success.success) {
        this.coupon = success.data;
        console.log(success.data);

        this.util.dismissLoader();
      }
    });
    this.api.getDataWithToken("settings").subscribe((data: any) => {
      ;
      this.currency = data.data.currency_symbol;

    }, (err: any) => {
      console.log(err);

    });
  }

  slideOpts = {
    spaceBetween: 20
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }


}
