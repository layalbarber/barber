import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakePaymentPageRoutingModule } from './make-payment-routing.module';

import { MakePaymentPage } from './make-payment.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakePaymentPageRoutingModule,
    TranslateModule
  ],
  declarations: [MakePaymentPage]
})
export class MakePaymentPageModule {}
