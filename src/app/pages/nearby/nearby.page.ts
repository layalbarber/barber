import { Component, OnInit } from "@angular/core";
import { NavController, Platform, MenuController } from "@ionic/angular";
import { UtilserviceService } from "src/app/services/utilservice.service";
import { ApiService } from "src/app/services/api.service";
import { Router, NavigationExtras } from "@angular/router";
import { Geolocation } from "@ionic-native/geolocation/ngx";
@Component({
  selector: "app-nearby",
  templateUrl: "./nearby.page.html",
  styleUrls: ["./nearby.page.scss"],
})
export class NearbyPage implements OnInit {
  data: any;
  currentdata: string;
  res: string;
  latitude: number;
  longitude: number;
  language: any;
  zoom: number;
  lat: number;
  lng: number;
  public iconUrl = "../../../assets/icon/Path 5.svg";
  constructor(
    private navCtrl: NavController,
    private util: UtilserviceService,
    private api: ApiService,
    private router: Router,
    private geolocation: Geolocation,
    private platform: Platform,
    private menuController: MenuController
  ) {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('tabs/nearby')
    });

    this.language = localStorage.getItem('lan');
    this.ionViewWillEnter();
    this.backButtonEvent();
    this.getLocation();
    this.latitude = JSON.parse(localStorage.getItem("latttt"));
    this.longitude = JSON.parse(localStorage.getItem("langgg"));
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateBack("tabs/home");
    });
  }

  ionViewWillEnter() {
    const date = Date.now();
    const options: any = { weekday: "long" };
    this.currentdata = new Intl.DateTimeFormat("en-US", options).format(date);
    this.res = this.currentdata.toLowerCase();
    this.menuController.swipeGesture(false);
    this.language = localStorage.getItem('lan');
    this.getLocation();
  }

  async getLocation() {
    this.util.startLoad();
    setTimeout(async () => {
      this.geolocation
        .getCurrentPosition()
        .then((resp) => {
          this.latitude = resp.coords.latitude;
          this.longitude = resp.coords.longitude;
        })
        .catch((error) => {
          console.log("err", error);
        });
      this.zoom = 12;
      let data = {
        lat: this.latitude,
        long: this.longitude,
      };
      this.api.postData("nearbysalon", data).subscribe(
        (success: any) => {
          if (success.success == true) {
            this.data = success.data;
            this.data.forEach((element) => {
              this.lat = element.latitude;
              this.lng = element.longitude;
              element.distance = this.api
                .getDistanceFromLatLonInKm(
                  this.latitude,
                  this.longitude,
                  this.lat,
                  this.lng
                )
                .toFixed(1);
            });
            this.util.dismissLoader();
          } else {
            this.util.dismissLoader();
          }
        },
        (err) => {
          this.util.dismissLoader();
        }
      );
      this.util.dismissLoader();
    }, 1000);

  }

  ngOnInit() {
    this.menuController.swipeGesture(false);
    this.language = localStorage.getItem('lan');
    this.getLocation();
  }

  book(id) {
    let navigationExtras: NavigationExtras = {
      state: {
        id: id,
      },
    };
    this.router.navigate(["tabs/home/salon-profile"], navigationExtras);
    localStorage.setItem("Salon-id", id);
  }

  public styles = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
  ];
}
