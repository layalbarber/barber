import { Component, OnInit } from "@angular/core";
import { NavController, Platform } from "@ionic/angular";
import { UtilserviceService } from "src/app/services/utilservice.service";
import { ApiService } from "src/app/services/api.service";
import { NavigationExtras } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { countryCode } from "src/environments/environment";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  name: string = "";
  email: string = "";
  phone: string = "";
  password: string = "";
  id: any;
  errors: any;
  token: string;
  referralCode: any;
  setting_package: any;
  err: any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  constructor(
    private navCtrl: NavController,
    private util: UtilserviceService,
    private api: ApiService,
    private formBuilder: FormBuilder,
    public platform: Platform
  ) {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot("/login");
    });
    this.ionicForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
        ],
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
    this.language = localStorage.getItem("lan");
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  language: any;

  ngOnInit() {
    this.token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";

    this.util.startLoad();
    this.api.getDataWithToken("settings").subscribe(
      (data: any) => {
        this.util.dismissLoader();

        this.setting_package = data.data.is_point_package;
      },
      (err: any) => {
        this.util.dismissLoader();
        console.log(err);
      }
    );
  }

  code = "+91";
  cCode: any = countryCode;

  submitForm() {
    this.util.startLoad();
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log("Please provide all the required values!");
      this.util.dismissLoader();
      return false;
    } else {
      console.log(this.ionicForm.value);
      let data = this.ionicForm.value;
      (data.phone = this.phone),
        (data.code = this.code),
        (data.friend_code = this.referralCode),
        console.log("data", data);
      this.api.postDataWithToken("register", data).subscribe(
        (success: any) => {
          if (success.data.verify == 0) {
            if (this.language == "en") {
              this.util.presentToast("Registered Verification on ");
            } else if (this.language == "ar") {
              this.util.presentToast("تم تسجيل التحقق على");
            } else {
              this.util.presentToast("Verificare înregistrată la ");
            }
            this.id = success.data.id;
            this.util.dismissLoader();
            let navigationExtra: NavigationExtras = {
              state: {
                id: this.id,
              },
            };
            this.navCtrl.navigateForward("verify", navigationExtra);
            this.util.dismissLoader();
          } else {

            if (this.language == "en") {
              this.util.presentToast("successfuly registered");
            } else if (this.language == "ar") {
              this.util.presentToast("تم التسجيل بنجاح");
            } else {
              this.util.presentToast("înregistrat cu succes");
            }
            this.navCtrl.navigateForward("tabs/home");
            this.api.setNewLogin(true);
            this.id = success.data.id;
            this.util.dismissLoader();
            let navigationExtra: NavigationExtras = {
              state: {
                id: this.id,
              },
            };
            localStorage.setItem("token", success.data.token);
            localStorage.setItem("isUserLogged", "true");
            this.util.dismissLoader();
          }
        },
        (error) => {
          this.err = error.error.errors;
          console.log("error", error);
          this.errors = error.error.errors.email[0];
          console.log("this.errrs", this.errors);
          this.util.dismissLoader();
        }
      );
    }
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  back() {
    this.navCtrl.navigateBack("login");
  }

  loginn() {
    this.navCtrl.navigateForward("login");
  }

  privacy() {
    this.navCtrl.navigateForward("privacy-policy");
  }
}
