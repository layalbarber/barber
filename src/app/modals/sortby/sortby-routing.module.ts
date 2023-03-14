import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SortbyPage } from './sortby.page';

const routes: Routes = [
  {
    path: '',
    component: SortbyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SortbyPageRoutingModule {}
