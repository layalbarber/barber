import { Injectable } from '@angular/core';
import { Platform, ToastController, MenuController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);
  email: any;
  password: any;
  data: any;

  constructor(
    private platform: Platform,
    public toastController: ToastController,
    private menu: MenuController,
    private navCtrl: NavController
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    })
  }

  ifLoggedIn() {
    localStorage.getItem('token');
    this.authState.next(true)
  }

  login() {

  }

  logout() {
    localStorage.removeItem('token');
    this.menu.close();
    this.navCtrl.navigateRoot(['login']);
    this.authState.next(false);
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
