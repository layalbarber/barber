import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { ApiService } from 'src/app/services/api.service';
declare var google: any;
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})

export class AddAddressPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  state: string;
  street: string;
  city: string;
  country: string;
  lat: number = 3.202778;
  lng: number = 73.220680;
  address: string;
  latt: any;
  long: any;
  latttt: number;
  longgg: number;
  language: any;
  cityErr: any;
  countryErr: any;
  stateErr: any;
  streetErrr: any;
  constructor(
    private platform: Platform,
    private util: UtilserviceService,
    private api: ApiService,
    private navCtrl: NavController,
  ) {
    this.api.getDataWithToken("settings").subscribe(
      (res: any) => {
        if (res.success) {
          localStorage.setItem("lat", res.data.lat);
          localStorage.setItem("lang", res.data.lang);
        }
      },
      (err) => {
        console.log("err", err);
      }
    );
    this.backbutton();
    this.latt = localStorage.getItem("lat");
    this.long = localStorage.getItem("lang");
  }

  ngOnInit() {

    this.initPage();
  }
  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.initPage();
    })
    this.language = localStorage.getItem('lan');
  }

  initPage() {
    setTimeout(() => {
      this.latt = localStorage.getItem("lat");
      this.long = localStorage.getItem("lang");
      this.loadMap(this.latt, this.long);

    }, 500);
  }

  loadMap(lat, lng) {
    let latLng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
    let mapOption = {
      center: latLng,
      zoom: 14,
      mapTypeId: 'roadmap',
      disableDefaultUI: true
    }
    let element = document.getElementById('map');
    this.map = new google.maps.Map(element, mapOption);
    let marker = new google.maps.Marker(
      {
        map: this.map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });
    let content = `
          <div id="myId" class="item item-thumbnail-left item-text-wrap">
            <ion-item>
              <ion-row>
                <h6> `+ marker.title + `</h6>
                <h6> `+ marker.position + `</h6>
              </ion-row>
            </ion-item>
          </div>
        `
    this.addInfoWindow(marker, content);
    marker.setMap(this.map);
  }

  closeModal() {
    this.util.startLoad();
    this.navCtrl.back();

  }

  backbutton() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateBack('tabs/profile/edit');
    })
  }

  addInfoWindow(marker, content) {
    {
      let infoWindow = new google.maps.InfoWindow(
        {
          content: content
        });
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
      google.maps.event.addListener(marker, 'dragend', function () {
        this.markerlatlong = marker;
        this.latttt = marker.getPosition().lat();
        this.longgg = marker.getPosition().lng();

        this.latt = this.markerlatlong.latttt;
        this.long = this.markerlatlong.longgg;

        localStorage.setItem("lat", this.latt);
        localStorage.setItem("lang", this.long);
      });
    }
  }
  saveAddress() {
    this.latt = localStorage.getItem("lat");
    this.long = localStorage.getItem("lang");
    this.util.startLoad();
    let data = {
      country: this.country,
      street: this.street,
      city: this.city,
      state: this.state,
      let: this.latt,
      long: this.long,
    }
    this.api.postDataWithToken('profile/address/add', data).subscribe((success: any) => {
      console.log(success.data);
      localStorage.setItem("SelectAddress", JSON.stringify(success.data.address_id));
      if (success.success) {
        this.street = "";
        this.city = "";
        this.state = "";
        this.country = "";
        if (this.api.editprofile == "editprofile") {
          this.navCtrl.navigateForward('/tabs/profile/edit');
          this.api.editprofile = "";
        } else {
          this.navCtrl.navigateForward('/tabs/home/select-time-slot');
        }
        this.util.dismissLoader();
        if (this.language == 'en') {
          this.util.presentToast('address added successfullly');
        } else {
          this.util.presentToast('تمت إضافة العنوان بنجاح')
        }
      }
    }, error => {
      this.util.dismissLoader();
      this.cityErr = error.error.errors.city[0];
      this.countryErr = error.error.errors.country[0];
      this.stateErr = error.error.errors.state[0];
      this.streetErrr = error.error.errors.street[0];
    })
  }
}
