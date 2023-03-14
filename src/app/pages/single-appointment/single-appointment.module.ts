import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleAppointmentPageRoutingModule } from './single-appointment-routing.module';

import { SingleAppointmentPage } from './single-appointment.page';
import { NgxProgressiveImgLoaderModule } from 'ngx-progressive-img-loader';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleAppointmentPageRoutingModule,
    TranslateModule,
    NgxProgressiveImgLoaderModule,
  ],
  declarations: [SingleAppointmentPage]
})
export class SingleAppointmentPageModule {}
