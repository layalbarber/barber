import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Platform, NavController, ModalController } from '@ionic/angular';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
declare var google: any;
@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  state: string;
  street: string;
  city: string;
  country: string;
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
  edit_id: any;
  edit_data: any;
  address_select: any;
  constructor(
    private platform: Platform,
    private util: UtilserviceService,
    private api: ApiService,
    private navCtrl: NavController,
    private router: Router,

  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.edit_data = this.router.getCurrentNavigation().extras.state.edit_data;
      this.address_select = this.router.getCurrentNavigation().extras.state.address;
    }

    this.street = this.edit_data.street;
    this.city = this.edit_data.city;
    this.state = this.edit_data.state;
    this.country = this.edit_data.country;
    this.backbutton();
    console.log(this.edit_data);

    this.latt = JSON.parse(this.edit_data.let) ? JSON.parse(this.edit_data.let) : this.edit_data.let;
    this.long = JSON.parse(this.edit_data.long) ? JSON.parse(this.edit_data.long) : this.edit_data.long;
  }

  ngOnInit() {

    this.initPage();
  }
  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.initPage();
    })
    this.language = localStorage.getItem('lan');
    this.edit_id = JSON.parse(localStorage.getItem("SelectAddress"));
  }

  initPage() {
    setTimeout(() => {
      this.latt = JSON.parse(this.edit_data.let);
      this.long = JSON.parse(this.edit_data.long);
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
    let data = {
      country: this.country,
      street: this.street,
      city: this.city,
      state: this.state,
      let: this.latt,
      long: this.long,
    }
    this.util.startLoad();
    this.api.postDataWithToken('profile/address/update/' + this.edit_data.address_id, data).subscribe(async (success: any) => {
      this.util.dismissLoader();
      this.api.update_address.next(true);
      if (success.success) {
        if (this.language == 'en') {
          this.util.presentToast('address update successfullly');
        } else {
          this.util.presentToast('تحديث العنوان بنجاح')
        }
        this.navCtrl.navigateForward("tabs/profile/edit");
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
