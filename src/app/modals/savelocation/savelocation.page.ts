import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-savelocation',
  templateUrl: './savelocation.page.html',
  styleUrls: ['./savelocation.page.scss'],
})
export class SavelocationPage implements OnInit {
  @Input() item;
  constructor(
    private modal: ModalController,
    private util: UtilserviceService,
    private api: ApiService
  ) {
    console.log(this.item);
  }

  close(item) {
    this.api.addressData = item;
    localStorage.setItem('dataofaddress', this.api.addressData.address)
    this.modal.dismiss(item);
  }

  closeOnly() {
    this.modal.dismiss();
  }

  ngOnInit() {
    this.util.startLoad();
    console.log('this.item in savelocation page modal', this.item)
    this.util.dismissLoader();
  }

}
