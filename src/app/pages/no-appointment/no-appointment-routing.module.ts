import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoAppointmentPage } from './no-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: NoAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoAppointmentPageRoutingModule {}
