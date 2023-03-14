import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleAppointmentPage } from './single-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: SingleAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleAppointmentPageRoutingModule {}
