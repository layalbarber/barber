import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { SavelocationPage } from 'src/app/modals/savelocation/savelocation.page';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-setlocatio',
  templateUrl: './setlocatio.page.html',
  styleUrls: ['./setlocatio.page.scss'],
})
export class SetlocatioPage implements OnInit {
  options = "{ types: [], componentRestrictions: { country: 'UA' }}"
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  local: any = [];
  name: any = [];
  popularLocationData: any = [];
  addressDetail: any = [];
  constructor(
    private modal: ModalController,
    private navCtrl: NavController,
    public zone: NgZone,
    private router: Router,
    private api: ApiService,
    private platform: Platform
  ) {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/tabs/home');
    });
  }

  public handleAddressChange(address: Address) {
    console.log('name', address.name)
    console.log('address', address);
    console.log(address.formatted_address, 'address');
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.lng());
    this.api.searchLat = address.geometry.location.lat();
    this.api.searchLng = address.geometry.location.lng();
    localStorage.setItem('addressLat', this.api.searchLat);
    localStorage.setItem('addressLng', this.api.searchLng);
    this.local = JSON.parse(localStorage.getItem('address-detail')) ? JSON.parse(localStorage.getItem('address-detail')) : [];
    this.name = JSON.parse(localStorage.getItem('popular-locations')) ? JSON.parse(localStorage.getItem('popular-locations')) : [];
    let dataOfAddress = {
      name: address.name,
      address: address.formatted_address
    }
    setTimeout(() => {
      this.local.push(dataOfAddress);
      let data = {
        name: address.name
      }
      this.name.push(data)
      localStorage.setItem('address-detail', JSON.stringify(this.local))
      localStorage.setItem('popular-locations', JSON.stringify(this.name))
    }, 500);
    this.ngOnInit();
  }


  ngOnInit() {
    setTimeout(() => {
      this.popularLocationData = localStorage.getItem('popular-locations') ? JSON.parse(localStorage.getItem('popular-locations')) : [];
      console.log(this.popularLocationData);
      this.addressDetail = localStorage.getItem('address-detail') ? JSON.parse(localStorage.getItem('address-detail')) : [];
      console.log(this.addressDetail)
    }, 500);
  }


  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      console.log(this.popularLocationData);
      this.popularLocationData = localStorage.getItem('popular-locations') ? JSON.parse(localStorage.getItem('popular-locations')) : [];
      this.addressDetail = localStorage.getItem('address-detail') ? JSON.parse(localStorage.getItem('address-detail')) : [];
      console.log(this.addressDetail)
      event.target.complete();
    }, 2000);
  }

  search() {
    this.navCtrl.navigateForward('tabs/home/search')
  }

  back() {
    this.navCtrl.navigateBack('tabs/home')
  }

  backButton() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateBack('tabs/nearby')
    })
  }

  async presentModal(item) {
    console.log(item)
    const modal = await this.modal.create({
      component: SavelocationPage,
      cssClass: 'save-location',
      componentProps: {
        item: item
      }
    });
    modal.onDidDismiss().then(res => {
      console.log('res', res);
      let navigationExtra: NavigationExtras = {
        state: {
          item: item
        }
      }
      console.log('res', navigationExtra);
      this.router.navigate(['tabs/home'], navigationExtra);
    })
    return await modal.present();
  }

}
