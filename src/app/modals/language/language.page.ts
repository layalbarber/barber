import { Component, OnInit } from "@angular/core";
import { MenuController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-language",
  templateUrl: "./language.page.html",
  styleUrls: ["./language.page.scss"],
})
export class LanguagePage implements OnInit {
  selectedLanguage: string;
  constructor(
    private modal: ModalController,
    private translate: TranslateService,
    private menu: MenuController,
  ) {
    this.translate.get("SelectLanguage.label").subscribe((data: any) => {
      this.option.header = data;
    });
  }
  option: any = {
    header: "Language",
  };
  language: any = "en";
  ngOnInit() {
    this.language = localStorage.getItem("lan");
  }
  languageChanged() {
    this.modal.dismiss();
    this.menu.close();
    this.translate.setDefaultLang(this.language);
    localStorage.setItem("lan", this.language);
    if (localStorage.getItem("lan") == "ar") {
      document.documentElement.dir = "rtl";
    }
    if (localStorage.getItem("lan") == "en") {
      document.documentElement.dir = "ltr";
    }
    if (localStorage.getItem("lan") == "ro") {
      document.documentElement.dir = "ltr";
    }
  }
}
