
import { FacebookLoginResponse } from "@ionic-native/facebook/ngx";
import { Facebook } from "@ionic-native/facebook/ngx";
import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  Platform,
} from "@ionic/angular";
import { UtilserviceService } from "src/app/services/utilservice.service";
import { ApiService } from "src/app/services/api.service";
import { TranslateService } from "@ngx-translate/core";
import { NavigationExtras } from "@angular/router";
import {
  SignInWithApple,
  AppleSignInResponse,
  AppleSignInErrorResponse,
  ASAuthorizationAppleIDRequest,
} from "@ionic-native/sign-in-with-apple/ngx";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  errors: any;
  imagePath: any;
  imagee: any;
  err: any;
  passwordd: any;
  inputData: any = {};
  deviceToken: any;
  language: any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  error: any = {};
  errall: any;
  plateform: string;
  constructor(
    private navCtrl: NavController,
    private util: UtilserviceService,
    private api: ApiService,
    private modal: ModalController,
    private platform: Platform,
    private translate: TranslateService,
    private fb: Facebook,
    private signInWithApple: SignInWithApple,
    private googlePlus: GooglePlus
  ) {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot("/login");
    });
  }

  ionViewWillEnter() {
    this.plateform = localStorage.getItem("platform")
    this.inputData.email = "";
    this.inputData.password = "";
    this.language = localStorage.getItem("lan");
    this.util.startLoad();
    this.api.getData("settings").subscribe(
      (success: any) => {
        if (success.success) {
          this.imagePath = success.data.imagePath;
          this.imagee = success.data.white_logo;
          this.util.dismissLoader();
        }
      },
      (error) => {
        this.util.dismissLoader();
      }
    );
  }

  ngOnInit() {
    this.util.startLoad();
    this.api.getData("settings").subscribe(
      (success: any) => {
        if (success.success) {
          this.imagePath = success.data.imagePath;
          this.imagee = success.data.white_logo;
          this.util.dismissLoader();
        }
      },
      (error) => {
        this.util.dismissLoader();
      }
    );
    this.language = localStorage.getItem("lan");
  }

  backButton() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateBack("tabs/home");
    });
  }

  signUp() {
    let hasPre = localStorage.getItem("previous-request") ? true : false;
    if (hasPre) {
      this.modal.dismiss();
      this.navCtrl.navigateForward("signup");
    } else {
      this.modal.dismiss();
      this.navCtrl.navigateForward("signup");
    }
  }

  forgot() {
    let hasPre = localStorage.getItem("previous-request") ? true : false;
    if (hasPre) {
      this.modal.dismiss();
      this.navCtrl.navigateForward("emailverify");
    } else {
      this.modal.dismiss();
      this.navCtrl.navigateForward("emailverify");
    }
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  home() {
    let translateData: any;
    let tData: any;
    this.translate.get("loginErr").subscribe((data: any) => {
      translateData = data;
    });
    this.util.startLoad();
    this.deviceToken = this.api.deviceToken ? this.api.deviceToken : "helo";
    const fd = new FormData();
    fd.append("email", this.inputData.email);
    fd.append("password", this.inputData.password);
    fd.append("provider", "local");
    fd.append(
      "device_token",
      this.deviceToken ? this.deviceToken : localStorage.getItem("pushTokn")
    );
    this.api.postDataWithToken("login", fd).subscribe(
      (success: any) => {
        this.util.dismissLoader();
        console.log(success);
        this.errors = "";
        this.passwordd = "";
        this.util.presentToast(success.msg);
        this.api.setNewLogin(true);
        localStorage.setItem("token", success.data.token);
        let hasPre = localStorage.getItem("previous-request") ? true : false;
        if (hasPre) {
          if (success.data.verify == 0) {
            let navigationExtra: NavigationExtras = {
              state: {
                id: success.data,
              },
            };
            this.navCtrl.navigateForward("verify", navigationExtra);
            this.modal.dismiss();
          } else {
            localStorage.setItem("token", success.data.token);
            let page = localStorage.getItem("previous-request-page");
            localStorage.setItem("isUserLogged", "true");
            this.util.dismissLoader();
            this.modal.dismiss();
            this.api.setNewLogin(true);
            this.navCtrl.navigateRoot("tabs/home");
          }
        } else {
          localStorage.setItem("token", success.data.token);
          this.api.setNewLogin(true);
          localStorage.setItem("isUserLogged", "true");
          this.util.dismissLoader();
          if (this.language == "ar") {
            this.util.presentToast("تم تسجيل الدخول بنجاح");
          } else if (this.language == "en") {
            this.util.presentToast("You have signed in successfully");
          } else {
            this.util.presentToast("V-ați conectat cu succes");
          }

          this.navCtrl.navigateRoot("tabs/home");
        }
      },
      (error: any) => {
        this.util.dismissLoader();
        this.errors = "";
        this.passwordd = "";
        this.errall = "";
        console.log(error.error.error);
        this.errall = error.error.error;
        this.err = error.error.errors;
        if (this.inputData.email == "") {
          this.errors = translateData.email;
        }
        if (this.inputData.password == "") {
          this.passwordd = translateData.password;
        }

      }
    );
  }

  facebookLogin() {
    this.fb
      .login(["email", "public_profile", "user_friends"])
      .then((res: FacebookLoginResponse) => {
        console.log("Logged into Facebook!", res);
        this.fb
          .api(
            "me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)",
            []
          )
          .then((profile) => {
            console.log("profile", profile);
            const fd = new FormData();
            if (profile.email) {
              fd.append("email", profile.email);
            }
            fd.append("provider", "facebook");
            fd.append("provider_token", profile.id);
            fd.append("name", profile.name);
            fd.append("image", profile.picture_large.data.url);
            fd.append(
              "device_token",
              this.deviceToken
                ? this.deviceToken
                : localStorage.getItem("pushTokn")
            );
            this.util.startLoad();
            this.api.postDataWithToken("login", fd).subscribe(
              (res: any) => {
                console.log("response", res);
                this.util.dismissLoader();
                if (res.success) {
                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("provider", "facebook");
                  this.inputData = {};

                  let page = localStorage.getItem("previous-request-page");
                  this.modal.dismiss();
                  this.api.setNewLogin(true);
                  this.navCtrl.navigateForward(page);

                  this.util.presentToast(res.msg);
                  this.navCtrl.navigateForward("/tabs/home");
                } else {
                  this.util.presentToast(res.msg);
                }
              },
              (er) => {
                this.util.dismissLoader();
                console.log("er", er);
              }
            );
          });
      })
      .catch((e) => console.log("Error logging into Facebook", e));
  }

  googleLogin() {
    this.googlePlus
      .login({})
      .then((gres) => {
        // accessToken
        console.log("google response", gres);
        const fd = new FormData();
        fd.append("email", gres.email);
        fd.append("provider", "google");
        fd.append("provider_token", gres.userId);
        fd.append("name", gres.displayName);
        fd.append(
          "device_token",
          this.deviceToken ? this.deviceToken : localStorage.getItem("pushTokn")
        );
        this.util.startLoad();
        this.api.postData("login", fd).subscribe(
          (res: any) => {
            console.log("response", res);
            this.util.dismissLoader();
            if (res.success) {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("provider", "google");
              this.inputData = {};
              let page = localStorage.getItem("previous-request-page");
              this.modal.dismiss();
              this.api.setNewLogin(true);
              this.navCtrl.navigateForward(page);
              this.util.presentToast(res.msg);
              this.navCtrl.navigateForward("/tabs/home");
            } else {
              console.log(res.msg);
            }
          },
          (er) => {
            this.util.dismissLoader();
            console.log("er", er);
          }
        );
      })
      .catch((err) => {
        console.error("errror", err);
        console.log("google", err);
      });
  }

  appleLoginDB(res) {
    const fd = new FormData();
    if (res.email) {
      fd.append("email", res.email);
    }
    fd.append("provider", "apple");
    fd.append("provider_token", res.user);
    fd.append("name", res.fullName.givenName);
    fd.append(
      "device_token",
      this.deviceToken ? this.deviceToken : localStorage.getItem("pushTokn")
    );
    this.util.startLoad();
    this.api.postData("login", fd).subscribe(
      (res: any) => {
        console.log("response", res);
        this.util.dismissLoader();
        if (res.success) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("provider", "apple");
          this.inputData = {};
          let page = localStorage.getItem("previous-request-page");
          this.modal.dismiss();
          this.api.setNewLogin(true);
          this.navCtrl.navigateForward(page);
          this.util.presentToast(res.msg);
          this.navCtrl.navigateForward("/tabs/home");
        } else {
          this.util.presentToast(res.msg);
        }
      },
      (er) => {
        this.util.dismissLoader();
        console.log("er", er);
      }
    );
  }

  appleLogin() {
    this.signInWithApple
      .signin({
        requestedScopes: [
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail,
        ],
      })
      .then((res: AppleSignInResponse) => {
        console.log(res);
        this.appleLoginDB(res);
      })
      .catch((error: AppleSignInErrorResponse) => {
        console.log(error.code + " " + error.localizedDescription);
        console.error(error);
      });
    this.util.presentToast("Not Available in Android");
  }
}
