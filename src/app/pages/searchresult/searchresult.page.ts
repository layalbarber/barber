import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, SelectValueAccessor } from '@ionic/angular';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { ApiService } from 'src/app/services/api.service';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { SortbyPage } from 'src/app/modals/sortby/sortby.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.page.html',
  styleUrls: ['./searchresult.page.scss'],
})
export class SearchresultPage implements OnInit {
  data: any = [];
  id: any;
  currentdata: string;
  res: string;
  search: string = '';
  salonListt: any = [];
  gender: any;
  categoriesss: any;
  address: any;
  selectAddress: string = '';
  latitude: number;
  longitude: number;
  language: any;
  input: any;
  constructor(
    private navCtrl: NavController,
    private util: UtilserviceService,
    private api: ApiService,
    private router: Router,
    private modal: ModalController,
    private route: ActivatedRoute,
    private geolocation: Geolocation
  ) {
    const date = Date.now();
    const options: any = { weekday: "long" };
    this.currentdata = new Intl.DateTimeFormat("en-US", options).format(date);
    this.res = this.currentdata.toLowerCase();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.address = this.router.getCurrentNavigation().extras.state.address;
      }
    });
  }


  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log(JSON.stringify(error));
    });
  }

  async getLocation() {
    const position = await this.geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
  }

  searchApi(search: any) {
    console.log(search.detail.value);
    if (search.detail.value) {
      this.input = 1;
      let data = {
        search: this.search
      }
      this.api.postDataWithToken('search', data).subscribe((success: any) => {
        if (success.success) {
          this.data = success.data;

          if (this.data.length == 0) {
            let lan = localStorage.getItem('lan');
            if (lan == 'en') {
              this.util.presentToast('No Result Found');
            } else if (lan == 'ar') {
              this.util.presentToast('لم يتم العثور على نتيجة');
            } else {
              this.util.presentToast('Niciun rezultat găsit');
            }
          }
          this.id = success.data.salon_id;
          this.data.forEach(element => {
            element.distance = this.api.getDistanceFromLatLonInKm(this.latitude, this.longitude, element.latitude, element.longitude);
          });
          this.util.dismissLoader();
        }
        else {

        }
      }, error => {
        this.util.presentToast('NO RESULT FOUND');
      })
    } else {
      this.input = 0;
    }
    this.categoriesss = [];
  }

  async presentmodal() {
    const modal = await this.modal.create({
      component: SortbyPage,
      cssClass: 'sort-by'
    });
    modal.onDidDismiss().then((res) => {
      console.log("res", res.data.gender);
      this.gender == res.data.gender;
      if (res.data.gender == 'Male') {
        this.salonListt.sort((a) => {
          if (a.gender == 'Male') {
            console.log(a.gender);

          }
        })
      }
      else if (res.data.gender == 'Female') {
        this.salonListt.sort((b) => {
          if (b.gender == 'Female') {
            console.log(b.gender);
          }
        })
      }
      else if (res.data.gender == 'Both') {
        this.salonListt.sort((c) => {
          if (c.gender == 'Both') {
            console.log(c.gender);
          }
        })
      }
    })
    return await modal.present();
  }

  back() {
    this.navCtrl.navigateBack('tabs/home');
  }

  ionViewWillEnter() {
    this.api.addressData;
    this.selectAddress = localStorage.getItem('dataofaddress');
    this.getLocation();
  }

  ngOnInit() {
    this.api.getData('salons').subscribe((success: any) => {
      if (success.success) {
        this.salonListt = success.data;
      }
    })
    this.language = localStorage.getItem('lan');
  }

  book(id) {
    let navigationExtras: NavigationExtras = {
      state: {
        id: id,
      }
    };
    this.router.navigate(['salon-profile'], navigationExtras);
    localStorage.setItem('Salon-id', id);
  }
}