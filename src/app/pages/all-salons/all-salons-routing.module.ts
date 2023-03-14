import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllSalonsPage } from './all-salons.page';

const routes: Routes = [
  {
    path: '',
    component: AllSalonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllSalonsPageRoutingModule {}
