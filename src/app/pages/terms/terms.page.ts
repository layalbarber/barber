import { Component, OnInit } from '@angular/core';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor(
    private util:UtilserviceService,
    private api:ApiService
  ) { }
  
  ngOnInit() {
    this.util.startLoad();
    this.api.getDataWithToken('settings').subscribe((success:any) => {
      console.log('success',success);
      if(success.success){
        this.termsAndConditions = success.data.terms_conditions;
        console.log('this.terms & conditions', this.termsAndConditions);
        this.util.dismissLoader();
      }
    }, error => {
      console.log('error',error);
      this.util.dismissLoader();
    })
  }
  termsAndConditions:any;
}
