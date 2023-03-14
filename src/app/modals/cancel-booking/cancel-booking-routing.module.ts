import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelBookingPage } from './cancel-booking.page';

const routes: Routes = [
  {
    path: '',
    component: CancelBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelBookingPageRoutingModule {}
