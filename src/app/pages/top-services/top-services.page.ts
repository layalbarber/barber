import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { SortbyPage } from 'src/app/modals/sortby/sortby.page';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-top-services',
  templateUrl: './top-services.page.html',
  styleUrls: ['./top-services.page.scss'],
})
export class TopServicesPage implements OnInit {
  cat_id: any;
  data: any = [];
  currentdata: string;
  res: string;
  id: any;
  address: any;
  selectAddress: any = '';
  latitude: any;
  longitude: any;
  language: any;
  constructor(
    private modal: ModalController,
    private util: UtilserviceService,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private platform: Platform
  ) {
    this.util.startLoad();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.address = this.router.getCurrentNavigation().extras.state.address;
      }
    });
    this.cat_id = localStorage.getItem('catId');
    const date = Date.now();
    const options: any = { weekday: "long" };
    this.currentdata = new Intl.DateTimeFormat("en-US", options).format(date);
    this.res = this.currentdata.toLowerCase();
  }

  back() {
    this.navCtrl.back();
  }

  backbutton() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateBack('tabs/home');
    })
  }

  ionViewWillEnter() {
    this.api.addressData;
    this.api.newLang.subscribe((d) => {
      this.language = localStorage.getItem("lan");
    });
    this.selectAddress = localStorage.getItem('dataofaddress');
    this.getLocation();
  }

  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error: any) => {
      console.log('Error getting location', JSON.stringify(error));
    });
  }

  async getLocation() {
    const position = await this.geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    localStorage.setItem("latttt", this.latitude);
    localStorage.setItem("langgg", this.longitude);
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

  ngOnInit() {
    this.latitude = localStorage.getItem("lat");
    this.longitude = localStorage.getItem("lang");
    this.api.getData('catsalon/' + this.cat_id).subscribe((success: any) => {
      if (success.success) {
        this.data = success.data;
        console.log('data', this.data);
        this.id = success.data.id;
        this.data.forEach(element => {
          element.distance = this.api.getDistanceFromLatLonInKm(this.latitude, this.longitude, element.latitude, element.longitude).toFixed(1);
        });
        this.util.dismissLoader();
      }
    })
  }

  search() {
    this.navCtrl.navigateForward('searchresult');
  }

  async presentmodal() {
    const modal = await this.modal.create({
      component: SortbyPage,
      cssClass: 'sort-by'
    });
    return await modal.present();
  }

}
