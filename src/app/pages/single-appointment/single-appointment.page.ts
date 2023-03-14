import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilserviceService } from "src/app/services/utilservice.service";

@Component({
  selector: "app-single-appointment",
  templateUrl: "./single-appointment.page.html",
  styleUrls: ["./single-appointment.page.scss"],
})
export class SingleAppointmentPage implements OnInit {
  singleId: any;
  confirm: any;
  service: any = [];
  currency: string;
  ispoint: any;
  language: any;
  constructor(
    private navCtrl: NavController,
    private util: UtilserviceService,
    private api: ApiService
  ) {
    this.singleId = JSON.parse(localStorage.getItem("singaleId"));
    this.currency = localStorage.getItem("currency");
  }

  ionViewWillEnter() {
    this.language = localStorage.getItem("lan");
  }

  ngOnInit() {
    this.language = localStorage.getItem("lan");
    this.util.startLoad();
    this.api.getDataIdWithToken("appointment", this.singleId).subscribe(
      (data: any) => {
        this.util.dismissLoader();
        this.confirm = data.data;
        this.service = data.data.services;

      },
      (err: any) => {
        this.util.dismissLoader();
        console.log(err);
      }
    );
    this.api.getDataWithToken("settings").subscribe(
      (data: any) => {
        this.util.dismissLoader();
        this.ispoint = data.data.is_point_package;
      },
      (err: any) => {
        this.util.dismissLoader();
        console.log(err);
      }
    );
  }

  backs() {
    localStorage.removeItem("singaleId");
    this.navCtrl.navigateForward("/tabs/appointment");
  }
}
