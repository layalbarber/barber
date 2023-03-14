import { Component, OnInit } from '@angular/core';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-socialicon',
  templateUrl: './socialicon.page.html',
  styleUrls: ['./socialicon.page.scss'],
})
export class SocialiconPage implements OnInit {
  public image: string = '';

  constructor(
    private socialSharing: SocialSharing,
    private util: UtilserviceService,
    private modal: ModalController,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.util.startLoad();
    this.api.getData('sharedSettings').subscribe((success: any) => {
      if (success.success) {
        console.log(success.data);
        this.image = success.data.imagePath + success.data.shared_image;
        this.dataShare = success.data.shared_name;
        this.url = success.data.shared_url;
        console.log("this.url", this.url);

        this.util.dismissLoader();
      }
    })
  }

  whatsapp() {
    this.util.startLoad();
    this.modal.dismiss();
    this.socialSharing.shareViaWhatsApp(this.dataShare, this.image, this.url).then((res) => {
      if (res.success) {
        this.util.dismissLoader();
      }
    }).catch((e) => {
      console.log('Error', e)
    })
  }

  public dataShare: string = '';

  instagra() {
    this.util.startLoad();
    this.modal.dismiss();
    this.socialSharing.shareViaInstagram(this.dataShare, this.image).then((res) => {
      console.log(this.image, 'image');
      if (res.success) {
        this.util.dismissLoader();
      }
    }).
      catch((e) => {
        console.log('Error', e);
      })
  }
  url: any = '';
  facebook() {
    this.util.startLoad();
    this.modal.dismiss();
    this.socialSharing.shareViaFacebook(this.dataShare, this.image, this.url).then((res) => {
      if (res.success) {
        this.util.dismissLoader();

      }
    }).catch((e) => {
      console.log('Error', e)
    })
  }
  emails: any = '';
  sbject: any = '';
  email() {
    this.util.startLoad();
    this.modal.dismiss();
    this.socialSharing.shareViaEmail(this.url, this.sbject, this.emails).then((res) => {
      if (res.success) {
        this.util.dismissLoader();
      }
    }).catch((e) => {
      console.log('Error', e);
    })
  }

}
