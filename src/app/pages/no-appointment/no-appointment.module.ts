import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoAppointmentPageRoutingModule } from './no-appointment-routing.module';

import { NoAppointmentPage } from './no-appointment.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoAppointmentPageRoutingModule,
    TranslateModule
  ],
  declarations: [NoAppointmentPage]
})
export class NoAppointmentPageModule {}
