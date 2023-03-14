import { Component, OnInit } from "@angular/core";
import { NavController, Platform, ModalController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilserviceService } from "src/app/services/utilservice.service";
import * as moment from "moment";
import { NavigationExtras, Router } from "@angular/router";
import { LoginPage } from "../login/login.page";
import { SelectAddressPage } from "../select-address/select-address.page";
@Component({
  selector: "app-select-time-slot",
  templateUrl: "./select-time-slot.page.html",
  styleUrls: ["./select-time-slot.page.scss"],
})
export class SelectTimeSlotPage implements OnInit {
  calender: any = {
    month: "",
    year: "",
    date: [],
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear(),
    currentDay: new Date().getDate(),
  };
  selected: any = "";
  localStorageData: any = [];
  servicesId: any = [];
  timeSlot: any = [];
  language: any;
  slice: any = {
    from: 0,
    to: 0,
  };
  err: any = {};
  salonId: string;
  time = [];
  selectBtn: any;
  empId: any;
  bookingCart: any;
  total: any;
  success: any;
  errm: string;
  empBook: string;
  falseee: any = "";
  localAdd: any = "";
  data: any = [];
  constructor(
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilserviceService,
    private platform: Platform,
    private modalCtrl: ModalController,
    public router: Router
  ) {
    this.platform.backButton.subscribe((d) => {
      if (d) {
        localStorage.removeItem("empid");
        localStorage.removeItem("SelectAddress");
        this.api.booking_at = "";
        this.navCtrl.navigateRoot("tabs/home/salon-profile");
      }
    });

    this.salonId = localStorage.getItem("Salon-id");
    this.total = localStorage.getItem("total");
    this.localStorageData = localStorage.getItem("booking-detail")
      ? JSON.parse(localStorage.getItem("booking-detail"))
      : [];
    this.localStorageData.forEach((element) => {
      this.servicesId.push(element.service_id);
    });

  }


  ionViewWillEnter() {

  }

  async ngOnInit() {

    this.language = localStorage.getItem("lan");
    let token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    if (token == "") {
      localStorage.setItem("previous-request", "true");
      localStorage.setItem(
        "previous-request-page",
        "/tabs/home/select-time-slot"
      );
      let model = await this.modalCtrl.create({
        component: LoginPage,
      });
      model.present();
    }
    let hasPre = localStorage.getItem("previous-request")
      ? localStorage.getItem("previous-request")
      : false;
    let prePage = localStorage.getItem("previous-request-page")
      ? localStorage.getItem("previous-request-page")
      : "";
    if (hasPre == "true" && prePage == "select-time-slot") {
      localStorage.setItem("previous-request", "true");
    }
    var today: any = new Date();
    this.calender.month = today.getMonth() + 1;

    this.calender.year = today.getFullYear();
    this.slice.from = this.calender.currentDay - 1;
    this.slice.to = this.calender.currentDay + 6;

    this.selected =
      this.calender.year +
      "-" +
      this.calender.month +
      "-" +
      ("0" + today.getDate()).slice(-2);

    this.action(0);
    this.request();

  }

  verifyEvent(id) {
    this.empId = id;
    let selected = 0;
    this.data.map((item) => {
      if (item.emp_id == id) {
        item.isItemChecked = !item.isItemChecked;
        if (item.isItemChecked == false) {
          this.empId = null;
        }
      } else {
        item.isItemChecked = false;
      }
      if (item.isItemChecked == true) {
        selected++;
        if (item.emp_id == id) {

        }
      } else {
      }
    });
  }

  updateCheckedOptions(event) {
    if (event.checked) {
      this.checked.push(this.bookingCart);
    }
  }

  back() {
    localStorage.removeItem("empid");
    localStorage.removeItem("SelectAddress");
    this.api.booking_at = "";
    this.navCtrl.navigateForward("/tabs/home/salon-profile");
  }


  checked: any = [];

  bookNow() {
    let istime = false;
    this.api.time.date = this.selected;
    this.timeSlot.forEach((element) => {
      if (element.issel) {
        this.api.time.timeslot = element.time;
        istime = true;
      }
    });


    if (istime) {
      this.navCtrl.navigateForward("/select-service");
    } else {
      if (this.language == "en") {
        this.util.presentToast("Please Select Timeslot");
      } else if (this.language == "ar") {
        this.util.presentToast("يرجى تحديد الفترة الزمنية");
      } else {
        this.util.presentToast("Vă rugăm să selectați intervalul de timp");
      }
    }
  }

  async nextPage() {
    this.localAdd = localStorage.getItem("SelectAddress");
    localStorage.getItem("SelectAddress")
      ? JSON.parse(localStorage.getItem("SelectAddress"))
      : [];

    if (this.api.booking_at == "Home" && this.localAdd === null) {
      this.api.adres = "select_time"
      const modal = await this.modalCtrl.create({
        component: SelectAddressPage,
      });

      return await modal.present();
    } else {
      let token = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";
      if (token != "") {
        if (this.selectBtn != null && this.empId != null) {
          let navigationExtra: NavigationExtras = {
            state: {
              empId: this.empId,
              date: this.selected,
              salonId: this.salonId,
              service: this.servicesId,
              start_time: this.selectBtn,
              total: localStorage.getItem("total"),
            },
          };
          let data = {
            empId: this.empId,
            date: this.selected,
            salonId: this.salonId,
            service: this.servicesId,
            start_time: this.selectBtn,
            total: localStorage.getItem("total"),
          };
          localStorage.setItem("data of salon", JSON.stringify(data));
          this.navCtrl.navigateForward(
            ["tabs/home/makepayment"],
            navigationExtra
          );
          localStorage.setItem("empid", this.empId);
          localStorage.setItem("date", this.selected);
          this.total = localStorage.getItem("total");
          localStorage.setItem("time", this.selectBtn);
          localStorage.setItem("total", this.total);
        } else if (this.selectBtn == null) {
          this.errm = "Choose The Time";
          if (this.language == "en") {
            this.util.presentToast("Choose The Time");
          } else if (this.language == "ar") {
            this.util.presentToast("اختر الوقت");
          } else {
            this.util.presentToast("Alegeți timpul");
          }
        } else if (this.empId == null) {
          this.empBook = "Choose the Employee";
          if (this.language == "en") {
            this.util.presentToast(this.empBook);
          } else if (this.language == "ar") {
            this.util.presentToast("اختر الموظف");
          } else {
            this.util.presentToast("Alegeți angajatul");
          }
        }
      } else {
        localStorage.setItem("previous-request", "true");
        localStorage.setItem(
          "previous-request-page",
          "/tabs/home/select-time-slot"
        );
        let model = await this.modalCtrl.create({
          component: LoginPage,
        });
        model.present();
      }
    }
  }

  action(check) {

    if (check != 0) {
      if (check == 2) {
        this.slice.from = this.slice.from + 7;
        this.slice.to = this.slice.to + 7;
        if (this.slice.from >= 28) {
          this.slice.from = 0;
          this.slice.to = 7;
          if (this.calender.month == 12) {
            this.calender.month = 1;
            this.calender.year += 1;

          } else {
            this.calender.month += 1;

          }
        }
      }
      if (check == 1) {
        this.slice.from = this.slice.from - 7;
        this.slice.to = this.slice.to - 7;
        if (this.slice.from <= 1) {
          if (this.calender.month == 1) {
            this.calender.month = 12;
            this.calender.year -= 1;
          } else {
            this.calender.month -= 1;
          }
          let days = moment(
            this.calender.year + "-" + this.calender.month,
            "YYYY-MM"
          ).daysInMonth();

          this.slice.from = days - 7;
          this.slice.to = days;

        }
      }
    }

    this.calender.date = [];
    let days: any;
    days = moment(
      this.calender.year + "-" + this.calender.month,
      "YYYY-MM"
    ).daysInMonth();
    let state = false;
    for (let i: any = 0; i < days; i++) {
      let day =
        this.calender.year +
        "-" +
        this.calender.month +
        "-" +
        ("0" + parseInt(i + 1)).slice(-2);
      if (
        this.calender.currentYear == this.calender.year &&
        this.calender.currentMonth == this.calender.month
      ) {

        if (("0" + parseInt(i + 1)).slice(-2) == this.calender.currentDay) {
          state = true;

        }

        if (state == false) {
          this.calender.date.push({ date: day, selected: false });
        } else {
          this.calender.date.push({ date: day, selected: true });
        }
      } else {
        if (this.calender.year == this.calender.currentYear) {
          if (this.calender.month >= this.calender.currentMonth) {
            this.calender.date.push({ date: day, selected: true });
          } else {
            this.calender.date.push({ date: day, selected: false });
          }
        } else {
          if (this.calender.year > this.calender.currentYear) {
            this.calender.date.push({ date: day, selected: true });
          }
        }
      }
    }

  }

  request() {
    this.time = [];
    this.data = [];
    this.selectBtn = null;
    let rdata: any = {};
    rdata.date = moment(this.selected).format("YYYY-MM-DD");
    let data = {
      salon_id: this.salonId,
      date: this.selected,
    };
    this.util.startLoad();
    this.api.postDataWithToken("timeslot", data).subscribe(
      (res: any) => {
        this.success = res.success;
        if (res.success) {
          this.util.dismissLoader();
          this.time = res.data;
        }
        if (res.success == false) {
          this.util.dismissLoader();
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
  }

  activeSlot(i) {
    this.data = [];

    this.selectBtn = i;
    this.util.startLoad();
    let data = {
      start_time: this.selectBtn,
      service: this.servicesId,
      date: this.selected,
      salon_id: this.salonId,
      booking_at: this.api.booking_at,
    };

    this.api.postDataWithToken("selectemp", data).subscribe(
      (success: any) => {
        this.util.dismissLoader();
        if (success.success == true) {
          this.data = success.data;
          console.log("this.data", this.data);

        }
        if (success.success == false) {
          console.log(success.msg);
          this.util.presentToast(success.msg);
          this.falseee = success.msg ? success.msg : "";
        }
      },
      (error) => {
        this.util.dismissLoader();

      }
    );
  }
}
