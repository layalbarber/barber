import { Injectable } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilserviceService {
  isLoading: boolean;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    public nav: NavController
  ) { }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      mode: "ios"
    });
    toast.present();
  }
  async startLoad() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        duration: 5000,
        cssClass: "custom-loader",
        message: `<div class="sk-chase">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>`,
        spinner: null
      })
      .then(a => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => { });
          }
        });
      });
  }
  async dismissLoader() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }
}
