import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectTimeSlotPage } from './select-time-slot.page';

const routes: Routes = [
  {
    path: '',
    component: SelectTimeSlotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectTimeSlotPageRoutingModule {}
