import { Component, OnInit, Sanitizer } from "@angular/core";
import { NavController, ActionSheetController, Platform, ModalController } from "@ionic/angular";
import { UtilserviceService } from "src/app/services/utilservice.service";
import { Camera, CameraOptions } from "@ionic-native/Camera/ngx";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ApiService } from "src/app/services/api.service";
import { countryCode } from "src/environments/environment";
import { NavigationExtras } from "@angular/router";
@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.page.html",
  styleUrls: ["./edit-profile.page.scss"],
})
export class EditProfilePage implements OnInit {
  base64Image: any;
  data: any = {};
  id: any;
  name: string = "";
  phone: any;
  address: any = [];
  addressId: any;
  img: string;
  imageUri: any;
  image: any;
  profilee: any;
  code: any;
  language: any;
  cCode: any = countryCode;
  p_err: any;
  constructor(
    private navCtrl: NavController,
    private util: UtilserviceService,
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    private sanitize: DomSanitizer,
    private api: ApiService,
    private platform: Platform,
    private modal: ModalController,
  ) {

    this.backButtonEvent();
  }

  ngOnInit() {
    this.language = localStorage.getItem("lan");
  }

  ionViewWillEnter() {
    this.util.startLoad();
    this.api.update_address.subscribe((d) => {
      this.api.getDataWithToken("profile").subscribe(
        (success: any) => {
          if (success.success) {
            this.data = success.data;
            this.code = this.data.code;
            this.image = success.data.imagePath + success.data.image;
            this.id = success.data.id;
            this.address = success.data.address;
            this.address.forEach((element) => {
              this.addressId = element.address_id;
            });
            this.util.dismissLoader();
          }
        },
        (error) => {
          this.util.dismissLoader();
        }
      );
    });
  }

  addAddres() {
    this.util.startLoad();
    this.api.editprofile = "editprofile";
    this.navCtrl.navigateRoot("add-address");
    this.util.dismissLoader();
  }

  changeThis() {
    this.util.startLoad();
    let data = {
      name: this.name,
      phone: this.phone,
      image: this.imageUri,
      code: this.code,
    };
    this.api.postDataWithToken("profile/edit", data).subscribe(
      (success: any) => {
        console.log("success.success", success.success);
        this.p_err = "";
        if (success.success) {
          if (this.language == "en") {
            this.util.presentToast(
              "your profile has been successfully changed"
            );
          } else if (this.language == "ar") {
            this.util.presentToast("تم تغيير ملف التعريف الخاص بك بنجاح");
          } else {
            this.util.presentToast("profilul dvs. a fost modificat cu succes");
          }
          this.navCtrl.navigateRoot("tabs/profile");
          this.util.dismissLoader();
          this.ionViewWillEnter();
          this.api.newLogin.next(true);
          this.api.isNewLogin().subscribe((d) => {
            console.log("event recived!");
            setTimeout(() => {
              if (d) {
                this.api.getDataWithToken("profile").subscribe(
                  (success: any) => {
                    if (success.success) {
                      this.profilee = success.data;
                    }
                  },
                  (error) => { }
                );
              }
            }, 500);
          });
        }
      },
      (error) => {
        console.log("error", error.error.errors.phone[0]);
        this.p_err = error.error.errors.phone[0];
        this.util.dismissLoader();
      }
    );
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateBack("tabs/profile");
    });
  }

  edit_address(item) {
    let navigationExtra: NavigationExtras = {
      state: {
        edit_data: item,
        address: "edit_address",
      },
    };

    this.modal.dismiss();
    this.navCtrl.navigateForward(
      ["edit-address"],
      navigationExtra
    );
  }

  removeAddress(l) {
    this.util.startLoad();
    this.api
      .getDataWithToken("profile/address/remove/" + l?.address_id)
      .subscribe(
        (success: any) => {
          if (success.success == false) {
            this.util.presentToast(success.msg);
          }
          if (success.success) {
            this.api.update_address.next(true);
            if (this.language == "en") {
              this.util.presentToast("address removed successsfully");
            } else if (this.language == "ar") {
              this.util.presentToast("تمت إزالة العنوان بنجاح");
            } else {
              this.util.presentToast("adresa eliminată cu succes");
            }
            this.util.dismissLoader();
          }
        },
        (error) => {
          console.log("error", error);
          this.util.dismissLoader();
        }
      );
  }

  public getCamera(): any {
    this.camera
      .getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true,
      })
      .then((file_uri) => {

        this.img = "data:image/jpeg;base64," + file_uri;
        this.imageUri = file_uri;
        console.log("img", this.img);
        this.base64Image = this.sanitize.bypassSecurityTrustResourceUrl(
          this.img
        );
        this.image = this.imageUri;
        this.image = this.img;
        console.log("this.image", this.image);
        console.log("imagedata ", this.base64Image);
        this.changeThis();
      },
        (err) => {
          console.log(err);

        }
      );
  }

  public getGallery(): any {
    this.camera
      .getPicture({
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true,
      })
      .then((file_uri) => {
        this.img = "data:image/jpeg;base64," + file_uri;
        this.imageUri = file_uri;
        console.log("img", this.img);
        this.base64Image = this.sanitize.bypassSecurityTrustResourceUrl(
          this.img
        );
        this.image = this.imageUri;
        this.image = this.img;
        console.log("this.image", this.image);
        console.log("imagedata ", this.base64Image);
        this.changeThis();
      },
        (err) => {
          console.log(err);
        });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Albums",
      mode: "ios",
      cssClass: "image-picker",
      buttons: [
        {
          text: "Gallery",
          icon: "images-sharp",
          handler: () => {
            this.getGallery();
          },
        },
        {
          text: "Camera",
          icon: "camera-sharp",
          handler: () => {
            this.getCamera();
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => { },
        },
      ],
    });
    await actionSheet.present();
  }

  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50,
  };

  nearBy() {
    this.navCtrl.navigateForward("nearby");
  }

  back() {
    this.navCtrl.navigateBack("tabs/profile");
  }
}
