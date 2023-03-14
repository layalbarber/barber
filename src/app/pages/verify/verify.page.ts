import { Component, OnInit, ViewChild } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UtilserviceService } from "src/app/services/utilservice.service";

import { Subscription, timer } from "rxjs";

@Component({
  selector: "app-verify",
  templateUrl: "./verify.page.html",
  styleUrls: ["./verify.page.scss"],
})
export class VerifyPage implements OnInit {
  otp: number;
  opt: any = {};
  id: any;
  timer: NodeJS.Timeout;
  hidevalue: boolean;
  interval: NodeJS.Timeout;
  timeLeft: any;
  @ViewChild("a", { static: true }) a;
  @ViewChild("b", { static: true }) b;
  @ViewChild("c", { static: true }) c;
  @ViewChild("d", { static: true }) d;

  otpType: any = "";
  language: string;
  constructor(
    private navCtrl: NavController,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private util: UtilserviceService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.id = this.router.getCurrentNavigation().extras.state as {
          id: Number,
        }
        console.log(this.id);
      }
    });
  }
  maxtime: any = 30;
  countDown: Subscription;
  counter = 60;
  tick = 1000;

  ngOnInit() {
    setTimeout(() => {
      this.a.setFocus();
    }, 2000);
    this.language = localStorage.getItem("lan");
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter != 0) {
        --this.counter;
      }
    });
  }

  ngOnDestroy() {
    this.countDown = null;
  }

  moveFocus(event, nextElement, previousElement) {
    if (event.keyCode == 8 && previousElement) {
      previousElement.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = "";
    }
  }

  resend() {
    this.util.startLoad();
    this.ngOnInit();
    this.counter = 60;
    this.tick = 1000;
    let data = {
      user_id: this.id,
    };
    this.api.postDataWithToken("resendotp", data).subscribe(
      (success: any) => {
        if (success.success == true) {
          this.change();
        }
      },
      (error) => {
        this.util.dismissLoader();
      }
    );
  }

  back() {
    this.navCtrl.navigateBack("tabs/home");
  }

  change() {
    this.util.startLoad();
    this.otp = this.opt.a + this.opt.b + this.opt.c + this.opt.d;
    let data = {
      user_id: this.id,
      otp: this.otp,
    };
    this.api.postDataWithToken("checkotp", data).subscribe(
      (success: any) => {
        if (success.success == true) {
          let lan = localStorage.getItem("lan");
          if (lan == "en") {
            this.util.presentToast("Verified Successfully ");
          } else if (lan == "ar") {
            this.util.presentToast("تم التحقق بنجاح ");
          } else {
            this.util.presentToast("Verificat cu succes");
          }
          this.api.setNewLogin(true);
          localStorage.setItem("token", success.data.token);
          this.navCtrl.navigateForward("tabs/home");
          this.util.dismissLoader();
        } else {
          let lan = localStorage.getItem("lan");
          if (lan == "en") {
            this.util.presentToast("OTP IS WRONG");
          } else if (lan == "ar") {
            this.util.presentToast("غير صالح س t ع");
          } else {
            this.util.presentToast("OTP ESTE GREȘIT");
          }
        }
      },
      (error) => {
        this.util.dismissLoader();
      }
    );
  }
}
