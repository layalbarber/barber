import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-web-show',
  templateUrl: './web-show.page.html',
  styleUrls: ['./web-show.page.scss'],
})
export class WebShowPage implements OnInit {

  constructor(
    private navCtrl:NavController
  ) { }


  back(){
    this.navCtrl.back();
  }

  ngOnInit() {
  }

}
