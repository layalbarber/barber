import { Component, OnInit, Input } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilserviceService } from "src/app/services/utilservice.service";

@Component({
  selector: "app-cancel-booking",
  templateUrl: "./cancel-booking.page.html",
  styleUrls: ["./cancel-booking.page.scss"],
})
export class CancelBookingPage implements OnInit {
  constructor(
    private modal: ModalController,
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilserviceService
  ) { }
  @Input() booking_id: any;
  ngOnInit() { }
  close() {
    this.util.startLoad();
    this.api
      .getDataWithToken("appointment/cancel/" + this.booking_id)
      .subscribe((success: any) => {
        if (success.success) {
          let lan = localStorage.getItem("lan");

          if (lan == "en") {
            this.util.presentToast("Booking canceled");
          } else if (lan == "ar") {
            this.util.presentToast("تم إلغاء الحجز");
          } else {
            this.util.presentToast("Rezervare anulată");
          }
          this.navCtrl.navigateForward("tabs/appointment");
          this.modal.dismiss(this.booking_id);
          this.util.dismissLoader();
        }
      });
  }

  closeModel() {
    this.modal.dismiss();
  }
}
