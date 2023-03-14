import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UtilserviceService } from 'src/app/services/utilservice.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.page.html',
  styleUrls: ['./payment-modal.page.scss'],
})
export class PaymentModalPage implements OnInit {

  constructor(
    private modal:ModalController,
    private navCtrl:NavController,
    private util:UtilserviceService
  ) { }

  home(){
    this.modal.dismiss();
    this.navCtrl.navigateForward('tabs/appointment');
    this.util.dismissLoader();
  }
  ngOnInit() {
  }

}
