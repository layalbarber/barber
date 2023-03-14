import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { PaymentModalPage } from 'src/app/modals/payment-modal/payment-modal.page';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CouponPage } from 'src/app/modals/coupon/coupon.page';
declare var Stripe;
@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.page.html',
  styleUrls: ['./make-payment.page.scss'],
})
export class MakePaymentPage implements OnInit {
  btnChecked: boolean = true;
  date: any;
  localStorageData: any = [];
  servicesId: any = [];
  totalPrice = 0;
  salon_id: any;
  discount: any = 0;
  totalAmount: number;
  emp_id: any;
  service: any = [];
  start_time: any;
  dis: number;
  coupon_id: any;
  type: any;
  confirm: any = {};
  stripe = Stripe(localStorage.getItem('keyStri'));
  card: any;
  radio: string = 'CASH';
  payment_token: any;
  currentdata: string;
  res: string;
  distance: any;
  currency: any;
  paymentGateway: any;
  paymentGateway2: any;
  serviseAt: any;
  extra_charge: any;
  language: string;
  constructor(
    private modal: ModalController,
    private navCtrl: NavController,
    private util: UtilserviceService,
    private api: ApiService,
    private router: Router,
    public platform: Platform,
  ) {
    this.platform.backButton.subscribe(() => {
      localStorage.removeItem("SelectAddress");
      this.navCtrl.navigateRoot("tabs/home/select-time-slot");
    });
    const date = Date.now();
    const options: any = { weekday: "long" };
    this.currentdata = new Intl.DateTimeFormat("en-US", options).format(date);
    this.res = this.currentdata.toLowerCase();
    var current_date = new Date();
    var weekday_value = current_date.getDay();
    if (this.router.getCurrentNavigation().extras.state) {
      this.emp_id = this.router.getCurrentNavigation().extras.state.empId;
      this.service = this.router.getCurrentNavigation().extras.state.service;
    }
    this.date = localStorage.getItem('date');
    this.start_time = localStorage.getItem('time');
    this.salon_id = localStorage.getItem('Salon-id');
    this.localStorageData = localStorage.getItem('booking-detail') ? JSON.parse(localStorage.getItem('booking-detail')) : [];
    this.localStorageData.forEach(element => {
      this.servicesId.push(element.service_id);
      this.totalPrice += element.price;
    });
    this.totalPrice = JSON.parse(localStorage.getItem('total'));
    this.serviseAt = JSON.parse(localStorage.getItem('serviceAt'));
    this.extra_charge = JSON.parse(localStorage.getItem("extracharge"));
    this.language = localStorage.getItem('lan');
  }

  appointment() {
    this.navCtrl.navigateRoot('/tabs/appointment')
  }

  ionViewWillEnter() {
    this.language = localStorage.getItem('lan');
    this.confirm = this.api.salonDetail;
    console.log("conf", this.confirm);
    this.distance = localStorage.getItem('distance');
    this.api.getDataWithToken('payment_gateway').subscribe((success: any) => {
      if (success.success == true) {
        this.paymentGateway = success.data.cod;
        this.paymentGateway2 = success.data.stripe;
      }
    }, err => {
      console.log(err)
    })
  }

  ngOnInit() {
    this.util.startLoad();
    this.totalAmount = this.totalPrice;
    setTimeout(() => {
      this.currency = localStorage.getItem('currency');
      this.util.dismissLoader();
    }, 500);
  }

  back() {
    localStorage.removeItem("SelectAddress");
    this.navCtrl.navigateRoot("/tabs/home/select-time-slot");
  }

  async presentModal() {
    const modal = await this.modal.create({
      component: PaymentModalPage,
      cssClass: 'payment-modal'
    });
    return await modal.present();
  }

