import { Component, OnInit } from '@angular/core';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-singlecouponpage',
  templateUrl: './singlecouponpage.page.html',
  styleUrls: ['./singlecouponpage.page.scss'],
})
export class SinglecouponpagePage implements OnInit {
  data: any = [];
  code: any;
  discount: any;
  salonId: any;
  coupon_id: any;
  constructor(
    private util: UtilserviceService,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.data;
        this.salonId = this.router.getCurrentNavigation().extras.state.salon_id;
      }
    });
    this.data.forEach(element => {
      this.discount = element.discount;
      this.code = element.code;
    });
  }

  ngOnInit() {
    let data = {
      salon_id: this.salonId
    }
    this.api.getData('coupon').subscribe((success: any) => {
      if (success.success) {
        this.data = success.data;
        this.data.forEach(element => {
          this.discount = element.discount;
          this.code = element.code;
          this.coupon_id = element.coupon_id
        });
      }
    }, error => {
    })
  }

  apply() {
    let data = {
      code: this.code
    }
    this.api.postDataWithToken('checkcoupon', data).subscribe((success: any) => {
      if (success.success == true) {
        this.util.presentToast('Coupon Successfully Aplied');
        if (success.success == true) {
          let navigationExtras: NavigationExtras = {
            state: {
              discount: this.discount,
            }
          }
          this.navCtrl.navigateForward(['make-payment'], navigationExtras);
        }
      }
    }, error => {
    })
  }
}
