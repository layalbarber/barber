import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilserviceService } from "src/app/services/utilservice.service";

@Component({
  selector: "app-add-review",
  templateUrl: "./add-review.page.html",
  styleUrls: ["./add-review.page.scss"],
})
export class AddReviewPage implements OnInit {
  @Input() booking_id: any;
  @Input() salon_id: any;
  message: string = "";
  profilee: any;
  language: any;
  constructor(
    private modal: ModalController,
    private api: ApiService,
    private util: UtilserviceService
  ) { }
  ratingValue: any = 1;
  ngOnInit() {
    this.util.startLoad();
    this.api.getDataWithToken("profile").subscribe(
      (success: any) => {
        if (success.success) {
          this.profilee = success.data;
          this.util.dismissLoader();
        }
      },
      (error) => {
        this.util.dismissLoader();
      }
    );
    this.language = localStorage.getItem("lan");
  }
  close() {
    this.util.startLoad();
    let data = {
      salon_id: this.salon_id,
      message: this.message,
      rate: this.ratingValue,
      booking_id: this.booking_id,
    };
    this.api.postDataWithToken("addreview", data).subscribe(
      async (success: any) => {
        if (success.success) {
          this.modal.dismiss(this.booking_id);
          if (this.language == "en") {
            this.util.presentToast("Review Added Successfullly");
          } else if (this.language == "ar") {
            this.util.presentToast("تمت إضافة المراجعة بنجاح");
          } else {
            this.util.presentToast("Recenzie adăugată cu succes");
          }
          this.util.dismissLoader();
        }
      },
      (err) => {
        console.log("error", err);
        if (this.language == "en") {
          this.util.presentToast("Something went wrong ..!");
        } else if (this.language == "ar") {
          this.util.presentToast("هناك خطأ ما ..!");
        } else {
          this.util.presentToast("Ceva n-a mers bine ..!");
        }
        this.modal.dismiss();
      }
    );
  }

  setRating(val) {
    this.ratingValue = val;
  }
}
