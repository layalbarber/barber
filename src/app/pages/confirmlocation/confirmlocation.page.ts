import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { ApiService } from 'src/app/services/api.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmlocation',
  templateUrl: './confirmlocation.page.html',
  styleUrls: ['./confirmlocation.page.scss'],
})
export class ConfirmlocationPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef
  lat: number;
  lng: number;
  public latitude: any;
  public longitude: any;
  long: any;
  map1: number;
  map2: number;
  public Centerlat: any;
  public Centerlng: any;
  public origin: any;
  public destination: any;
  public renderOptions = {
    suppressMarkers: true,
    draggable: false
  };
  public markerOptions = {
    origin: {
      icon: "../../../assets/icon/location1.svg"
    },
    destination: {
      icon: "../../../assets/icon/locaiton2.svg"
    },
    draggable: true
  };
  singlesalon: any;
  salonLong: number;
  salonLat: number;
  currentdata: string;
  res: string;
  distance: any;
  distances: string;
  zoom: number;
  salon_let: any;
  salon_lang: any;
  constructor(
    private navCtrl: NavController,
    private util: UtilserviceService,
    private api: ApiService,
    private geolocation: Geolocation,
    private router: Router,
    private route: ActivatedRoute,
    private platform: Platform
  ) {
    this.latitude = localStorage.getItem("lat");
    this.longitude = localStorage.getItem("lang");
    this.singlesalon = this.api.salonDetail;
    this.distances = this.api.getDistanceFromLatLonInKm(this.latitude, this.longitude, this.singlesalon.latitude, this.singlesalon.longitude).toFixed(1);
    this.distance = this.api.distance;
    this.salonLat = parseFloat(this.api.salonDetail.latitude);
    this.salonLong = parseFloat(this.api.salonDetail.longitude);
    this.lat = this.api.salonDetail.longitude;
    this.lng = this.api.salonDetail.longitude;
    this.getGeolocation();
    const options: any = { weekday: "long" };
    const date = Date.now();
    this.currentdata = new Intl.DateTimeFormat("en-US", options).format(date);
    this.res = this.currentdata.toLowerCase();
    var current_date = new Date();
    var weekday_value = current_date.getDay();
    this.route.queryParams.subscribe((params: any) => {
      console.log(params);
      if (this.router.getCurrentNavigation().extras.state) {
        this.longitude = JSON.parse(this.router.getCurrentNavigation().extras.state.longitude);
        this.latitude = this.router.getCurrentNavigation().extras.state.latitude;
        this.salon_let = JSON.parse(this.router.getCurrentNavigation().extras.state.salon_lang);
        this.salon_lang = JSON.parse(this.router.getCurrentNavigation().extras.state.salon_let);
        this.map1 = parseFloat(this.latitude);
        this.map2 = parseFloat(this.longitude);
      }
    });
    this.backButtonEvent();
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.latitude = localStorage.getItem("lat");
    this.longitude = localStorage.getItem("lang");
    this.util.startLoad();
    this.singlesalon = this.api.salonDetail;
    this.distances = this.api.getDistanceFromLatLonInKm(this.latitude, this.longitude, this.singlesalon.latitude, this.singlesalon.longitude).toFixed(1);
    this.distance = this.api.distance;
    this.salonLat = parseFloat(this.api.salonDetail.latitude);
    this.salonLong = parseFloat(this.api.salonDetail.longitude);
    this.lat = this.api.salonDetail.longitude;
    this.lng = this.api.salonDetail.longitude;
    this.getGeolocation();
  }

  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.Centerlat = resp.coords.latitude;
      this.Centerlng = resp.coords.longitude;
      this.lat = parseFloat(this.Centerlat);
      this.long = parseFloat(this.Centerlng);
      this.origin = { lat: this.lat, lng: this.long };
      this.destination = { lat: this.salonLat, lng: this.salonLong };
      this.util.dismissLoader();
    }).catch((error) => {
      console.log("err", JSON.stringify(error));
    });
    this.zoom = 12;
  }

  back() {
    this.navCtrl.back();
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateBack('tabs/home/salon-profile');
    })
  }


  public styles = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5"
        }
      ]
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161"
        }
      ]
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5"
        }
      ]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff"
        }
      ]
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161"
        }
      ]
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5"
        }
      ]
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e"
        }
      ]
    }
  ];


}
