import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-passwordchanged',
  templateUrl: './passwordchanged.page.html',
  styleUrls: ['./passwordchanged.page.scss'],
})
export class PasswordchangedPage implements OnInit {

  constructor(
    private navCtrl:NavController
  ) { }

  ngOnInit() {
  }

  login(){
    this.navCtrl.navigateForward('login')
  }



}
