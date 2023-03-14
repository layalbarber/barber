import { Component, OnInit } from '@angular/core';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { ApiService } from 'src/app/services/api.service';
import { NavController, Platform } from '@ionic/angular';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-all-salons',
  templateUrl: './all-salons.page.html',
  styleUrls: ['./all-salons.page.scss'],
})
export class AllSalonsPage implements OnInit {
  data: any = [];
  id: any;
  currentdata: string;
  res: string;
  latitude: number;
  longitude: number;
  lat: any;
  long: any;
  address: any;
  selectAddress: string = '';
  language: any;
  constructor(
    private util: UtilserviceService,
    private api: ApiService,
    private navCtrl: NavController,
    private router: Router,
    private geolocation: Geolocation,
    private route: ActivatedRoute,
    private platform: Platform
  ) {
    const date = Date.now();
    const options: any = { weekday: "long" };
    this.currentdata = new Intl.DateTimeFormat("en-US", options).format(date);
    this.res = this.currentdata.toLowerCase();
    this.getLocation();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.address = this.router.getCurrentNavigation().extras.state.address;
      }
    });
    this.backButton();
  }


  backButton() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateBack('tabs/home');
    })
  }

  ionViewWillEnter() {
    this.api.addressData;

    this.language = localStorage.getItem('lan')
    this.selectAddress = localStorage.getItem('dataofaddress');
    this.api.getData('salons').subscribe((success: any) => {
      if (success.success) {
        this.data = success.data;
        this.id = success.data.salon_id;
        this.util.dismissLoader();
        this.data.forEach(element => {
          this.lat = element.latitude;
          this.long = element.longitude;
          element.distance = this.api.getDistanceFromLatLonInKm(this.latitude, this.longitude, this.lat, this.long).toFixed(1)
        });
      }
    }, error => {
      this.util.dismissLoader();
    })
  }
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      JSON.stringify(error)
    });
  }
  async getLocation() {
    const position = await this.geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.util.startLoad();
    this.api.getData('salons').subscribe((success: any) => {
      if (success.success) {
        this.data = success.data;
        this.id = success.data.salon_id;
        this.util.dismissLoader();
        this.data.forEach(element => {
          this.lat = element.latitude;
          this.long = element.longitude;
          element.distance = this.api.getDistanceFromLatLonInKm(this.latitude, this.longitude, this.lat, this.long).toFixed(1)
        });
      }
    }, error => {
      this.util.dismissLoader();
    })
  }

  ngOnInit() {
  }
  back() {
    this.navCtrl.navigateBack('tabs/home');
  }
  book(id) {
    let navigationExtras: NavigationExtras = {
      state: {
        id: id,
      }
    };
    this.router.navigate(['tabs/home/salon-profile'], navigationExtras);
    localStorage.setItem('Salon-id', id)
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getLocation();
      event.target.complete();
    }, 2000);
  }



}