  payment_done() {
    this.util.startLoad();
    this.btnChecked = false;
    let data = {
      salon_id: this.salon_id,
      emp_id: this.emp_id,
      service_id: this.servicesId,
      payment: this.totalPrice,
      date: this.date,
      start_time: this.start_time,
      payment_type: 'LOCAL',
      coupon_id: this.coupon_id,
      discount: this.dis,
      booking_at: this.api.booking_at,
      address_id: localStorage.getItem("SelectAddress"),
      extra_charges: this.api.extraCharges
    };
    this.api.postDataWithToken('booking', data).subscribe((success: any) => {
      if (success.success == true) {
        this.navCtrl.navigateRoot('tabs/home');
        localStorage.removeItem('data of salon');
        localStorage.removeItem('SelectAddress');
        this.util.dismissLoader();
        this.presentModal();
      } else {
        this.util.dismissLoader();
      }
    }, err => {
      this.util.dismissLoader();
    })
  }

  async presentModalPayment() {
    this.discount = 0;
    this.totalPrice = JSON.parse(localStorage.getItem('total'));
    const modal = await this.modal.create({
      component: CouponPage,
      componentProps: {
        salon_id: this.salon_id
      },
    });
    modal.onDidDismiss().then(async (success) => {
      if (success) {
        this.type = success.data.type;

        if (this.type == null) {
          this.totalPrice = JSON.parse(localStorage.getItem('total'));
          this.discount = 0;
          this.dis = 0;
        }
        if (this.type == 'Percentage') {
          this.discount = success.data.dis;
          this.dis = this.totalPrice * this.discount / 100;
          if (this.dis < success.data.min_discount_amount) {
            this.dis = this.dis;
          } else {
            this.dis = success.data.min_discount_amount;
          }
          this.coupon_id = success.data.coupon;
          this.totalPrice = this.totalPrice - this.dis;
        }
        if (this.type == 'Amount') {
          this.discount = success.data.dis;
          this.dis = this.discount;
          if (this.dis < success.data.min_discount_amount) {
            this.dis = this.discount;
          } else {
            this.dis = success.data.min_discount_amount;
          }
          this.coupon_id = success.data.coupon;
          this.totalPrice = this.totalPrice - this.dis;

        }
      }
    });
    return modal.present();
  }

  stripePay() {
    this.setupStripe();
  }

  makePay() {
    this.util.startLoad();
    this.btnChecked = false
    let data = {
      salon_id: this.salon_id,
      emp_id: this.emp_id,
      service_id: this.servicesId,
      payment: this.totalPrice,
      date: this.date,
      start_time: this.start_time,
      payment_type: this.radio,
      coupon_id: this.coupon_id,
      discount: this.dis,
      payment_token: this.payment_token,
      extra_charges: this.api.extraCharges,
      booking_at: this.api.booking_at,
      address_id: localStorage.getItem("SelectAddress")
    }
    this.api.postDataWithToken('booking', data).subscribe((success: any) => {
      if (success.success == true) {
        this.navCtrl.navigateRoot('tabs/home')
        localStorage.removeItem('booking-detail');
        localStorage.removeItem('data of salon');
        localStorage.removeItem("SelectAddress");
        this.presentModal();
        this.util.dismissLoader();
      }
      else {
        this.util.dismissLoader();
      }
    }, error => {
      this.util.dismissLoader();
      console.log(error);

    })
  }

  mcqAnswer(event) {
    this.util.startLoad();
    this.radio = event.detail.value;
    if (this.radio == 'STRIPE') {
      this.setupStripe();
      setTimeout(() => {
        var form = document.getElementById('payment-form');
        form.addEventListener('submit', event => {
          this.util.startLoad();
          event.preventDefault();
          this.stripe.createSource(this.card).then(result => {
            this.payment_token = result.source.id
            if (result.error) {
              var errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
            } else {
              this.btnChecked = false;
              this.makePay();
            }
          });
        });
        this.util.dismissLoader();
      }, 50);
    }
  }

  setupStripe() {
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: 'mon-medium',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      }
    };
    this.card = elements.create('card', { style: style });
    setTimeout(() => {
      this.card.mount('#element');
      this.card.addEventListener('change', event => {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      });
    }, 50);
  }

}
