import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebShowPage } from './web-show.page';

const routes: Routes = [
  {
    path: '',
    component: WebShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebShowPageRoutingModule {}
