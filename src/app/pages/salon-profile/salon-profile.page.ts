import { Component, OnInit } from "@angular/core";
import {
  AlertController,
  ModalController,
  NavController,
  Platform,
} from "@ionic/angular";
import { AddReviewPage } from "src/app/modals/add-review/add-review.page";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { NavigationExtras } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import {
  InAppBrowser,
} from "@ionic-native/in-app-browser/ngx";
import { TimeAgoPipe } from "ngx-pipes";
@Component({
  selector: "app-salon-profile",
  templateUrl: "./salon-profile.page.html",
  styleUrls: ["./salon-profile.page.scss"],
  providers: [TimeAgoPipe]
})
export class SalonProfilePage implements OnInit {
  id: any;
  data: any = {};
  imageP: any;
  gallary: any;
  review: any = [];
  category: any = [];
  services: any = [];
  checked: any;
  local: any = [];
  total = 0;
  price = 0;
  salonId: any;
  latitude: number;
  longitude: number;
  buttonColor: string;
  distance: any;
  lng: number;
  lat: number;
  s: any;
  select = "ABOUT";
  currency: any;
  number__salon: any;
  currentdata: string;
  res: string;
  selectedDes: any;
  timeClose: string;
  endTime: any;
  language: any;
  openTime: any;
  photo: any;
  serviceAt: any = "";
  constructor(
    private modal: ModalController,
    private navCtrl: NavController,
    private callNumber: CallNumber,
    private api: ApiService,
    private geolocation: Geolocation,
    private photoViewer: PhotoViewer,
    private theInAppBrowser: InAppBrowser,
    private platform: Platform,
    private alertController: AlertController
  ) {

    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot("/tabs/home");
    })
    this.id = localStorage.getItem("Salon-id");
    this.currency = localStorage.getItem("currency");
    const date = Date.now();
    const options: any = { weekday: "long" };
    this.currentdata = new Intl.DateTimeFormat("en-US", options).format(date);
    this.res = this.currentdata.toLowerCase();
    console.log("res", this.res);

    var current_date = new Date();
    var weekday_value = current_date.getDay();
    this.backbutton();
    this.api.newLang.subscribe((d) => {
      this.language = localStorage.getItem("lan");
    });

    if (this.language == "en") {
      this.selectedDes = "SERVICES";
    }
    if (this.language == "ar") {
      this.selectedDes = "إحجز";
    }
    if (this.language == "ro") {
      this.selectedDes = "SERVICES";
    }
  }

  ionViewWillEnter() {
    localStorage.setItem("total", JSON.stringify(0));
    this.total = 0;
    localStorage.removeItem("booking-detail");
    this.api.getData("salon/" + this.id).subscribe(
      (success: any) => {
        if (success.success) {
          this.data = success.data.salon;
          this.photo = this.data.imagePath + this.data.image;
          this.imageP = this.data.imagePath + this.data.image;
          if (this.res == "tuesday") {
            this.openTime = this.data.tuesday.open;
            this.endTime = this.data.tuesday.close;
          }
          if (this.res == "wednesday") {
            this.openTime = this.data.wednesday.open;
            this.endTime = this.data.wednesday.close;
          }
          if (this.res == "thursday") {
            this.openTime = this.data.thursday.open;
            this.endTime = this.data.thursday.close;
          }
          if (this.res == "friday") {
            this.openTime = this.data.friday.open;
            this.endTime = this.data.friday.close;
          }
          if (this.res == "saturday") {
            this.openTime = this.data.saturday.open;
            this.endTime = this.data.saturday.close;
          }
          if (this.res == "sunday") {
            this.openTime = this.data.sunday.open;
            this.endTime = this.data.sunday.close;
          }
          if (this.res == "monday") {
            this.openTime = this.data.monday.open;
            this.endTime = this.data.monday.close;
          }

          this.number__salon = success.data.salon.phone;
          this.lat = success.data.salon.latitude;
          this.lng = success.data.salon.longitude;
          setTimeout(() => {
            this.gallary = success.data.gallery;
          }, 5000);
          this.review = success.data.review;
          this.category = success.data.category;
          setTimeout(() => {
            this.category.forEach((element, index) => {
              this.s = this.category[0].name;
              this.services = this.category[0].service;

              element.isItemChecked = this.category[0].service;
            });
          }, 100);

          this.geolocation
            .getCurrentPosition()
            .then((resp) => {
              this.latitude = resp.coords.latitude;
              this.longitude = resp.coords.longitude;
              this.distance = this.api.getDistanceFromLatLonInKm(
                this.latitude,
                this.longitude,
                this.lat,
                this.lng
              );
              this.api.distance = this.distance;
              localStorage.setItem("distance", this.distance);
            })
            .catch((error) => {
              console.log(JSON.stringify(error));
            });

          this.api.salonDetail = this.data;

        }
      },
      (error) => {

      }
    );

    var dt = new Date();
    var timeString = dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours();
    this.timeClose = timeString + ":" + dt.getMinutes();


  }

  verifyEvent(id) {
    let selected = 0;
    this.local = JSON.parse(localStorage.getItem("booking-detail"))
      ? JSON.parse(localStorage.getItem("booking-detail"))
      : [];

    this.services.map((item, index) => {
      if (item.service_id == id) {
        item.isItemChecked = !item.isItemChecked;
      }
      if (item.isItemChecked == true) {
        selected++;
        if (item.service_id == id) {
          this.price = item.price;
          this.total += this.price;
          if (this.data.home_charges) {
            this.api.total = this.total;
            this.local.push(item);
            localStorage.setItem("total", this.api.total);
          } else {
            this.api.total = this.total;
            this.local.push(item);
            localStorage.setItem("total", this.api.total);
          }
        }
      }
    });
    this.services.map((item, index) => {
      console.log(item.isItemChecked);

      if (item.isItemChecked == false) {
        selected--;
        if (item.service_id == id) {
          this.price = item.price;
          this.total -= this.price;
          this.api.total = this.total;
          this.local = this.local.filter(i => i.service_id !== item.service_id);
        }
      }
    });

    localStorage.setItem("booking-detail", JSON.stringify(this.local));
    localStorage.setItem("total", this.api.total);
  }

  buttonDiv: any = [
    {
      name: "SERVICES",
    },
    {
      name: "GALLERY",
    },
    {
      name: "ABOUT",
    },
    {
      name: "REVIEW",
    },
  ];

  ngOnInit() {

  }

  segmentChanged(event) {
    this.select = event.detail.value;
  }

  payment() {
    this.api.booking_at = this.serviceAt
      ? this.serviceAt
      : this.data.give_service;
    if (this.serviceAt == "Home" || this.data.give_service == "Home") {
      this.api.total = this.total + JSON.parse(this.data.home_charges);
      localStorage.setItem("extracharge", this.data.home_charges)
      localStorage.setItem("total", this.api.total);
    } else {
      this.api.total = this.total;
      localStorage.setItem("total", this.api.total);
    }
    localStorage.setItem("serviceAt", JSON.stringify(this.serviceAt));
    let navigationExtras: NavigationExtras = {
      state: {
        total: this.api.total,
        salonId: this.id,
      },
    };
    this.navCtrl.navigateRoot(["tabs/home/select-time-slot"], navigationExtras);
  }

  btnDivChaangedd(b) {
    this.selectedDes = b.name;
  }

  photoShow(event) {
    this.photoViewer.show(event.imagePath + event.image);
  }

  btnChanged(c, id) {
    this.s = c;
    this.buttonColor = "#345465";
    this.category.forEach((element) => {
      if (element.name == c) {
        this.services = element.service;
      }
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Service At !",
      message: "Choose the Place!!!",
      mode: "ios",
      backdropDismiss: true,
      buttons: [
        {
          text: "Home",
          handler: (blah) => {
            console.log("home");
            this.serviceAt = "Home";
            this.api.booking_at = this.serviceAt;
          },
        },
        {
          text: "Salon",
          handler: () => {
            this.serviceAt = "Salon";
            this.api.booking_at = this.serviceAt;
          },
        },
      ],
    });
    await alert.present();
  }

  call() {
    this.callNumber
      .callNumber(this.number__salon, false)
      .then((res) => console.log("Launched dialer!", res))
      .catch((err) => console.log("Error launching dialer", err));
  }

  webshow() {
    this.navCtrl.navigateRoot("tabs/home/web");
  }

  setTheDirection() {
    let navigationExtras: NavigationExtras = {
      state: {
        longitude: this.longitude,
        latitude: this.latitude,
        salon_id: this.id,
      },
    };
    this.navCtrl.navigateRoot(["confirmlocation"], navigationExtras);
  }

  async presentModal() {
    const modal = await this.modal.create({
      component: AddReviewPage,
      cssClass: "add-review",
      componentProps: {
        salon_id: this.salonId,
      },
    });
    return await modal.present();
  }

  openWithSystemBrowser(url: string) {
    let target = "_system";
    this.theInAppBrowser.create(url, target);
  }

  backbutton() {
    if (this.serviceAt != "") {
      this.platform.backButton.subscribe(() => {
        this.navCtrl.navigateBack("/tabs/home");
      });
    }
  }

  back() {
    this.navCtrl.navigateBack("/tabs/home");
  }
}

