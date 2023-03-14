import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialiconPage } from './socialicon.page';

const routes: Routes = [
  {
    path: '',
    component: SocialiconPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialiconPageRoutingModule {}
