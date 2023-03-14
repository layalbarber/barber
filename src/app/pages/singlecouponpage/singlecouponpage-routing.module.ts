import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SinglecouponpagePage } from './singlecouponpage.page';

const routes: Routes = [
  {
    path: '',
    component: SinglecouponpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SinglecouponpagePageRoutingModule {}
