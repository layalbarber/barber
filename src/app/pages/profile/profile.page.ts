import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  Platform,
  MenuController,
} from "@ionic/angular";
import { UtilserviceService } from "src/app/services/utilservice.service";
import { ApiService } from "src/app/services/api.service";
import { LoginPage } from "../login/login.page";
import { Network } from "@ionic-native/network/ngx";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  profile: any = {};
  oldPassword: string = "";
  new_Password: string = "";
  confirm: string = "";
  token: string;
  netCheck: any;
  confirmError: any;
  oldPasswordError: any;
  successfalse: any;
  err: any;
  newPassError: any;
  ispoint: any;
  refralpoint: any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  passwordType1: string = 'password';
  passwordIcon1: string = 'eye-off';
  passwordType2: string = 'password';
  passwordIcon2: string = 'eye-off';
  constructor(
    private navCtrl: NavController,
    private util: UtilserviceService,
    private api: ApiService,
    private modalCtrl: ModalController,
    private platform: Platform,
    private netWork: Network,
    private menuController: MenuController,
    private translate: TranslateService
  ) {
    this.netCheck = this.netWork.type;
    this.backButtonEvent();
  }

  async ngOnInit() {
    this.util.startLoad();
    this.netCheck = this.netWork.type;
    this.api.getDataWithToken("settings").subscribe((data: any) => {
      this.ispoint = data.data.is_point_package;
      this.util.dismissLoader();
    }, (err: any) => {
      console.log(err);
      this.util.dismissLoader();
    });
  }

  async ionViewWillLeave() {
    this.backButtonEvent();
  }

  async ionViewWillEnter() {
    this.util.startLoad();
    this.api.getDataWithToken("settings").subscribe((data: any) => {
      this.ispoint = data.data.is_point_package;
      this.refralpoint = data.data.referral_point;
      this.util.dismissLoader();
    }, (err: any) => {
      console.log(err);
      this.util.dismissLoader();
    });

    this.menuController.swipeGesture(false);
    this.new_Password = "";
    this.confirm = "";
    this.oldPassword = "";
    this.confirmError = "";
    this.newPassError = "";
    this.oldPasswordError = "";
    this.err = "";
    this.token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    this.api.newLogin.subscribe((d) => {
      this.token = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";
    });

    if (this.token != "") {
      this.api.getDataWithToken("profile").subscribe((success: any) => {
        if (success.success) {
          this.profile = success.data;
          this.util.dismissLoader();
        }
      });
    }
    this.token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    if (this.token == "") {
      localStorage.setItem("previous-request", "true");
      localStorage.setItem("previous-request-page", "tabs/profile");
      let model = await this.modalCtrl.create({
        component: LoginPage,
      });
      model.present();
      model.onDidDismiss().then(() => {
        this.api.getDataWithToken("profile").subscribe(
          (success: any) => {
            this.util.dismissLoader();
            if (success.success) {
              this.profile = success.data;
            }
          },
          (err) => {
            this.util.dismissLoader();
          }
        );
      });
    }
    let hasPre = localStorage.getItem("previous-request")
      ? localStorage.getItem("previous-request")
      : false;
    let prePage = localStorage.getItem("previous-request-page")
      ? localStorage.getItem("previous-request-page")
      : "";
    if (hasPre == "true" && prePage == "tabs/profile") {
      localStorage.setItem("previous-request", "false");
    }
  }

  changePass() {
    let translateData: any;
    let tData: any;

    this.translate.get("errors").subscribe((data: any) => {
      translateData = data;
    });

    let data = {
      oldPassword: this.oldPassword,
      new_Password: this.new_Password,
      confirm: this.confirm,
    };
    this.util.startLoad();
    this.api.postDataWithToken("changepassword", data).subscribe(
      (success: any) => {
        this.util.dismissLoader();
        this.successfalse = success.success;
        this.util.presentToast("Password Changed Successfully");
        this.navCtrl.navigateRoot("tabs/home");
        localStorage.setItem("token", success.data.token);
        this.oldPassword = "";
        this.err = "";
        this.confirm = "";
        this.new_Password = "";
        this.confirmError = "";
        this.newPassError = "";
        this.oldPasswordError = "";
      },
      (error) => {
        this.util.dismissLoader();
        this.err = error.error.errors;
        this.confirmError = this.err.confirm ? this.err.confirm[0] : '';
        this.newPassError = this.err.new_Password ? this.err.new_Password[0] : '';
        this.oldPasswordError = this.err.oldPassword ? this.err.oldPassword[0] : "";
      }
    );
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('tabs/profile')
    });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  hideShowPassword1() {
    this.passwordType1 = this.passwordType1 === 'text' ? 'password' : 'text';
    this.passwordIcon1 = this.passwordIcon1 === 'eye-off' ? 'eye' : 'eye-off';
  }

  hideShowPassword2() {
    this.passwordType2 = this.passwordType2 === 'text' ? 'password' : 'text';
    this.passwordIcon2 = this.passwordIcon2 === 'eye-off' ? 'eye' : 'eye-off';
  }

  appointment() {
    this.navCtrl.navigateRoot("tabs/appointment");
  }

  search() {
    this.navCtrl.navigateForward("tabs/home/search");
  }

  editprofile() {
    this.navCtrl.navigateForward("tabs/profile/edit");
  }
}
